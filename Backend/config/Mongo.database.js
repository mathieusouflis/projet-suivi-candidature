const mongoose = require('mongoose');
const logger = require('../utils/Logger.util');
const config = require('./init').initialize();

class MongoDatabase {
  static async connect() {
    try {
      const mongoUri = process.env.MONGODB_URI;
      
      if (!mongoUri) {
        throw new Error('MONGODB_URI is not defined in environment variables');
      }
      
      const conn = await mongoose.connect(mongoUri);
      
      logger.info(`MongoDB connecté: ${conn.connection.host}`);
      return conn;
    } catch (error) {
      logger.error(`Erreur de connexion MongoDB: ${error.message}`);
      throw error;
    }
  }

  static async disconnect() {
    try {      
      await mongoose.disconnect();
      logger.info('Déconnecté de MongoDB');
    } catch (error) {
      logger.error(`Erreur lors de la déconnexion de MongoDB: ${error.message}`);
      throw error;
    }
  }
}

module.exports = MongoDatabase;