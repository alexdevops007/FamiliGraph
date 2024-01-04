const mongoose = require("mongoose");
const colors = require("colors");
const config = require("../config");

mongoose
  .connect(config.database.url)
  .then(() => console.log(`Connecté à la base de données`.bgGreen.bold))
  .catch((error) => console.error("Error connecting to MongoDB: ", error));
