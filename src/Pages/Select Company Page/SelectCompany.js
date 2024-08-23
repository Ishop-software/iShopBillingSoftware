import { Button, TextField, Typography, Card } from "@mui/material";
import React from "react"
import SearchIcon from '@mui/icons-material/Search';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import CloseIcon from '@mui/icons-material/Close';
import StoreIcon from '@mui/icons-material/Store';
import StorageIcon from '@mui/icons-material/Storage';
import companyLogo from '../../Images/office.png';
import databaseLogo from '../../Images/servers.png'
import backupLogo from '../../Images/backup.png';
import calenderLogo from '../../Images/calendar.png';
import NavBar from '../AppBar_Item/AppBar'


const btns = [
    {
        "logo": companyLogo,
        "label": "Create a New Company"
    },
    {
        "logo": databaseLogo,
        "label": "Set Database Path"
    },
    {
        "logo": backupLogo,
        "label": "Backup My Data"
    },
    {
        "logo": calenderLogo,
        "label": "Change Financial Year"
    },
];

function SelectCompany() {
    return (
        <div>
            <NavBar />
            <div style={{ height: "100vh", padding: "25px" }}>

                <div style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
                    <Typography variant="h6" style={{ color: "#35AFFD", fontWeight: "bold" }}>Select Company</Typography>
                    <CloseIcon /></div>


                <div style={{ display: "flex", justifyContent: "space-between", padding: "10px", }}>

                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        <Typography style={{ fontWeight: "bold", fontSize: "12px" }}>Look at this data path</Typography>
                        <TextField size="small" label="Data path name" style={{ width: "150%", fontSize: "12px", }} /></div>

                    <div style={{ display: "flex", justifyContent: "space-evenly", width: "50%" }}>
                        <Typography style={{ fontWeight: "bold", fontSize: "12px" }}>Restore Data</Typography>
                        <Typography style={{ fontWeight: "bold", fontSize: "12px" }}>Import from previous version</Typography></div>

                    <div style={{ display: "flex", justifyContent: "space-evenly", width: "15%", alignItems: "flex-start" }}>
                        <Button variant="contained" style={{ backgroundColor: "#35AFFD", }}><SearchIcon style={{ fontSize: "20px" }} /></Button>
                        <Button variant="outlined" > <BorderColorIcon style={{ color: "#35AFFD", fontSize: "20px" }} /></Button></div>
                    <div style={{ display: "flex" }}>


                    </div>

                </div>
                <Card style={{ margin: "10px", width: "80%", height: "40%" }}>
                    <div style={{ padding: "30px", display: "flex", justifyContent: "space-between" }}>
                        <Typography style={{ color: "#35AFFD", fontSize: "15px", fontWeight: "bold" }}>Company Name</Typography>
                        <Typography style={{ color: "#35AFFD", fontSize: "15px", fontWeight: "bold" }}>Date</Typography>

                    </div>
                </Card>
                <div style={{ display: "flex", padding: "10px", flexDirection: "column", gap: 10 }}>
                    <Typography style={{ fontSize: "13px", fontWeight: "bold" }}>This company is stored at the following database's path</Typography>
                    <TextField size="small" label="Data path name" />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "6px" }}>
                    {
                        btns.map(index =>
                        (
                            <Button
                                variant="contained"
                                style={{ height: "70px", backgroundColor: "#35AFFD" }}
                                startIcon={<img src={index.logo} style={{
                                    height: "24px", width: "24px"
                                }} />}
                            >
                                {index.label}
                            </Button>

                        ))
                    }
                </div>
            </div ></div>

    )
};

export default SelectCompany;
