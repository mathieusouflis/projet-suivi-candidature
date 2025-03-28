const Job = require('../models/Job.model');
const logger = require('../utils/Logger.util');
const mongoose = require('mongoose');

class ApplicationController {
  createApplication = async (req, res) => {
    try {
      const { title, company, type, link, status, location, salary, description } = req.body;
      
      if (!title) {
        return res.status(400).json({ 
          success: false, 
          message: 'Title is required' 
        });
      }

      const newJob = new Job({
        title,
        company: company || '',
        type: type || 'Internship',
        link: link || '',
        status: status || 'Need to apply',
        datePostulation: new Date(),
        location: location || '',
        salary: salary || 0,
        description: description || '',
        user_id: req.user.id
      });

      const savedJob = await newJob.save();
      
      logger.info(`New job application created: ${savedJob._id}`);
      
      return res.status(201).json({
        success: true,
        data: savedJob,
        message: 'Job application created successfully'
      });
      
    } catch (error) {
      logger.error(`Error creating job application: ${error.message}`);
      return res.status(500).json({
        success: false,
        message: 'Error creating job application',
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
      logger.error(`Error fetching job applications: ${error.message}`);
      return res.status(500).json({
        success: false,
        message: 'Error fetching job applications',
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
          message: 'Job ID is required'
        });
      }

      const job = await Job.findById(jobId);
      
      if (!job) {
        return res.status(404).json({
          success: false,
          message: 'Job application not found'
        });
      }

      if (job.user_id.toString() !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: 'Unauthorized access to this job application'
        });
      }

      return res.status(200).json({
        success: true,
        data: job
      });
      
    } catch (error) {
      logger.error(`Error fetching job application: ${error.message}`);
      return res.status(500).json({
        success: false,
        message: 'Error fetching job application',
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
          message: 'Job ID is required'
        });
      }

      const job = await Job.findById(jobId);
      if (!job) {
        return res.status(404).json({
          success: false,
          message: 'Job application not found'
        });
      }
      
      if (job.user_id.toString() !== req.user.id.toString()) {
        return res.status(403).json({
          success: false,
          message: 'Unauthorized access to this job application'
        });
      }

      const updatedJob = await Job.findByIdAndUpdate(
        jobId,
        updateData,
        { new: true, runValidators: true }
      );

      logger.info(`Job application updated: ${jobId}`);
      
      return res.status(200).json({
        success: true,
        data: updatedJob,
        message: 'Job application updated successfully'
      });
      
    } catch (error) {
      logger.error(`Error updating job application: ${error.message}`);
      return res.status(500).json({
        success: false,
        message: 'Error updating job application',
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
          message: 'Job ID is required'
        });
      }

      const job = await Job.findById(jobId);
      if (!job) {
        return res.status(404).json({
          success: false,
          message: 'Job application not found'
        });
      }

      if (job.user_id.toString() !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: 'Unauthorized access to this job application'
        });
      }

      await Job.findByIdAndDelete(jobId);
      
      logger.info(`Job application deleted: ${jobId}`);
      
      return res.status(200).json({
        success: true,
        message: 'Job application deleted successfully'
      });
      
    } catch (error) {
      logger.error(`Error deleting job application: ${error.message}`);
      return res.status(500).json({
        success: false,
        message: 'Error deleting job application',
        error: error.message
      });
    }
  }
}

module.exports = new ApplicationController();