module.exports = {
  // Configuration de la base de données MongoDB
  database: {
    url: "mongodb+srv://xandermobutu:123FamiliGraph123@familigraph.tdqgwmm.mongodb.net/FamiliGraph?retryWrites=true&w=majority",
  },
  // Configuration du serveur
  port: process.env.PORT || 4500,
  // Configuration pour JSON Web Token (JWT)
  jwt: {
    secret:
      "cc07c397fc3feddde506d2484929f428458748f70276fcf52c00294263d6ad57d9d9b53c8bdddf247d8fae9793c4d35d45ab56a2d9d9e40b1adb8239e4605d4e",
    expiresIn: "1d",
  },
};
