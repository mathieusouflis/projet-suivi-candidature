const appConfig = require('./app.conf');
const dbConfig = require('./db.conf');
const dbKeys = require('./db.keys');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

class ConfigInitializer {
  constructor() {
    this.config = {};
    this.initialized = false;
  }

  loadEnvironmentVariables() {
    const envFile = process.env.NODE_ENV === 'production'
      ? '.env.production'
      : process.env.NODE_ENV === 'test'
        ? '.env.test'
        : '.env';

    const envPath = path.resolve(process.cwd(), envFile);

    if (fs.existsSync(envPath)) {
      console.log(`Chargement des variables d'environnement depuis ${envPath}`);
      const result = dotenv.config({ path: envPath });
      
      if (result.error) {
        console.error(`Erreur lors du chargement des variables d'environnement: ${result.error}`);
      }
    } else {
      console.warn(`Fichier ${envPath} non trouvé, utilisation des variables d'environnement système`);
    }
  }

  initialize() {
    if (this.initialized) {
      return this.config;
    }

    this.loadEnvironmentVariables();

    // Configurer les options de base de données
    let dbOptions = { ...dbConfig };
    
    // Si une URI MongoDB est définie, l'utiliser en priorité
    if (process.env.MONGODB_URI) {
      dbOptions.uri = process.env.MONGODB_URI;
    }

    this.config = {
      app: appConfig,
      db: dbOptions,
      environment: process.env.NODE_ENV || 'development'
    };

    this.validateConfig();

    this.initialized = true;
    return this.config;
  }

  validateConfig() {
    if (!this.config.app.server.port) {
      throw new Error('Configuration invalide: port du serveur manquant');
    }

    if (!this.config.app.api.prefix) {
      throw new Error('Configuration invalide: préfixe de l\'API manquant');
    }

    // Vérifier si nous avons soit l'URI MongoDB, soit les informations de connexion traditionnelles
    if (!process.env.MONGODB_URI && (!this.config.db.host || !this.config.db.port || !this.config.db.name)) {
      throw new Error('Configuration invalide: informations de base de données manquantes');
    }

    if (!dbKeys.jwtSecret || dbKeys.jwtSecret === 'your-jwt-secret-key' || dbKeys.jwtSecret === 'your-secure-jwt-secret-key-change-me-in-production') {
      console.warn('Attention: clé JWT par défaut utilisée, à ne pas utiliser en production');
    }
  }

  get(path, defaultValue = null) {
    if (!this.initialized) {
      this.initialize();
    }

    const keys = path.split('.');
    let current = this.config;

    for (const key of keys) {
      if (current[key] === undefined) {
        return defaultValue;
      }
      current = current[key];
    }

    return current;
  }

  getDbKeys() {
    return dbKeys;
  }

  reset() {
    this.config = {};
    this.initialized = false;
  }
}

module.exports = new ConfigInitializer();