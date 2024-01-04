const express = require('express');
const router = express.Router();
const familyController = require('../controllers/familyController');

// Routes pour le CRUD des membres de la famille
router.post("/family", familyController.createFamilyMember);
router.get("/family", familyController.getFamilyMembers);
router.get("/family/:id", familyController.getFamilyMember);
router.put("/family/:id", familyController.updateFamilyMember);
router.delete("/family/:id", familyController.deleteFamilyMember);

module.exports = router;
