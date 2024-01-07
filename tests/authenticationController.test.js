const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

// Importez le modèle et le contrôleur
const User = require('../models/userModel');
const authenticationController = require('../controllers/authenticationController');

// Avant chaque test, nettoyez la base de données et ajoutez des données de test si nécessaire
beforeEach(async () => {
  await User.deleteMany(); // Nettoyez la collection User
  // Ajoutez des données de test si nécessaire
  await User.create({ username: 'testuser', email: 'test@example.com', password: 'testpassword' });
});

// Testez la création d'un nouvel utilisateur (inscription)
test('Création d\'un nouvel utilisateur (inscription)', async () => {
  const response = await request(app)
    .post('/signup')
    .send({ username: 'newuser', email: 'newuser@example.com', password: 'newpassword' })
    .expect(201);

  const newUser = await User.findById(response.body._id);
  expect(newUser).not.toBeNull();
  expect(newUser.username).toBe('newuser');
  expect(newUser.email).toBe('newuser@example.com');
});

// Testez la connexion d'un utilisateur existant
test('Connexion d\'un utilisateur existant', async () => {
  await request(app)
    .post('/login')
    .send({ usernameOrEmail: 'testuser', password: 'testpassword' })
    .expect(200);
});

// Testez la tentative de connexion avec des informations incorrectes
test('Tentative de connexion avec des informations incorrectes', async () => {
  await request(app)
    .post('/login')
    .send({ usernameOrEmail: 'testuser', password: 'incorrectpassword' })
    .expect(401);
});
