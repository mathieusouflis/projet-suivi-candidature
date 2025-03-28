const User = require('../models/User.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const logger = require('../utils/Logger.util');

class UserController {
  register = async (req, res) => {
    try {
      let { username, email, password } = req.body;
      
      if (!username || !email || !password) {
        return res.status(400).json({ 
          success: false, 
          message: 'Please provide a username, email and password' 
        });
      }

      const existingUser = await User.findOne({ 
        $or: [{ email }, { username }] 
      });
      
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'A user with this email or username already exists'
        });
      }

      const newUser = new User({
        username,
        email,
        password,
        pays: "France",
        statusPro: "Étudiant"
      });

      const savedUser = await newUser.save();
      
      const token = jwt.sign(
        { id: saveduser._id.toString(), username: savedUser.username },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );
      
      logger.info(`New user registered: ${saveduser._id.toString()}`);
      
      return res.status(201).json({
        success: true,
        token,
        user: {
          id: saveduser._id.toString(),
          username: savedUser.username,
          email: savedUser.email
        },
        message: 'Registration successful'
      });
      
    } catch (error) {
      logger.error(`Registration error: ${error.message}`);
      return res.status(500).json({
        success: false,
        message: 'Error during registration',
        error: error.message
      });
    }
  }

  login = async (req, res) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ 
          success: false, 
          message: 'Please provide email and password' 
        });
      }

      const user = await User.findOne({ email });
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Invalid password'
        });
      }

      const token = jwt.sign(
        { id: user._id.toString(), username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );
      
      logger.info(`User logged in: ${user._id.toString()}`);
      
      return res.status(200).json({
        success: true,
        data: {
          token,
          user: {
            id: user._id.toString(),
            username: user.username,
            email: user.email
          },
        },
        message: 'Login successful'
      });
      
    } catch (error) {
      logger.error(`Login error: ${error.message}`);
      return res.status(500).json({
        success: false,
        message: 'Error during login',
        error: error.message
      });
    }
  }

  getProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }
      
      return res.status(200).json({
        success: true,
        data: user
      });
      
    } catch (error) {
      logger.error(`Error fetching profile: ${error.message}`);
      return res.status(500).json({
        success: false,
        message: 'Error fetching profile',
        error: error.message
      });
    }
  }

  updateProfile = async (req, res) => {
    try {
      const { username, email, currentPassword, newPassword } = req.body;
      
      const user = await User.findById(req.user.id);
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      if (username) user.username = username;
      if (email) user.email = email;
      
      if (currentPassword && newPassword) {
        const isMatch = await user.comparePassword(currentPassword);
        if (!isMatch) {
          return res.status(401).json({
            success: false,
            message: 'Current password is incorrect'
          });
        }
        
        user.password = newPassword; 
      }

      const updatedUser = await user.save();
      
      logger.info(`Profile updated: ${user._id.toString()}`);
      
      return res.status(200).json({
        success: true,
        data: {
          id: updateduser._id.toString(),
          username: updatedUser.username,
          email: updatedUser.email
        },
        message: 'Profile updated successfully'
      });
      
    } catch (error) {
      logger.error(`Error updating profile: ${error.message}`);
      return res.status(500).json({
        success: false,
        message: 'Error updating profile',
        error: error.message
      });
    }
  }

  verifyToken = async (req, res) => {
    try {
      return res.status(200).json({
        success: true,
        message: 'Valid token',
        user: {
          id: req.user.id,
          username: req.user.username
        }
      });
    } catch (error) {
      logger.error(`Token verification error: ${error.message}`);
      return res.status(500).json({
        success: false,
        message: 'Error verifying token',
        error: error.message
      });
    }
  }
}

module.exports = new UserController();