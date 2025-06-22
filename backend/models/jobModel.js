const mongoose = require("mongoose");
const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  companyName: { type: String, required: true },
  companyLogo: String,
  location: String,
  jobType: {
    type: String,
    enum: ["Full-time", "Part-time", "Internship", "Remote"],
    default: "Full-time",
  },
  salaryRange: String,
  skillsRequired: [String],
  deadline: Date,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  applicants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Job", jobSchema);
