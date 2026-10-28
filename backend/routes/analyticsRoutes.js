// Recommendation system endpoints
import express from "express";
import { getRecommendations, getPopularProducts } from "../controllers/analyticsController.js";

const router = express.Router();
router.get("/recommendations/:productId", getRecommendations);
router.get("/popular", getPopularProducts);

export default router;
