const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Register User
exports.registerUser = async (req, res) => {
  try {
    const { fullname, email, password, phone, dob, gender, profileImage } =
      req.body;

    //   Check if user already exists
    const existsUser = await User.findOne({ email });
    if (existsUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Has password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      fullname,
      email,
      password: hashedPassword,
      phone,
      dob,
      gender,
      profileImage,
    });

    res.status(201).json({ message: "User registerd successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
