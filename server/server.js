import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from "mongoose";
import cookieParser from 'cookie-parser';

//importing routes
import authUser from './routes/AuthUser.js';
import registerUser from './routes/RegisterUser.js';

const app = express();

//extracting env
dotenv.config();
const MONGO_URI=process.env.MONGO_URI;
const PORT=3000;

//resolving cors errors
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

//using some middlewares
app.use(express.json());
app.use(cookieParser());

//Using Routes
app.use(authUser);
app.use(registerUser);

//connecting to mongodb
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