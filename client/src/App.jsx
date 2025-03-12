import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardPage from "./Pages/DashboardPage";
import OrdersPage from "./Pages/OrdersPage";
import InventoryPage from "./Pages/InventoryPage";
import DeliveryPage from "./Pages/DeliveryPage";
import DeliveryPartner from "./Pages/DeliveryPartner.jsx";
import Sidebar from "./components/Sidebar";
import Login from "./Pages/Login.jsx"
import Signup from "./Pages/Signup.jsx"

import { Box } from "@mui/material";

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* Protected Routes with Sidebar */}
                <Route
                    path="/*"
                    element={
                        <Box sx={{ display: "flex" }}>
                            <Sidebar sx={{ width: 240 }} />
                            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                                <Routes>
                                    <Route path="/" element={<DashboardPage />} />
                                    <Route path="/orders" element={<OrdersPage />} />
                                    <Route path="/inventory" element={<InventoryPage />} />
                                    <Route path="/delivery" element={<DeliveryPage />} />
                                </Routes>
                            </Box>
                        </Box>
                    }
                />
                <Route path="/delivery" element={<DeliveryPartner />} />
            </Routes>
        </Router>
    );
};

export default App;
