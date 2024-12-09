const express = require('express');
const router = express.Router();
const { bourse, visa, bpostule, vpostule, tpostule, travail, partenaire, evenement, etude, spostule } = require('../models');

router.get('/dataResume', async (req, res) => {
    try {
        const nombresBourse = await bourse.count();
        const nombreVisa = await visa.count();
        const nombresBpostule = await bpostule.count();
        const nombresVpostule = await vpostule.count();
        const nombresTpostule = await tpostule.count();
        const nombresTravail = await travail.count();
        const nombresPartenaire = await partenaire.count();
        const nombresEvenement = await evenement.count();
        const nombresEtude = await etude.count();
        const nombresSpostule = await spostule.count();
        res.status(200).json({
            nombresBourse,
            nombreVisa,
            nombresBpostule,
            nombresVpostule,
            nombresTpostule,
            nombresTravail,
            nombresPartenaire,
            nombresEvenement,
            nombresEtude,
            nombresSpostule
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des données résumées :', error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des données résumées." });
    }
});

module.exports = router;
