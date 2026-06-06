const Enrollment = require("../models/Enrollment");
const Student = require("../models/Student");
const Course = require("../models/Course");


// =========================================
// 1. Course Wise Student Count
// =========================================

exports.courseStudentCount = async (req, res) => {
  try {
    const data = await Enrollment.aggregate([
      {
        $lookup: {
          from: "courses",
          localField: "courseId",
          foreignField: "_id",
          as: "course"
        }
      },
      {
        $unwind: "$course"
      },
      {
        $group: {
          _id: "$course.title",
          totalStudents: {
            $sum: 1
          }
        }
      },
      {
        $project: {
          _id: 0,
          courseName: "$_id",
          totalStudents: 1
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


// =========================================
// 2. Revenue Generated Per Course
// =========================================

exports.revenuePerCourse = async (req, res) => {
  try {
    const data = await Enrollment.aggregate([
      {
        $lookup: {
          from: "courses",
          localField: "courseId",
          foreignField: "_id",
          as: "course"
        }
      },
      {
        $unwind: "$course"
      },
      {
        $group: {
          _id: "$course.title",
          revenue: {
            $sum: "$course.fees"
          }
        }
      },
      {
        $project: {
          _id: 0,
          courseName: "$_id",
          revenue: 1
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


// =========================================
// 3. Top 3 Most Popular Courses
// =========================================

exports.topCourses = async (req, res) => {
  try {
    const data = await Enrollment.aggregate([
      {
        $lookup: {
          from: "courses",
          localField: "courseId",
          foreignField: "_id",
          as: "course"
        }
      },
      {
        $unwind: "$course"
      },
      {
        $group: {
          _id: "$course.title",
          totalEnrollments: {
            $sum: 1
          }
        }
      },
      {
        $sort: {
          totalEnrollments: -1
        }
      },
      {
        $limit: 3
      },
      {
        $project: {
          _id: 0,
          courseName: "$_id",
          totalEnrollments: 1
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


// =========================================
// 4. Dashboard Statistics
// =========================================

exports.dashboardStats = async (req, res) => {
  try {

    const totalStudents =
      await Student.countDocuments();

    const totalCourses =
      await Course.countDocuments();

    const totalEnrollments =
      await Enrollment.countDocuments();

    const revenueData =
      await Enrollment.aggregate([
        {
          $lookup: {
            from: "courses",
            localField: "courseId",
            foreignField: "_id",
            as: "course"
          }
        },
        {
          $unwind: "$course"
        },
        {
          $group: {
            _id: null,
            totalRevenue: {
              $sum: "$course.fees"
            }
          }
        }
      ]);

    const totalRevenue =
      revenueData.length > 0
        ? revenueData[0].totalRevenue
        : 0;

    res.status(200).json({
      success: true,
      data: {
        totalStudents,
        totalCourses,
        totalEnrollments,
        totalRevenue
      }
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};