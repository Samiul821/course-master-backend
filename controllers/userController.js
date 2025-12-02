const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Register User
exports.registerUser = async (req, res) => {
  try {
    const {
      fullname,
      email,
      password,
      phone,
      dob,
      gender,
      profileImage,
      role,
    } = req.body;

    const existsUser = await User.findOne({ email });
    if (existsUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
      phone,
      dob,
      gender,
      profileImage,
      role: role || "student",
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Register User Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get full user data by email
exports.getUserRole = async (req, res) => {
  try {
    const { email } = req.params;

    // Find user by email, exclude password
    const user = await User.findOne({ email }).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ user });
  } catch (error) {
    console.error("Get User Data Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
