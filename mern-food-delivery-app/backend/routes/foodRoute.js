import express from 'express';
import { addFood, listFood, removeFood } from '../controllers/foodController.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const foodRouter = express.Router();

// 🔐 Optionally add adminMiddleware for protected routes
// import adminMiddleware from '../middleware/admin.js'

// Image Storage Engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'uploads';
    // Ensure the uploads directory exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// Routes
foodRouter.post('/add', upload.single('image'), addFood); // Add `adminMiddleware` if needed
foodRouter.get('/list', listFood);
foodRouter.post('/remove', removeFood); // Also should ideally be protected

export default foodRouter;
