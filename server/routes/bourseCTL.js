const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { bourse, bavantage, bpostule, beligibre } = require('../models');
const { Op } = require('sequelize');
// Schéma de validation avec Joi pour les données de la bourse
const bourseSchema = Joi.object({
    titre: Joi.string().required().messages({
        'any.required': 'Le titre est requis.',
        'string.empty': 'Le titre ne doit pas être vide.'
    }),
    pays: Joi.string().required().messages({
        'any.required': 'Le pays est requis.',
        'string.empty': 'Le pays ne doit pas être vide.'
    }),
    drapeux: Joi.string().required().messages({
        'any.required': 'Le drapeau est requis.',
        'string.empty': 'Le drapeau ne doit pas être vide.'
    }),
    domaine: Joi.string().required().messages({
        'any.required': 'Le domaine est requis.',
        'string.empty': 'Le domaine ne doit pas être vide.'
    }),
    niveau: Joi.string().required().messages({
        'any.required': 'Le niveau est requis.',
        'string.empty': 'Le niveau ne doit pas être vide.'
    }),
    fin: Joi.date().required().messages({
        'any.required': 'La date de fin est requise',
        'date.base': 'La date de fin doit être une date valide'
    }),
    beligibres: Joi.array().items(Joi.object({
        crit: Joi.string().required().messages({
            'any.required': 'Le critère est requis.',
            'string.empty': 'Le critère ne doit pas être vide.'
        })
    })),
    bavantages: Joi.array().items(Joi.object({
        av: Joi.string().required().messages({
            'any.required': 'L\'avantage est requis.',
            'string.empty': 'L\'avantage ne doit pas être vide.'
        })
    }))
});
// Route pour créer une nouvelle bourse avec ses avantages et critères
router.post('/createBourse', async (req, res) => {
    try {
        // Validation des données de la requête
        const { error } = bourseSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errorMessage = error.details.map(detail => detail.message).join(', ');
            return res.status(400).send(errorMessage);
        }

        // Extraction des données de la requête
        const { titre, pays, drapeux, domaine, niveau, fin, beligibres, bavantages } = req.body;
        // Création de la bourse
        console.log("domaine--------------------", domaine)
        const newBourse = await bourse.create({
            titre,
            pays,
            drapeux,
            domaine,
            niveau,
            fin,
            status: 1
        });

        // Vérification si la bourse a été créée avec succès
        if (!newBourse) {
            return res.json("La création de la bourse a échoué.");
        }

        // Insertion des avantages
        const Newbavantages = bavantages.map(async (avantage) => {
            const newBavantage = await bavantage.create({
                av: avantage.av,
                bourseId: newBourse.id
            });
            return newBavantage;
        });

        // Insertion des critères
        const Newbeligibres = beligibres.map(async (critere) => {
            const newBeligibre = await beligibre.create({
                crit: critere.crit,
                bourseId: newBourse.id
            });
            return newBeligibre;
        });

        // Attente de l'insertion des avantages et des critères
        await Promise.all(Newbavantages);
        await Promise.all(Newbeligibres);

        res.status(201).send("Bourse créée avec succès !");
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de la création de la bourse.");
    }
});
router.get('/getAllBourses', async (req, res) => {
    try {
        // Pagination
        const size = parseInt(req.query.size) || 10;
        const page = parseInt(req.query.page) || 1;
        const offset = (page - 1) * size;
        // Recherche
        const searchQuery = req.query.search || '';

        // Date d'aujourd'hui
        const currentDate = new Date();
        // Construction de la requête de recherche
        const whereClause = {
            [Op.and]: []
        };

        // Condition pour la recherche sur les champs spécifiques
        if (searchQuery) {
            whereClause[Op.and].push({
                [Op.or]: [
                    { titre: { [Op.like]: `%${searchQuery}%` } },
                    { pays: { [Op.like]: `%${searchQuery}%` } },
                    { domaine: { [Op.like]: `%${searchQuery}%` } },
                    { niveau: { [Op.like]: `%${searchQuery}%` } }
                ]
            });
        }

        // Condition pour la date de fin postérieure à aujourd'hui
        whereClause[Op.and].push({
            fin: {
                [Op.gt]: currentDate
            }
        });



        // Obtenir les bourses avec pagination, recherche, filtre par statut et date de fin ultérieure à aujourd'hui
        const { count: totalBourses, rows: bourses } = await bourse.findAndCountAll({
            where: whereClause,
            limit: size,
            offset: offset,
            order: [['id', 'DESC']] // Tri par id descendant
        });

        res.status(200).json({
            totalBourses,
            totalPages: Math.ceil(totalBourses / size),
            currentPage: page,
            bourses
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de la récupération des bourses.");
    }
});
router.get('/getExpiredBourses', async (req, res) => {
    try {
        // Pagination
        const size = parseInt(req.query.size) || 10;
        const page = parseInt(req.query.page) || 1;
        const offset = (page - 1) * size;
        const searchQuery = req.query.search || '';

        // Date d'aujourd'hui
        const currentDate = new Date();

        // Construction de la requête de recherche
        const whereClause = {
            [Op.and]: []
        };

        // Condition pour la recherche sur les champs spécifiques
        if (searchQuery) {
            whereClause[Op.and].push({
                [Op.or]: [
                    { titre: { [Op.like]: `%${searchQuery}%` } },
                    { pays: { [Op.like]: `%${searchQuery}%` } },
                    { domaine: { [Op.like]: `%${searchQuery}%` } },
                    { niveau: { [Op.like]: `%${searchQuery}%` } }
                ]
            });
        }

        // Condition pour la date de fin postérieure à aujourd'hui
        whereClause[Op.and].push({
            fin: {
                [Op.lt]: currentDate
            }
        });
        // Recherche des etudes expirées
        const { count: totalBourses, rows: bourses } = await bourse.findAndCountAll({
            where: whereClause,
            limit: size,
            offset: offset,
            order: [['id', 'DESC']] // Tri par id descendant
        });

        res.status(200).json({
            totalBourses,
            totalPages: Math.ceil(totalBourses / size),
            currentPage: page,
            bourses
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de la récupération des etudes expirées.");
    }
});
router.get('/getBourseById/:id', async (req, res) => {
    try {
        const bourseId = req.params.id;

        // Recherche de la bourse par son identifiant, en incluant ses relations avec les entités "bavantage" et "beligibre"
        const Onebourse = await bourse.findOne({
            where: { id: bourseId },
            include: [
                { model: bavantage },
                { model: beligibre }
            ]
        });

        if (!Onebourse) {
            return res.status(404).json("Bourse non trouvée");
        }

        res.status(200).json(Onebourse);
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de la récupération de la bourse.");
    }
});
router.put('/updateBourseStatus/:id', async (req, res) => {
    try {
        const bourseId = req.params.id;
        const newStatus = req.body.status;

        // Recherche de la bourse par son identifiant
        const Onebourse = await bourse.findOne({ where: { id: bourseId } });

        if (!Onebourse) {
            return res.status(404).json({ message: "Bourse non trouvée" });
        }

        // Mise à jour du statut de la bourse
        await bourse.update({ status: newStatus }, { where: { id: bourseId } });

        res.status(200).json("Statut de la bourse mis à jour avec succès");
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de la mise à jour du statut de la bourse.");
    }
});
// Schéma de validation personnalisé en français
const updatebourseSchema = Joi.object({
    titre: Joi.string().required().messages({
        'any.required': 'Le titre est requis',
        'string.empty': 'Le titre ne doit pas être vide'
    }),
    pays: Joi.string().required().messages({
        'any.required': 'Le pays est requis',
        'string.empty': 'Le pays ne doit pas être vide'
    }),
    drapeux: Joi.string().required().messages({
        'any.required': 'Le drapeau est requis',
        'string.empty': 'Le drapeau ne doit pas être vide'
    }),
    domaine: Joi.string().required().messages({
        'any.required': 'Le domaine est requis',
        'string.empty': 'Le domaine ne doit pas être vide'
    }),
    niveau: Joi.string().required().messages({
        'any.required': 'Le niveau est requis',
        'string.empty': 'Le niveau ne doit pas être vide'
    }),
    fin: Joi.date().required().messages({
        'any.required': 'La date de fin est requise',
        'date.base': 'La date de fin doit être une date valide'
    })
}).messages({
    'object.unknown': 'Le champ {{#label}} n\'est pas autorisé'
});
router.put('/updateBourse/:id', async (req, res) => {
    try {
        const bourseId = req.params.id;
        const updates = req.body;

        // Validation des données de mise à jour
        const { error } = updatebourseSchema.validate(updates, { abortEarly: false });
        if (error) {
            const errorMessage = error.details.map(detail => detail.message).join(', ');
            return res.status(400).send(errorMessage);
        }

        // Recherche de la bourse par son identifiant
        const findbourse = await bourse.findOne({ where: { id: bourseId } });

        if (!findbourse) {
            return res.status(404).json({ message: "Bourse non trouvée" });
        }

        // Mise à jour des attributs de la bourse
        await findbourse.update(updates);

        res.status(200).json("Bourse mise à jour avec succès");
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de la mise à jour de la bourse.");
    }
});
router.post('/Addcriteres/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const critereeligibres = req.body;

        // Vérifier si la bourse existe
        const Onebourse = await bourse.findByPk(id);
        if (!Onebourse) {
            return res.status(404).send("La bourse n'existe pas.");
        }

        // Vérifier si les critères d'éligibilité sont au bon format
        if (!Array.isArray(critereeligibres)) {
            return res.status(400).send("Les critères d'éligibilité doivent être fournis sous forme de tableau.");
        }

        // Associer les critères d'éligibilité à la bourse
        await Promise.all(critereeligibres.map(async (el) => {
            await beligibre.create({ crit: el.crit, bourseId: id });
        }));

        res.status(200).send("Les critères d'éligibilité ont été ajoutés avec succès à la bourse.");
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Erreur lors de la mise à jour de la bourse.");
    }
});
router.post('/addavantages/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const avantages = req.body;

        // Vérifier si la bourse existe
        const oneBourse = await bourse.findByPk(id);
        if (!oneBourse) {
            return res.status(404).send("La bourse spécifiée n'existe pas.");
        }

        // Vérifier si les avantages sont au bon format
        if (!Array.isArray(avantages)) {
            return res.status(400).send("Les avantages doivent être fournis sous forme de tableau.");
        }

        // Associer les avantages à la bourse
        await Promise.all(avantages.map(async (avantage) => {
            await bavantage.create({ av: avantage.av, bourseId: id });
        }));

        res.status(200).send("Les avantages ont été ajoutés avec succès à la bourse.");
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Erreur lors de l'ajout des avantages à la bourse.");
    }
});
router.put('/updateBavantage/:id', async (req, res) => {
    try {
        const bavantageId = req.params.id;
        const updatedData = req.body;
        // Recherche du bavantage par son identifiant
        const Onebavantage = await bavantage.findOne({ where: { id: bavantageId } });
        if (!Onebavantage) {
            return res.status(404).json("B avantage non trouvé");
        }
        // Mise à jour du bavantage
        await Onebavantage.update(updatedData);
        res.status(200).json("B avantage mis à jour avec succès");
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de la mise à jour du bavantage.");
    }
});
router.put('/updateBeligibre/:id', async (req, res) => {
    try {
        const OnebeligibreId = req.params.id;
        const updatedData = req.body;
        // Recherche du bavantage par son identifiant
        const Onebeligibre = await beligibre.findOne({ where: { id: OnebeligibreId } });
        if (!Onebeligibre) {
            return res.status(404).json("B eligibre non trouvé");
        }
        // Mise à jour du Beligibre
        await Onebeligibre.update(updatedData);
        res.status(200).json("B eligibre mis à jour avec succès");
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de la mise à jour du B eligibre.");
    }
});
router.delete('/deleteBavantage/:id', async (req, res) => {
    try {
        const bavantageId = req.params.id;

        // Recherche du bavantage par son identifiant
        const Onebavantage = await bavantage.findOne({ where: { id: bavantageId } });

        if (!Onebavantage) {
            return res.status(404).json({ message: "Bavantage non trouvé" });
        }

        // Suppression du bavantage
        await Onebavantage.destroy();

        res.status(200).json({ message: "Bavantage supprimé avec succès" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de la suppression du bavantage.");
    }
});
router.delete('/deleteBeligibre/:id', async (req, res) => {
    try {
        const beligibreId = req.params.id;

        // Recherche du beligibre par son identifiant
        const Onebeligibre = await beligibre.findOne({ where: { id: beligibreId } });

        if (!Onebeligibre) {
            return res.status(404).json({ message: "Beligibre non trouvé" });
        }

        // Suppression du beligibre
        await Onebeligibre.destroy();

        res.status(200).json({ message: "Beligibre supprimé avec succès" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de la suppression du beligibre.");
    }
});

// Schéma de validation personnalisé en français pour la postulation
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
    bourseId: Joi.number().integer().required().messages({
        'any.required': 'L\'ID de la bourse est requis',
        'number.base': 'L\'ID de la bourse doit être un nombre',
        'number.integer': 'L\'ID de la bourse doit être un nombre entier'
    })
}).messages({
    'object.unknown': 'Le champ {{#label}} n\'est pas autorisé'
});
router.post('/postulerBourse', async (req, res) => {
    try {
        // Validation des données de la requête
        const { error } = postulationSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errorMessage = error.details.map(detail => detail.message).join(', ');
            return res.status(400).send(errorMessage);
        }

        // Récupération des données de la requête
        const { nom, prenom, tel, adresse, email, message, bourseId } = req.body;

        // Création de la postulation
        const nouvellePostulation = await bpostule.create({
            nom,
            prenom,
            tel,
            adresse,
            email,
            message,
            bourseId,
            status: 1
        });

        res.status(201).json("Postulation à la bourse créée avec succès");
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de la création de la postulation à la bourse.");
    }
});
router.get('/getAllPostulations', async (req, res) => {
    try {
        // Pagination
        const size = parseInt(req.query.size) || 10;
        const page = parseInt(req.query.page) || 1;
        const offset = (page - 1) * size;

        // Recherche
        const searchQuery = req.query.search || '';

        // Construction de la requête de recherche
        const whereClause = {
            status: 1 // Filtrer les postulations avec un statut de 1
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

        // Obtenir les postulations avec pagination et recherche
        const { count: totalPostulations, rows: postulations } = await bpostule.findAndCountAll({
            where: whereClause,
            limit: size,
            offset: offset,
            include: [{ model: bourse, as: 'bourse' }] // Inclure la relation avec la table bourse
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
        // Pagination
        const size = parseInt(req.query.size) || 10;
        const page = parseInt(req.query.page) || 1;
        const offset = (page - 1) * size;

        // Recherche
        const searchQuery = req.query.search || '';

        // Construction de la requête de recherche
        const whereClause = {
            status: 21 // Filtrer les postulations avec un statut de 1
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

        // Obtenir les postulations avec pagination et recherche
        const { count: totalPostulations, rows: postulations } = await bpostule.findAndCountAll({
            where: whereClause,
            limit: size,
            offset: offset,
            include: [{ model: bourse, as: 'bourse' }],
            order: [['id', 'DESC']]
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
        const postulation = await bpostule.findOne({
            where: { id: postuleId },
            include: [
                {
                    model: bourse, // Table bourse
                    as: 'bourse',  // Alias pour la relation
                    include: [
                        { model: beligibre, as: 'beligibres' },
                        { model: bavantage, as: 'bavantages' }
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
router.put('/updatePostulationStatus/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        const { status } = req.body;

        // Recherche de la postulation par son identifiant
        const postulation = await bpostule.findByPk(postId);

        if (!postulation) {
            return res.status(404).json({ message: "Postulation non trouvée" });
        }

        // Mise à jour du statut de la postulation
        postulation.status = status;
        await postulation.save();

        res.status(200).json({ message: "Statut de la postulation mis à jour avec succès", postulation });
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de la mise à jour du statut de la postulation.");
    }
});
router.delete('/deletePostulation/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Recherche de la postulation par son identifiant
        const postulation = await bpostule.findByPk(id);

        if (!postulation) {
            return res.status(404).json({ message: "Postulation non trouvée" });
        }

        // Suppression de la postulation
        await postulation.destroy();

        res.status(200).json({ message: "Postulation supprimée avec succès" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de la suppression de la postulation.");
    }
});


module.exports = router;
