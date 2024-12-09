const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { etude, savantage, spostule, seligibre } = require('../models');
const { Op } = require('sequelize');
// Schéma de validation avec Joi pour les données de la etude
const etudeSchema = Joi.object({
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
    seligibres: Joi.array().items(Joi.object({
        crit: Joi.string().required().messages({
            'any.required': 'Le critère est requis.',
            'string.empty': 'Le critère ne doit pas être vide.'
        })
    })),
    savantages: Joi.array().items(Joi.object({
        av: Joi.string().required().messages({
            'any.required': 'L\'avantage est requis.',
            'string.empty': 'L\'avantage ne doit pas être vide.'
        })
    }))
});
// Route pour créer une nouvelle etude avec ses avantages et critères
router.post('/createEtude', async (req, res) => {
    try {
        // Validation des données de la requête
        const { error } = etudeSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errorMessage = error.details.map(detail => detail.message).join(', ');
            return res.status(400).send(errorMessage);
        }

        // Extraction des données de la requête
        const { titre, pays, drapeux, domaine, niveau, fin, status, seligibres, savantages } = req.body;
        // Création de la etude
        const newetude = await etude.create({
            titre,
            pays,
            drapeux,
            domaine,
            niveau,
            fin,
            status
        });

        // Vérification si la etude a été créée avec succès
        if (!newetude) {
            return res.json("La création de la etude a échoué.");
        }

        // Insertion des avantages
        const Newsavantages = savantages.map(async (avantage) => {
            const newsavantage = await savantage.create({
                av: avantage.av,
                etudeId: newetude.id
            });
            return newsavantage;
        });

        // Insertion des critères
        const Newseligibres = seligibres.map(async (critere) => {
            const newseligibre = await seligibre.create({
                crit: critere.crit,
                etudeId: newetude.id
            });
            return newseligibre;
        });

        // Attente de l'insertion des avantages et des critères
        await Promise.all(Newsavantages);
        await Promise.all(Newseligibres);

        res.status(201).send("etude créée avec succès !");
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de la création de la etude.");
    }
});
router.get('/getAllEtudes', async (req, res) => {
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



        // Obtenir les etudes avec pagination, recherche, filtre par statut et date de fin ultérieure à aujourd'hui
        const { count: totaletudes, rows: etudes } = await etude.findAndCountAll({
            where: whereClause,
            limit: size,
            offset: offset,
            order: [['id', 'DESC']] // Tri par id descendant
        });

        res.status(200).json({
            totaletudes,
            totalPages: Math.ceil(totaletudes / size),
            currentPage: page,
            etudes
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de la récupération des etudes.");
    }
});
router.get('/getExpiredEtudes', async (req, res) => {
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
        const { count: totaletudes, rows: etudes } = await etude.findAndCountAll({
            where: whereClause,
            limit: size,
            offset: offset,
            order: [['id', 'DESC']] // Tri par id descendant
        });

        res.status(200).json({
            totaletudes,
            totalPages: Math.ceil(totaletudes / size),
            currentPage: page,
            etudes
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de la récupération des etudes expirées.");
    }
});
router.get('/getEtudeById/:id', async (req, res) => {
    try {
        const etudeId = req.params.id;

        // Recherche de la etude par son identifiant, en incluant ses relations avec les entités "savantage" et "seligibre"
        const Oneetude = await etude.findOne({
            where: { id: etudeId },
            include: [
                { model: savantage },
                { model: seligibre }
            ]
        });

        if (!Oneetude) {
            return res.status(404).json("etude non trouvée");
        }

        res.status(200).json(Oneetude);
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de la récupération de la etude.");
    }
});
router.put('/updateEtudeStatus/:id', async (req, res) => {
    try {
        const etudeId = req.params.id;
        const newStatus = req.body.status;

        // Recherche de la etude par son identifiant
        const Oneetude = await etude.findOne({ where: { id: etudeId } });

        if (!Oneetude) {
            return res.status(404).json({ message: "etude non trouvée" });
        }

        // Mise à jour du statut de la etude
        await etude.update({ status: newStatus }, { where: { id: etudeId } });

        res.status(200).json("Statut de la etude mis à jour avec succès");
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de la mise à jour du statut de la etude.");
    }
});
// Schéma de validation personnalisé en français
const updateetudeSchema = Joi.object({
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
router.put('/updateEtude/:id', async (req, res) => {
    try {
        const etudeId = req.params.id;
        const updates = req.body;

        // Validation des données de mise à jour
        const { error } = updateetudeSchema.validate(updates, { abortEarly: false });
        if (error) {
            const errorMessage = error.details.map(detail => detail.message).join(', ');
            return res.status(400).send(errorMessage);
        }

        // Recherche de la etude par son identifiant
        const findetude = await etude.findOne({ where: { id: etudeId } });

        if (!findetude) {
            return res.status(404).json({ message: "etude non trouvée" });
        }

        // Mise à jour des attributs de la etude
        await findetude.update(updates);

        res.status(200).json("etude mise à jour avec succès");
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de la mise à jour de la etude.");
    }
});
router.post('/Addcriteres/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const critereeligibres = req.body;

        // Vérifier si la etude existe
        const Oneetude = await etude.findByPk(id);
        if (!Oneetude) {
            return res.status(404).send("La etude n'existe pas.");
        }

        // Vérifier si les critères d'éligibilité sont au bon format
        if (!Array.isArray(critereeligibres)) {
            return res.status(400).send("Les critères d'éligibilité doivent être fournis sous forme de tableau.");
        }

        // Associer les critères d'éligibilité à la etude
        await Promise.all(critereeligibres.map(async (el) => {
            await seligibre.create({ crit: el.crit, etudeId: id });
        }));

        res.status(200).send("Les critères d'éligibilité ont été ajoutés avec succès à l' etude.");
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Erreur lors de la mise à jour de l' etude.");
    }
});
router.post('/addavantages/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const avantages = req.body;

        // Vérifier si la etude existe
        const oneetude = await etude.findByPk(id);
        if (!oneetude) {
            return res.status(404).send("La etude spécifiée n'existe pas.");
        }

        // Vérifier si les avantages sont au bon format
        if (!Array.isArray(avantages)) {
            return res.status(400).send("Les avantages doivent être fournis sous forme de tableau.");
        }

        // Associer les avantages à la etude
        await Promise.all(avantages.map(async (avantage) => {
            await savantage.create({ av: avantage.av, etudeId: id });
        }));

        res.status(200).send("Les avantages ont été ajoutés avec succès à l' etude.");
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Erreur lors de l'ajout des avantages à l' etude.");
    }
});
router.put('/updatesavantage/:id', async (req, res) => {
    try {
        const savantageId = req.params.id;
        const updatedData = req.body;
        // Recherche du savantage par son identifiant
        const Onesavantage = await savantage.findOne({ where: { id: savantageId } });
        if (!Onesavantage) {
            return res.status(404).json("B avantage non trouvé");
        }
        // Mise à jour du savantage
        await Onesavantage.update(updatedData);
        res.status(200).json("B avantage mis à jour avec succès");
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de la mise à jour du savantage.");
    }
});
router.put('/updateseligibre/:id', async (req, res) => {
    try {
        const OneseligibreId = req.params.id;
        const updatedData = req.body;
        // Recherche du savantage par son identifiant
        const Oneseligibre = await seligibre.findOne({ where: { id: OneseligibreId } });
        if (!Oneseligibre) {
            return res.status(404).json("B eligibre non trouvé");
        }
        // Mise à jour du seligibre
        await Oneseligibre.update(updatedData);
        res.status(200).json("B eligibre mis à jour avec succès");
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de la mise à jour du B eligibre.");
    }
});
router.delete('/deletesavantage/:id', async (req, res) => {
    try {
        const savantageId = req.params.id;

        // Recherche du savantage par son identifiant
        const Onesavantage = await savantage.findOne({ where: { id: savantageId } });

        if (!Onesavantage) {
            return res.status(404).json({ message: "savantage non trouvé" });
        }

        // Suppression du savantage
        await Onesavantage.destroy();

        res.status(200).json({ message: "savantage supprimé avec succès" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de la suppression du savantage.");
    }
});
router.delete('/deleteseligibre/:id', async (req, res) => {
    try {
        const seligibreId = req.params.id;

        // Recherche du seligibre par son identifiant
        const Oneseligibre = await seligibre.findOne({ where: { id: seligibreId } });

        if (!Oneseligibre) {
            return res.status(404).json({ message: "seligibre non trouvé" });
        }

        // Suppression du seligibre
        await Oneseligibre.destroy();

        res.status(200).json({ message: "seligibre supprimé avec succès" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de la suppression du seligibre.");
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
        const { count: totalPostulations, rows: postulations } = await spostule.findAndCountAll({
            where: whereClause,
            limit: size,
            offset: offset,
            include: [{ model: etude, as: 'etude' }]
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
    etudeId: Joi.number().integer().required().messages({
        'any.required': 'L\'ID de l\'étude est requis',
        'number.base': 'L\'ID de l\'étude doit être un nombre',
        'number.integer': 'L\'ID de l\'étude doit être un nombre entier'
    })
}).messages({
    'object.unknown': 'Le champ {{#label}} n\'est pas autorisé'
});
router.post('/createPostulation', async (req, res) => {
    try {
        const { error } = postulationSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errorMessage = error.details.map(detail => detail.message).join(', ');
            return res.status(400).send(errorMessage);
        }
        const { nom, prenom, tel, adresse, email, message, etudeId } = req.body;

        const nouvellePostulation = await spostule.create({
            nom,
            prenom,
            tel,
            adresse,
            email,
            message,
            etudeId,
            status: 1
        });

        res.status(201).json({ message: "Postulation créée avec succès", nouvellePostulation });
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de la création de la postulation.");
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
            status: 21
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
        const { count: totalPostulations, rows: postulations } = await spostule.findAndCountAll({
            where: whereClause,
            limit: size,
            offset: offset,
            include: [{ model: etude, as: 'etude' }],
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
        const postulation = await spostule.findOne({
            where: { id: postuleId },
            include: [
                {
                    model: etude, // Table etude
                    as: 'etude',  // Alias pour la relation
                    include: [
                        { model: seligibre, as: 'seligibres' },
                        { model: savantage, as: 'savantages' }
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
        const postulation = await spostule.findByPk(postId);

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
        const postulation = await spostule.findByPk(id);

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
