// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const {
  registerUser,
  getAllUsers,
  getUserRole,
  getUserProfile,
  updateUserByEmail,
} = require("../controllers/userController");

// Route for registering a new user
router.post("/", registerUser);

// // Route to get all users
router.get("/", getAllUsers);

// Static routes should come before dynamic routes
router.get("/profile", getUserProfile);

// Dynamic route for getting a user's role
router.get("/:email/role", getUserRole);

// Route for updating a user by email
router.patch("/update/:email", updateUserByEmail);

module.exports = router;
