const express = require('express');
const router = express.Router();
const authenticationController = require('../controllers/authenticationController');

// Routes publiques pour l'authentification

// Route pour l'inscription (création d'un nouvel utilisateur)
router.post('/auth/signup', authenticationController.signup);

// Route pour la connexion
router.post("/auth/login", authenticationController.login);

module.exports = router;
