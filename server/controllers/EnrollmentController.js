import Enrollment from "../models/EnrollmentModel.js";
import Student from "../models/StudentModel.js";
import Course from "../models/CourseModel.js";

// Create Enrollment
export const createEnrollment = async (
  req,
  res
) => {
  try {
    const {
      studentId,
      courseId,
      enrollmentDate,
      status,
    } = req.body;

    const student =
      await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    const course =
      await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const existingEnrollment =
      await Enrollment.findOne({
        studentId,
        courseId,
      });

    if (existingEnrollment) {
      return res.status(400).json({
        success: false,
        message:
          "Student already enrolled in this course",
      });
    }

    const enrollment =
      await Enrollment.create({
        studentId,
        courseId,
        enrollmentDate:
          enrollmentDate || new Date(),
        status: status || "Active",
      });

    res.status(201).json({
      success: true,
      data: enrollment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Enrollments
export const getEnrollments = async (
  req,
  res
) => {
  try {
    const enrollments =
      await Enrollment.find()
        .populate(
          "studentId",
          "name email mobile"
        )
        .populate(
          "courseId",
          "title category fees duration"
        )
        .sort({
          createdAt: -1,
        });

    res.status(200).json({
      success: true,
      count: enrollments.length,
      data: enrollments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Enrollment By Id
export const getEnrollmentById =
  async (req, res) => {
    try {
      const enrollment =
        await Enrollment.findById(
          req.params.id
        )
          .populate(
            "studentId",
            "name email mobile"
          )
          .populate(
            "courseId",
            "title category fees duration"
          );

      if (!enrollment) {
        return res.status(404).json({
          success: false,
          message:
            "Enrollment not found",
        });
      }

      res.status(200).json({
        success: true,
        data: enrollment,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// Update Enrollment
export const updateEnrollment =
  async (req, res) => {
    try {
      const enrollment =
        await Enrollment.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
            runValidators: true,
          }
        )
          .populate(
            "studentId",
            "name email mobile"
          )
          .populate(
            "courseId",
            "title category fees duration"
          );

      if (!enrollment) {
        return res.status(404).json({
          success: false,
          message:
            "Enrollment not found",
        });
      }

      res.status(200).json({
        success: true,
        data: enrollment,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// Delete Enrollment
export const deleteEnrollment =
  async (req, res) => {
    try {
      const enrollment =
        await Enrollment.findByIdAndDelete(
          req.params.id
        );

      if (!enrollment) {
        return res.status(404).json({
          success: false,
          message:
            "Enrollment not found",
        });
      }

      res.status(200).json({
        success: true,
        message:
          "Enrollment deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };