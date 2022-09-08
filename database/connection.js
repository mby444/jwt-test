import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGO_URI, (err) => {
    if (err) throw err;
    console.log("MongoDB connected!");
});