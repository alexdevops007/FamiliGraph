module.exports = {
  // Configuration de la base de données MongoDB
  db: {
    url: 'mongodb+srv://xandermobutu:123FamiliGraph123@familigraph.hqg9dj0.mongodb.net/FamiliGraph?retryWrites=true&w=majority',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },

  // Configuration du serveur
  server: {
    port: process.env.PORT || 4500,
  },
};
