import React, { useState } from "react";
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Grid, Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Dummy delivery data with coordinates
const dummyDeliveries = [
    { id: 101, rider: "Ramesh Kumar", status: "Delivered", eta: "12:30 PM", location: [12.9716, 77.5946] }, // Bangalore
    { id: 102, rider: "Suresh Singh", status: "In Progress", eta: "1:15 PM", location: [28.7041, 77.1025] }, // Delhi
    { id: 103, rider: "Amit Sharma", status: "Delayed", eta: "2:00 PM", location: [19.076, 72.8777] }, // Mumbai
    { id: 104, rider: "Vikram Das", status: "Delivered", eta: "11:45 AM", location: [22.5726, 88.3639] }, // Kolkata
    { id: 105, rider: "Arjun Verma", status: "In Progress", eta: "1:45 PM", location: [13.0827, 80.2707] } // Chennai
];

// Custom Marker Icon
const riderIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/4474/4474884.png", // Rider icon
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
});

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
    const [open, setOpen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [selectedRider, setSelectedRider] = useState("");

    const handleRiderClick = (rider, location) => {
        setSelectedLocation(location);
        setSelectedRider(rider);
        setOpen(true);
    };

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

            {/* Delivery Table */}
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
                                    {dummyDeliveries.map(({ id, rider, status, eta, location }) => (
                                        <TableRow key={id} onClick={() => handleRiderClick(rider, location)} style={{ cursor: "pointer" }}>
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

            {/* Popup Map Dialog */}
            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>
                    {selectedRider}'s Location
                    <IconButton onClick={() => setOpen(false)} style={{ position: "absolute", right: 10, top: 10 }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    {selectedLocation && (
                        <MapContainer center={selectedLocation} zoom={10} style={{ height: "300px", width: "100%" }}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            <Marker position={selectedLocation} icon={riderIcon}>
                                <Popup>{selectedRider}</Popup>
                            </Marker>
                        </MapContainer>
                    )}
                </DialogContent>
            </Dialog>
        </Grid>
    );
};

export default DeliveryManagement;