const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

// Get user role by email
exports.getUserRole = async (req, res) => {
  try {
    const { email } = req.params;

    const user = await User.findOne({ email }).select("role");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      user: {
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Get User Data Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get user profile by email (query param)
exports.getUserProfile = async (req, res) => {
  try {
    const { email } = req.query; // note: query param

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email }).select("-password"); // exclude password
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ user });
  } catch (error) {
    console.error("Get User Profile Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.updateUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const { fullName, phone, dob, gender, profileImage } = req.body;

    console.log("Update request body:", req.body);

    const updatedUser = await User.findOneAndUpdate(
      { email },
      {
        ...(fullName && { fullname: fullName }),
        ...(phone && { phone }),
        ...(dob && { dob: new Date(dob) }),
        ...(gender && { gender }),
        ...(profileImage !== undefined && { profileImage }),
      },
      { new: true } // return the updated document
    );

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    res.json({ success: true, user: updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
