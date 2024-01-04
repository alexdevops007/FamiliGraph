const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const cors = require("cors");
const config = require('./config/config');
const db = require('./database/connection');
const familyRoutes = require('./routes/familyRoutes');

const { port } = config.server;
const helmet = require("helmet");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

// Routes
app.get("/", (req, res) => {
  res.send("Bienvenue sur l'api ProFedeMap");
});
app.get("/api", (req, res) => {
  res.status(200).json({
    message: "Bienvenue sur l'api ProFedeMap",
  });
});

// Routes
app.use('/family', familyRoutes);

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Erreur serveur");
});

// Lancement du serveur
app.listen(port, () =>
  console.log(`Le serveur s'exécute sur le port ${config.port}`.bgBlue.bold)
);
