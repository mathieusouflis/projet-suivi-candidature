const mongoose = require('mongoose');
const logger = require('../utils/Logger.util');

class MongoDatabase {
  constructor() {
    this.isConnected = false;
  }

  async connect() {
    try {
      if (this.isConnected) {
        logger.info('MongoDB est déjà connecté');
        return;
      }

      const mongoUri = process.env.MONGODB_URI;
      
      if (!mongoUri) {
        throw new Error('MONGODB_URI is not defined in environment variables');
      }
      
      const conn = await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        maxPoolSize: 10,
        retryWrites: true
      });
      
      this.isConnected = true;
      logger.info(`MongoDB connecté: ${conn.connection.host}`);
      return conn;
    } catch (error) {
      logger.error(`Erreur de connexion MongoDB: ${error.message}`);
      throw error;
    }
  }

  async disconnect() {
    try {
      if (!this.isConnected) {
        logger.info('MongoDB n\'est pas connecté');
        return;
      }
      
      await mongoose.disconnect();
      this.isConnected = false;
      logger.info('Déconnecté de MongoDB');
    } catch (error) {
      logger.error(`Erreur lors de la déconnexion de MongoDB: ${error.message}`);
      throw error;
    }
  }
}

module.exports = new MongoDatabase();