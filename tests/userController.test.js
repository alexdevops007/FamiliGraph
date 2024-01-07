const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

// Importez le modèle et le contrôleur
const User = require('../models/userModel');
const userController = require('../controllers/userController');

// Avant chaque test, nettoyez la base de données et ajoutez des données de test si nécessaire
beforeEach(async () => {
  await User.deleteMany(); // Nettoyez la collection User
  // Ajoutez des données de test si nécessaire
  await User.create({ username: 'testuser', email: 'test@example.com', password: 'testpassword' });
});

// Testez la création d'un nouvel utilisateur
test('Création d\'un nouvel utilisateur', async () => {
  const response = await request(app)
    .post('/signup')
    .send({ username: 'newuser', email: 'newuser@example.com', password: 'newpassword' })
    .expect(201);

  const newUser = await User.findById(response.body._id);
  expect(newUser).not.toBeNull();
  expect(newUser.username).toBe('newuser');
  expect(newUser.email).toBe('newuser@example.com');
});

// Testez la récupération de tous les utilisateurs
test('Récupération de tous les utilisateurs', async () => {
  const response = await request(app)
    .get('/users')
    .expect(200);

  expect(response.body.length).toBe(1); // Un utilisateur déjà présent dans la base de données
});

// Testez la récupération d'un utilisateur spécifique
test('Récupération d\'un utilisateur spécifique', async () => {
  const existingUser = await User.findOne();

  await request(app)
    .get(`/users/${existingUser._id}`)
    .expect(200);
});

// Testez la mise à jour d'un utilisateur
test('Mise à jour d\'un utilisateur', async () => {
  const existingUser = await User.findOne();
  const updatedData = { username: 'UpdatedUsername', email: 'updated@example.com' };

  await request(app)
    .put(`/users/${existingUser._id}`)
    .send(updatedData)
    .expect(200);

  const updatedUser = await User.findById(existingUser._id);
  expect(updatedUser).not.toBeNull();
  expect(updatedUser.username).toBe(updatedData.username);
  expect(updatedUser.email).toBe(updatedData.email);
});

// Testez la suppression d'un utilisateur
test('Suppression d\'un utilisateur', async () => {
  const existingUser = await User.findOne();

  await request(app)
    .delete(`/users/${existingUser._id}`)
    .expect(200);

  const deletedUser = await User.findById(existingUser._id);
  expect(deletedUser).toBeNull();
});

// Testez la tentative de récupération d'un utilisateur inexistant
test('Récupération d\'un utilisateur inexistant', async () => {
  const nonExistentUserId = mongoose.Types.ObjectId();

  await request(app)
    .get(`/users/${nonExistentUserId}`)
    .expect(404);
});
