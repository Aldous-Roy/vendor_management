import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const Dashboard = () => {
    const stats = [
        { label: "Total Orders", value: 120 },
        { label: "Pending Orders", value: 15 },
        { label: "Completed Orders", value: 95 },
        { label: "Revenue", value: "₹1,50,000" }
    ];

    return (
        <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
            {stats.map(({ label, value }) => (
                <Card key={label} sx={{ textAlign: "center", padding: 2, width: "200px" }}>
                    <CardContent>
                        <Typography variant="h6">{label}</Typography>
                        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                            {value}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default Dashboard;