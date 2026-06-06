import express from 'express';
// 1. Make sure this import line is present at the top!
import * as EnrollementController from '../controller/StudentController.js';

const router = express.Router();
// Get student by id
router.get("/enrolledstudent/:id", EnrollementController.getStudentById);

// Get student by course id
router.get("/enrolledstudent/course/:id", EnrollementController.getStudentByCourseId);

// Get student by Enrollement Date
router.get("/enrolledstudent/date/:date", EnrollementController.getStudentByEnrollementDate);

// Get student by status
router.get("/enrolledstudent/status/:status", EnrollementController.getStudentByStatus);

export default router;  
