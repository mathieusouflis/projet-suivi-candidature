// Contact.controller.js
// Ce controller gère toutes les opérations CRUD liées aux contacts professionnels

const Contact = require('../models/Contact.model');
const ContactJob = require('../models/ContactJob.model');
const logger = require('../utils/Logger.util');

class ContactController {
  /**
   * Créer un nouveau contact
   * POST /contacts
   * Reçoit les détails du contact (nom, prénom, rôle, téléphone, email, etc.)
   */
  createContact = async (req, res) => {
    try {
      const { name, lastName, role, tel, email, company, notes } = req.body;
      
      // Validation des données requises
      if (!name || !lastName || !email) {
        return res.status(400).json({ 
          success: false, 
          message: 'Veuillez fournir au moins le nom, le prénom et l\'email du contact'
        });
      }

      // Vérifier si le contact existe déjà pour cet utilisateur
      const existingContact = await Contact.findOne({ 
        email, 
        user_id: req.user.id 
      });
      
      if (existingContact) {
        return res.status(400).json({
          success: false,
          message: 'Un contact avec cet email existe déjà'
        });
      }

      // Création du nouveau contact
      const newContact = new Contact({
        name,
        lastName,
        role,
        tel,
        email,
        company,
        notes,
        user_id: req.user.id // Assumant que l'ID de l'utilisateur est disponible dans req.user
      });

      // Sauvegarde dans la base de données
      const savedContact = await newContact.save();
      
      logger.info(`Nouveau contact créé: ${savedContact._id}`);
      
      return res.status(201).json({
        success: true,
        data: savedContact,
        message: 'Contact créé avec succès'
      });
      
    } catch (error) {
      logger.error(`Erreur lors de la création d'un contact: ${error.message}`);
      return res.status(500).json({
        success: false,
        message: 'Erreur lors de la création du contact',
        error: error.message
      });
    }
  }

