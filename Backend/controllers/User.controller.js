// User.controller.js
// Ce controller gère les opérations liées aux utilisateurs (inscription, connexion, profil)

const User = require('../models/User.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const logger = require('../utils/Logger.util');
const dbKeys = require('../config/db.keys');

class UserController {
  /**
   * Inscription d'un nouvel utilisateur
   * POST /users/register
   */
  register = async (req, res) => {
    try {
      const { username, email, password, pays, statusPro } = req.body;
      
      // Validation des données requises
      if (!username || !email || !password) {
        return res.status(400).json({ 
          success: false, 
          message: 'Veuillez fournir un nom d\'utilisateur, un email et un mot de passe' 
        });
      }

      // Vérifier si l'utilisateur existe déjà
      const existingUser = await User.findOne({ 
        $or: [{ email }, { username }] 
      });
      
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Un utilisateur avec cet email ou ce nom d\'utilisateur existe déjà'
        });
      }

      // Création du nouvel utilisateur
      const newUser = new User({
        username,
        email,
        password, // Sera hashé automatiquement grâce au pre-save hook dans le modèle
        pays,
        statusPro
      });

      // Sauvegarde dans la base de données
      const savedUser = await newUser.save();
      
      // Génération du token JWT
      const token = jwt.sign(
        { id: savedUser._id, username: savedUser.username },
        dbKeys.jwtSecret,
        { expiresIn: '1d' } // Expire après 1 jour
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

  /**
   * Connexion d'un utilisateur existant
   * POST /users/login
   */
  login = async (req, res) => {
    try {
      const { email, password } = req.body;
      
      // Validation des données requises
      if (!email || !password) {
        return res.status(400).json({ 
          success: false, 
          message: 'Veuillez fournir un email et un mot de passe' 
        });
      }

      // Recherche de l'utilisateur par email
      const user = await User.findOne({ email });
      
      // Vérification que l'utilisateur existe
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Utilisateur non trouvé'
        });
      }

      // Vérification du mot de passe
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Mot de passe incorrect'
        });
      }

      // Génération du token JWT
      const token = jwt.sign(
        { id: user._id, username: user.username },
        dbKeys.jwtSecret,
        { expiresIn: '1d' } // Expire après 1 jour
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

  /**
   * Récupérer le profil de l'utilisateur connecté
   * GET /users/profile
   */
  getProfile = async (req, res) => {
    try {
      // Récupération de l'utilisateur à partir de l'ID dans le token JWT
      const user = await User.findById(req.user.id).select('-password');
      
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

  /**
   * Mettre à jour le profil de l'utilisateur
   * PUT /users/profile
   */
  updateProfile = async (req, res) => {
    try {
      const { username, email, pays, statusPro, currentPassword, newPassword } = req.body;
      
      // Recherche de l'utilisateur
      const user = await User.findById(req.user.id);
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Utilisateur non trouvé'
        });
      }

      // Mise à jour des champs si fournis
      if (username) user.username = username;
      if (email) user.email = email;
      if (pays) user.pays = pays;
      if (statusPro) user.statusPro = statusPro;
      
      // Mise à jour du mot de passe si fourni
      if (currentPassword && newPassword) {
        // Vérification du mot de passe actuel
        const isMatch = await user.comparePassword(currentPassword);
        if (!isMatch) {
          return res.status(401).json({
            success: false,
            message: 'Mot de passe actuel incorrect'
          });
        }
        
        // Mise à jour avec le nouveau mot de passe
        user.password = newPassword; // Sera hashé automatiquement grâce au pre-save hook
      }

      // Sauvegarde des modifications
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

  /**
   * Vérifier la validité du token JWT
   * GET /users/verify-token
   */
  verifyToken = async (req, res) => {
    try {
      // Si la requête arrive jusqu'ici, cela signifie que le middleware d'authentification a vérifié le token
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