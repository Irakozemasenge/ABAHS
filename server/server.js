const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


const adminRouter = require('./routes/AdminCTL');
const bourseRouter = require('./routes/bourseCTL');
const etudeRouter = require('./routes/etudeCTL');
const travailRouter = require('./routes/travailCTL');
const eventRouter = require('./routes/evenementCTL');
const visaRouter = require('./routes/visaCTL');
const partenaireRouter = require('./routes/partenaireCTL');
const statRouter = require('./routes/statustiqueCTL');

// Définir le dossier des fichiers statiques
app.use('/uploads/Logo', express.static('./uploads/Logo'));
app.use('/uploads/evenements', express.static('./uploads/evenements'));
app.use('/uploads/Admin', express.static('./uploads/Admin'));
app.use('/uploads/partners', express.static('./uploads/partners'));
app.use('/uploads/Admin', express.static('./uploads/Admin'));
app.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send("<h1>Bonjour mon frère!<hr></h1>");
});
app.use("/admin", adminRouter);
app.use("/bourse", bourseRouter);
app.use("/etude", etudeRouter);
app.use("/travail", travailRouter);
app.use("/event", eventRouter);
app.use("/visa", visaRouter);
app.use("/partenaire", partenaireRouter);
app.use("/stat", statRouter);
const PORT = process.env.PORT || 8004;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
