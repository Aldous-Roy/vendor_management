import React from "react";
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Grid } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const orders = [
    { id: 1, customer: "John Doe", status: "Processing", total: 500 },
    { id: 2, customer: "Jane Smith", status: "Completed", total: 1200 },
    { id: 3, customer: "Michael Johnson", status: "Cancelled", total: 750 },
    { id: 4, customer: "Emily Davis", status: "Processing", total: 900 },
    { id: 5, customer: "David White", status: "Completed", total: 1500 }
];

const getStatusChip = (status) => {
    switch (status) {
        case "Processing":
            return <Chip label="Processing" color="warning" />;
        case "Completed":
            return <Chip label="Completed" color="success" />;
        case "Cancelled":
            return <Chip label="Cancelled" color="error" />;
        default:
            return <Chip label="Unknown" />;
    }
};

// Order status distribution for pie chart
const statusCount = orders.reduce((acc, { status }) => {
    acc[status] = (acc[status] || 0) + 1;
    return acc;
}, {});

const pieChartData = Object.entries(statusCount).map(([status, count]) => ({
    name: status,
    value: count
}));

const COLORS = ["#FFBB28", "#00C49F", "#FF8042"];

// Sales performance for bar chart
const barChartData = orders.map(({ customer, total }) => ({ customer, total }));

const OrderManagement = () => {
    return (
        <Card sx={{ maxWidth: 1000, margin: "auto", mt: 5, padding: 3 }}>
            <CardContent>
                <Typography variant="h4" gutterBottom>
                    Order Management
                </Typography>

                {/* Charts Section */}
                <Grid container spacing={3}>
                    {/* Pie Chart - Order Status Distribution */}
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" textAlign="center">Order Status Distribution</Typography>
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie data={pieChartData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value">
                                    {pieChartData.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </Grid>

                    {/* Bar Chart - Sales Performance */}
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" textAlign="center">Sales Performance</Typography>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={barChartData}>
                                <XAxis dataKey="customer" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="total" fill="#0088FE" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Grid>
                </Grid>

                {/* Orders Table */}
                <TableContainer component={Paper} sx={{ mt: 3 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><b>Order ID</b></TableCell>
                                <TableCell><b>Customer</b></TableCell>
                                <TableCell><b>Status</b></TableCell>
                                <TableCell><b>Total</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map(({ id, customer, status, total }) => (
                                <TableRow key={id}>
                                    <TableCell>{id}</TableCell>
                                    <TableCell>{customer}</TableCell>
                                    <TableCell>{getStatusChip(status)}</TableCell>
                                    <TableCell>₹{total}</TableCell>
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