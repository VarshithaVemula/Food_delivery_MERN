import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

// ✅ Load environment variables
dotenv.config();

// ✅ Connect to MongoDB
connectDB();

// ✅ Initialize Express
const app = express();
const port = process.env.PORT || 4000;

// ✅ Middleware
app.use(express.json()); // Parse JSON

// ✅ CORS config for frontend → backend connection
app.use(
  cors({
    origin: process.env.CLIENT_URL, // e.g. https://pickme-frontend.onrender.com
    credentials: true,
  })
);

// ✅ API routes
app.use('/api/food', foodRouter);
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

// ✅ Static image hosting
app.use('/images', express.static('uploads'));

// ✅ Test route
app.get('/', (req, res) => {
  res.send('API working ✅');
});

// ✅ Start server
app.listen(port, () => {
  console.log(`🚀 Server started on http://localhost:${port}`);
});
