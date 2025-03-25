
const mongoDB = require('./Mongo.database');
const logger = require('../utils/Logger.util');

const initDatabase = async () => {
  try {
    await mongoDB.connect();
    logger.info('Base de données initialisée avec succès');
    
    
    return mongoDB.mongoose.connection;
  } catch (error) {
    logger.error(`Échec d'initialisation de la base de données: ${error.message}`);
    throw error;
  }
};

const closeDatabase = async () => {
  try {
    await mongoDB.disconnect();
    logger.info('Connexion à la base de données fermée');
  } catch (error) {
    logger.error(`Échec de fermeture de la base de données: ${error.message}`);
    throw error;
  }
};

module.exports = {
  initDatabase,
  closeDatabase,
  getConnection: () => mongoDB.mongoose.connection
};