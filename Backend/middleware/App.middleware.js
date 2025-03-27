const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const compression = require('compression');
const config = require('../config/init').get('app');
const logger = require('../utils/Logger.util');

const setupMiddleware = (app) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  
  app.use(cors(config.security.cors));
  
  app.use(helmet());
  
  app.use(compression());
  
  if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev', {
      stream: {
        write: (message) => logger.info(message.trim())
      }
    }));
  }
  
  if (process.env.NODE_ENV === 'production') {
    const limiter = rateLimit({
      windowMs: config.security.rateLimit.windowMs,
      max: config.security.rateLimit.max,
      message: {
        success: false,
        message: 'Trop de requêtes, veuillez réessayer plus tard.'
      }
    });
    app.use(limiter);
  }
  
  app.use(express.static('public'));
};

module.exports = { setupMiddleware };