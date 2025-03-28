const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const compression = require('compression');
const logger = require('../utils/Logger.util');

const setupMiddleware = (app) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  
  const corsOptions = {
    origin: "*", 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
  };
  
  app.use(cors(corsOptions));
  
  app.use(
    helmet({
      crossOriginResourcePolicy: false, 
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          connectSrc: ["'self'", corsOptions.origin],
          frameSrc: ["'self'"],
          childSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", "data:"],
        },
      },
    })
  );
  
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
      windowMs: 15 * 60 * 1000, 
      max: 100,
      message: {
        success: false,
        message: 'Too many requests, please try again later.'
      }
    });
    app.use(limiter);
  }
  
  app.use(express.static('public'));
};

module.exports = { setupMiddleware };