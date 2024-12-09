const express = require('express');
const router = express.Router();
const Joi = require('joi');
const multer = require('multer');
const path = require('path');
const { partenaire } = require('../models');
const { Op } = require('sequelize');
// Configuration de Multer pour stocker les logos dans le dossier 'uploads/partners'
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/partners/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Middleware de configuration de Multer
const upload = multer({ storage: storage });

// Middleware pour la validation de la requête
const validatepartenaire = (req, res, next) => {
    const schema = Joi.object({
        nom: Joi.string().required().messages({
            'any.required': 'Le nom est requis',
            'string.empty': 'Le nom ne doit pas être vide'
        }),
        description: Joi.string().required().messages({
            'any.required': 'La description est requise',
            'string.empty': 'La description ne doit pas être vide'
        }),
        siteweb: Joi.string().uri().allow('').messages({
            'string.uri': 'Le site web doit être une URL valide'
        })
    });

    const { error } = schema.validate(req.body);
    if (error) {
        const errorMessage = error.details.map(detail => detail.message).join(', ');
        return res.status(400).json({ message: errorMessage });
    }

    next();
};
// Route pour créer un partenaire
router.post('/Addnew', upload.single('logo'), validatepartenaire, async (req, res) => {
    try {
        const { nom, description, siteweb } = req.body;
        const logoFileName = req.file ? req.file.filename : ''; // Récupération du nom du fichier logo
        const newpartenaire = await partenaire.create({ nom, description, siteweb, logo: logoFileName });
        res.status(201).json({ message: "partenaire créé avec succès", partenaire: newpartenaire });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la création du partenaire" });
    }
});
router.get('/getOneById/:id', async (req, res) => {
    try {
        const partenaireId = req.params.id;

        // Recherche du partenaire par son ID
        const foundPartenaire = await partenaire.findByPk(partenaireId);

        // Vérifiez si le partenaire est trouvé
        if (!foundPartenaire) {
            return res.status(404).json({ message: "Partenaire introuvable" });
        }

        // Retourne le partenaire trouvé
        return res.status(200).json(foundPartenaire);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la récupération du partenaire par ID" });
    }
});
// Route pour mettre à jour un partenaire par son ID
router.put('/updateOne/:id', upload.single('logo'), validatepartenaire, async (req, res) => {
    try {
        const partenaireId = req.params.id;
        const { nom, description, siteweb } = req.body;
        let updatedpartenaire = await partenaire.findByPk(partenaireId);

        if (!updatedpartenaire) {
            return res.status(404).json({ message: "Partenaire non trouvé" });
        }

        let logoFileName = updatedpartenaire.logo; // Initialisez le nom du fichier du logo à celui existant

        // Vérifiez si un nouveau logo est envoyé
        if (req.file) {
            logoFileName = req.file.filename; // Mettez à jour le nom du fichier du logo avec celui envoyé
        }

        // Mettez à jour les données du partenaire
        await updatedpartenaire.update({ nom, description, siteweb, logo: logoFileName });

        // Récupérez le partenaire mis à jour après la mise à jour
        updatedpartenaire = await partenaire.findByPk(partenaireId);

        res.status(200).json({ message: "Partenaire mis à jour avec succès", partenaire: updatedpartenaire });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la mise à jour du partenaire" });
    }
});

// Route pour supprimer un partenaire par son ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const partenaireId = req.params.id;
        const deletedpartenaire = await partenaire.destroy({ where: { id: partenaireId } });
        if (!deletedpartenaire) {
            return res.status(404).json({ message: "partenaire non trouvé" });
        }
        res.status(200).json({ message: "partenaire supprimé avec succès" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la suppression du partenaire" });
    }
});
// Route pour récupérer tous les partenaires avec pagination et recherche
router.get('/getAllpartenaires', async (req, res) => {
    try {
        // Pagination
        const size = parseInt(req.query.size) || 10;
        const page = parseInt(req.query.page) || 1;
        const offset = (page - 1) * size;

        // Recherche
        const searchQuery = req.query.search || '';

        // Clause de recherche
        const whereClause = searchQuery ? {
            [Op.or]: [
                { nom: { [Op.like]: `%${searchQuery}%` } },
                { description: { [Op.like]: `%${searchQuery}%` } },
                { siteweb: { [Op.like]: `%${searchQuery}%` } }
            ]
        } : {};

        // Récupération des partenaires avec pagination et recherche
        const { count, rows: partenaires } = await partenaire.findAndCountAll({
            where: whereClause,
            limit: size,
            offset: offset,
            order: [['id', 'DESC']]
        });

        res.status(200).json({
            totalpartenaires: count,
            totalPages: Math.ceil(count / size),
            currentPage: page,
            partenaires
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la récupération des partenaires" });
    }
});
router.get('/getAllpartenairesForClients', async (req, res) => {
    try {
        const partenaires = await partenaire.findAll({
            order: [['id', 'DESC']]
        });

        res.status(200).json(partenaires);
    } catch (error) {
        console.error('Erreur lors de la récupération des partenaires :', error);
        res.status(500).json({ message: "Erreur lors de la récupération des partenaires" });
    }
});


module.exports = router;
