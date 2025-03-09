import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { ShoppingCart, HourglassEmpty, CheckCircle, MonetizationOn } from "@mui/icons-material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, Legend } from "recharts";

const stats = [
    { label: "Total Orders", value: 120, icon: <ShoppingCart fontSize="large" />, color: "#3f51b5" },
    { label: "Pending Orders", value: 15, icon: <HourglassEmpty fontSize="large" />, color: "#ff9800" },
    { label: "Completed Orders", value: 95, icon: <CheckCircle fontSize="large" />, color: "#4caf50" },
    { label: "Revenue", value: "₹1,50,000", icon: <MonetizationOn fontSize="large" />, color: "#f44336" }
];

const orderData = [
    { month: "Jan", orders: 30 },
    { month: "Feb", orders: 45 },
    { month: "Mar", orders: 60 },
    { month: "Apr", orders: 80 },
    { month: "May", orders: 95 },
    { month: "Jun", orders: 120 }
];

const Dashboard = () => {
    return (
        <div style={{ padding: "20px" }}>
            {/* Stats Cards */}
            <Grid container spacing={3}>
                {stats.map(({ label, value, icon, color }) => (
                    <Grid item xs={12} sm={6} md={3} key={label}>
                        <Card sx={{ textAlign: "center", bgcolor: color, color: "white", padding: 2 }}>
                            <CardContent>
                                {icon}
                                <Typography variant="h6">{label}</Typography>
                                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                                    {value}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Charts Section */}
            <Grid container spacing={3} sx={{ mt: 3 }}>
                {/* Bar Chart */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ padding: 3 }}>
                        <Typography variant="h5" gutterBottom>
                            Monthly Orders (Bar Chart)
                        </Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={orderData}>
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="orders" fill="#3f51b5" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Card>
                </Grid>

                {/* Line Chart */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ padding: 3 }}>
                        <Typography variant="h5" gutterBottom>
                            Order Growth Over Time (Line Chart)
                        </Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={orderData}>
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Legend />
                                <Line type="monotone" dataKey="orders" stroke="#f44336" strokeWidth={3} />
                            </LineChart>
                        </ResponsiveContainer>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};

export default Dashboard;