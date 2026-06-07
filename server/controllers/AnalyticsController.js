import Enrollment from "../models/EnrollmentModel.js";
import Student from "../models/StudentModel.js";
import Course from "../models/CourseModel.js";


export const courseStudentCount = async (
  req,
  res
) => {
  try {
    const data = await Enrollment.aggregate([
      {
        $lookup: {
          from: "courses",
          localField: "courseId",
          foreignField: "_id",
          as: "course",
        },
      },
      {
        $unwind: "$course",
      },
      {
        $group: {
          _id: "$course.title",
          totalStudents: {
            $sum: 1,
          },
        },
      },
      {
        $project: {
          _id: 0,
          courseName: "$_id",
          totalStudents: 1,
        },
      },
    ]);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



export const revenuePerCourse = async (
  req,
  res
) => {
  try {
    const data = await Enrollment.aggregate([
      {
        $lookup: {
          from: "courses",
          localField: "courseId",
          foreignField: "_id",
          as: "course",
        },
      },
      {
        $unwind: "$course",
      },
      {
        $group: {
          _id: "$course.title",
          revenue: {
            $sum: "$course.fees",
          },
        },
      },
      {
        $project: {
          _id: 0,
          courseName: "$_id",
          revenue: 1,
        },
      },
    ]);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const topCourses = async (
  req,
  res
) => {
  try {
    const data = await Enrollment.aggregate([
      {
        $lookup: {
          from: "courses",
          localField: "courseId",
          foreignField: "_id",
          as: "course",
        },
      },
      {
        $unwind: "$course",
      },
      {
        $group: {
          _id: "$course.title",
          totalEnrollments: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          totalEnrollments: -1,
        },
      },
      {
        $limit: 3,
      },
      {
        $project: {
          _id: 0,
          courseName: "$_id",
          totalEnrollments: 1,
        },
      },
    ]);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const dashboardStats = async (
  req,
  res
) => {
  try {
    const totalStudents =
      await Student.countDocuments();

    const totalCourses =
      await Course.countDocuments();

    const totalEnrollments =
      await Enrollment.countDocuments();

    const revenueResult =
      await Enrollment.aggregate([
        {
          $lookup: {
            from: "courses",
            localField: "courseId",
            foreignField: "_id",
            as: "course",
          },
        },
        {
          $unwind: "$course",
        },
        {
          $group: {
            _id: null,
            totalRevenue: {
              $sum: "$course.fees",
            },
          },
        },
      ]);

    const totalRevenue =
      revenueResult.length > 0
        ? revenueResult[0].totalRevenue
        : 0;

    res.status(200).json({
      totalStudents,
      totalCourses,
      totalEnrollments,
      totalRevenue,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};