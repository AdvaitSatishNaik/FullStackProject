import express from "express";

import {
  courseStudentCount,
  revenuePerCourse,
  topCourses,
  dashboardStats,
} from "../controllers/AnalyticsController.js";

const router = express.Router();

// Course Wise Student Count
router.get(
  "/course-student-count",
  courseStudentCount
);

// Revenue Per Course
router.get(
  "/revenue",
  revenuePerCourse
);

// Top 3 Most Popular Courses
router.get(
  "/top-courses",
  topCourses
);

// Dashboard Statistics
router.get(
  "/dashboard",
  dashboardStats
);

export default router;