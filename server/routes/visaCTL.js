const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { Op } = require('sequelize');
const { vpostule, visa } = require('../models');


const visaSchema = Joi.object({
    pays: Joi.string().required().messages({
        'any.required': 'Le pays est requis',
        'string.empty': 'Le pays ne doit pas être vide'
    }),
    drapeaux: Joi.string().required().messages({
        'any.required': 'Le drapeau est requis',
        'string.empty': 'Le drapeau ne doit pas être vide'
    }),
    categorie: Joi.string().required().messages({
        'any.required': 'Le categorie est requis',
        'string.empty': 'Le categorie ne doit pas être vide'
    })
}).messages({
    'object.unknown': 'Le champ {{#label}} n\'est pas autorisé'
});
router.post('/createvisa', async (req, res) => {
    try {
        const { error } = visaSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errorMessage = error.details.map(detail => detail.message).join(', ');
            return res.status(400).send(errorMessage);
        }
        const { pays, drapeaux, categorie } = req.body;
        // Création du visa
        const newvisa = await visa.create({
            pays,
            drapeaux,
            categorie
        });
        return res.status(200).json("visa créé avec succès");
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de la création du visa.");
    }
});
router.get('/getAllvisas', async (req, res) => {
    try {
        // Pagination
        const size = parseInt(req.query.size) || 10;
        const page = parseInt(req.query.page) || 1;
        const offset = (page - 1) * size;

        // Recherche
        const searchQuery = req.query.search || '';

        // Construction de la requête de recherche
        const whereClause = {};

        if (searchQuery) {
            whereClause[Op.or] = [
                { pays: { [Op.like]: `%${searchQuery}%` } },
                { drapeaux: { [Op.like]: `%${searchQuery}%` } }
            ];
        }

        // Obtenir les travaux avec pagination, recherche et filtrage par statut
        const { count: totalvisas, rows: visas } = await visa.findAndCountAll({
            where: whereClause,
            limit: size,
            offset: offset,
            order: [['id', 'DESC']] // Tri par id descendant
        });

        res.status(200).json({
            totalvisas,
            totalPages: Math.ceil(totalvisas / size),
            currentPage: page,
            visas
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de la récupération des travaux.");
    }
});
router.get('/getOneById/:id', async (req, res) => {
    try {
        const visaId = req.params.id;

        // Recherche du visa par son ID
        const foundVisa = await visa.findByPk(visaId);

        // Vérification si le visa est trouvé
        if (!foundVisa) {
            return res.status(404).json({ error: "Visa introuvable" });
        }

        // Retourne le visa trouvé
        return res.status(200).json(foundVisa);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la récupération du visa par ID" });
    }
});
// Mettre à jour un visa par son ID
router.put('/updatevisa/:id', async (req, res) => {
    try {
        const visaId = req.params.id;
        const updatedData = req.body;

        // Recherche du visa par son identifiant
        const visaToUpdate = await visa.findByPk(visaId);

        if (!visaToUpdate) {
            return res.status(404).json({ message: "visa non trouvé" });
        }

        // Mise à jour du visa
        await visaToUpdate.update(updatedData);

        res.status(200).json("visa mis à jour avec succès");
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de la mise à jour du visa.");
    }
});

router.delete('/deletevisa/:id', async (req, res) => {
    try {
        const visaId = req.params.id;

        // Suppression des entrées de vpostule associées au visaId spécifié
        await vpostule.destroy({ where: { visaId } });

        // Suppression du visa lui-même
        await visa.destroy({ where: { id: visaId } });

        res.status(200).json({ message: "Visa et les entrées de vpostule associées ont été supprimés avec succès." });
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de la suppression du visa.");
    }
});

const postulationSchema = Joi.object({
    nom: Joi.string().required().messages({
        'any.required': 'Le nom est requis',
        'string.empty': 'Le nom ne doit pas être vide'
    }),
    prenom: Joi.string().required().messages({
        'any.required': 'Le prénom est requis',
        'string.empty': 'Le prénom ne doit pas être vide'
    }),
    tel: Joi.string().required().messages({
        'any.required': 'Le numéro de téléphone est requis',
        'string.empty': 'Le numéro de téléphone ne doit pas être vide'
    }),
    adresse: Joi.string().required().messages({
        'any.required': 'L\'adresse est requise',
        'string.empty': 'L\'adresse ne doit pas être vide'
    }),
    email: Joi.string().email().allow('').messages({
        'string.email': 'L\'email doit être valide'
    }),
    message: Joi.string().allow('').messages({
        'string.empty': 'Le message ne doit pas être vide'
    }),
    visaId: Joi.number().integer().required().messages({
        'any.required': 'L\'ID du visa est requis',
        'number.base': 'L\'ID du visa doit être un nombre',
        'number.integer': 'L\'ID du visa doit être un nombre entier'
    })
}).messages({
    'object.unknown': 'Le champ {{#label}} n\'est pas autorisé'
});

// Route pour postuler à une visa
router.post('/postulervisa', async (req, res) => {
    try {
        const { error } = postulationSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errorMessage = error.details.map(detail => detail.message).join(', ');
            return res.status(400).send(errorMessage);
        }

        const { nom, prenom, tel, adresse, email, message, visaId } = req.body;

        const nouvellePostulation = await vpostule.create({
            nom,
            prenom,
            tel,
            adresse,
            email,
            message,
            visaId,
            status: 1
        });

        res.status(201).json({ message: "Postulation créée avec succès", nouvellePostulation });
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de la création de la postulation.");
    }
});
// Route pour récupérer toutes les postulations
router.get('/getAllPostulations', async (req, res) => {
    try {
        const size = parseInt(req.query.size) || 10;
        const page = parseInt(req.query.page) || 1;
        const offset = (page - 1) * size;

        const searchQuery = req.query.search || '';
        const whereClause = {
            status: 1
        };
        if (searchQuery) {
            whereClause[Op.or] = [
                { nom: { [Op.like]: `%${searchQuery}%` } },
                { prenom: { [Op.like]: `%${searchQuery}%` } },
                { tel: { [Op.like]: `%${searchQuery}%` } },
                { adresse: { [Op.like]: `%${searchQuery}%` } },
                { email: { [Op.like]: `%${searchQuery}%` } },
                { message: { [Op.like]: `%${searchQuery}%` } }
            ];
        }

        const { count: totalPostulations, rows: postulations } = await vpostule.findAndCountAll({
            where: whereClause,
            limit: size,
            offset: offset,
            include: [{ model: visa, as: 'visa' }]
        });

        res.status(200).json({
            totalPostulations,
            totalPages: Math.ceil(totalPostulations / size),
            currentPage: page,
            postulations
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de la récupération des postulations.");
    }
});
router.get('/getAllPostulationarchive', async (req, res) => {
    try {
        const size = parseInt(req.query.size) || 10;
        const page = parseInt(req.query.page) || 1;
        const offset = (page - 1) * size;

        const searchQuery = req.query.search || '';
        const whereClause = {
            status: 2
        };
        if (searchQuery) {
            whereClause[Op.or] = [
                { nom: { [Op.like]: `%${searchQuery}%` } },
                { prenom: { [Op.like]: `%${searchQuery}%` } },
                { tel: { [Op.like]: `%${searchQuery}%` } },
                { adresse: { [Op.like]: `%${searchQuery}%` } },
                { email: { [Op.like]: `%${searchQuery}%` } },
                { message: { [Op.like]: `%${searchQuery}%` } }
            ];
        }

        const { count: totalPostulations, rows: postulations } = await vpostule.findAndCountAll({
            where: whereClause,
            limit: size,
            offset: offset,
            include: [{ model: visa, as: 'visa' }],
            order: [['id', 'DESC']] // Tri par id descendant
        });

        res.status(200).json({
            totalPostulations,
            totalPages: Math.ceil(totalPostulations / size),
            currentPage: page,
            postulations
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de la récupération des postulations.");
    }
});
router.get('/getPostulationWithRelations/:postuleId', async (req, res) => {
    try {
        const { postuleId } = req.params;

        // Recherche de la postulation avec son ID
        const postulation = await vpostule.findOne({
            where: { id: postuleId },
            include: [
                {
                    model: visa,
                    as: 'visa',
                }
            ]
        });

        if (!postulation) {
            return res.status(404).send("La postulation n'existe pas.");
        }

        res.status(200).json(postulation);
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de la récupération de la postulation avec ses relations.");
    }
});
// Route pour mettre à jour le statut d'une postulation par son ID
router.put('/updatePostulationStatus/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        const updatedStatus = req.body.status;

        const postulationToUpdate = await vpostule.findByPk(postId);

        if (!postulationToUpdate) {
            return res.status(404).json({ message: "Postulation non trouvée" });
        }

        await postulationToUpdate.update({ status: updatedStatus });

        res.status(200).json({ message: "Statut de la postulation mis à jour avec succès", postulation: postulationToUpdate });
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de la mise à jour du statut de la postulation.");
    }
});






module.exports = router;
