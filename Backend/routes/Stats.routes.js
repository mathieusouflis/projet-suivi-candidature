const express = require("express");
const router = express.Router();
const StatsController = require("../controllers/Stats.controller");
const authMiddleware = require("../middleware/Auth.middleware");

router.use(authMiddleware);

router.get("/", StatsController.getApplicationStats);

module.exports = router;
