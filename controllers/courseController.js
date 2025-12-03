const Course = require("../models/Course");

// Create a new course
exports.createCourse = async (req, res) => {
  try {
    const courseData = req.body;

    // Simple validation (frontend also validates, but backend double-check)
    const requiredFields = [
      "courseTitle",
      "shortDescription",
      "detailedDescription",
      "category",
      "instructorName",
      "courseDuration",
      "courseLevel",
      "language",
      "courseType",
      "startDate",
      "accessType",
      "learningOutcomes",
    ];

    for (let field of requiredFields) {
      if (!courseData[field]) {
        return res
          .status(400)
          .json({ success: false, message: `${field} is required` });
      }
    }

    // For free courses, ensure price is 0
    if (courseData.accessType === "Free") {
      courseData.price = 0;
    }

    const newCourse = new Course(courseData);
    await newCourse.save();

    res.status(201).json({ success: true, course: newCourse });
  } catch (error) {
    console.error("[createCourse] Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get all courses
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, courses });
  } catch (error) {
    console.error("[getCourses] Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get single course by ID
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course)
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });

    res.status(200).json({ success: true, course });
  } catch (error) {
    console.error("[getCourseById] Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update a course
exports.updateCourse = async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCourse)
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });

    res.status(200).json({ success: true, course: updatedCourse });
  } catch (error) {
    console.error("[updateCourse] Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Delete a course
exports.deleteCourse = async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    if (!deletedCourse)
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });

    res
      .status(200)
      .json({ success: true, message: "Course deleted successfully" });
  } catch (error) {
    console.error("[deleteCourse] Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
