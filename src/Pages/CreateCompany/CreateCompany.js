import React, { useState } from "react";
import { Button, Typography, TextField, Checkbox, Grid, FormControlLabel, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from 'axios'; // Make sure you have axios installed

const txtfld = ["Address Line 1", "Address Line 2", "City", "Pincode"];
const contact = ["Mobile", "Phone", "E-mail", "Website"];
const engfld = ["Engineer Name", "Engineer Contact No", "Auth.Partner Code", "Date Format", "Books Start On", "Year Closing Date"];
const check = ["Copy Masters From an existing company", "MS Access Database"];

function CreateCompany() {
    const [formData, setFormData] = useState({
        enter_a_name_of_company: "",
        address_line1: '',
        address_line2: '',
        city: '',
        pincode: '',
        mobileNo: '',
        phone: '',
        email: '',
        website: '',
        engineer_name: '',
        engineer_contact_no: '',
        auth_partner_code: '',
        date_format: '',
        books_start_on: '',
        year_closing_date: '',
        copyMasters: false,
        msAccessDatabase: false,
        sendBackup: false,
        trade: '',
        other: '',
        taxationSystem: '',
        taxNo: ''
    });


    const handleSubmit = async () => {
        const dataToSend = {
            enter_a_name_of_company: formData.enter_a_name_of_company,
            address_line1: formData.txtfld.address_line1,
            address_line2: formData.txtfld.address_line2,
            city: formData.txtfld.city,
            pincode: formData.txtfld.pincode,
            mobileNo: formData.contact.mobileNo,
            phone: formData.contact.phone,
            email: formData.contact.email,
            website: formData.contact.website,
            send_data_backup_on_same_maildId: formData.check.sendBackup,
            trade: formData.trade,
            other: formData.other,
            engineer_name: formData.engfld.engineer_name,
            engineer_contact_no: formData.engfld.engineer_contact_no,
            auth_partner_code: formData.engfld.auth_partner_code,
            date_format: formData.engfld.date_format,
            books_start_on: formData.engfld.books_start_on,
            year_closing_date: formData.engfld.year_closing_date,
            msAccess: formData.check.msAccessDatabase,
            copy: formData.check.copyMasters
        };

        console.log(formData)

        try {
            const response = await fetch('http://localhost:5000/api/companyregister/addCompanyUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSend)
            });
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const result = await response.json();
                if (response.ok) {
                    alert('Item saved successfully!');

                    console.log('Saved item:', result);
                } else {
                    alert('Failed to save item.');
                    console.error('Save error:', result);
                }
            } else {
                const text = await response.text();
                console.error('Unexpected response format:', text);
                alert('Unexpected response format.');
            }
        } catch (error) {
            console.error('Request failed:', error);
            alert('Failed to save item.');
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <Typography style={{ fontSize: "12px", fontWeight: "bold", marginBottom: "5px" }}>
                Enter the Name of the Company / Firm / Organization
            </Typography>
            <TextField
                fullWidth
                name="enter_a_name_of_company"
                value={formData.enter_a_name_of_company}
                onChange={(e) => setFormData(e.target.value)}
                inputProps={{ style: { height: "30px", padding: '0 5px' } }}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                {txtfld.map((field, index) => {
                    const fieldName = field;
                    return (
                        <div key={index}>
                            <Typography style={{ fontSize: "12px", fontWeight: "bold", marginTop: "10px", marginBottom: "3px" }}>
                                {field}
                            </Typography>
                            <TextField
                                style={{ width: "50vh" }}
                                value={formData[index]}
                                onChange={(e) => setFormData(prev => ({ ...prev, [index]: e.target.value }))}
                                inputProps={{ style: { height: "30px", padding: '0 5px' } }}
                            />
                        </div>
                    );
                })}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                {contact.map((field, index) => {
                    const fieldName = field.replace(/\s+/g, '').toLowerCase();
                    return (
                        <div key={index}>
                            <Typography style={{ fontSize: "12px", fontWeight: "bold", marginTop: "5px", marginBottom: "3px" }}>
                                {field}
                            </Typography>
                            <TextField
                                size="small"
                                style={{ width: "50vh" }}
                                name={`contact.${fieldName}`}
                                value={formData[index]}
                                onChange={(e) => setFormData(prev => ({ ...prev, [index]: e.target.value }))}
                                inputProps={{ style: { height: "30px", padding: '0 5px' } }}
                            />
                            {field === "E-mail" && (
                                <div style={{ display: 'flex', alignItems: "center", marginTop: "-10px" }}>
                                    <Checkbox

                                        checked={formData.sendBackup}
                                        value={formData[index]}
                                        onChange={(e) => setFormData(prev => ({ ...prev, [index]: e.target.value }))}
                                        style={{ transform: "scale(0.6)" }}
                                    />
                                    <Typography style={{ fontSize: '8px', marginLeft: "-10px", marginTop: "2px", fontWeight: "bold" }}>
                                        Send Data backup on same MailID
                                    </Typography>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "-25px" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Typography style={{ fontSize: "12px", fontWeight: "bold", marginBottom: "3px" }}>Trade</Typography>
                    <TextField
                        size="small"
                        style={{ width: "50vh" }}
                        name="trade"
                        value={formData.trade}
                        onChange={(e) => setFormData(prev => ({ ...prev, primaryUnit: e.target.value }))}
                        inputProps={{ style: { height: "30px", padding: '0 5px' } }}
                    />
                </div>
                <div>
                    <Typography style={{ fontSize: "12px", fontWeight: "bold", marginBottom: "3px" }}>Other</Typography>
                    <TextField
                        size="small"
                        style={{ width: "50vh" }}
                        name="other"
                        value={formData.other}
                        onChange={(e) => setFormData(prev => ({ ...prev, primaryUnit: e.target.value }))}
                        inputProps={{ style: { height: "30px", padding: '0 5px' } }}
                    />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", width: "48%", alignItems: "flex-end" }}>
                    <Button size="small" variant="contained" style={{ width: 350, fontSize: "10px", height: "30px" }}>
                        Create a new company on Main PC
                    </Button>
                    <Button size="small" variant="outlined" style={{ width: 200, fontSize: "10px", height: "30px" }}>
                        Link Remote
                    </Button>
                </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Grid container spacing={2}>
                    {engfld.map((field, index) => {
                        const fieldName = field.replace(/\s+/g, '').toLowerCase();
                        return (
                            <Grid item xs={8} sm={6} md={2} key={index}>
                                <Typography style={{ fontSize: "12px", fontWeight: "bold", marginTop: "7px", marginBottom: "3px" }}>
                                    {field}
                                </Typography>
                                <TextField
                                    fullWidth
                                    name={`engfld.${fieldName}`}
                                    value={formData[index]}
                                    onChange={(e) => setFormData(prev => ({ ...prev, [index]: e.target.value }))}
                                    inputProps={{ style: { height: "30px", padding: '0 5px' } }}
                                />
                            </Grid>
                        );
                    })}
                </Grid>
            </div>
            <div style={{ display: "flex", justifyContent: "space-evenly", padding: "20px" }}>
                {check.map((index) => {

                    return (
                        <FormControlLabel

                            control={
                                <Checkbox


                                    value={formData[index]}
                                    onChange={(e) => setFormData(prev => ({ ...prev, [index]: e.target.value }))}

                                    size="small"
                                    style={{ transform: "scale(0.8)" }}
                                />
                            }
                            label={<Typography style={{ fontSize: '13px' }}>{index}</Typography>}
                        />
                    );
                })}
                <Button variant="contained" size="small" style={{ width: 250, fontSize: "10px", height: "40px" }} onClick={handleSubmit}>
                    Create Company
                </Button>
            </div>
        </div>
    );
}

export default CreateCompany;
