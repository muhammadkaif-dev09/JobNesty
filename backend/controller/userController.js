const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jobModel = require("../models/jobModel");


// Fetch User Profile
module.exports.getUser = (req, res) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized. Please login again.",
    });
  }

  res.status(200).json({
    success: true,
    user: req.user,
  });
};

// Update User Profile
module.exports.updateUser = async (req, res) => {
  try {
    const userId = req.user._id;

    const updatedData = {
      fullName: req.body.fullName,
      bio: req.body.bio,
      role: req.body.role,
      phone: req.body.phone,
      location: req.body.location,
      skills: req.body.skills ? JSON.parse(req.body.skills) : [],
      socialLinks: req.body.socialLinks ? JSON.parse(req.body.socialLinks) : {},
    };

    // ✅ Cloudinary image URL
    if (req.file && req.file.path) {
      updatedData.profilePic = req.file.path;
    }

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      updatedData.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedUser = await userModel
      .findByIdAndUpdate(userId, updatedData, {
        new: true,
        runValidators: true,
      })
      .select("-password");

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while updating",
    });
  }
};

// fetch all Jobs
module.exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await jobModel
      .find()
      .populate("createdBy", "fullName email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    console.error("Error fetching jobs:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error while fetching jobs",
    });
  }
};
