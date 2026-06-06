import express from 'express';   
import dotev from 'dotenv';
dotev.config();
import mongoose from 'mongoose';
import Router from 'express';

const app = express();
const PORT = process.env.PORT || 5000;
const router = express.Router();

// Middleware
app.use(express.json());



// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB', err);
    });             

// Mock data for students
let students = [
    { id: 1, name: 'John Doe', age: 20 },
    { id: 2, name: 'Jane Smith', age: 22 },
    { id: 3, name: 'Bob Johnson', age: 21 },
    { id: 4, name: 'Alice Williams', age: 23 },
];

// Get all students
export const getAllStudents = (req, res) => {
    res.json(students);
};

// Get a student by ID
export const getStudentById = (req, res) => {
    const studentId = parseInt(req.params.id);
    const student = students.find(s => s.id === studentId);
    if (student) {
        res.json(student);
    } else {
        res.status(404).json({ message: 'Student not found' });
    }
};

// Create a new student
export const createStudent = (req, res) => {
    const { name, age } = req.body;
    const newStudent = {
        id: students.length + 1,
        name,
        age
    };
    students.push(newStudent);
    res.status(201).json(newStudent);
};

// Update a student by ID
export const updateStudent = (req, res) => {
    const studentId = parseInt(req.params.id);
    const { name, age } = req.body;
    const studentIndex = students.findIndex(s => s.id === studentId);
    if (studentIndex !== -1) {
        students[studentIndex] = { id: studentId, name, age };
        res.json(students[studentIndex]);
    } else {
        res.status(404).json({ message: 'Student not found' });
    }
};

// Delete a student by ID
export const deleteStudent = (req, res) => {
    const studentId = parseInt(req.params.id);
    const studentIndex = students.findIndex(s => s.id === studentId);
    if (studentIndex !== -1) {
        const deletedStudent = students.splice(studentIndex, 1);
        res.json(deletedStudent[0]);
    } else {
        res.status(404).json({ message: 'Student not found' });
    }
};      

export default StudentController;
