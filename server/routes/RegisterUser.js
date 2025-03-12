import express from "express";
import userCredentialsModel from "../models/UserCredentialsSchema.js";
import dotenv from 'dotenv';

const registerUser=express.Router();

dotenv.config();

registerUser.post('/registerUser', async(req,res) =>{
    const {phone,password,email}=req.body;
    try 
    {
        await userCredentialsModel.create({
          phone,
          password,
          email
        });
        return res.status(200).json({success:true});
    } 
    catch (error) 
    {
        console.log(error);
        return res.status(200).json({success:false});
    }
});
export default registerUser;