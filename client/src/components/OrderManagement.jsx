import React from "react";
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Grid, Divider } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const orders = [
    { id: 1, customer: "John Doe", status: "Processing", total: 500 },
    { id: 2, customer: "Jane Smith", status: "Completed", total: 1200 },
    { id: 3, customer: "Michael Johnson", status: "Cancelled", total: 750 },
    { id: 4, customer: "Emily Davis", status: "Processing", total: 900 },
    { id: 5, customer: "David White", status: "Completed", total: 1500 }
];

// Status Chips with dynamic colors
const getStatusChip = (status) => {
    const chipProps = {
        Processing: { label: "Processing", color: "warning" },
        Completed: { label: "Completed", color: "success" },
        Cancelled: { label: "Cancelled", color: "error" },
    };
    return <Chip label={chipProps[status]?.label || "Unknown"} color={chipProps[status]?.color || "default"} />;
};

// Data for Pie Chart (Order Status)
const statusCount = orders.reduce((acc, { status }) => {
    acc[status] = (acc[status] || 0) + 1;
    return acc;
}, {});
const pieChartData = Object.entries(statusCount).map(([status, count]) => ({ name: status, value: count }));
const COLORS = ["#FFC107", "#4CAF50", "#F44336"];

// Data for Bar Chart (Sales Performance)
const barChartData = orders.map(({ customer, total }) => ({ customer, total }));

const OrderManagement = () => {
    return (
        <Card sx={{ maxWidth: 1200, margin: "auto", mt: 5, padding: 3, boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
                <Typography variant="h4" gutterBottom textAlign="center" fontWeight="bold">
                    📦 Order Management
                </Typography>

                {/* Charts Section */}
                <Grid container spacing={3} sx={{ mb: 3 }}>
                    {/* Pie Chart - Order Status Distribution */}
                    <Grid item xs={12} md={6}>
                        <Card sx={{ p: 2, boxShadow: 2 }}>
                            <Typography variant="h6" textAlign="center" fontWeight="bold">
                                Order Status Distribution
                            </Typography>
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie data={pieChartData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value" label>
                                        {pieChartData.map((_, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </Card>
                    </Grid>

                    {/* Bar Chart - Sales Performance */}
                    <Grid item xs={12} md={6}>
                        <Card sx={{ p: 2, boxShadow: 2 }}>
                            <Typography variant="h6" textAlign="center" fontWeight="bold">
                                Sales Performance
                            </Typography>
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={barChartData}>
                                    <XAxis dataKey="customer" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="total" fill="#0088FE" barSize={50} />
                                </BarChart>
                            </ResponsiveContainer>
                        </Card>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />

                {/* Orders Table */}
                <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 2 }}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                                <TableCell><b>#</b></TableCell>
                                <TableCell><b>Customer</b></TableCell>
                                <TableCell><b>Status</b></TableCell>
                                <TableCell><b>Total (₹)</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map(({ id, customer, status, total }, index) => (
                                <TableRow key={id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{customer}</TableCell>
                                    <TableCell>{getStatusChip(status)}</TableCell>
                                    <TableCell sx={{ fontWeight: "bold", color: "#2E7D32" }}>₹{total}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    );
};

export default OrderManagement;