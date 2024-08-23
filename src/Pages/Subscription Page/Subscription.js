import { Card, Typography, Button } from "@mui/material";
import React from "react"
import BeenhereIcon from '@mui/icons-material/Beenhere';
import '../Subscription Page/Subscription.css'
import NavBar from '../AppBar_Item/AppBar'

const planType = ["Silver", "Gold", "Platinum"];
const feature = [{
    "bullet": BeenhereIcon,
    "label": "Only Offline Access"
},
{
    "bullet": BeenhereIcon,
    "label": "Mobile Access"
},
{
    "bullet": BeenhereIcon,
    "label": "Web Offline Access"
},
]

function Subscription() {
    return (
        <div>
            <NavBar />
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                <Typography variant="h5" style={{ color: "#35AFFD", fontWeight: "bold", padding: "40px", fontFamily: "cursive" }}>Choose Your Subscription Plan</Typography>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 30, }}>

                    {
                        planType.map(index => (
                            <Card className="card" style={{ height: 300, width: 200, display: "flex", justifyContent: "space-evenly", alignItems: "center", flexDirection: "column", border: "2px solid #35AFFD", borderRadius: "10px", padding: "20px" }}>
                                <Typography className="txt" style={{ fontSize: "20px", fontWeight: "bold", fontFamily: "inherit" }}>{index}</Typography>
                                <Typography style={{ fontSize: "20px", fontWeight: "bold", fontFamily: "inherit" }}>$0<Typography component="span" style={{ fontSize: "20px", fontWeight: "bold", color: "grey", fontFamily: "inherit" }}>/Month</Typography></Typography>

                                <Typography style={{ fontSize: "10px", fontFamily: "inherit", textAlign: "center" }}>Unlock exclusive features and priority support with our premium subscription plan</Typography>
                                <div style={{ display: "flex", flexDirection: "column", width: "80%", padding: "30px", justifyContent: "center", alignContent: "center", gap: 10 }}>
                                    {
                                        feature.map(index =>
                                        (
                                            <div style={{ display: "flex", gap: 20 }} >

                                                <BeenhereIcon style={{ fontSize: "15px" }} />
                                                <Typography style={{ fontSize: "12px", fontWeight: "bold", }}>{index.label}</Typography>
                                            </div>
                                        ))
                                    }
                                </div>
                                <Button id="btn" variant="contained" >Choose Plan</Button>

                            </Card>

                        ))
                    }
                </div>
            </div >
        </div>
    )
};

export default Subscription;
