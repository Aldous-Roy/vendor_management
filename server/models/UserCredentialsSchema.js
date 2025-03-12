import mongoose from "mongoose";
const userCredentialsSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: true,
        unique: true  
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true  
    },
    forgotOtp: {
        type: String,
        default: ""
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const userCredentialsModel = mongoose.model("User Credential", userCredentialsSchema);
export default userCredentialsModel;
