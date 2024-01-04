const mongoose = require('mongoose');
const config = require('../config/config');

const { url, options } = config.db;

// Connexion à la base de données MongoDB
mongoose.connect(url, options);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erreur de connexion à la base de données :'));
db.once('open', () => console.log('Connexion à la base de données réussie'));

module.exports = db;
