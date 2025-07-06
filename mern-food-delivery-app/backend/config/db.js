import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "FooddeliveryMern", // Specify the correct DB name here
    });

    mongoose.connection.once("open", () => {
      console.log(`✅ MongoDB Connected to DB: ${mongoose.connection.name}`);
    });
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
};
