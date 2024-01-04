const express = require('express');
const router = express.Router();
const familyController = require('../controllers/familyController');

// Routes pour le CRUD des membres de la famille
router.post('/', familyController.createFamilyMember);
router.get('/', familyController.getFamilyMembers);
router.get('/:id', familyController.getFamilyMember);
router.put('/:id', familyController.updateFamilyMember);
router.delete('/:id', familyController.deleteFamilyMember);

module.exports = router;
