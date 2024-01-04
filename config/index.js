module.exports = {
  // Configuration de la base de données MongoDB
  database: {
    url: "mongodb+srv://xandermobutu:123FamiliGraph123@familigraph.g1qk1bk.mongodb.net/FamiliGraph?retryWrites=true&w=majority",
  },
  // Configuration du serveur
  port: process.env.PORT || 4500,
  // Configuration pour JSON Web Token (JWT)
  jwt: {
    secret: "votreCleSecreteSuperSecrete",
    expiresIn: "1d",
  },
};
