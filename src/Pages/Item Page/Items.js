import React from "react"
import { Button, Card, TextField, Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';


const btns = ["Save", "Delete", "List", "QR Code"]
const txtfld = ["Item Name", "Short Name", "HSN Code"]
const dropdown = ["Tax Slab", "Company", "Group"]
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function Items() {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <Card style={{ height: "80vh", width: "180vh", padding: "20px" }}>
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
                                <TextField size="small" style={{ marginTop: "10px" }}></TextField></div>
                        )}

                </div>

                <Grid container spacing={18} style={{ padding: "10px", }}>
                    <Grid item xs={5}>
                        {
                            dropdown.map(index =>
                                <div style={{ width: "110%" }}>
                                    <Typography key={index} style={{ fontSize: "15px", fontWeight: "bold" }}>{index}</Typography>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <TextField size="small" style={{ marginBottom: "25px", marginTop: "10px" }}></TextField>
                                        <Button variant="contained" style={{ marginBottom: "16px", height: "40px", backgroundColor: "#35AFFD" }}><AddIcon /></Button>
                                        <Button variant="outlined" style={{ marginBottom: "16px", height: "40px" }}><BorderColorIcon style={{ color: "#35AFFD" }} /></Button>
                                    </div>
                                </div>
                            )
                        }

                    </Grid>
                    <Grid item xs={4}>
                        <div style={{ width: "190%", display: "flex", flexDirection: "column", justifyContent: "space-evenly", height: "50vh" }}>
                            <Typography style={{ fontSize: "15px", fontWeight: "bold" }}>Primary Unit</Typography>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <TextField size="small" style={{ marginTop: "10px" }}></TextField>
                                <Button variant="contained" style={{ height: "40px", marginTop: "10px", backgroundColor: "#35AFFD" }}><AddIcon /></Button>
                                <Button variant="outlined" style={{ height: "40px", marginTop: "10px", }}><BorderColorIcon style={{ color: "#35AFFD" }} /></Button>
                                <Button variant="outlined" style={{ height: "40px", marginTop: "10px", }}><ViewInArIcon style={{ color: "#35AFFD" }} /></Button>

                            </div>
                            <div style={{ display: "flex", marginTop: "10px", width: "100vh" }}>
                                <Button variant="outlined" style={{ height: "30vh", width: "70vh" }}>
                                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
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

            </Card>
        </div >
    )
};

export default Items;
