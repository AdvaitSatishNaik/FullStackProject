const express = require("express");
const router = express.Router();

const {
  courseStudentCount,
  revenuePerCourse,
  topCourses,
  dashboardStats
} = require("../controllers/analyticsController");

router.get(
  "/course-student-count",
  courseStudentCount
);

router.get(
  "/revenue",
  revenuePerCourse
);

router.get(
  "/top-courses",
  topCourses
);

router.get(
  "/dashboard",
  dashboardStats
);

module.exports = router;