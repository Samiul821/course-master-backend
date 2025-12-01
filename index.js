const express = require("express");
const app = express();
const mongoose = require("mongoose");

const mongoDB = "mongodb://127.0.0.1:27017/coursemaster";

async function connectDB() {
  try {
    await mongoose.connect(mongoDB);
    console.log("MongoDB is connected");
  } catch (error) {
    console.log("Unable to connect to the server:", error);
  }
}

connectDB();

// Middleware
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("MongoDB & Server are working!");
});

app.listen(5000, () => {
  console.log("Server is running on port: 5000");
});
