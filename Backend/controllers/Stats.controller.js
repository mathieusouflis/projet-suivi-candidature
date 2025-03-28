const Job = require('../models/Job.model');
const mongoose = require('mongoose');
const logger = require('../utils/Logger.util');

class StatsController {
  getApplicationStats = async (req, res) => {
    try {
      const userId = req.user.id;
      
      const totalCount = await Job.countDocuments({ user_id: new mongoose.Types.ObjectId(userId) });
      
      const statsByStatus = await Job.aggregate([
        { $match: { user_id: new mongoose.Types.ObjectId(userId) } },
        { $group: {
            _id: '$status',
            count: { $sum: 1 }
          }
        },
        { $sort: { _id: 1 } }
      ]);
      
      const statusStats = {
        'Need to apply': 0,
        'Pending': 0,
        'Interview': 0,
        'Technical Test': 0,
        'Accepted': 0,
        'Rejected': 0
      };
      
      statsByStatus.forEach(stat => {
        statusStats[stat._id] = stat.count;
      });
      
      const statsByMonth = await Job.aggregate([
        { $match: { 
            user_id: new mongoose.Types.ObjectId(userId),
            createdAt: { 
              $gte: new Date(new Date().setMonth(new Date().getMonth() - 5)), 
              $lte: new Date() 
            }
          }
        },
        { $group: {
            _id: { 
              month: { $month: '$createdAt' },
              year: { $year: '$createdAt' }
            },
            count: { $sum: 1 }
          }
        },
        { $sort: { '_id.year': 1, '_id.month': 1 } }
      ]);

      const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 
        'July', 'August', 'September', 'October', 'November', 'December'
      ];

      const monthlyStats = statsByMonth.map(stat => ({
        month: months[stat._id.month - 1],
        desktop: stat.count
      }));

      const currentDate = new Date();
      const last6Months = Array.from({ length: 6 }, (_, i) => {
        const d = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
        return months[d.getMonth()];
      }).reverse();

      const completeMonthlyStats = last6Months.map(month => {
        const existingStat = monthlyStats.find(stat => stat.month === month);
        return existingStat || { month, desktop: 0 };
      });

      return res.status(200).json({
        success: true,
        data: {
          total: totalCount,
          byStatus: statusStats,
          byMonth: completeMonthlyStats
        }
      });
      
    } catch (error) {
      logger.error(`Error fetching statistics: ${error.message}`);
      return res.status(500).json({
        success: false,
        message: 'Error fetching statistics',
        error: error.message
      });
    }
  }
}

module.exports = new StatsController();