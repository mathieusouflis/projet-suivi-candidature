const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/Auth.middleware");
const ApplicationController = require("../controllers/App.controller");

router.use(authMiddleware);

router.post("/", ApplicationController.createApplication);
router.get("/", ApplicationController.getAllApplications);
router.get("/:id", ApplicationController.getApplicationById);
router.put("/:id", ApplicationController.updateApplication);
router.delete("/:id", ApplicationController.deleteApplication);

module.exports = router;
