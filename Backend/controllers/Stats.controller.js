const Job = require('../models/Job.model');
const mongoose = require('mongoose');
const logger = require('../utils/Logger.util');

class StatsController {
  getApplicationStats = async (req, res) => {
    try {
      const userId = req.user.id;
      
      const totalCount = await Job.countDocuments({ user_id: userId });
      
      const statsByStatus = await Job.aggregate([
        { $match: { user_id: mongoose.Types.ObjectId(userId) } },
        { $group: {
            _id: '$status',
            count: { $sum: 1 }
          }
        },
        { $sort: { _id: 1 } }
      ]);
      
      const statusStats = {
        'En attente': 0,
        'Acceptée': 0,
        'Refusée': 0
      };
      
      statsByStatus.forEach(stat => {
        statusStats[stat._id] = stat.count;
      });
      
      const statsByCompany = await Job.aggregate([
        { $match: { user_id: mongoose.Types.ObjectId(userId) } },
        { $group: {
            _id: '$company',
            count: { $sum: 1 }
          }
        },
        { $sort: { count: -1 } },
        { $limit: 5 }
      ]);
      
      const toRemind = await Job.countDocuments({
        user_id: userId,
        status: 'En attente',
        updatedAt: { 
          $lt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) 
        }
      });
      
      const statsByType = await Job.aggregate([
        { $match: { user_id: mongoose.Types.ObjectId(userId) } },
        { $group: {
            _id: '$type',
            count: { $sum: 1 }
          }
        }
      ]);
      
      const typeStats = {
        'Stage': 0,
        'Alternance': 0,
        'Emploi': 0
      };
      
      statsByType.forEach(stat => {
        typeStats[stat._id] = stat.count;
      });
      
      const statsByMonth = await Job.aggregate([
        { $match: { user_id: mongoose.Types.ObjectId(userId) } },
        { $project: {
            month: { $month: '$datePostulation' },
            year: { $year: '$datePostulation' },
            status: 1
          }
        },
        { $group: {
            _id: { month: '$month', year: '$year', status: '$status' },
            count: { $sum: 1 }
          }
        },
        { $sort: { '_id.year': 1, '_id.month': 1 } }
      ]);
      
      return res.status(200).json({
        success: true,
        data: {
          total: totalCount,
          byStatus: statusStats,
          byType: typeStats,
          byCompany: statsByCompany,
          toRemind: toRemind,
          byMonth: statsByMonth
        }
      });
      
    } catch (error) {
      logger.error(`Erreur lors de la récupération des statistiques: ${error.message}`);
      return res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération des statistiques',
        error: error.message
      });
    }
  }
}

module.exports = new StatsController();