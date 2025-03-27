const express = require('express');
const router = express.Router();

const applicationRoutes = require('./Application.routes');
const userRoutes = require('./User.routes');
const statsRoutes = require('./Stats.routes');
const reminderRoutes = require('./Reminder.routes');
const contactRoutes = require('./Contact.routes');
const authRoutes = require('./Auth.routes');

router.use('/applications', applicationRoutes);
router.use('/users', userRoutes);
router.use('/stats', statsRoutes);
router.use('/reminders', reminderRoutes);
router.use('/contacts', contactRoutes);
router.use('/auth', authRoutes);

router.get('/', (req, res) => { 
  res.status(200).json({ 
    status: 'API is running',
    version: '1.0.0',
    documentation: '/api-docs'
  });
});

router.use('*', (req, res) => { 
  res.status(404).json({ 
    success: false,
    error: 'Route not found' 
  });
});

module.exports = router;