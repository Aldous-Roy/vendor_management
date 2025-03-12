import express from "express";
import userCredentialsModel from "../models/UserCredentialsSchema.js";
import dotenv from 'dotenv';

const authUser=express.Router();

dotenv.config();
//const SECRET_KEY=process.env.JWT_KEY;

authUser.post('/authUser', async(req,res) =>{
    const {phone,password}=req.body;
    try 
    {  
        const record = await userCredentialsModel.findOne({ phone });
        if (!record)
            return res.status(200).json({success: false, message: 'The phone number is not registered.' })
        if (record.password === password)
        {
            /*
            const token = jwt.sign({ phone }, SECRET_KEY, { expiresIn: '1hr' });
            res.cookie('VendorAuthToken', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 3600000,
            });
            */
            return res.status(200).json({success: true, message: 'Signing in to your account...' });
        }
        else
            return res.status(200).json({success: false, message: 'The password is incorrect.' });
    } 
    catch (error) 
    {
        console.log(error);
        return res.status(200).json({success: false, message: 'Error in signing into account. Please try again !' });
    }
});
export default authUser;