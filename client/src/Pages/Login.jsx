import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import logo from "../assets/company logo.png"

const Login = () => {
    const [formData, setFormData] = useState({emailOrPhone: "", password: ""});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // try {
        //     const res = await axios.post("http://localhost:5000/login", formData);
        //     localStorage.setItem("token", res.data.token);
        //     navigate("/dashboard");
        // } catch (err) {
        //     alert("Error: " + err.response?.data?.msg);
        // }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
            <div className="bg-gray-900 shadow-lg rounded-lg p-8 w-full max-w-md">

                <h2 className="text-3xl font-semibold text-white text-center mb-6">Login</h2>
                <div className="flex justify-center mb-6">
                    <img
                        src={logo}  // Change this path to your actual logo path
                        alt="Company Logo"
                        className="h-36 w-auto rounded-3xl"
                    />
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-400 mb-1">Phone No.</label>
                        <input
                            type="text"
                            name="emailOrPhone"
                            placeholder="Enter your email or phone number"
                            onChange={handleChange}
                            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-400 mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            onChange={handleChange}
                            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold p-3 rounded-lg transition duration-300"
                    >
                        Login
                    </button>
                </form>

                <p className="text-gray-500 text-sm text-center mt-4">
                    Don't have an account?
                    <a href="/signup" className="text-blue-400 hover:text-blue-300 ml-1">Sign Up</a>
                </p>
            </div>
        </div>
    );
};

export default Login;