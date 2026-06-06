import express from 'express';
import StudentController from '../controllers/StudentController.js'; 

const router = express.Router();
// Get all students
router.get("/allstudents", StudentController.getAllStudents);

// Get a student by ID
router.get("/student/:id", StudentController.getStudentById);

// Create a new student
router.post("/createstudent", StudentController.createStudent);

// Update a student by ID
router.put("/updatestudent/:id", StudentController.updateStudent);

// Delete a student by ID
router.delete("/student/:id", StudentController.deleteStudent);
export default router;  
