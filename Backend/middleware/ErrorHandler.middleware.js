const logger = require('../utils/Logger.util');

const errorHandler = (err, req, res, next) => {
  logger.error(`${err.name}: ${err.message}`, { 
    stack: err.stack,
    path: req.path,
    method: req.method
  });

  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(error => error.message);
    return res.status(400).json({
      success: false,
      message: 'Erreur de validation',
      errors
    });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: `ID invalide format: ${err.value}`
    });
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({
      success: false,
      message: `La valeur '${err.keyValue[field]}' est déjà utilisée pour le champ '${field}'`
    });
  }

  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Token invalide'
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: 'Token expiré'
    });
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Erreur serveur';

  return res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
};

const notFoundHandler = (req, res) => {
  logger.warn(`Route non trouvée: ${req.originalUrl}`);
  res.status(404).json({
    success: false,
    message: `La route ${req.originalUrl} n'existe pas`
  });
};

module.exports = { 
  errorHandler,
  notFoundHandler
};