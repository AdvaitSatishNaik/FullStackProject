import express from 'express';
import dotenv from 'dotenv';    
import mongoose from 'mongoose';
import studentRoutes from './routes/StudentRoutes.js';
import userRoutes from './routes/StudentRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());

// Routes
app.use('/api', studentRoutes);
app.use('/api', userRoutes);

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
