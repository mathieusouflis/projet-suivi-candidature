const Contact = require('../models/Contact.model');
const ContactJob = require('../models/ContactJob.model');
const logger = require('../utils/Logger.util');

class ContactController {
  createContact = async (req, res) => {
    try {
      const { name, lastName, role, tel, email, company, notes } = req.body;
      
      if (!name || !lastName || !email) {
        return res.status(400).json({ 
          success: false, 
          message: 'Veuillez fournir au moins le nom, le prénom et l\'email du contact'
        });
      }

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

      const newContact = new Contact({
        name,
        lastName,
        role,
        tel,
        email,
        company,
        notes,
        user_id: req.user.id
      });

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

  getAllContacts = async (req, res) => {
    try {
      const { name, lastName, company, email, sortBy, sortOrder } = req.query;
      
      const filter = { user_id: req.user.id };
      
      if (name) filter.name = { $regex: name, $options: 'i' }; 
      if (lastName) filter.lastName = { $regex: lastName, $options: 'i' };
      if (company) filter.company = { $regex: company, $options: 'i' };
      if (email) filter.email = { $regex: email, $options: 'i' };
      
      const sort = {};
      if (sortBy) {
        sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
      } else {
        sort.lastName = 1;
      }

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

  getContactById = async (req, res) => {
    try {
      const contactId = req.params.id;
      
      if (!contactId) {
        return res.status(400).json({
          success: false,
          message: 'ID de contact non fourni'
        });
      }

      const contact = await Contact.findById(contactId);
      
      if (!contact) {
        return res.status(404).json({
          success: false,
          message: 'Contact non trouvé'
        });
      }

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

  updateContact = async (req, res) => {
    try {
      const contactId = req.params.id;
      const updateData = req.body;
      
      if (!contactId) {
        return res.status(400).json({
          success: false,
          message: 'ID de contact non fourni'
        });
      }

      const contact = await Contact.findById(contactId);
      if (!contact) {
        return res.status(404).json({
          success: false,
          message: 'Contact non trouvé'
        });
      }

      if (contact.user_id.toString() !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: 'Accès non autorisé à ce contact'
        });
      }

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

  deleteContact = async (req, res) => {
    try {
      const contactId = req.params.id;
      
      if (!contactId) {
        return res.status(400).json({
          success: false,
          message: 'ID de contact non fourni'
        });
      }

      const contact = await Contact.findById(contactId);
      if (!contact) {
        return res.status(404).json({
          success: false,
          message: 'Contact non trouvé'
        });
      }

      if (contact.user_id.toString() !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: 'Accès non autorisé à ce contact'
        });
      }

      await ContactJob.deleteMany({ contact_id: contactId });

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

  linkContactToJob = async (req, res) => {
    try {
      const { contactId, jobId } = req.params;
      const { relation, notes } = req.body;
      
      if (!contactId || !jobId) {
        return res.status(400).json({
          success: false,
          message: 'ID de contact et ID de candidature requis'
        });
      }

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

      const newContactJob = new ContactJob({
        contact_id: contactId,
        job_id: jobId,
        relation: relation || 'Recruteur',
        notes,
        lastContactDate: new Date()
      });

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