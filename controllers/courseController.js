const Course = require("../models/Course");

// =========================
// CREATE NEW COURSE
// =========================
exports.createCourse = async (req, res) => {
  try {
    const courseData = req.body;

    // Required fields validation
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
      "distributor_name",
      "distributor_email",
    ];

    for (const field of requiredFields) {
      if (!courseData[field]) {
        return res
          .status(400)
          .json({ success: false, message: `${field} is required` });
      }
    }

    // Free courses must have price 0
    if (courseData.accessType === "Free") {
      courseData.price = 0;
    }

    const newCourse = await Course.create(courseData);

    return res.status(201).json({ success: true, course: newCourse });
  } catch (error) {
    console.error("[createCourse] Error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// =========================
// GET ALL COURSES
// =========================
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, courses });
  } catch (error) {
    console.error("[getCourses] Error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// =========================
// GET SINGLE COURSE BY ID
// =========================
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }
    return res.status(200).json({ success: true, course });
  } catch (error) {
    console.error("[getCourseById] Error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// =========================
// UPDATE COURSE
// =========================
exports.updateCourse = async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedCourse) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    return res.status(200).json({ success: true, course: updatedCourse });
  } catch (error) {
    console.error("[updateCourse] Error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// =========================
// DELETE COURSE
// =========================
exports.deleteCourse = async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);

    if (!deletedCourse) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Course deleted successfully" });
  } catch (error) {
    console.error("[deleteCourse] Error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
