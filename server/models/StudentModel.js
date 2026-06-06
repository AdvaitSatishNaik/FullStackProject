import mongoose from "mongoose";

const StudentModel = new mongoose.Schema(
  {
    name: String,
    email: String,
    mobile: String,
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model(
  "Student",
  StudentModel
);

export default Student;