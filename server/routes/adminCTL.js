const express = require('express');
const multer = require('multer');
const Joi = require('joi');
const { admin } = require('../models'); // Utilisation du modèle admin
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const bcrypt = require('bcryptjs');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/Admin/');
    },
    filename: (req, file, cb) => {
        var uniqueFilename = uuidv4() + path.extname(file.originalname);
        cb(null, uniqueFilename);
    }
});

const upload = multer({ storage: storage });


const validateUser = (userData) => {
    const schema = Joi.object({
        nom_complet: Joi.string().required().messages({
            'any.required': 'Le nom complet est requis.',
            'string.empty': 'Le nom complet ne doit pas être vide.'
        }),
        email: Joi.string().email().required().messages({
            'any.required': 'L\'adresse email est requise.',
            'string.empty': 'L\'adresse email ne doit pas être vide.',
            'string.email': 'L\'adresse email doit être valide.'
        }),
        password: Joi.string().required().messages({
            'any.required': 'Le mot de passe est requis.',
            'string.empty': 'Le mot de passe ne doit pas être vide.'
        }),
        photo: Joi.any().optional(),
    });
    return schema.validate(userData, { abortEarly: false });
};

// Créer un administrateur
router.post('/createAccount', upload.single('photo'), async (req, res) => {
    try {
        // Vérifier si l'administrateur existe déjà avec cet e-mail
        const existingAdmin = await admin.findOne({ where: { email: req.body.email } });
        if (existingAdmin) {
            return res.status(400).send('Cet email est déjà utilisé.');
        }

        // Valider les données de l'administrateur
        const { error } = validateUser(req.body);
        const { nom_complet, email } = req.body;
        if (error) return res.status(400).send(error.details[0].message);

        // Hasher le mot de passe
        const salt = await bcrypt.genSalt(10); // Générer un sel pour le hash
        const hashedPassword = await bcrypt.hash(req.body.password, salt); // Hasher le mot de passe

        // Créer l'administrateur dans la base de données avec le mot de passe hashé
        const newAdmin = await admin.create({
            nom_complet,
            email,
            password: hashedPassword,
            photo: req.file ? req.file.filename : null,
        });

        res.status(201).send(newAdmin);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la création de l\'administrateur.');
    }
});

const customErrorMessages = {
    'string.empty': 'Ce champ est requis.',
    'any.required': 'Ce champ est requis.',
    'string.email': 'Veuillez fournir une adresse e-mail valide.',
    'string.min': 'Le mot de passe doit contenir au moins {#limit} caractères.',
};
// Schéma de validation pour les données de connexion
const loginSchema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required().messages(customErrorMessages),
    password: Joi.string().min(8).required().messages(customErrorMessages),
});

// Fonction de validation des données de connexion
const validateLogin = (data) => {
    return loginSchema.validate(data, { abortEarly: false });
};

router.post('/login', async (req, res) => {
    try {
        // Vérifier si l'administrateur existe avec cet e-mail
        const existingAdmin = await admin.findOne({ where: { email: req.body.email } });
        if (!existingAdmin) {
            return res.status(400).send('Vous n\'êtes pas inscrit dans notre service. Veuillez créer un compte ou vérifier votre adresse e-mail.');
        }

        // Valider les données de connexion
        const { error } = validateLogin(req.body);
        if (error) return res.status(400).send(error.message);

        // Vérifier le mot de passe
        const validPassword = await bcrypt.compare(req.body.password, existingAdmin.password);
        if (!validPassword) {
            return res.status(400).send('Mot de passe incorrect.');
        }

        return res.json(existingAdmin.id);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Erreur lors de la connexion.');
    }
});
router.get('/getOne/:id', async (req, res) => {
    try {
        const adminId = req.params.id;

        // Récupérer l'administrateur avec son ID
        const foundAdmin = await admin.findOne({ where: { id: adminId } });

        if (!foundAdmin) {
            return res.status(404).send('Administrateur non trouvé.');
        }

        res.status(200).send(foundAdmin);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la récupération de l\'administrateur.');
    }
});
router.put('/Updateuser/:id', upload.single('photo'), async (req, res) => {
    try {
        const adminId = req.params.id;
        const { nom_complet, email } = req.body;
        let updateFields = { nom_complet, email };

        // Vérifier si la photo de profil a été envoyée
        if (req.file) {
            updateFields.photo = req.file.filename;
        }

        // Mettre à jour l'administrateur dans la base de données
        const updatedAdmin = await admin.update(updateFields, { where: { id: adminId } });

        if (!updatedAdmin[0]) {
            return res.status(404).send('Administrateur non trouvé.');
        }

        res.status(200).send('Informations de l\'administrateur mises à jour avec succès.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la mise à jour des informations de l\'administrateur.');
    }
});
router.put('/UpdateuserPassword/:id', async (req, res) => {
    try {
        const adminId = req.params.id;
        const { isPass, isPassAncien } = req.body;

        // Vérification de la présence des champs requis
        if (!isPass || !isPassAncien) {
            return res.status(400).send("Veuillez fournir à la fois l'ancien et le nouveau mot de passe.");
        }

        // Récupérer le mot de passe haché de l'utilisateur depuis la base de données
        const Oneadmin = await admin.findByPk(adminId);
        if (!Oneadmin) {
            return res.status(404).send("Utilisateur non trouvé.");
        }

        // Vérification si l'ancien mot de passe fourni correspond au mot de passe enregistré en base de données
        const isMatch = await bcrypt.compare(isPassAncien, Oneadmin.password);
        if (!isMatch) {
            return res.status(400).send("L'ancien mot de passe est incorrect.");
        }

        // Hasher le nouveau mot de passe
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(isPass, salt);

        // Mise à jour du mot de passe de l'utilisateur dans la base de données
        Oneadmin.password = hashedPassword;
        await Oneadmin.save();

        res.status(200).send('Mot de passe de l\'utilisateur mis à jour avec succès.');
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur lors de la mise à jour du mot de passe de l\'utilisateur.');
    }
});

module.exports = router;
