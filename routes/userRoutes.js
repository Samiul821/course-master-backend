const express = require("express");
const router = express.Router();
const {
  registerUser,
  getAllUsers,
  getUserRole,
  getUserProfile,
  updateUserByEmail,
} = require("../controllers/userController");
const { loginUser } = require("../controllers/authController");
const verifyToken = require("../middleware/verifyToken");

// Register new user
router.post("/", registerUser);

// Login user
router.post("/login", loginUser);

// Get all users (protected)
router.get("/", verifyToken, getAllUsers);

// Get logged in user profile (protected)
router.get("/profile", verifyToken, getUserProfile);

// Get user role by email (protected)
router.get("/:email/role", verifyToken, getUserRole);

// Update user by email (protected)
router.patch("/update/:email", verifyToken, updateUserByEmail);

module.exports = router;
