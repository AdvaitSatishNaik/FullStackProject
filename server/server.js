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
  .connect("mongodb+srv://advaitnaik:BWZrOg9UKIAuuj5y@cluster0.bjl1d7f.mongodb.net/awdiz34_db")
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