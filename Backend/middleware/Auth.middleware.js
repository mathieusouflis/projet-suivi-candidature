const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const dbKeys = require('../config/db.keys');
const logger = require('../utils/Logger.util');

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Accès non autorisé. Aucun token fourni.'
      });
    }
    
    const token = authHeader.split(' ')[1];
    
    const decoded = jwt.verify(token, dbKeys.jwtSecret);
    
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Utilisateur non trouvé ou token invalide.'
      });
    }
    
    req.user = {
      id: user._id,
      username: user.username
    };
    
    next();
  } catch (error) {
    logger.error(`Erreur d'authentification: ${error.message}`);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Token invalide.'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expiré. Veuillez vous reconnecter.'
      });
    }
    
    return res.status(500).json({
      success: false,
      message: 'Erreur de serveur lors de l\'authentification.',
      error: error.message
    });
  }
};

module.exports = authMiddleware;