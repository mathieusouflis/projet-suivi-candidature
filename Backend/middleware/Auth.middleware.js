const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const logger = require('../utils/Logger.util');

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized access. No token provided.'
      });
    }
    
    const token = authHeader.split(' ')[1].split('"')[1];
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found or invalid token.'
      });
    }
    
    req.user = {
      id: user._id,
      username: user.username
    };
    
    next();
  } catch (error) {
    logger.error(`Authentication error: ${error.message}`);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token.'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired. Please login again.'
      });
    }
    
    return res.status(500).json({
      success: false,
      message: 'Server error during authentication.',
      error: error.message
    });
  }
};

module.exports = authMiddleware;