const MongoDatabase = require('../config/Mongo.database');
const logger = require('../utils/Logger.util');

const initializeDatabase = async () => {
  try {
    await MongoDatabase.connect();
    logger.info('Base de données initialisée avec succès');
    return true;
  } catch (error) {
    logger.error(`Erreur lors de l'initialisation de la base de données: ${error.message}`);
    return false;
  }
};

module.exports = { initializeDatabase };