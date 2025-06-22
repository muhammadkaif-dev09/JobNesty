const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  getUser,
  updateUser,
  getAllJobs,
} = require("../controller/userController");
const { applyJob, getSingleJobDetail } = require("../controller/jobController");

const router = express.Router();

// Adding Routes
router.get("/profile", authMiddleware, getUser);
router.put("/update", authMiddleware, updateUser);
router.post("/apply/:id", authMiddleware, applyJob);
router.get("/jobs", authMiddleware, getAllJobs);
router.get("/singleJob/:jobId", authMiddleware, getSingleJobDetail);

module.exports = router;
