import React, { useState } from "react"
import { AppBar, Button, Card, TextField, Toolbar, Typography, Menu } from "@mui/material";
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import '../Item Page/Items.css'


const btns = ["Save", "Delete", "List", "QR Code"]
const txtfld = ["Item Name", "Short Name", "HSN Code"]
const dropdown = ["Tax Slab", "Company", "Group"]
const txtfldLabels = ["Variation", "Color", "Size", "Exp.Dt", "Mfg.Dt", "Purchase", "Sale Price", "MRP", "Basic Price", "Self.Val", "Min.Sale.P", "Barcode", "Opening Pck", "Opening Value", "Delete", "Copy", "Details"]


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

function Items() {

    return (

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", }}>

            <Card style={{ width: "95%", margin: "15px", padding: "20px" }}>
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
                                <TextField size="small" sx={style} style={{ marginTop: "px" }}></TextField></div>
                        )}

                </div>

                <Grid container spacing={18} style={{ padding: "10px", }}>
                    <Grid item xs={4.5}>
                        {
                            dropdown.map(index =>
                                <div style={{ width: "110%" }}>
                                    <Typography key={index} style={{ fontSize: "15px", fontWeight: "bold" }}>{index}</Typography>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <TextField size="small" sx={style} style={{ marginBottom: "10px", marginTop: "5px" }}></TextField>
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
                                <TextField size="small" sx={style}></TextField>
                                <Button variant="contained" style={{ height: "40px", backgroundColor: "#35AFFD" }}><AddIcon /></Button>
                                <Button variant="outlined" style={{ height: "40px" }}><BorderColorIcon style={{ color: "#35AFFD" }} /></Button>
                                <Button variant="outlined" style={{ height: "40px" }}><ViewInArIcon style={{ color: "#35AFFD" }} /></Button>

                            </div>
                            <div style={{ display: "flex", width: "150%", }}>
                                <Button variant="outlined" sx={style} style={{ height: "20vh", width: "50%" }}>
                                    <div style={{ display: "flex", flexDirection: "column", color: "#35AFFD", justifyContent: "center", alignItems: "center" }}>
                                        <CloudUploadIcon style={{ fontSize: "60px", color: "#35AFFD" }} />
                                        Upload Image

                                    </div>
                                </Button>
                                <div style={{ margin: "10px" }}>
                                    <FormControlLabel control={<Checkbox style={{ color: "#35AFFD" }} />} label="Maintain Batched" />
                                    <FormControlLabel control={<Checkbox style={{ color: "#35AFFD" }} />} label="Serial No. Tracking" />
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
                                <TextField size="small" sx={style} style={{ margin: "2px", }}></TextField>
                            </div>
                        )
                    }
                </div>
            </Card >
        </div >
    )
};

export default Items;
