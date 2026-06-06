import express from 'express';
// 1. Make sure this import line is present at the top!
import * as StudentController from '../controller/StudentController.js'; 

const router = express.Router();
// Get all courses
router.get("/allCourses", CourseController.getAllCourses);

// Get a course by ID
router.get("/course/:id", CourseController.getCourseById);

// Create a new course  
router.post("/createcourse", CourseController.createCourse);

// Update a course by ID
router.put("/updatecourse/:id", CourseController.updateCourse);

// Delete a course by ID
router.delete("/course/:id", CourseController.deleteCourse);
export default router;  
