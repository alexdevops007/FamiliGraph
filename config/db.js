const mongoose = require("mongoose");
const colors = require("colors");
const config = require("../config");

mongoose
  .connect(config.database.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`Connecté à la base de données MongoDB`.bgGreen.bold))
  .catch((error) => console.error("Error connecting to MongoDB: ", error));
