const express = require('express');
const router = express.Router();
const ContactController = require('../controllers/Contact.controller');
const authMiddleware = require('../middleware/Auth.middleware');

router.use(authMiddleware);

router.post('/', ContactController.createContact);
router.get('/', ContactController.getAllContacts);
router.get('/:id', ContactController.getContactById);
router.put('/:id', ContactController.updateContact);
router.delete('/:id', ContactController.deleteContact);

module.exports = router;