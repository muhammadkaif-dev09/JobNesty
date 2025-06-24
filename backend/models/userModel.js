const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: Number,
  bio: String,
  location: String,
  role: {
    type: String,
    enum: ["job_seeker", "recruiter"],
    default: "job_seeker",
  },
  profilePic: {
    type: String,
    default: function () {
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(
        this.fullName
      )}&background=random&color=fff&bold=true`;
    },
  },
  skills: [String],
  socialLinks: {
    linkedin: String,
    github: String,
    portfolio: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
