import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardPage from "../Pages/DashboardPage";
import OrdersPage from "../Pages/OrdersPage";
import InventoryPage from "../Pages/InventoryPage";
import DeliveryPage from "../Pages/DeliveryPage";
import Sidebar from "../components/Sidebar";
import { Box } from "@mui/material";

const App = () => {
  return (
    <Router>
      <Box sx={{ display: "flex" }}>
        {/* Sidebar (Fixed Size) */}
        <Sidebar sx={{ width: 240 }} />

        {/* Main Content (Takes Remaining Space) */}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/delivery" element={<DeliveryPage />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default App;