  /**
   * Récupérer tous les contacts (avec possibilité de filtrage)
   * GET /contacts
   * Paramètres optionnels: nom, entreprise, etc.
   */
  getAllContacts = async (req, res) => {
    try {
      const { name, lastName, company, email, sortBy, sortOrder } = req.query;
      
      // Construction du filtre en fonction des paramètres
      const filter = { user_id: req.user.id }; // Assumant que l'ID de l'utilisateur est disponible dans req.user
      
      if (name) filter.name = { $regex: name, $options: 'i' }; // Recherche insensible à la casse
      if (lastName) filter.lastName = { $regex: lastName, $options: 'i' };
      if (company) filter.company = { $regex: company, $options: 'i' };
      if (email) filter.email = { $regex: email, $options: 'i' };
      
      // Construction des options de tri
      const sort = {};
      if (sortBy) {
        sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
      } else {
        sort.lastName = 1; // Par défaut, tri par nom de famille
      }

      // Récupération des contacts avec filtres et tri
      const contacts = await Contact.find(filter).sort(sort);
      
      return res.status(200).json({
        success: true,
        count: contacts.length,
        data: contacts
      });
      
    } catch (error) {
      logger.error(`Erreur lors de la récupération des contacts: ${error.message}`);
      return res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération des contacts',
        error: error.message
      });
    }
  }

  /**
   * Récupérer un contact spécifique par son ID
   * GET /contacts/:id
   */
  getContactById = async (req, res) => {
    try {
      const contactId = req.params.id;
      
      // Vérification que l'ID est fourni
      if (!contactId) {
        return res.status(400).json({
          success: false,
          message: 'ID de contact non fourni'
        });
      }

      // Récupération du contact
      const contact = await Contact.findById(contactId);
      
      // Vérification que le contact existe
      if (!contact) {
        return res.status(404).json({
          success: false,
          message: 'Contact non trouvé'
        });
      }

      // Vérification que le contact appartient à l'utilisateur
      if (contact.user_id.toString() !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: 'Accès non autorisé à ce contact'
        });
      }

      return res.status(200).json({
        success: true,
        data: contact
      });
      
    } catch (error) {
      logger.error(`Erreur lors de la récupération d'un contact: ${error.message}`);
      return res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération du contact',
        error: error.message
      });
    }
  }

  /**
   * Mettre à jour un contact existant
   * PUT /contacts/:id
   */
  updateContact = async (req, res) => {
    try {
      const contactId = req.params.id;
      const updateData = req.body;
      
      // Vérification que l'ID est fourni
      if (!contactId) {
        return res.status(400).json({
          success: false,
          message: 'ID de contact non fourni'
        });
      }

      // Vérification que le contact existe
      const contact = await Contact.findById(contactId);
      if (!contact) {
        return res.status(404).json({
          success: false,
          message: 'Contact non trouvé'
        });
      }

      // Vérification que le contact appartient à l'utilisateur
      if (contact.user_id.toString() !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: 'Accès non autorisé à ce contact'
        });
      }

      // Mise à jour du contact
      const updatedContact = await Contact.findByIdAndUpdate(
        contactId,
        { ...updateData, updatedAt: new Date() },
        { new: true, runValidators: true }
      );

      logger.info(`Contact mis à jour: ${contactId}`);
      
      return res.status(200).json({
        success: true,
        data: updatedContact,
        message: 'Contact mis à jour avec succès'
      });
      
    } catch (error) {
      logger.error(`Erreur lors de la mise à jour d'un contact: ${error.message}`);
      return res.status(500).json({
        success: false,
        message: 'Erreur lors de la mise à jour du contact',
        error: error.message
      });
    }
  }

  /**
   * Supprimer un contact
   * DELETE /contacts/:id
   */
  deleteContact = async (req, res) => {
    try {
      const contactId = req.params.id;
      
      // Vérification que l'ID est fourni
      if (!contactId) {
        return res.status(400).json({
          success: false,
          message: 'ID de contact non fourni'
        });
      }

      // Vérification que le contact existe
      const contact = await Contact.findById(contactId);
      if (!contact) {
        return res.status(404).json({
          success: false,
          message: 'Contact non trouvé'
        });
      }

      // Vérification que le contact appartient à l'utilisateur
      if (contact.user_id.toString() !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: 'Accès non autorisé à ce contact'
        });
      }

      // Suppression des relations ContactJob associées
      await ContactJob.deleteMany({ contact_id: contactId });

      // Suppression du contact
      await Contact.findByIdAndDelete(contactId);
      
      logger.info(`Contact supprimé: ${contactId}`);
      
      return res.status(200).json({
        success: true,
        message: 'Contact supprimé avec succès'
      });
      
    } catch (error) {
      logger.error(`Erreur lors de la suppression d'un contact: ${error.message}`);
      return res.status(500).json({
        success: false,
        message: 'Erreur lors de la suppression du contact',
        error: error.message
      });
    }
  }

  /**
   * Associer un contact à une candidature
   * POST /contacts/:contactId/job/:jobId
   */
  linkContactToJob = async (req, res) => {
    try {
      const { contactId, jobId } = req.params;
      const { relation, notes } = req.body;
      
      // Vérification que les IDs sont fournis
      if (!contactId || !jobId) {
        return res.status(400).json({
          success: false,
          message: 'ID de contact et ID de candidature requis'
        });
      }

      // Vérifier que la relation n'existe pas déjà
      const existingLink = await ContactJob.findOne({
        contact_id: contactId,
        job_id: jobId
      });

      if (existingLink) {
        return res.status(400).json({
          success: false,
          message: 'Ce contact est déjà associé à cette candidature'
        });
      }

      // Création de la relation
      const newContactJob = new ContactJob({
        contact_id: contactId,
        job_id: jobId,
        relation: relation || 'Recruteur',
        notes,
        lastContactDate: new Date()
      });

      // Sauvegarde dans la base de données
      const savedContactJob = await newContactJob.save();
      
      logger.info(`Contact associé à une candidature: ${contactId} -> ${jobId}`);
      
      return res.status(201).json({
        success: true,
        data: savedContactJob,
        message: 'Contact associé à la candidature avec succès'
      });
      
    } catch (error) {
      logger.error(`Erreur lors de l'association d'un contact à une candidature: ${error.message}`);
      return res.status(500).json({
        success: false,
        message: 'Erreur lors de l\'association',
        error: error.message
      });
    }
  }
}

module.exports = new ContactController();