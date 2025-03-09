import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from "mongoose";
import cookieParser from 'cookie-parser';

const app = express();

dotenv.config();
const MONGO_URI=process.env.MONGO_URI;
const PORT=3000;

const corsOptions = {
    origin: (origin, callback) => {
        const allowedOrigins = [
            'http://localhost:5174',
            'http://localhost:5173',];
        if (!origin || allowedOrigins.includes(origin))
            callback(null, true);
        else
            callback(new Error('Not allowed by CORS'));
        },
    credentials: true,  
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

const connectDB = async () => {
    try 
    {
      await mongoose.connect(MONGO_URI);
      console.log("Server is connected to Mongo DB database");
    } 
    catch (err) 
    {
      console.error('MongoDB connection error:', err);
    }
};
connectDB();

app.get('/', (req, res) => {
    res.send("Server is running");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});