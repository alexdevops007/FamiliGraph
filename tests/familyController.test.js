const request = require('supertest');
const app = require('../app'); // Assurez-vous d'ajuster le chemin en fonction de la structure de votre projet
const mongoose = require('mongoose');

// Importez le modèle et le contrôleur
const Family = require('../models/familyModel');
const familyController = require('../controllers/familyController');

// Avant chaque test, nettoyez la base de données et ajoutez des données de test si nécessaire
beforeEach(async () => {
  await Family.deleteMany(); // Nettoyez la collection Family
  // Ajoutez des données de test si nécessaire
  await Family.create({ firstName: 'John', lastName: 'Doe', gender: 'Male' });
});

// Testez la création d'un membre de la famille
test('Création d\'un membre de la famille', async () => {
  const response = await request(app)
    .post('/api/family')
    .send({ firstName: 'Jane', lastName: 'Doe', gender: 'Female' })
    .expect(201);

  const familyMember = await Family.findById(response.body._id);
  expect(familyMember).not.toBeNull();
  expect(familyMember.firstName).toBe('Jane');
  expect(familyMember.lastName).toBe('Doe');
  expect(familyMember.gender).toBe('Female');
});

// Testez la récupération de tous les membres de la famille
test('Récupération de tous les membres de la famille', async () => {
  const response = await request(app)
    .get('/api/family')
    .expect(200);

  expect(response.body.length).toBe(1); // Un membre déjà présent dans la base de données
});

// Testez la récupération d'un membre spécifique de la famille
test('Récupération d\'un membre spécifique de la famille', async () => {
  const existingMember = await Family.findOne();

  await request(app)
    .get(`/api/family/${existingMember._id}`)
    .expect(200);
});

// Testez la mise à jour d'un membre de la famille
test('Mise à jour d\'un membre de la famille', async () => {
  const existingMember = await Family.findOne();
  const updatedData = { firstName: 'UpdatedName', lastName: 'UpdatedLastName', gender: 'Female' };

  await request(app)
    .put(`/api/family/${existingMember._id}`)
    .send(updatedData)
    .expect(200);

  const updatedMember = await Family.findById(existingMember._id);
  expect(updatedMember).not.toBeNull();
  expect(updatedMember.firstName).toBe(updatedData.firstName);
  expect(updatedMember.lastName).toBe(updatedData.lastName);
  expect(updatedMember.gender).toBe(updatedData.gender);
});

// Testez la suppression d'un membre de la famille
test('Suppression d\'un membre de la famille', async () => {
  const existingMember = await Family.findOne();

  await request(app)
    .delete(`/api/family/${existingMember._id}`)
    .expect(200);

  const deletedMember = await Family.findById(existingMember._id);
  expect(deletedMember).toBeNull();
});

// Testez la tentative de récupération d'un membre inexistant
test('Récupération d\'un membre de la famille inexistant', async () => {
  const nonExistentMemberId = mongoose.Types.ObjectId();

  await request(app)
    .get(`/api/family/${nonExistentMemberId}`)
    .expect(404);
});
