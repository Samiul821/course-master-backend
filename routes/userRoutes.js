// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const {
  registerUser,
  getAllUsers,
  getUserRole,
} = require("../controllers/userController");

router.post("/", registerUser); // Register
router.get("/", getAllUsers); // Get all users
router.get('/:email/role', getUserRole)

module.exports = router;
