const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticationMiddleware = require('../middleware/authenticationMiddleware');

// Routes nécessitant une authentification
router.use(authenticationMiddleware.verifyToken);
router.use(authenticationMiddleware.authenticateUser);

router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.updateUserById);
router.delete('/users/:id', userController.deleteUserById);

module.exports = router;
