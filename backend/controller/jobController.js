const express = require("express");
const jobModel = require("../models/jobModel");

// create a new Jobs
module.exports.addJobs = async (req, res) => {
  try {
    const {
      title,
      description,
      companyName,
      companyLogo,
      location,
      jobType,
      salaryRange,
      skillsRequired,
      deadline,
    } = req.body;

    // createdBy is required — get from logged-in user
    const createdBy = req.user._id;

    const newJob = await jobModel.create({
      title,
      description,
      companyName,
      companyLogo: req.file?.path,
      location,
      jobType,
      salaryRange,
      skillsRequired,
      deadline,
      createdBy, // ✅ required field
    });

    return res.status(201).json({
      success: true,
      message: "Job created successfully",
      job: newJob,
    });
  } catch (error) {
    console.error("Job creation error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while creating the job",
    });
  }
};

// Candidate can apply for a JOB
module.exports.applyJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const jobSeekerId = req.user._id;

    const job = await jobModel.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    // Prevent duplicate applications
    if (job.applicants.includes(jobSeekerId)) {
      return res
        .status(400)
        .json({ success: false, message: "Already applied" });
    }

    // ✅ Save the applicant ID into the job document
    job.applicants.push(jobSeekerId);
    await job.save();
    return res.status(200).json({
      success: true,
      message: "Thanks for applying for the job!",
      jobId,
      appliedBy: jobSeekerId,
    });
  } catch (error) {
    console.error("Apply Job Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to apply for job" });
  }
};

// getJobDetails
module.exports.getJobDetails = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await jobModel
      .findById(jobId)
      .populate("createdBy", "fullName email")
      .populate("applicants", "fullName email");

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    console.error("Get Job Details Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch job details",
    });
  }
};

// Get a single Job Details:
const mongoose = require("mongoose");

module.exports.getSingleJobDetail = async (req, res) => {
  const jobId = req.params.jobId;
  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Job ID",
    });
  }

  try {
    const jobDetails = await jobModel
      .findById(jobId)
      .populate("createdBy", "fullName email");

    if (!jobDetails) {
      return res.status(404).json({
        success: false,
        message: "Job not found!",
      });
    }

    res
      .status(200)
      .json({ success: true, jobDetails, currentUserId: req.user?._id });
  } catch (err) {
    console.error("Error fetching job:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Recruiter Dashboard to View Their Posted Jobs with Applicants
module.exports.getRecruiterJobs = async (req, res) => {
  try {
    const jobs = await jobModel
      .find({ createdBy: req.user._id })
      .populate("applicants", "fullName email");

    res.status(200).json({ success: true, jobs });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching jobs" });
  }
};

// List of Jobs that was created by a particulare recruiter user
module.exports.getJobsByRecruiters = async (req, res) => {
  try {
    const recruiterId = req.user._id;
    const jobs = await jobModel
      .find({ createdBy: recruiterId })
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    console.error("Error getting recruiter's jobs:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to load job listings",
    });
  }
};

// Delete individual jobs posted by a recruiter
module.exports.deleteJobPostById = async (req, res) => {
  try {
    const jobPostId = req.params.id;
    const deletedJob = await jobModel.findByIdAndDelete(jobPostId);
    if (!deletedJob) {
      return res.status(404).json({
        success: false,
        message: "Job not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Job delete Successfully",
    });
  } catch (error) {
    console.error("Error deleting job:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error while deleting job",
    });
  }
};

// See Who is applied for a JOB particullary
// controllers/jobController.js

module.exports.getJobApplicants = async (req, res) => {
  const { jobId } = req.params;

  try {
    const job = await jobModel.findById(jobId).populate(
      "applicants",
      "fullName email phone"
    );

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    res.status(200).json({
      success: true,
      applicants: job.applicants,
    });
  } catch (error) {
    console.error("Error getting applicants:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching applicants",
    });
  }
};
