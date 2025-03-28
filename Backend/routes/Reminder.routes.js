const express = require('express');
const router = express.Router();
const ReminderController = require('../controllers/Reminder.controller');
const authMiddleware = require('../middleware/Auth.middleware');

router.use(authMiddleware);

router.get('/', ReminderController.getJobsToRemind);
router.put('/:id/meeting', ReminderController.setMeetingDate);
router.put('/:id/test', ReminderController.setTestDate);

module.exports = router;