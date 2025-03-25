const mongoose = require('mongoose');
const config = require('../config/db.conf');
const keys = require('../config/db.keys');
const logger = require('../utils/Logger.util');

class MongoDB {
  constructor() {
    this.mongoose = mongoose;
    this.isConnected = false;
    
    this.mongoose.Promise = global.Promise;
    
    this.options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      autoIndex: true, 
      maxPoolSize: 10, 
      socketTimeoutMS: 45000,
    };
  }

  async connect() {
    if (this.isConnected) {
      logger.info('MongoDB: Utilisation de la connexion existante');
      return this.mongoose.connection;
    }

    try {
      const uri = this.buildConnectionUri();
      
      await this.mongoose.connect(uri, this.options);
      
      this.isConnected = true;
      logger.info('MongoDB: Connexion établie avec succès');
      
      this.mongoose.connection.on('error', (err) => {
        logger.error(`MongoDB: Erreur de connexion - ${err}`);
        this.isConnected = false;
      });
      
      this.mongoose.connection.on('disconnected', () => {
        logger.warn('MongoDB: Déconnecté');
        this.isConnected = false;
      });

      return this.mongoose.connection;
    } catch (error) {
      logger.error(`MongoDB: Échec de connexion - ${error.message}`);
      throw error;
    }
  }

  buildConnectionUri() {
    const {
      host = 'localhost',
      port = 27017,
      name = 'candidatures-app'
    } = config;
    
    const { 
      username, 
      password 
    } = keys;
    
    let uri = 'mongodb://';
    
    if (username && password) {
      uri += `${encodeURIComponent(username)}:${encodeURIComponent(password)}@`;
    }
    
    uri += `${host}:${port}/${name}`;
    
    if (config.authSource) {
      uri += `?authSource=${config.authSource}`;
    }
    
    return uri;
  }

  async disconnect() {
    if (!this.isConnected) {
      return;
    }
    
    try {
      await this.mongoose.disconnect();
      this.isConnected = false;
      logger.info('MongoDB: Déconnexion réussie');
    } catch (error) {
      logger.error(`MongoDB: Échec de déconnexion - ${error.message}`);
      throw error;
    }
  }
}

module.exports = new MongoDB();