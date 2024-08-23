import React, { useState } from "react";
import { Button, Card, TextField, Typography, Grid, Checkbox, FormControlLabel, MenuItem, AppBar } from "@mui/material";
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import './Items.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';
import NavBar from '../AppBar_Item/AppBar';


const btns = ["Save", "Delete", "List", "QR Code"];
const txtfld = ["item Name", "short Name", "HSN Code"];
const dropdown = ["company", "group"];
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function Items() {
    const [openCompany, setOpenCompany] = useState(false);
    const [openGroup, setOpenGroup] = useState(false);
    const [showAlternateUnit, setShowAlternateUnit] = useState(false);
    const [openTaxSlab, setOpenTaxSlab] = useState(false);
    const [openUnitEntry, setOpenUnitEntry] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [language, setLanguage] = useState('English');
    const [itemData, setItemData] = useState({
        itemName: "",
        shortName: "",
        HSNCode: "",
        taxSlab: "",
        primaryUnit: "",
        company: "",
        uploadImage: "",
        maintainBatch: false,
        group: "",
        serialNoTracking: false,
        variation: "",
        color: "",
        size: "",
        expDate: "",
        mfgDate: "",
        purchase: 0,
        salePrice: 0,
        mrp: 0,
        basicPrice: 0,
        selfVal: 0,
        minSalePrice: 0,
        barcode: "",
        openingPck: 0,
        openingValue: 0,
        delete: false,
        copy: false,
        details: ""
    });

    const navigate = useNavigate();

    const handleOpenCompany = () => setOpenCompany(true);
    const handleCloseCompany = () => setOpenCompany(false);
    const handleOpenGroup = () => setOpenGroup(true);
    const handleCloseGroup = () => setOpenGroup(false);
    const handleOpenTaxSlab = () => setOpenTaxSlab(true);
    const handleCloseTaxSlab = () => setOpenTaxSlab(false);
    const handleOpenUnitEntry = () => setOpenUnitEntry(true);
    const handleCloseUnitEntry = () => setOpenUnitEntry(false);

    const toggleAlternateUnit = () => setShowAlternateUnit(!showAlternateUnit);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };


    const handleUploadClick = () => {
        document.getElementById('fileInput').click();
    };

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
    };

    const handleSave = async () => {

        if (!itemData.itemName || !itemData.taxSlab) {
            alert('Please fill out all required fields.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/productitems/addProductItem', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(itemData)
            });

            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const result = await response.json();
                if (response.ok) {
                    alert('Item saved successfully!');
                    navigate('/view')
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

        <div className="items-container">

            <NavBar />
            <Card className="card-styles">
                <div className="card-header">
                    <Typography className="header-title">Add New Item</Typography>
                    <div className="header-buttons">
                        {btns.map(index => (
                            <Button variant="contained" key={index} className="button" onClick={() => index === "Save" && handleSave()}>{index}</Button>
                        ))}
                    </div>
                </div>
                <div className="text-field-container">
                    {txtfld.map(index => (
                        <div key={index} className="text-field-wrapper">
                            <Typography className="text-field-label">{index}</Typography>
                            <TextField size="small" className="text-field-input" value={itemData[index.replace(/ /g, '')]}
                                onChange={(e) => setItemData(prev => ({ ...prev, [index.replace(/ /g, '')]: e.target.value }))} />
                        </div>
                    ))}
                </div>

                <Grid container spacing={18} className="dropdown-container">
                    <Grid item xs={5}>
                        <div className="dropdown-wrapper">
                            <Typography className="dropdown-label">Tax Slab</Typography>
                            <div className="dropdown-actions">
                                <TextField
                                    select
                                    size="small"
                                    value={itemData.taxSlab}
                                    onChange={(e) => setItemData(prev => ({ ...prev, taxSlab: e.target.value }))}
                                    className="tax-slab-dropdown"
                                >

                                    <MenuItem value="0">05% GST</MenuItem>
                                    <MenuItem value="5">12% GST</MenuItem>
                                    <MenuItem value="12">18% GST</MenuItem>
                                    <MenuItem value="18">28% GST</MenuItem>
                                    <MenuItem value="28">Tax Free</MenuItem>
                                </TextField>
                            </div>
                        </div>
                        {dropdown.map(index => (
                            <div key={index} className="dropdown-wrapper">
                                <Typography className="dropdown-label">{index}</Typography>
                                <div className="dropdown-actions">
                                    <TextField size="small" value={itemData[index.replace(/ /g, '')]}
                                        onChange={(e) => setItemData(prev => ({ ...prev, [index.replace(/ /g, '')]: e.target.value }))}
                                        className="dropdown-text-field" />
                                </div>
                            </div>
                        ))}
                    </Grid>
                    <Grid item xs={4}>
                        <div className="primary-unit-container">
                            <Typography className="primary-unit-label">Primary Unit</Typography>
                            <div className="primary-unit-actions">
                                <TextField
                                    select
                                    size="small"
                                    value={itemData.primaryUnit}
                                    onChange={(e) => setItemData(prev => ({ ...prev, primaryUnit: e.target.value }))}
                                    className="primary-unit-dropdown"
                                >
                                    <MenuItem value="kg">Bag</MenuItem>
                                    <MenuItem value="g">Box</MenuItem>
                                    <MenuItem value="ltr">Dozen</MenuItem>
                                    <MenuItem value="ml">Gms.</MenuItem>
                                    <MenuItem value="ml">Kgs.</MenuItem>
                                    <MenuItem value="ml">Ltr.</MenuItem>
                                    <MenuItem value="ml">Pcs.</MenuItem>
                                    <MenuItem value="ml">Qntl</MenuItem>
                                </TextField>
                                <Button variant="outlined" className="primary-unit-outline-button" onClick={toggleAlternateUnit}>
                                    <ViewInArIcon style={{ color: "#35AFFD" }} />
                                </Button>
                            </div>
                            {!showAlternateUnit ? (
                                <div className="image-upload-container">
                                    <input
                                        type="file"
                                        id="fileInput"
                                        accept="image/*"
                                        style={{ display: "none" }}
                                        onChange={handleImageUpload}
                                    />
                                    <Button variant="outlined" className="upload-image-button" onClick={handleUploadClick}>
                                        <CloudUploadIcon /> Upload Image
                                    </Button>
                                    {selectedImage && (
                                        <img src={selectedImage} alt="Selected" className="uploaded-image" />
                                    )}
                                </div>
                            ) : (
                                <div className="alternate-unit-container">
                                    <TextField size="small" className="alternate-unit-field" placeholder="Alternate Unit" />
                                    <TextField size="small" className="conversion-factor-field" placeholder="Conversion Factor" />
                                    <TextField size="small" className="price-per-field" placeholder="Price Per" />
                                </div>
                            )}
                        </div>
                    </Grid>
                </Grid>

                <div className="checkbox-container">
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={itemData.maintainBatch}
                                onChange={(e) => setItemData(prev => ({ ...prev, maintainBatch: e.target.checked }))}
                            />
                        }
                        label="Maintain Batched"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={itemData.serialNoTracking}
                                onChange={(e) => setItemData(prev => ({ ...prev, serialNoTracking: e.target.checked }))}
                            />
                        }
                        label="Serial No. Tracking"
                    />
                </div>
            </Card>

            <div className="action-buttons">
                <button className="btn variation">Variation</button>
                <button className="btn color">Color</button>
                <button className="btn size">Size</button>
                <button className="btn exp">Exp.Dt</button>
                <button className="btn mfg">Mfg.Dt</button>
                <button className="btn purchase">Purchase</button>
                <button className="btn sale-price">Sale Price</button>
                <button className="btn mrp">MRP</button>
                <button className="btn basic-price">Basic Price</button>
                <button className="btn self-val">Self.Val</button>
                <button className="btn min">Min.Sale.P</button>
                <button className="btn barcode">Barcode</button>
                <button className="btn opening-pck">Opening Pck</button>
                <button className="btn opening-value">Opening Value</button>
                <button className="btn delete">Delete</button>
                <button className="btn copy">Copy</button>
                <button className="btn details">Details</button>
            </div>
            <div className="text-field">
                <input type="text" className="text-box1" />
                <input type="text" className="text-box2" />
                <input type="text" className="text-box3" />
                <input type="text" className="text-box4" />
                <input type="text" className="text-box5" />
                <input type="text" className="text-box6" />
                <input type="text" className="text-box7" />
                <input type="text" className="text-box8" />
                <input type="text" className="text-box9" />
                <input type="text" className="text-box10" />
                <input type="text" className="text-box11" />
                <input type="text" className="text-box12" />
                <input type="text" className="text-box13" />
                <input type="text" className="text-box14" />
                <input type="text" className="text-box15" />
                <input type="text" className="text-box16" />
                <input type="text" className="text-box17" />

            </div>
        </div>

    );
}

export default Items;
