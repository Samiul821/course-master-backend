// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const {
  registerUser,
  getAllUsers,
  getUserRole,
  getUserProfile,
} = require("../controllers/userController");

router.post("/", registerUser); // Register
router.get("/", getAllUsers); // Get all users
router.get('/:email/role', getUserRole)
router.get("/profile", getUserProfile)

module.exports = router;
