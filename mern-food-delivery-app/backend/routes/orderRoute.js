import express from "express";
import authMiddleware from './../middleware/auth.js';
import {
  placeOrder,
  verifyOrder,
  userOrders,
  listOrders,
  updateStatus
} from "../controllers/orderController.js";

const orderRouter = express.Router();

// Protected Routes (Requires user login)
orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verify", authMiddleware, verifyOrder); // ✅ Secure this too
orderRouter.post("/userorders", authMiddleware, userOrders);

// Admin Routes (Optional: Add admin middleware if needed)
orderRouter.get("/list", listOrders); // Consider protecting with admin auth
orderRouter.post("/status", updateStatus); // Same here

export default orderRouter;
