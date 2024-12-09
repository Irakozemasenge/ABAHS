const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { tpostule, travail, tavantage } = require('../models');
const { Op } = require('sequelize');

const travailSchema = Joi.object({
    pays: Joi.string().required().messages({
        'any.required': 'Le pays est requis',
        'string.empty': 'Le pays ne doit pas être vide'
    }),
    drapeux: Joi.string().required().messages({
        'any.required': 'Le drapeau est requis',
        'string.empty': 'Le drapeau ne doit pas être vide'
    }),
    tavantages: Joi.array().items(
        Joi.object({
            av: Joi.string().required().messages({
                'any.required': 'L\'avantage est requis',
                'string.empty': 'L\'avantage ne doit pas être vide'
            })
        })
    )
}).messages({
    'object.unknown': 'Le champ {{#label}} n\'est pas autorisé'
});
router.post('/createTravail', async (req, res) => {
    try {
        const { error } = travailSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errorMessage = error.details.map(detail => detail.message).join(', ');
            return res.status(400).send(errorMessage);
        }

        const { pays, drapeux, tavantages } = req.body;

        // Vérifier s'il existe déjà un travail avec le même drapeau
        let existingTravail = await travail.findOne({ where: { drapeux } });

        if (existingTravail) {
            // Récupérer l'ID du travail existant
            const existingTravailId = existingTravail.id;

            // Insérer les avantages associés au travail existant
            await Promise.all(tavantages.map(async (avantage) => {
                await tavantage.create({
                    av: avantage.av,
                    travailId: existingTravailId
                });
            }));

            return res.status(200).json("Avantages ajoutés au travail existant avec succès");
        }

        // Création du travail
        const newTravail = await travail.create({
            pays,
            drapeux,
            status: 1
        });

        // Création des avantages associés au nouveau travail
        await Promise.all(tavantages.map(async (avantage) => {
            await tavantage.create({
                av: avantage.av,
                travailId: newTravail.id
            });
        }));

        return res.status(200).json("Travail créé avec succès");
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de la création du travail.");
    }
});
router.get('/getAllTravails', async (req, res) => {
    try {
        // Pagination
        const size = parseInt(req.query.size) || 10;
        const page = parseInt(req.query.page) || 1;
        const offset = (page - 1) * size;

        // Recherche
        const searchQuery = req.query.search || '';

        // Construction de la requête de recherche
        const whereClause = {
            status: 1 // Ajouter la condition pour le statut égal à 1
        };

        if (searchQuery) {
            whereClause[Op.or] = [
                { pays: { [Op.like]: `%${searchQuery}%` } },
                { drapeux: { [Op.like]: `%${searchQuery}%` } }
            ];
        }

        // Obtenir les travaux avec pagination, recherche et filtrage par statut
        const { count: totalTravails, rows: travails } = await travail.findAndCountAll({
            where: whereClause,
            limit: size,
            offset: offset,
            order: [['id', 'DESC']] // Tri par id descendant
        });

        res.status(200).json({
            totalTravails,
            totalPages: Math.ceil(totalTravails / size),
            currentPage: page,
            travails
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de la récupération des travaux.");
    }
});
router.post('/addavantages/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const avantages = req.body;

        // Vérifier si la travail existe
        const onetravail = await travail.findByPk(id);
        if (!onetravail) {
            return res.status(404).send("La travail spécifiée n'existe pas.");
        }

        // Vérifier si les avantages sont au bon format
        if (!Array.isArray(avantages)) {
            return res.status(400).send("Les avantages doivent être fournis sous forme de tableau.");
        }

        // Associer les avantages à la travail
        await Promise.all(avantages.map(async (avantage) => {
            await tavantage.create({ av: avantage.av, travailId: id });
        }));

        res.status(200).send("Les avantages ont été ajoutés avec succès à l' travail.");
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Erreur lors de l'ajout des avantages à l' travail.");
    }
});



