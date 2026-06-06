import express from 'express';   
import dotev from 'dotenv';
dotev.config();
import mongoose from 'mongoose';
import Router from 'express';
const app = express();
const PORT = process.env.PORT || 5001;
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

// Mock data for courses

let courses = [
    { id: 1, title: 'Mathematics', credits: 3 },
    { id: 2, title: 'Physics', credits: 4 },
    { id: 3, title: 'Chemistry', credits: 3 },
    { id: 4, title: 'Biology', credits: 4 },
];

// Get all courses
export const getAllCourses = (req, res) => {
    res.json(courses);
};

// Get a course by ID
export const getCourseById = (req, res) => {
    const courseId = parseInt(req.params.id);
    const course = courses.find(c => c.id === courseId);
    if (course) {
        res.json(course);
    } else {
        res.status(404).json({ message: 'Course not found' });
    }
};

// Create a new course
export const createCourse = (req, res) => {
    const { title, credits } = req.body;
    const newCourse = {
        id: courses.length + 1,
        title,
        credits
    };
    courses.push(newCourse);
    res.status(201).json(newCourse);
};

// Update a course by ID
export const updateCourse = (req, res) => {
    const courseId = parseInt(req.params.id);
    const { title, credits } = req.body;
    const courseIndex = courses.findIndex(c => c.id === courseId);
    if (courseIndex !== -1) {
        courses[courseIndex] = { id: courseId, title, credits };
        res.json(courses[courseIndex]);
    } else {
        res.status(404).json({ message: 'Course not found' });
    }
};

// Delete a course by ID
export const deleteCourse = (req, res) => {
    const courseId = parseInt(req.params.id);
    const courseIndex = courses.findIndex(c => c.id === courseId);
    if (courseIndex !== -1) {
        const deletedCourse = courses.splice(courseIndex, 1);
        res.json(deletedCourse[0]);
    } else {
        res.status(404).json({ message: 'Course not found' });
    }
};      

export default CourseController;
