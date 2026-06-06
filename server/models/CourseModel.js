import mongoose from "mongoose";

const CourseModel = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    fees: {
      type: Number,
      required: true,
    },

    duration: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model(
  "Course",
  CourseModel
);

export default Course;