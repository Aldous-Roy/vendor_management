import React from "react";
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Grid } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const dummyInventory = [
    { id: 1, name: "Paneer Tikka", category: "Food", stock: 20, price: "₹250" },
    { id: 2, name: "Cold Coffee", category: "Beverages", stock: 5, price: "₹150" },
    { id: 3, name: "Veg Biryani", category: "Food", stock: 0, price: "₹300" },
    { id: 4, name: "Chocolate Shake", category: "Beverages", stock: 15, price: "₹180" },
    { id: 5, name: "French Fries", category: "Snacks", stock: 2, price: "₹120" }
];

const getStockLabel = (stock) => {
    if (stock === 0) return <Chip label="Out of Stock" color="error" />;
    if (stock < 10) return <Chip label="Low Stock" color="warning" />;
    return <Chip label="Available" color="success" />;
};

// Calculate total count per category
const categoryCount = dummyInventory.reduce((acc, { category }) => {
    acc[category] = (acc[category] || 0) + 1;
    return acc;
}, {});

// Prepare pie chart data
const pieChartData = Object.entries(categoryCount).map(([category, count]) => ({
    name: category,
    value: count
}));

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// Prepare bar chart data
const barChartData = dummyInventory.map(({ name, stock }) => ({ name, stock }));

const InventoryManagement = () => {
    return (
        <Card sx={{ maxWidth: 900, margin: "auto", mt: 5, padding: 3 }}>
            <CardContent>
                <Typography variant="h4" gutterBottom>
                    Inventory Management
                </Typography>

                {/* Charts Section */}
                <Grid container spacing={3}>
                    {/* Bar Chart - Stock Levels */}
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" textAlign="center">Stock Levels</Typography>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={barChartData}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="stock" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Grid>

                    {/* Pie Chart - Category Distribution */}
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" textAlign="center">Category Distribution</Typography>
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
                </Grid>

                {/* Inventory Table */}
                <TableContainer component={Paper} sx={{ mt: 3 }}>
                    <Table>
                        <TableHead>
                            <TableRow className="test-center">
                                <TableCell><b>Product Name</b></TableCell>
                                <TableCell><b>Category</b></TableCell>
                                <TableCell><b>Stock</b></TableCell>
                                <TableCell><b>Quantity</b></TableCell>
                                <TableCell><b>Price</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dummyInventory.map(({ id, name, category, stock, price }) => (
                                <TableRow key={id}>
                                    <TableCell>{name}</TableCell>
                                    <TableCell>{category}</TableCell>
                                    <TableCell>{getStockLabel(stock)}</TableCell>
                                    <TableCell>{stock}</TableCell>
                                    <TableCell>{price}</TableCell>
                                </TableRow>
                            ))}

                            {/* Total Count Row - FIXED ALIGNMENT */}
                            <TableRow>
                                <TableCell colSpan={4} align="center">
                                    <b>Total Count:</b>{" "}
                                    {Object.entries(categoryCount).map(([category, count]) => (
                                        <Chip key={category} label={`${category}: ${count}`} sx={{ marginLeft: 1 }} />
                                    ))}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    );
};

export default InventoryManagement;