const express = require('express');
const router = express.Router();
const authenticationController = require('../controllers/authenticationController');

// Routes publiques pour l'authentification

// Route pour l'inscription (création d'un nouvel utilisateur)
router.post('/signup', authenticationController.signup);

// Route pour la connexion
router.post('/login', authenticationController.login);

module.exports = router;
