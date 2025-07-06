import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

// ✅ Load environment variables from .env
dotenv.config();

// ✅ App configuration
const app = express();
const port = process.env.PORT || 4000;

// ✅ Middleware
app.use(express.json());
app.use(cors());

// ✅ Database connection
connectDB();

// ✅ API Endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// ✅ Test route
app.get("/", (req, res) => {
    res.send("API working");
});

// ✅ Start server
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
