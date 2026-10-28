import express from "express"
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { placeOrder, getMyOrders, updateOrderStatus } from "../controllers/orderController.js"

const router = express.Router();
router.post("/", protect, placeOrder);
router.get("/my", protect, getMyOrders);
router.put("/:id", protect, adminOnly, updateOrderStatus);

export default router;
