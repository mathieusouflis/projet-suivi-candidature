const User = require('../models/User.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const logger = require('../utils/Logger.util');
const dbKeys = require('../config/db.keys');

class UserController {
  register = async (req, res) => {
    try {
      const { username, email, password, pays, statusPro } = req.body;
      
      if (!username || !email || !password) {
        return res.status(400).json({ 
          success: false, 
          message: 'Veuillez fournir un nom d\'utilisateur, un email et un mot de passe' 
        });
      }

      const existingUser = await User.findOne({ 
        $or: [{ email }, { username }] 
      });
      
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Un utilisateur avec cet email ou ce nom d\'utilisateur existe déjà'
        });
      }

      const newUser = new User({
        username,
        email,
        password,
        pays,
        statusPro
      });

      const savedUser = await newUser.save();
      
      const token = jwt.sign(
        { id: savedUser._id, username: savedUser.username },
        dbKeys.jwtSecret,
        { expiresIn: '1d' }
      );
      
      logger.info(`Nouvel utilisateur enregistré: ${savedUser._id}`);
      
      return res.status(201).json({
        success: true,
        token,
        user: {
          id: savedUser._id,
          username: savedUser.username,
          email: savedUser.email,
          pays: savedUser.pays,
          statusPro: savedUser.statusPro
        },
        message: 'Inscription réussie'
      });
      
    } catch (error) {
      logger.error(`Erreur lors de l'inscription: ${error.message}`);
      return res.status(500).json({
        success: false,
        message: 'Erreur lors de l\'inscription',
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
          message: 'Veuillez fournir un email et un mot de passe' 
        });
      }

      const user = await User.findOne({ email });
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Utilisateur non trouvé'
        });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Mot de passe incorrect'
        });
      }

      const token = jwt.sign(
        { id: user._id, username: user.username },
        dbKeys.jwtSecret,
        { expiresIn: '1d' }
      );
      
      logger.info(`Utilisateur connecté: ${user._id}`);
      
      return res.status(200).json({
        success: true,
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          pays: user.pays,
          statusPro: user.statusPro
        },
        message: 'Connexion réussie'
      });
      
    } catch (error) {
      logger.error(`Erreur lors de la connexion: ${error.message}`);
      return res.status(500).json({
        success: false,
        message: 'Erreur lors de la connexion',
        error: error.message
      });
    }
  }

  getProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password').populate('contacts');
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Utilisateur non trouvé'
        });
      }
      
      return res.status(200).json({
        success: true,
        data: user
      });
      
    } catch (error) {
      logger.error(`Erreur lors de la récupération du profil: ${error.message}`);
      return res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération du profil',
        error: error.message
      });
    }
  }

  updateProfile = async (req, res) => {
    try {
      const { username, email, pays, statusPro, currentPassword, newPassword } = req.body;
      
      const user = await User.findById(req.user.id);
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Utilisateur non trouvé'
        });
      }

      if (username) user.username = username;
      if (email) user.email = email;
      if (pays) user.pays = pays;
      if (statusPro) user.statusPro = statusPro;
      
      if (currentPassword && newPassword) {
        const isMatch = await user.comparePassword(currentPassword);
        if (!isMatch) {
          return res.status(401).json({
            success: false,
            message: 'Mot de passe actuel incorrect'
          });
        }
        
        user.password = newPassword; 
      }

      const updatedUser = await user.save();
      
      logger.info(`Profil mis à jour: ${user._id}`);
      
      return res.status(200).json({
        success: true,
        data: {
          id: updatedUser._id,
          username: updatedUser.username,
          email: updatedUser.email,
          pays: updatedUser.pays,
          statusPro: updatedUser.statusPro
        },
        message: 'Profil mis à jour avec succès'
      });
      
    } catch (error) {
      logger.error(`Erreur lors de la mise à jour du profil: ${error.message}`);
      return res.status(500).json({
        success: false,
        message: 'Erreur lors de la mise à jour du profil',
        error: error.message
      });
    }
  }

  verifyToken = async (req, res) => {
    try {
      return res.status(200).json({
        success: true,
        message: 'Token valide',
        user: {
          id: req.user.id,
          username: req.user.username
        }
      });
    } catch (error) {
      logger.error(`Erreur lors de la vérification du token: ${error.message}`);
      return res.status(500).json({
        success: false,
        message: 'Erreur lors de la vérification du token',
        error: error.message
      });
    }
  }
}

module.exports = new UserController();