import express from "express";

import {
  createEnrollment,
  getEnrollments,
  getEnrollmentById,
  updateEnrollment,
  deleteEnrollment,
} from "../controllers/enrollmentController.js";

const router = express.Router();

router.post("/", createEnrollment);

router.get("/", getEnrollments);

router.get("/:id", getEnrollmentById);

router.put("/:id", updateEnrollment);

router.delete("/:id", deleteEnrollment);

export default router;