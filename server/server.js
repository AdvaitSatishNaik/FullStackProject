import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import studentRoutes from "./routes/StudentRoutes.js";
import courseRoutes from "./routes/CourseRoutes.js";
import enrollmentRoutes from "./routes/EnrollmentRoutes.js";
import analyticsRoutes from "./routes/AnalyticsRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/students", studentRoutes);
app.use("/courses", courseRoutes);
app.use("/enrollments", enrollmentRoutes);
app.use("/analytics", analyticsRoutes);

mongoose
  .connect("mongodb://127.0.0.1:27017/project")
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error(err);
  });

app.listen(5000, () => {
  console.log("Server Running On Port 5000");
});