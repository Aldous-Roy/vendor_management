import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/company logo.png";

const Signup = () => {
    const [formData, setFormData] = useState({ name: "", email: "", phone: "", password: "", role: "vendor" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // try {
        //     await axios.post("http://localhost:5000/signup", formData);
        //     navigate("/login");
        // } catch (err) {
        //     alert("Error: " + err.response?.data?.msg);
        // }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-900">
            <div className="bg-gray-800 bg-opacity-90 p-8 rounded-3xl shadow-lg w-[400px] text-white backdrop-blur-lg">
                <div className="flex justify-center mb-6">
                    <img src={logo} alt="Company Logo" className="w-24 h-24 rounded-full border-2 border-gray-500" />
                </div>
                <h2 className="text-3xl font-bold text-center mb-4">Create an Account</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        onChange={handleChange}
                        className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-green-500 focus:ring-2 focus:ring-green-500 outline-none transition-all duration-300"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-green-500 focus:ring-2 focus:ring-green-500 outline-none transition-all duration-300"
                        required
                    />
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        onChange={handleChange}
                        className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-green-500 focus:ring-2 focus:ring-green-500 outline-none transition-all duration-300"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-green-500 focus:ring-2 focus:ring-green-500 outline-none transition-all duration-300"
                        required
                    />
                    <select
                        name="role"
                        onChange={handleChange}
                        className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-green-500 focus:ring-2 focus:ring-green-500 outline-none transition-all duration-300"
                    >
                        <option value="vendor">Vendor</option>
                        <option value="delivery-partner">Delivery Partner</option>
                    </select>
                    <button
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-600 p-3 rounded-lg text-white font-semibold transition duration-300"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="text-center text-gray-400 mt-4">
                    Already have an account? <a href="/login" className="text-green-400 hover:underline">Log in</a>
                </p>
            </div>
        </div>
    );
};

export default Signup;