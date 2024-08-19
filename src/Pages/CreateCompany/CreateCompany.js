import React, { useState, useEffect } from "react";
import { Button, Typography, TextField, Checkbox, Grid, FormControlLabel, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import countryTelData from 'country-telephone-data';
import { State } from 'country-state-city';
import axios from 'axios';

const txtfld = ["Address Line 1", "Address Line 2", "City", "Pincode"];
const contact = ["Mobile", "Phone", "E-mail", "Website"];
const engfld = ["Engineer Name", "Engineer Contact No", "Auth.Partner Code", "Date Format", "Books Start On", "Year Closing Date"];
const check = ["Copy Masters From an existing company", "MS Access Database"];

function CreateCompany() {
    const [isdCode, setIsdCode] = useState('');
    const [states, setStates] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [formData, setFormData] = useState({
        enter_a_name_of_company: "",
        txtfld: {
            address_line1: '',
            address_line2: '',
            city: '',
            pincode: ''
        },
        contact: {
            mobileNo: '',
            phone: '',
            email: '',
            website: ''
        },
        engfld: {
            engineer_name: '',
            engineer_contact_no: '',
            auth_partner_code: '',
            date_format: '',
            books_start_on: '',
            year_closing_date: ''
        },
        check: {
            copyMasters: false,
            msAccessDatabase: false,
            sendBackup: false // Added this line
        },
        trade: '', // Added this line
        other: '', // Added this line
        taxationSystem: '', // Added this line
        taxNo: '' // Added this line
    });


    const handleOnChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name.startsWith('txtfld')) {
            setFormData(prevState => ({
                ...prevState,
                txtfld: {
                    ...prevState.txtfld,
                    [name.split('.')[1]]: value
                }
            }));
        } else if (name.startsWith('contact')) {
            setFormData(prevState => ({
                ...prevState,
                contact: {
                    ...prevState.contact,
                    [name.split('.')[1]]: value
                }
            }));
        } else if (name.startsWith('engfld')) {
            setFormData(prevState => ({
                ...prevState,
                engfld: {
                    ...prevState.engfld,
                    [name.split('.')[1]]: value
                }
            }));
        } else if (name.startsWith('check')) {
            setFormData(prevState => ({
                ...prevState,
                check: {
                    ...prevState.check,
                    [name.split('.')[1]]: checked
                }
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };


    const handleSubmit = async () => {
        console.log(formData);
        const dataToSend = {
            enter_a_name_of_company: formData.enter_a_name_of_company,
            // address_line1: formData.txtfld.address_line1,
            // address_line2: formData.txtfld.address_line2,
            // city: formData.txtfld.city,
            // pincode: formData.txtfld.pincode,
            // country_isd: isdCode,
            // taxation_system: formData.taxationSystem,
            // tax_no: formData.taxNo,
            // state: selectedState,
            // mobileNo: formData.contact.mobileNo,
            // phone: formData.contact.phone,
            // email: formData.contact.email,
            // website: formData.contact.website,
            // send_data_backup_on_same_maildId: formData.check.sendBackup,
            // trade: formData.trade,
            // other: formData.other,
            // engineer_name: formData.engfld.engineer_name,
            // engineer_contact_no: formData.engfld.engineer_contact_no,
            // auth_partner_code: formData.engfld.auth_partner_code,
            // date_format: formData.engfld.date_format,
            // books_start_on: formData.engfld.books_start_on,
            // year_closing_date: formData.engfld.year_closing_date
        };

        try {
            const response = await axios.post('http://localhost:5000/api/companyregister/addCompanyUser', dataToSend);
            console.log(response);
        } catch (error) {
            console.error('There was an error!', error);
        }
    };



    useEffect(() => {
        const indianStates = State.getStatesOfCountry('IN');
        setStates(indianStates);
    }, []);

    return (
        <div style={{ padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button size="small" variant="outlined" style={{ border: "1px solid #35AFFD", fontSize: "10px", color: "#35AFFD", fontWeight: "bold" }}>GST Account Information with GST.No</Button>
            </div>
            <Typography style={{ fontSize: "12px", fontWeight: "bold", marginBottom: "5px" }}>Enter the Name of the Company / Firm / Organization</Typography>
            <TextField
                fullWidth
                name="enter_a_name_of_company"
                value={formData.enter_a_name_of_company}
                onChange={handleOnChange}
                inputProps={{ style: { height: "30px", padding: '0 5px' } }}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                {
                    txtfld.map((field, index) => (
                        <div key={index}>
                            <Typography style={{ fontSize: "12px", fontWeight: "bold", marginTop: "10px", marginBottom: "3px" }}>{field}</Typography>
                            <TextField
                                style={{ width: "50vh" }}
                                name={`txtfld.${field.replace(/\s+/g, '').toLowerCase()}`}
                                value={formData.txtfld[field.replace(/\s+/g, '').toLowerCase()]}
                                onChange={handleOnChange}
                                inputProps={{ style: { height: "30px", padding: '0 5px' } }}
                            />
                        </div>
                    ))
                }
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                    <Typography style={{ fontSize: "12px", fontWeight: "bold", marginTop: "10px", marginBottom: "3px" }}>Country ( ISD )</Typography>
                    <FormControl style={{ width: 280 }}>
                        <InputLabel></InputLabel>
                        <Select
                            name="isdCode"
                            value={isdCode}
                            onChange={handleOnChange}
                            size="small"
                            style={{ height: "30px" }}
                        >
                            {countryTelData.allCountries.map((country) => (
                                <MenuItem key={country.iso2} value={country.dialCode}>
                                    {`${country.name} (+${country.dialCode})`}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <Typography style={{ fontSize: "12px", fontWeight: "bold", marginTop: "10px", marginBottom: "3px" }}>Taxation System</Typography>
                    <FormControl style={{ width: 280 }}>
                        <InputLabel></InputLabel>
                        <Select
                            name="taxationSystem"
                            value={formData.taxationSystem}
                            onChange={handleOnChange}
                            size="small"
                            style={{ height: "30px" }}
                        >
                            {/* Add MenuItem options here */}
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <Typography style={{ fontSize: "12px", fontWeight: "bold", marginTop: "10px", marginBottom: "3px" }}>Tax.No</Typography>
                    <TextField
                        size="small"
                        name="taxNo"
                        label="GSTIN / VAT.No."
                        value={formData.taxNo}
                        onChange={handleOnChange}
                        InputLabelProps={{ sx: { fontSize: '7px', mt: "2px", fontWeight: "bold" } }}
                        inputProps={{ style: { height: "30px", padding: '0 5px' } }}
                        style={{ fontSize: "10px", width: 280 }}
                    />
                </div>
                <div>
                    <Typography style={{ fontSize: "12px", fontWeight: "bold", marginTop: "10px", marginBottom: "3px" }}>State</Typography>
                    <FormControl style={{ width: 280 }}>
                        <InputLabel sx={{ fontSize: '12px' }} />
                        <Select
                            name="selectedState"
                            value={selectedState}
                            onChange={handleOnChange}
                            size="small"
                            style={{ fontSize: "12px", fontWeight: "bold", height: "30px" }}
                        >
                            {states.map((state) => (
                                <MenuItem key={state.isoCode} value={state.name}>
                                    {state.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
                {
                    contact.map((field, index) => (
                        <div key={index}>
                            <Typography style={{ fontSize: "12px", fontWeight: "bold", marginTop: "5px", marginBottom: "3px" }}>{field}</Typography>
                            <TextField
                                size="small"
                                style={{ width: "50vh" }}
                                name={`contact.${field.replace(/\s+/g, '').toLowerCase()}`}
                                value={formData.contact[field.replace(/\s+/g, '').toLowerCase()]}
                                onChange={handleOnChange}
                                inputProps={{ style: { height: "30px", padding: '0 5px' } }}
                            />
                            {field === "E-mail" && (
                                <div style={{ display: 'flex', alignItems: "center", marginTop: "-10px" }}>
                                    <Checkbox
                                        name="check.sendBackup"
                                        checked={formData.check.sendBackup}
                                        onChange={handleOnChange}
                                        style={{ transform: "scale(0.6)" }}
                                    />
                                    <Typography style={{ fontSize: '8px', marginLeft: "-10px", marginTop: "2px", fontWeight: "bold" }}>
                                        Send Data backup on same MailID
                                    </Typography>
                                </div>
                            )}
                        </div>
                    ))
                }
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "-25px" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Typography style={{ fontSize: "12px", fontWeight: "bold", marginBottom: "3px" }}>Trade</Typography>
                    <TextField
                        size="small"
                        style={{ width: "50vh" }}
                        name="trade"
                        value={formData.trade}
                        onChange={handleOnChange}
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
                        onChange={handleOnChange}
                        inputProps={{ style: { height: "30px", padding: '0 5px' } }}
                    />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", width: "48%", alignItems: "flex-end" }}>
                    <Button size="small" variant="contained" style={{ width: 350, fontSize: "10px", height: "30px" }}>Create a new company on Main PC</Button>
                    <Button size="small" variant="outlined" style={{ width: 200, fontSize: "10px", height: "30px" }}>Link Remote</Button>
                </div>
            </div> <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Grid container spacing={2}>
                    {engfld.map((field, index) => (
                        <Grid item xs={8} sm={6} md={2} key={index}>
                            <Typography
                                style={{ fontSize: "12px", fontWeight: "bold", marginTop: "7px", marginBottom: "3px" }}>
                                {field}
                            </Typography>
                            <TextField
                                fullWidth
                                inputProps={{
                                    style: {
                                        height: "30px",
                                        padding: '0 5px',
                                    },
                                }}
                            />
                        </Grid>
                    ))}
                </Grid>

            </div>
            <div style={{ display: "flex", justifyContent: "space-evenly", padding: "20px" }}>
                {
                    check.map((field, index) => (
                        <FormControlLabel
                            key={index}
                            control={<Checkbox
                                name={`check.${field.replace(/\s+/g, '').toLowerCase()}`}
                                checked={formData.check[field.replace(/\s+/g, '').toLowerCase()]}
                                onChange={handleOnChange}
                                size="small"
                                style={{ transform: "scale(0.8)" }}
                            />}
                            label={<Typography style={{ fontSize: '13px' }}>{field}</Typography>}
                        />
                    ))
                }
                <Button variant="contained" size="small" style={{ width: 250, fontSize: "10px", height: "40px" }} onClick={handleSubmit}>Create Company</Button>
            </div>
        </div>
    );
}

export default CreateCompany;
