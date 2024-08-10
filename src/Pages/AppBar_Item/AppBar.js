import React, { useState } from "react"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SettingsIcon from '@mui/icons-material/Settings';
import { FormControl, Select, MenuItem, Box } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { AppBar, Button, Card, TextField, Toolbar, Typography, Menu } from "@mui/material";
import '../AppBar_Item/Appbar.css';

const menus = ["Account", "Sales", "Purchase", "POS", "Help", "Customize"]


function Appbar() {
    const [language, setLanguage] = useState('en');

    const handleChange = (event) => {
        setLanguage(event.target.value);
    };

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const style = {
        "& label.Mui-focused": {
            color: "#35AFFD"
        },
        "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
                borderColor: "#35AFFD"
            }
        }
    }

    return (
        <div>
            <AppBar position="sticky" style={{ backgroundColor: "white" }}>
                <Toolbar>
                    <ArrowBackIcon style={{ display: "flex", color: "#35AFFD" }} />
                    <div style={{ display: "flex", width: "100%" }}>

                        <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", width: "60%" }}>
                            {
                                menus.map(index =>
                                    <Typography className="flip" data-back={index} data-front={index} style={{ color: "#35AFFD", fontSize: "15px", fontWeight: "bold" }} />

                                )}
                        </div>
                        <div style={{ marginLeft: "250px", display: "flex", justifyContent: "space-evenly", width: "20%", alignItems: "center" }}>
                            <SettingsIcon style={{ color: "#35AFFD" }} />
                            <Box sx={{ minWidth: 20 }}>
                                <FormControl fullWidth>
                                    <Select
                                        value={language}
                                        onChange={handleChange}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                        size="small"
                                        sx={{
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#35AFFD', // Change to your desired color
                                            },
                                        }}

                                    >
                                        <MenuItem value="en" sx={style}>EN</MenuItem>
                                        <MenuItem value="ta">TA</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            ></Menu>
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
};

export default Appbar;
