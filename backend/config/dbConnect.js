const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const dataBaseConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.log("❌ MongoDB Connection failed: ", error.message);
    process.exit(1);
  }
};

module.exports = dataBaseConnect;
