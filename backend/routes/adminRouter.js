const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { addJobs, getAllJobs } = require("../controller/jobController");
const router = express.Router();

// Adding Routes
router.post("/addjobs", authMiddleware, addJobs);


module.exports = router;
