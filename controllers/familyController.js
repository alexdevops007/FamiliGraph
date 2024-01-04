const Family = require('../models/familyModel');

const familyController = {
  // Obtenir tous les membres de la famille
  getFamilyMembers: async (req, res) => {
    try {
      const familyMembers = await Family.find();
      res.status(200).json(familyMembers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la récupération des membres de la famille' });
    }
  },
  
  // Créer un membre de la famille
  createFamilyMember: async (req, res) => {
    try {
      const newFamilyMember = await Family.create(req.body);
      res.status(201).json(newFamilyMember);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la création du membre de la famille' });
    }
  },

  // Obtenir un membre de la famille par ID
  getFamilyMember: async (req, res) => {
    try {
      const familyMember = await Family.findById(req.params.id);
      res.status(200).json(familyMember);
    } catch (error) {
      console.error(error);
      res.status(404).json({ message: 'Membre de la famille non trouvé' });
    }
  },

  // Mettre à jour un membre de la famille par ID
  updateFamilyMember: async (req, res) => {
    try {
      const updatedFamilyMember = await Family.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json(updatedFamilyMember);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la mise à jour du membre de la famille' });
    }
  },

  // Supprimer un membre de la famille par ID
  deleteFamilyMember: async (req, res) => {
    try {
      await Family.findByIdAndDelete(req.params.id);
      res.status(204).end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la suppression du membre de la famille' });
    }
  },
};

module.exports = familyController;
