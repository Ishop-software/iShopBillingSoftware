import { Card, Typography, Button } from "@mui/material";
import React from "react"
import BeenhereIcon from '@mui/icons-material/Beenhere';

const planType = ["Silver", "Gold", "Platinum"];

function Subscription() {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", flexDirection: "column" }}>
            <Typography variant="h5" style={{ color: "#35AFFD", fontWeight: "bold", padding: "20px", fontFamily: "cursive" }}>Choose Your Subscription Plan</Typography>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 30, }}>

                {
                    planType.map(index => (
                        <Card style={{ height: 400, width: 250, display: "flex", justifyContent: "space-evenly", alignItems: "center", flexDirection: "column", border: "2px solid #35AFFD", borderRadius: "10px", padding: "30px" }}>
                            <Typography style={{ color: " #35AFFD", fontSize: "20px", fontWeight: "bold", fontFamily: "inherit" }}>{index}</Typography>
                            <Typography style={{ fontSize: "20px", fontWeight: "bold", fontFamily: "inherit" }}>$0<Typography component="span" style={{ fontSize: "20px", fontWeight: "bold", color: "grey", fontFamily: "inherit" }}>/Month</Typography></Typography>

                            <Typography style={{ fontSize: "10px", fontWeight: "bold", textAlign: "center" }}>Unlock exclusive features and priority support with our premium subscription plan</Typography>
                            <Typography><BeenhereIcon style={{ fontSize: "15px" }} /><Typography component="span" style={{ fontSize: "12px", fontWeight: "bold", }}>Only Offline Access</Typography></Typography>
                            <Typography><BeenhereIcon style={{ fontSize: "15px" }} /><Typography component="span" style={{ fontSize: "12px", fontWeight: "bold", }}>Mobile Access</Typography></Typography>
                            {/* <Typography><BeenhereIcon style={{ fontSize: "15px" }} /> <Typography component="span" style={{ fontSize: "12px", fontWeight: "bold", }}>Web Offline Access</Typography></Typography> */}
                            <Button>
                                Choose Plan
                            </Button>
                        </Card>
                    ))
                }
            </div>
        </div >
    )
};

export default Subscription;
