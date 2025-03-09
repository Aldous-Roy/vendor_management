
import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const orders = [
    { id: 1, customer: "John Doe", status: "Processing", total: "₹500" },
    { id: 2, customer: "Jane Smith", status: "Completed", total: "₹1,200" }
];

const OrderManagement = () => {
    return (
        <TableContainer component={Paper} sx={{ margin: 3 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Order ID</TableCell>
                        <TableCell>Customer</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Total</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map((order) => (
                        <TableRow key={order.id}>
                            <TableCell>{order.id}</TableCell>
                            <TableCell>{order.customer}</TableCell>
                            <TableCell>{order.status}</TableCell>
                            <TableCell>{order.total}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default OrderManagement;