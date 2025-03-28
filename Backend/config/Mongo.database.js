const mongoose = require('mongoose');
const logger = require('../utils/Logger.util');

class MongoDatabase {
  constructor() {
    this.isConnected = false;
  }

  async connect() {
    try {
      if (this.isConnected) {
        logger.info('MongoDB is already connected');
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
        socketTimeoutMS: 45000
      });
      
      mongoose.set('debug', process.env.NODE_ENV !== 'production');
      
      this.isConnected = true;
      logger.info(`MongoDB connected: ${conn.connection.host}`);
      return conn;
    } catch (error) {
      logger.error(`MongoDB connection error: ${error.message}`);
      throw error;
    }
  }

  async disconnect() {
    try {
      if (!this.isConnected) {
        logger.info('MongoDB is not connected');
        return;
      }
      
      await mongoose.disconnect();
      this.isConnected = false;
      logger.info('Disconnected from MongoDB');
    } catch (error) {
      logger.error(`MongoDB disconnection error: ${error.message}`);
      throw error;
    }
  }
}

module.exports = new MongoDatabase();