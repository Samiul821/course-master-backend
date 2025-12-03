const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    courseTitle: { type: String, required: true },
    shortDescription: { type: String, required: true },
    detailedDescription: { type: String, required: true },
    category: { type: String, required: true },
    instructorName: { type: String, required: true },
    instructorBio: { type: String }, // Optional
    courseDuration: { type: Number, required: true },
    durationUnit: {
      type: String,
      enum: ["hours", "days", "weeks", "months"],
      default: "weeks",
    },
    courseLevel: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
    language: {
      type: String,
      enum: ["English", "Spanish", "French", "German", "Chinese"],
      default: "English",
    },
    courseType: {
      type: String,
      enum: ["Online", "Offline", "Hybrid"],
      default: "Online",
    },
    startDate: { type: Date, required: true },
    price: { type: Number, default: 0 },
    accessType: { type: String, enum: ["Free", "Paid"], default: "Paid" },
    learningOutcomes: { type: String, required: true },
    courseThumbnail: { type: String }, // URL
    prerequisites: { type: String }, // Optional
    syllabus: { type: String }, // Optional
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
