const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateAccessToken");
const { registerValidation } = require("../validators/authValidators");

// registerNewUser
module.exports.registerUser = async (req, res) => {
  try {
    // Validate incoming request body
    const { error } = registerValidation.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        messgae: error.details[0].message,
      });
    }

    // Destructure after validation
    let {
      fullName,
      email,
      password,
      bio,
      role,
      phone,
      profilePic,
      location,
      skills,
      socialLinks,
      createdAt,
    } = req.body;

    // Normalize email
    email = email.toLowerCase();

    // Check for existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const createdUser = await userModel.create({
      fullName,
      email,
      password: hashedPassword,
      bio,
      role,
      phone,
      profilePic,
      location,
      skills,
      socialLinks,
      createdAt,
    });

    // Generating AccessToken
    const token = generateToken(createdUser);
    res.cookie("token", token, { httpOnly: true });
    // Sending Resposne
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: createdUser,
      token,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again.",
    });
  }
};

// loginExistingUser
module.exports.loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;
    email = email.toLowerCase();

    // Check if a user exists with the given email
    const existingUser = await userModel.findOne({ email });

    // If no user found, return an error
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "Account not found. Please register.",
      });
    }

    // Compare provided password with hashed password in DB
    const matchCredential = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!matchCredential) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Generate JWT token using a helper function
    const token = generateToken(existingUser);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // only true in production (HTTPS)
      sameSite: "strict",
      maxAge: 15 * 60 * 1000, // 15 minutes in milliseconds
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: existingUser._id,
        fullName: existingUser.fullName,
        email: existingUser.email,
        role: existingUser.role,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again.",
    });
  }
};

// Logout User
module.exports.logoutUser = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "Strict",
      secure: process.env.NODE_ENV === "production", // true in production for HTTPS
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again.",
    });
  }
};
