const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controller/authController");
const router = express.Router();

// Adding the Routes
router.get("/", (req, res) => {
  res.send("Home Page router");
});

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

module.exports = router;
