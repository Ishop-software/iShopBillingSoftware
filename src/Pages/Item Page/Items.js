import React, { useState } from "react"
import { AppBar, Button, Card, TextField, Toolbar, Typography, Menu } from "@mui/material";
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SettingsIcon from '@mui/icons-material/Settings';
import { FormControl, Select, MenuItem, Box } from '@mui/material';
import Avatar from '@mui/material/Avatar';


const btns = ["Save", "Delete", "List", "QR Code"]
const txtfld = ["Item Name", "Short Name", "HSN Code"]
const dropdown = ["Tax Slab", "Company", "Group"]
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const txtfldLabels = ["Variation", "Color", "Size", "Exp.Dt", "Mfg.Dt", "Purchase", "Sale Price", "MRP", "Basic Price", "Self.Val", "Min.Sale.P", "Barcode", "Opening Pck", "Opening Value", "Delete", "Copy", "Details"]

const menus = ["Account", "Sales", "Purchase", "POS", "Help", "Customize"]


function Items() {
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

    return (

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <AppBar position="absolute" style={{ backgroundColor: "white" }}>
                <Toolbar>
                    <ArrowBackIcon style={{ display: "flex", color: "#35AFFD" }} />
                    <div style={{ display: "flex", width: "100%" }}>

                        <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", width: "60%" }}>
                            {
                                menus.map(index =>
                                    <Typography style={{ color: "#35AFFD" }}>{index}</Typography>


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
                                    >
                                        <MenuItem value="en">EN</MenuItem>
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
            <Card sx={{ marginTop: { xs: 7, sm: 8 } }} style={{ height: "80vh", width: "95%", padding: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography style={{ fontSize: "16px", fontWeight: "bold", padding: "10px" }}>Add New Item</Typography>
                    <div>
                        {
                            btns.map(index =>
                                <Button variant="contained" key={index} style={{
                                    fontSize: "12px", width: "100px", margin: "5px", backgroundColor: "white",
                                    color: "#35AEFE",
                                    border: "1px solid #35AEFE"
                                }}>{index}</Button>


                            )}
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-around" }}>
                    {
                        txtfld.map(index =>
                            <div style={{ display: "flex", flexDirection: "column", width: "80%", margin: "10px" }}>
                                <Typography key={index} style={{
                                    fontSize: "15px", fontWeight: "bold"
                                }}>{index}</Typography>
                                <TextField size="small" style={{ marginTop: "px" }}></TextField></div>
                        )}

                </div>

                <Grid container spacing={18} style={{ padding: "10px", }}>
                    <Grid item xs={4.5}>
                        {
                            dropdown.map(index =>
                                <div style={{ width: "110%" }}>
                                    <Typography key={index} style={{ fontSize: "15px", fontWeight: "bold" }}>{index}</Typography>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <TextField size="small" style={{ marginBottom: "10px", marginTop: "5px" }}></TextField>
                                        <Button variant="contained" style={{ marginBottom: "7px", height: "40px", backgroundColor: "#35AFFD" }}><AddIcon /></Button>
                                        <Button variant="outlined" style={{ marginBottom: "7px", height: "40px" }}><BorderColorIcon style={{ color: "#35AFFD" }} /></Button>
                                    </div>
                                </div>
                            )
                        }

                    </Grid>
                    <Grid item xs={3.5}>
                        <div style={{ width: "190%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "35vh", }}>
                            <Typography style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "25px" }}>Primary Unit</Typography>
                            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "-40px", }}>
                                <TextField size="small"></TextField>
                                <Button variant="contained" style={{ height: "40px", backgroundColor: "#35AFFD" }}><AddIcon /></Button>
                                <Button variant="outlined" style={{ height: "40px" }}><BorderColorIcon style={{ color: "#35AFFD" }} /></Button>
                                <Button variant="outlined" style={{ height: "40px" }}><ViewInArIcon style={{ color: "#35AFFD" }} /></Button>

                            </div>
                            <div style={{ display: "flex", width: "150%", }}>
                                <Button variant="outlined" style={{ height: "20vh", width: "50%" }}>
                                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                        <CloudUploadIcon style={{ fontSize: "60px" }} />
                                        Upload Image

                                    </div>
                                </Button>
                                <div style={{ margin: "10px" }}>
                                    <FormControlLabel control={<Checkbox />} label="Maintain Batched" />
                                    <FormControlLabel control={<Checkbox />} label="Serial No. Tracking" />
                                </div>
                            </div>


                        </div>

                    </Grid>
                </Grid>
                <div style={{ display: "flex", margin: "-10px", }}>
                    {
                        txtfldLabels.map(index =>
                            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center" }}>
                                <Typography size="small" style={{ width: "80%", fontSize: "8px", color: "white", fontWeight: "bold", borderRadius: "2px", textAlign: "center", padding: "5px", backgroundColor: "#35AFFD" }}>{index}</Typography>
                                <Typography></Typography>
                                <TextField size="small" style={{ margin: "2px", }}></TextField>
                            </div>
                        )
                    }
                </div>
            </Card >
        </div >
    )
};

export default Items;
