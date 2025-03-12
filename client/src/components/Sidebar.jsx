import React from "react";
import { Drawer, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: 240,
                flexShrink: 0,
                "& .MuiDrawer-paper": { width: 240, boxSizing: "border-box" }
            }}
        >
            <List>
                {[
                    { text: "Dashboard", path: "/" },
                    { text: "Orders", path: "/orders" },
                    { text: "Inventory", path: "/inventory" },
                    { text: "Delivery", path: "/delivery" }
                ].map(({ text, path }) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton component={Link} to={path}>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default Sidebar;