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
      companyLogo,
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

    job.applicants.push(jobSeekerId);
    await job.save();
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
module.exports.getSingleJobDetail = async (req, res) => {
  const jobId = req.params.jobId; // ✅ This matches your route param
  try {
    const jobDetails = await jobModel.findById(jobId);
    if (!jobDetails) {
      return res.status(404).json({
        success: false,
        message: "Job not found!",
      });
    }
    res.status(200).json({ success: true, jobDetails });
  } catch (err) {
    console.error(err);
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
