const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const mongodb = require("./database/mongodb");

const familyRoutes = require("./routes/familyRoutes");

const app = express();
const config = require("./config");

dotenv.config();

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
  res.send("Bienvenue sur l'api FamiliGraph");
});
app.get("/api", (req, res) => {
  res.status(200).json({
    message: "Bienvenue sur l'api FamiliGraph",
  });
});

// Routes
app.use("/api", familyRoutes);

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Erreur serveur");
});

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(config.port, () =>
  console.log(`Example app listening on port ${config.port}!`.bgBlue.bold)
);
