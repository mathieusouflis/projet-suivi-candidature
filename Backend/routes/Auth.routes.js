const express = require('express');
const router = express.Router();
const UserController = require('../controllers/User.controller');
const authMiddleware = require('../middleware/Auth.middleware');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/me', authMiddleware, UserController.getProfile);
router.put('/me', authMiddleware, UserController.updateProfile);
router.get('/verify', authMiddleware, UserController.verifyToken);

module.exports = router;