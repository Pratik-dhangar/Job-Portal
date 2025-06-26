import express from 'express';
import { employerGetAllApplications, jobseekerGetAllApplications, postApplication } from '../controllers/applicationController.js';
import { jobseekerDeleteApplication } from '../controllers/applicationController.js';
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/post", isAuthenticated, postApplication);
router.get("/employer/getall", isAuthenticated, employerGetAllApplications);
router.get("/jobSeeker/getall", isAuthenticated, jobseekerGetAllApplications);
router.delete("/delete/:id", isAuthenticated, jobseekerDeleteApplication);

export default router;