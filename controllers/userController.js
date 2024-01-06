const User = require('../models/userModel');

const userController = {
  // Créer un nouvel utilisateur
  createUser: async (req, res) => {
    try {
      const newUser = await User.create(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur' });
    }
  },

  // Obtenir tous les utilisateurs
  getUsers: async (req, res) => {
    try {
      const users = await User.find({}, '-password'); // Exclure le mot de passe des résultats
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs' });
    }
  },

  // Obtenir un utilisateur par ID
  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id, '-password');
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la récupération de l\'utilisateur' });
    }
  },

  // Mettre à jour un utilisateur par ID
  updateUserById: async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true, fields: '-password' }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'utilisateur' });
    }
  },

  // Supprimer un utilisateur par ID
  deleteUserById: async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
      res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur' });
    }
  },
};

module.exports = userController;
