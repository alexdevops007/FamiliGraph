const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authenticationController = {
  // Inscription d'un nouvel utilisateur
  signup: async (req, res) => {
    try {
      // Vérifier si l'utilisateur existe déjà
      const existingUser = await User.findOne({ $or: [{ username: req.body.username }, { email: req.body.email }] });
      if (existingUser) {
        return res.status(400).json({ message: 'Nom d\'utilisateur ou adresse e-mail déjà utilisé' });
      }

      // Hasher le mot de passe
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      // Créer un nouvel utilisateur
      const newUser = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        role: req.body.role || 'user', // Par défaut, définir le rôle sur 'user'
      });

      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de l\'inscription de l\'utilisateur' });
    }
  },

  // Connexion de l'utilisateur
  login: async (req, res) => {
    try {
      // Rechercher l'utilisateur par nom d'utilisateur ou adresse e-mail
      const user = await User.findOne({ $or: [{ username: req.body.usernameOrEmail }, { email: req.body.usernameOrEmail }] });
      if (!user) {
        return res.status(401).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect' });
      }

      // Vérifier le mot de passe
      const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect' });
      }

      // Générer le jeton JWT
      const token = jwt.sign(
        { userId: user._id, username: user.username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' } // Durée de validité du jeton (1 heure dans cet exemple)
      );

      res.status(200).json({ token, userId: user._id, username: user.username, role: user.role });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la connexion de l\'utilisateur' });
    }
  },
};

module.exports = authenticationController;