router.get('/getAllTravailArchives', async (req, res) => {
    try {
        // Pagination
        const size = parseInt(req.query.size) || 10;
        const page = parseInt(req.query.page) || 1;
        const offset = (page - 1) * size;

        // Recherche
        const searchQuery = req.query.search || '';

        // Construction de la requête de recherche
        const whereClause = {
            status: 2
        };

        if (searchQuery) {
            whereClause[Op.or] = [
                { pays: { [Op.like]: `%${searchQuery}%` } },
                { drapeux: { [Op.like]: `%${searchQuery}%` } }
            ];
        }

        // Obtenir les travaux avec pagination, recherche et filtrage par statut
        const { count: totalTravails, rows: travails } = await travail.findAndCountAll({
            where: whereClause,
            limit: size,
            offset: offset,
            order: [['id', 'DESC']] // Tri par id descendant
        });

        res.status(200).json({
            totalTravails,
            totalPages: Math.ceil(totalTravails / size),
            currentPage: page,
            travails
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de la récupération des travaux.");
    }
});
router.get('/getTravailWithTavantage/:id', async (req, res) => {
    try {
        const travailId = req.params.id;

        // Recherche du travail par son identifiant avec la jointure de tavantage
        const travailWithTavantage = await travail.findOne({
            where: { id: travailId },
            include: [{ model: tavantage }]
        });

        if (!travailWithTavantage) {
            return res.status(404).json({ message: "Travail non trouvé" });
        }

        res.status(200).json(travailWithTavantage);
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de la récupération du travail avec tavantage.");
    }
});
// Mettre à jour un travail par son ID
router.put('/updateTravail/:id', async (req, res) => {
    try {
        const travailId = req.params.id;
        const updatedData = req.body;

        // Recherche du travail par son identifiant
        const travailToUpdate = await travail.findByPk(travailId);

        if (!travailToUpdate) {
            return res.status(404).json({ message: "Travail non trouvé" });
        }

        // Mise à jour du travail
        await travailToUpdate.update(updatedData);

        res.status(200).json("Travail mis à jour avec succès");
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de la mise à jour du travail.");
    }
});
// Mettre à jour un tavantage par son ID
router.put('/updateTavantage/:id', async (req, res) => {
    try {
        const tavantageId = req.params.id;
        const updatedData = req.body;

        // Recherche du tavantage par son identifiant
        const tavantageToUpdate = await tavantage.findByPk(tavantageId);

        if (!tavantageToUpdate) {
            return res.status(404).json({ message: "Tavantage non trouvé" });
        }

        // Mise à jour du tavantage
        await tavantageToUpdate.update(updatedData);

        res.status(200).json({ message: "Tavantage mis à jour avec succès", tavantage: tavantageToUpdate });
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de la mise à jour du tavantage.");
    }
});
router.delete('/deleteTavantage/:id', async (req, res) => {
    try {
        const tavantageId = req.params.id;

        // Recherche du tavantage par son identifiant
        const tavantageToDelete = await tavantage.findByPk(tavantageId);

        if (!tavantageToDelete) {
            return res.status(404).json({ message: "Tavantage non trouvé" });
        }

        // Suppression du tavantage
        await tavantageToDelete.destroy();

        res.status(200).json({ message: "Tavantage supprimé avec succès" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de la suppression du tavantage.");
    }
});
router.put('/updateTravailStatus/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        const updatedStatus = req.body.status;

        const travailToUpdate = await travail.findByPk(postId);

        if (!travailToUpdate) {
            return res.status(404).json("travail non trouvée");
        }

        await travailToUpdate.update({ status: updatedStatus });

        res.status(200).json("Statut de la travail mis à jour avec succès");
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de la mise à jour du statut de la travail.");
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
    travailId: Joi.number().integer().required().messages({
        'any.required': 'L\'ID du travail est requis',
        'number.base': 'L\'ID du travail doit être un nombre',
        'number.integer': 'L\'ID du travail doit être un nombre entier'
    })
}).messages({
    'object.unknown': 'Le champ {{#label}} n\'est pas autorisé'
});

// Route pour postuler à une travail
router.post('/postulertravail', async (req, res) => {
    try {
        const { error } = postulationSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errorMessage = error.details.map(detail => detail.message).join(', ');
            return res.status(400).send(errorMessage);
        }

        const { nom, prenom, tel, adresse, email, message, travailId } = req.body;

        const nouvellePostulation = await tpostule.create({
            nom,
            prenom,
            tel,
            adresse,
            email,
            message,
            travailId,
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

        const { count: totalPostulations, rows: postulations } = await tpostule.findAndCountAll({
            where: whereClause,
            limit: size,
            offset: offset,
            include: [{ model: travail, as: 'travail' }]
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
router.get('/getAllPostulationValid', async (req, res) => {
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

        const { count: totalPostulations, rows: postulations } = await tpostule.findAndCountAll({
            where: whereClause,
            limit: size,
            offset: offset,
            include: [{ model: travail, as: 'travail' }],
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
        const postulation = await tpostule.findOne({
            where: { id: postuleId },
            include: [
                {
                    model: travail,
                    as: 'travail',
                    include: [
                        { model: tavantage, as: 'tavantages' }
                    ]
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

        const postulationToUpdate = await tpostule.findByPk(postId);

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
