const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token; // Assuming you're storing token in HTTP-only cookie

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    // Verify and decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // JWT_SECRET should be in .env

    // Find user in DB and exclude password field
    const user = await userModel.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    req.user = user; // Attach user data to request object
    next(); // Move to the next middleware/controller
  } catch (error) {
    console.error("JWT verification error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

module.exports = authMiddleware;
