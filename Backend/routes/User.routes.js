const express = require("express");
const router = express.Router();
const UserController = require("../controllers/User.controller");
const authMiddleware = require("../middleware/Auth.middleware");

router.use(authMiddleware);

router.get("/profile", UserController.getProfile);
router.put("/profile", UserController.updateProfile);

module.exports = router;
