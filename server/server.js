import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import StudentRoutes from "./routes/StudentRoutes.js";
import CourseRoutes from "./routes/CourseRoutes.js";
import EnrollmentRoutes from "./routes/EnrollmentRoutes.js";
import AnalyticsRoutes from "./routes/AnalyticsRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/students", StudentRoutes);
app.use("/courses", CourseRoutes);
app.use("/enrollments", EnrollmentRoutes);
app.use("/analytics", AnalyticsRoutes);

mongoose
  .connect("mongodb://127.0.0.1:27017/project")
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error(err);
  });

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});