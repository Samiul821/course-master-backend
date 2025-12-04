const express = require("express");
const router = express.Router();
const {
  registerUser,
  getAllUsers,
  getUserRole,
  getUserProfile,
  updateUserByEmail,
} = require("../controllers/userController");

// Register new user
router.post("/", registerUser);

// Login user
// router.post("/login", loginUser);

// Get all users (protected)
router.get("/", getAllUsers);

// Get logged in user profile (protected)
router.get("/profile", getUserProfile);

// Get user role by email (protected)
router.get("/:email/role", getUserRole);

// Update user by email (protected)
router.patch("/update/:email", updateUserByEmail);

module.exports = router;
