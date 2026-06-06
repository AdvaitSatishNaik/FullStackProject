const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


import studentRoutes from "./routes/StudentRoutes.js";

app.use("/students", studentRoutes);

const courseRoutes =
  require("./routes/courseRoutes");

const enrollmentRoutes =
  require("./routes/enrollmentRoutes");

const analyticsRoutes =
  require("./routes/analyticsRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/students", studentRoutes);

app.use("/courses", courseRoutes);

app.use("/enrollments", enrollmentRoutes);

app.use("/analytics", analyticsRoutes);

mongoose
  .connect("mongodb://127.0.0.1:27017/institute")
  .then(() =>
    console.log("MongoDB Connected")
  );

app.listen(5000, () =>
  console.log("Server Running On Port 5000")
);