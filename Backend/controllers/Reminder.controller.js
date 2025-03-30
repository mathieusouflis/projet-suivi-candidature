const Job = require("../models/Job.model");
const logger = require("../utils/Logger.util");

class ReminderController {
  getJobsToRemind = async (req, res) => {
    try {
      const userId = req.user.id;
      const { days } = req.query;

      const daysThreshold = parseInt(days) || 7;

      const thresholdDate = new Date();
      thresholdDate.setDate(thresholdDate.getDate() - daysThreshold);

      const jobsToRemind = await Job.find({
        user_id: userId,
        status: "En attente",
        updatedAt: { $lt: thresholdDate },
      }).sort({ updatedAt: 1 });

      return res.status(200).json({
        success: true,
        count: jobsToRemind.length,
        data: jobsToRemind,
      });
    } catch (error) {
      logger.error(
        `Erreur lors de la récupération des candidatures à relancer: ${error.message}`
      );
      return res.status(500).json({
        success: false,
        message: "Erreur lors de la récupération des candidatures à relancer",
        error: error.message,
      });
    }
  };

  setMeetingDate = async (req, res) => {
    try {
      const jobId = req.params.id;
      const { meetingDate } = req.body;

      if (!jobId) {
        return res.status(400).json({
          success: false,
          message: "ID de candidature non fourni",
        });
      }

      if (!meetingDate) {
        return res.status(400).json({
          success: false,
          message: "Date de rendez-vous non fournie",
        });
      }

      const job = await Job.findById(jobId);

      if (!job) {
        return res.status(404).json({
          success: false,
          message: "Candidature non trouvée",
        });
      }

      if (job.user_id.toString() !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: "Accès non autorisé à cette candidature",
        });
      }

      job.meetingDate = new Date(meetingDate);
      await job.save();

      logger.info(`Date de rendez-vous définie pour la candidature: ${jobId}`);

      return res.status(200).json({
        success: true,
        data: job,
        message: "Date de rendez-vous définie avec succès",
      });
    } catch (error) {
      logger.error(
        `Erreur lors de la définition de la date de rendez-vous: ${error.message}`
      );
      return res.status(500).json({
        success: false,
        message: "Erreur lors de la définition de la date de rendez-vous",
        error: error.message,
      });
    }
  };

  setTestDate = async (req, res) => {
    try {
      const jobId = req.params.id;
      const { testDate } = req.body;

      if (!jobId) {
        return res.status(400).json({
          success: false,
          message: "ID de candidature non fourni",
        });
      }

      if (!testDate) {
        return res.status(400).json({
          success: false,
          message: "Date de test non fournie",
        });
      }

      const job = await Job.findById(jobId);

      if (!job) {
        return res.status(404).json({
          success: false,
          message: "Candidature non trouvée",
        });
      }

      if (job.user_id.toString() !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: "Accès non autorisé à cette candidature",
        });
      }

      job.testDate = new Date(testDate);
      await job.save();

      logger.info(`Date de test définie pour la candidature: ${jobId}`);

      return res.status(200).json({
        success: true,
        data: job,
        message: "Date de test définie avec succès",
      });
    } catch (error) {
      logger.error(
        `Erreur lors de la définition de la date de test: ${error.message}`
      );
      return res.status(500).json({
        success: false,
        message: "Erreur lors de la définition de la date de test",
        error: error.message,
      });
    }
  };
}

module.exports = new ReminderController();
