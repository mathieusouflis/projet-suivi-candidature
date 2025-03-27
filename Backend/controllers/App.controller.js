const Job = require('../models/Job.model');
const logger = require('../utils/Logger.util');

class ApplicationController {
  createApplication = async (req, res) => {
    try {
      const { title, company, type, link, status, datePostulation, location, salary, description } = req.body;
      
      if (!title || !company || !type) {
        return res.status(400).json({ 
          success: false, 
          message: 'Veuillez fournir au moins le titre du poste, l\'entreprise et le type de poste' 
        });
      }

      const newJob = new Job({
        title,
        company,
        type,
        link,
        status: status || 'En attente',
        datePostulation: datePostulation || new Date(),
        location: location || '',
        salary: salary || '',
        description: description || '',
        user_id: req.user.id
      });

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

  getAllApplications = async (req, res) => {
    try {
      const { company, status, type, sortBy, sortOrder } = req.query;
      
      const filter = { user_id: req.user.id };
      
      if (company) filter.company = { $regex: company, $options: 'i' }; 
      if (status) filter.status = status;
      if (type) filter.type = type;
      
      const sort = {};
      if (sortBy) {
        sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
      } else {
        sort.createdAt = -1;
      }

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

  getApplicationById = async (req, res) => {
    try {
      const jobId = req.params.id;
      
      if (!jobId) {
        return res.status(400).json({
          success: false,
          message: 'ID de candidature non fourni'
        });
      }

      const job = await Job.findById(jobId);
      
      if (!job) {
        return res.status(404).json({
          success: false,
          message: 'Candidature non trouvée'
        });
      }

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

  updateApplication = async (req, res) => {
    try {
      const jobId = req.params.id;
      const updateData = req.body;
      
      if (!jobId) {
        return res.status(400).json({
          success: false,
          message: 'ID de candidature non fourni'
        });
      }

      const job = await Job.findById(jobId);
      if (!job) {
        return res.status(404).json({
          success: false,
          message: 'Candidature non trouvée'
        });
      }

      if (job.user_id.toString() !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: 'Accès non autorisé à cette candidature'
        });
      }

      const updatedJob = await Job.findByIdAndUpdate(
        jobId,
        updateData,
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

  deleteApplication = async (req, res) => {
    try {
      const jobId = req.params.id;
      
      if (!jobId) {
        return res.status(400).json({
          success: false,
          message: 'ID de candidature non fourni'
        });
      }

      const job = await Job.findById(jobId);
      if (!job) {
        return res.status(404).json({
          success: false,
          message: 'Candidature non trouvée'
        });
      }

      if (job.user_id.toString() !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: 'Accès non autorisé à cette candidature'
        });
      }

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