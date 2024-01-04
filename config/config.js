module.exports = {
  // Configuration de la base de données MongoDB
  db: {
    url: 'mongodb://localhost:27017/familiGraphDB',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },

  // Configuration du serveur
  server: {
    port: process.env.PORT || 3000,
  },
};
