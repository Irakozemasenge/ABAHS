const express = require('express');
const router = express.Router();
const multer = require('multer');
const Joi = require('joi');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const { evenement, sequelize } = require('../models');
const { Op } = require('sequelize');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/evenements/');
    },
    filename: (req, file, cb) => {
        var uniqueFilename = uuidv4() + path.extname(file.originalname);
        cb(null, uniqueFilename);
    }
});

const upload = multer({ storage: storage });

const schema = Joi.object({
    item: Joi.array().items(Joi.object({
        title: Joi.string().required().messages({
            'string.empty': 'Le titre de l\'item est requis.',
            'any.required': 'Le titre de l\'item est requis.'
        }),
        description: Joi.string().required().messages({
            'string.empty': 'La description de l\'item est requise.',
            'any.required': 'La description de l\'item est requise.'
        }),
        video: Joi.string().allow('').optional().messages({
            'string.empty': 'Le lien vidéo de l\'item est requis.',
            'any.required': 'Le lien vidéo de l\'item est requis.'
        }),
        photo: Joi.string().allow('').optional(),
        photoindex: Joi.string().optional() // Ajout de la validation pour photoindex
    })).min(1).required().messages({
        'array.base': 'Au moins un item d\'événement est requis.',
        'array.min': 'Au moins un item d\'événement est requis.',
        'any.required': 'Les items d\'événement sont requis.'
    })
});

router.post("/addevent", upload.any(), async (req, res) => {
    let transaction;
    let files = [];
    try {
        transaction = await sequelize.transaction();

        const { error } = schema.validate(req.body, { abortEarly: false, convert: false });

        if (error) {
            const errorMessage = error.details.map(detail => detail.message).join('; ');

            console.error(error.message);
            return res.status(400).json(errorMessage);
        }

        const { item } = req.body;
        files = req.files;

        const promises = item.map(async (eventData, index) => {
            let photo = null;
            if (eventData.photoindex !== undefined && files[index] && files[index].filename) {
                photo = files[index].filename;

            }

            await evenement.create(
                {
                    titre: eventData.title,
                    description: eventData.description,
                    photo: photo,
                    video: eventData.video,
                },
                { transaction }
            );
        });

        await Promise.all(promises);

        await transaction.commit();
        res.status(200).json("Téléchargement réussi");
    } catch (error) {
        if (transaction) {
            await transaction.rollback();
        }

        files.forEach((file) => {
            const filePath = path.join(__dirname, "..", "uploads", "evenements", file.filename);
            fs.unlinkSync(filePath);
        });

        console.error(error.message);
        res.status(500).json("Erreur lors du traitement de l'événement.");
    }
});
router.get('/getAllevents', async (req, res) => {
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
                { titre: { [Op.like]: `%${searchQuery}%` } },
                { description: { [Op.like]: `%${searchQuery}%` } }
            ]
        } : {};

        // Récupération des événements avec pagination et recherche
        const { count, rows: evenements } = await evenement.findAndCountAll({
            where: whereClause,
            limit: size,
            offset: offset,
            order: [['id', 'DESC']] // Tri par id descendant
        });

        res.status(200).json({
            totalEvenements: count,
            totalPages: Math.ceil(count / size),
            currentPage: page,
            evenements
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la récupération des événements" });
    }
});
router.get('/getOneById/:id', async (req, res) => {
    try {
        const eventId = req.params.id;

        // Recherche de l'événement par son identifiant
        const event = await evenement.findByPk(eventId);

        if (!event) {
            return res.status(404).json({ message: "Événement non trouvé" });
        }

        res.status(200).json(event);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la récupération de l'événement" });
    }
});
// Middleware pour la validation de la requête de mise à jour

const validateUpdateEvenement = Joi.object({
    titre: Joi.string().required().messages({
        'any.required': 'Le champ titre est requis.',
        'string.empty': 'Le champ titre ne doit pas être vide.'
    }),
    description: Joi.string().required().messages({
        'any.required': 'Le champ description est requis.',
        'string.empty': 'Le champ description ne doit pas être vide.'
    }),
    video: Joi.string().pattern(new RegExp(/^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/)).messages({
        'string.pattern.base': 'Veuillez entrer une URL YouTube valide pour la vidéo.'
    }),
});

// Route pour la mise à jour d'un événement par son ID
router.put('/updateevent/:id', upload.single('photo'), async (req, res) => {
    try {
        const { error, value } = validateUpdateEvenement.validate(req.body, { abortEarly: false, convert: false });

        if (error) {
            const errorMessage = error.details.map(detail => detail.message).join('; ');

            return res.status(400).json(errorMessage);
        }
        const evenementId = req.params.id;
        const { titre, video, description } = req.body;
        let NewPhoto = null;
        let NewVideo = null;
        if (req.file && req.file.filename) {
            NewPhoto = req.file.filename;
        }
        if (video) {
            NewVideo = video;
        }

        const updatedEvenement = await evenement.findByPk(evenementId);
        if (!updatedEvenement) {
            return res.status(404).json({ message: "Événement non trouvé" });
        }
        await updatedEvenement.update({ titre, photo: NewPhoto, video: NewVideo, description });
        res.status(200).json("Événement mis à jour avec succès");
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Erreur lors de la mise à jour de l'événement" });
    }
});
// Route pour la suppression d'un événement par son ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const evenementId = req.params.id;
        const deletedEvenement = await evenement.destroy({ where: { id: evenementId } });
        if (!deletedEvenement) {
            return res.status(404).json({ message: "Événement non trouvé" });
        }
        res.status(200).json({ message: "Événement supprimé avec succès" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la suppression de l'événement" });
    }
});



module.exports = router;