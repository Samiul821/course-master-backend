require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const mongoDB = process.env.MONGO_URI;

// MongoDB connection
async function connectDB() {
  try {
    await mongoose.connect(mongoDB);
    console.log("MongoDB is connected");
  } catch (error) {
    console.log("Unable to connect to the server:", error);
  }
}
connectDB();

// Test route
app.get("/", (req, res) => {
  res.send("MongoDB & Server are working!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
