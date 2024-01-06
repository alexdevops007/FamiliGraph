const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authenticationMiddleware = {
  // Middleware pour vérifier le jeton JWT
  verifyToken: (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
      return res.status(401).json({ message: 'Accès non autorisé, jeton manquant' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Ajoutez les informations de l'utilisateur à la requête
      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Accès non autorisé, jeton invalide' });
    }
  },

  // Middleware pour authentifier l'utilisateur à partir du jeton
  authenticateUser: async (req, res, next) => {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ message: 'Accès non autorisé, utilisateur non authentifié' });
    }

    try {
      const user = await User.findById(req.user.userId);
      if (!user) {
        return res.status(401).json({ message: 'Accès non autorisé, utilisateur non trouvé' });
      }

      req.authenticatedUser = user; // Ajoutez les informations de l'utilisateur authentifié à la requête
      next();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erreur lors de l\'authentification de l\'utilisateur' });
    }
  },
};

module.exports = authenticationMiddleware;
