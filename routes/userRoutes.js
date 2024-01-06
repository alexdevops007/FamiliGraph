const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticationMiddleware = require('../middleware/authenticationMiddleware');

// Routes pour la gestion des utilisateurs

// Route protégée nécessitant une authentification (exemple)
router.get('/protected', authenticationMiddleware.verifyToken, (req, res) => {
  res.status(200).json({ message: 'Ceci est une route protégée' });
});

// Routes publiques (aucune authentification requise)
router.post('/signup', userController.createUser);
router.post('/login', authenticationController.login);

// Routes nécessitant une authentification
router.use(authenticationMiddleware.authenticateUser);

router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.updateUserById);
router.delete('/users/:id', userController.deleteUserById);

module.exports = router;
