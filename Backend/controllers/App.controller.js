// App.controller.js
// Ce controller gère toutes les opérations CRUD liées aux candidatures des étudiants

const Job = require('../models/Job.model');
const logger = require('../utils/Logger.util');

class ApplicationController {
  /**
   * Créer une nouvelle candidature
   * POST /applications
   * Reçoit les détails de la candidature (entreprise, poste, lien, date, statut)
   */
  createApplication = async (req, res) => {
    try {
      const { titre, company, type, link, status, datePostulation, tags, offre } = req.body;
      
      // Validation des données requises
      if (!titre || !company || !type) {
        return res.status(400).json({ 
          success: false, 
          message: 'Veuillez fournir au moins le titre du poste, l\'entreprise et le type de poste' 
        });
      }

      // Création de la nouvelle candidature
      const newJob = new Job({
        titre,
        company,
        type,
        link,
        status: status || 'En attente',
        datePostulation: datePostulation || new Date(),
        tags: tags || [],
        offre,
        user_id: req.user.id // Assumant que l'ID de l'utilisateur est disponible dans req.user
      });

      // Sauvegarde dans la base de données
      const savedJob = await newJob.save();
      
      logger.info(`Nouvelle candidature créée: ${savedJob._id}`);
      
      return res.status(201).json({
        success: true,
        data: savedJob,
        message: 'Candidature créée avec succès'
      });
      
    } catch (error) {
      logger.error(`Erreur lors de la création d'une candidature: ${error.message}`);
      return res.status(500).json({
        success: false,
        message: 'Erreur lors de la création de la candidature',
        error: error.message
      });
    }
  }

  /**
   * Récupérer toutes les candidatures (avec possibilité de filtrage)
   * GET /applications
   * Paramètres optionnels: entreprise, statut
   */
  getAllApplications = async (req, res) => {
    try {
      const { company, status, type, sortBy, sortOrder } = req.query;
      
      // Construction du filtre en fonction des paramètres
      const filter = { user_id: req.user.id }; // Assumant que l'ID de l'utilisateur est disponible dans req.user
      
      if (company) filter.company = { $regex: company, $options: 'i' }; // Recherche insensible à la casse
      if (status) filter.status = status;
      if (type) filter.type = type;
      
      // Construction des options de tri
      const sort = {};
      if (sortBy) {
        sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
      } else {
        sort.createdAt = -1; // Par défaut, tri par date de création décroissante
      }

      // Récupération des candidatures avec filtres et tri
      const jobs = await Job.find(filter).sort(sort);
      
      return res.status(200).json({
        success: true,
        count: jobs.length,
        data: jobs
      });
      
    } catch (error) {
      logger.error(`Erreur lors de la récupération des candidatures: ${error.message}`);
      return res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération des candidatures',
        error: error.message
      });
    }
  }

  /**
   * Récupérer une candidature spécifique par son ID
   * GET /applications/:id
   */
  getApplicationById = async (req, res) => {
    try {
      const jobId = req.params.id;
      
      // Vérification que l'ID est fourni
      if (!jobId) {
        return res.status(400).json({
          success: false,
          message: 'ID de candidature non fourni'
        });
      }

      // Récupération de la candidature
      const job = await Job.findById(jobId);
      
      // Vérification que la candidature existe
      if (!job) {
        return res.status(404).json({
          success: false,
          message: 'Candidature non trouvée'
        });
      }

      // Vérification que la candidature appartient à l'utilisateur
      if (job.user_id.toString() !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: 'Accès non autorisé à cette candidature'
        });
      }

      return res.status(200).json({
        success: true,
        data: job
      });
      
    } catch (error) {
      logger.error(`Erreur lors de la récupération d'une candidature: ${error.message}`);
      return res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération de la candidature',
        error: error.message
      });
    }
  }

  /**
   * Mettre à jour une candidature existante
   * PUT /applications/:id
   */
  updateApplication = async (req, res) => {
    try {
      const jobId = req.params.id;
      const updateData = req.body;
      
      // Vérification que l'ID est fourni
      if (!jobId) {
        return res.status(400).json({
          success: false,
          message: 'ID de candidature non fourni'
        });
      }

      // Vérification que la candidature existe
      const job = await Job.findById(jobId);
      if (!job) {
        return res.status(404).json({
          success: false,
          message: 'Candidature non trouvée'
        });
      }

      // Vérification que la candidature appartient à l'utilisateur
      if (job.user_id.toString() !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: 'Accès non autorisé à cette candidature'
        });
      }

      // Mise à jour de la candidature
      const updatedJob = await Job.findByIdAndUpdate(
        jobId,
        { ...updateData, updatedAt: new Date() },
        { new: true, runValidators: true }
      );

      logger.info(`Candidature mise à jour: ${jobId}`);
      
      return res.status(200).json({
        success: true,
        data: updatedJob,
        message: 'Candidature mise à jour avec succès'
      });
      
    } catch (error) {
      logger.error(`Erreur lors de la mise à jour d'une candidature: ${error.message}`);
      return res.status(500).json({
        success: false,
        message: 'Erreur lors de la mise à jour de la candidature',
        error: error.message
      });
    }
  }

  /**
   * Supprimer une candidature
   * DELETE /applications/:id
   */
  deleteApplication = async (req, res) => {
    try {
      const jobId = req.params.id;
      
      // Vérification que l'ID est fourni
      if (!jobId) {
        return res.status(400).json({
          success: false,
          message: 'ID de candidature non fourni'
        });
      }

      // Vérification que la candidature existe
      const job = await Job.findById(jobId);
      if (!job) {
        return res.status(404).json({
          success: false,
          message: 'Candidature non trouvée'
        });
      }

      // Vérification que la candidature appartient à l'utilisateur
      if (job.user_id.toString() !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: 'Accès non autorisé à cette candidature'
        });
      }

      // Suppression de la candidature
      await Job.findByIdAndDelete(jobId);
      
      logger.info(`Candidature supprimée: ${jobId}`);
      
      return res.status(200).json({
        success: true,
        message: 'Candidature supprimée avec succès'
      });
      
    } catch (error) {
      logger.error(`Erreur lors de la suppression d'une candidature: ${error.message}`);
      return res.status(500).json({
        success: false,
        message: 'Erreur lors de la suppression de la candidature',
        error: error.message
      });
    }
  }
}

module.exports = new ApplicationController();