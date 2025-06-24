const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  addJobs,
  getJobsByRecruiters,
  deleteJobPostById,
  getJobApplicants,
} = require("../controller/jobController");
const upload = require("../middleware/uploadMiddleware");
const router = express.Router();

// Adding Routes
router.post("/addjobs", authMiddleware, upload.single("companyLogo"), addJobs);
router.get("/my-jobs", authMiddleware, getJobsByRecruiters);
router.delete("/delete-jobPost/:id", authMiddleware, deleteJobPostById);
router.get("/job-applicants/:jobId", authMiddleware, getJobApplicants);

module.exports = router;
