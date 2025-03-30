const express = require("express");

const config = require("./config/init").initialize();
const appConfig = config.app;
const dotenv = require("dotenv");
const { initializeRoutes } = require("./routes/router");
const { setupMiddleware } = require("./middleware/App.middleware");
const logger = require("./utils/Logger.util");
const MongoDatabase = require("./config/Mongo.database");

const app = express();

setupMiddleware(app);

const connectDB = async () => {
  try {
    await MongoDatabase.connect();
  } catch (error) {
    logger.error(`Erreur de connexion MongoDB: ${error.message}`);
    process.exit(1);
  }
};

initializeRoutes(app, config);

const PORT = appConfig.server.port;
const server = app.listen(PORT, async () => {
  await connectDB();
  logger.info(
    `Serveur démarré en mode ${config.environment} sur le port ${PORT}`
  );
});

process.on("SIGTERM", () => {
  logger.info("Signal SIGTERM reçu. Arrêt gracieux du serveur.");
  server.close(() => {
    logger.info("Serveur arrêté.");
    MongoDatabase.disconnect().then(() => {
      process.exit(0);
    });
  });
});

process.on("SIGINT", () => {
  logger.info("Signal SIGINT reçu. Arrêt gracieux du serveur.");
  server.close(() => {
    logger.info("Serveur arrêté.");
    MongoDatabase.disconnect().then(() => {
      process.exit(0);
    });
  });
});

module.exports = { app, server };
