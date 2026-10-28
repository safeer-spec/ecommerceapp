// User profile management endpoints
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getProfile, updateProfile, deleteProfile } from "../controllers/userProfile.js";

const router = express.Router();
router.get("/", protect, getProfile);
router.put("/", protect, updateProfile);
router.delete("/", protect, deleteProfile);

export default router;
