import { useState } from "react";
import {
    Box,
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Menu,
    MenuItem,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";

const Appbar = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box>
            <AppBar color="default" sx={{ boxShadow: "none" }}>
                <Toolbar>
                    <Typography variant="h5" sx={{ flexGrow: 1 }}>
                        RLibrary
                    </Typography>
                    <>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color="inherit"
                            disableRipple
                            onClick={handleMenu}
                            style={{ backgroundColor: "transparent" }}
                        >
                            <AccountCircle />
                            <Typography variant="body1">
                                &nbsp; Admin
                            </Typography>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>Logout</MenuItem>
                        </Menu>
                    </>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Appbar;
