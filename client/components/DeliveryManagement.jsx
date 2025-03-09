import React from "react";
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Grid } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";

const dummyDeliveries = [
    { id: 101, rider: "Ramesh Kumar", status: "Delivered", eta: "12:30 PM" },
    { id: 102, rider: "Suresh Singh", status: "In Progress", eta: "1:15 PM" },
    { id: 103, rider: "Amit Sharma", status: "Delayed", eta: "2:00 PM" },
    { id: 104, rider: "Vikram Das", status: "Delivered", eta: "11:45 AM" },
    { id: 105, rider: "Arjun Verma", status: "In Progress", eta: "1:45 PM" }
];

// Count deliveries by status
const statusCounts = dummyDeliveries.reduce((acc, { status }) => {
    acc[status] = (acc[status] || 0) + 1;
    return acc;
}, {});

// Prepare data for charts
const barChartData = Object.keys(statusCounts).map((status) => ({
    status,
    count: statusCounts[status]
}));

const lineChartData = dummyDeliveries.map(({ id, eta }) => ({
    id,
    eta: parseInt(eta.split(":")[0]) + (eta.includes("PM") && !eta.startsWith("12") ? 12 : 0)
}));

const getStatusLabel = (status) => {
    if (status === "Delivered") return <Chip label="Delivered" color="success" />;
    if (status === "In Progress") return <Chip label="In Progress" color="warning" />;
    return <Chip label="Delayed" color="error" />;
};

const DeliveryManagement = () => {
    return (
        <Grid container spacing={3} sx={{ padding: 3 }}>
            {/* Charts Section */}
            <Grid item xs={12} md={6}>
                <Card>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            Delivery Status Overview
                        </Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={barChartData}>
                                <XAxis dataKey="status" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="count" fill="#82ca9d" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} md={6}>
                <Card>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            Delivery ETA Trends
                        </Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={lineChartData}>
                                <XAxis dataKey="id" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="eta" stroke="#8884d8" />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </Grid>

            {/* Delivery Table Section (Below Charts) */}
            <Grid item xs={12}>
                <Card>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            Delivery Management
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell><b>Order ID</b></TableCell>
                                        <TableCell><b>Assigned Rider</b></TableCell>
                                        <TableCell><b>Status</b></TableCell>
                                        <TableCell><b>ETA</b></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {dummyDeliveries.map(({ id, rider, status, eta }) => (
                                        <TableRow key={id}>
                                            <TableCell>{id}</TableCell>
                                            <TableCell>{rider}</TableCell>
                                            <TableCell>{getStatusLabel(status)}</TableCell>
                                            <TableCell>{eta}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default DeliveryManagement;