import React, { useState } from "react";
import { Button, Card, TextField, Typography, Grid, Checkbox, FormControlLabel, MenuItem, AppBar } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import { Button, Card, TextField, Typography, Grid, Checkbox, FormControlLabel, MenuItem } from "@mui/material";
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useNavigate } from 'react-router-dom';
import NavBar from '../AppBar_Item/AppBar';

import './Items.css';

const btns = ["Save", "List", "QR Code"];
const txtfld = ["item Name", "short Name", "HSN Code"];
const dropdown = ["company", "group"];
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function Items() {
    const [showAlternateUnit, setShowAlternateUnit] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
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
        purchase: "",
        salePrice: "",
        mrp: "",
        basicPrice: "",
        selfVal: "",
        minSalePrice: "",
        barcode: "",
        openingPck: "",
        openingValue: "",
        piecePerBox: "",
        boxRate: "",
        pricePerPiece: "",
    });
    const navigate = useNavigate();
    const inputRefs = useRef({});

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
                    navigate('/View');
                    console.log('Saved item:', result);

                    setItemData({
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
                        purchase: "",
                        salePrice: "",
                        mrp: "",
                        basicPrice: "",
                        selfVal: "",
                        minSalePrice: "",
                        barcode: "",
                        openingPck: "",
                        openingValue: "",
                        piecePerBox: "",
                        boxRate: "",
                        pricePerPiece: "",
                    });

                    setSelectedImage(null);
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

    const handleList = () => {
        navigate('/View');
    };

    const handleInputChange = (e, field) => {
        const value = e.target.value;
        setItemData(prev => ({ ...prev, [field]: value }));
    };

    const handleKeyDown = (e, nextField) => {
        if (e.key === 'Enter' && nextField) {
            e.preventDefault();
            inputRefs.current[nextField]?.focus();
        }
    };

    useEffect(() => {
        if (itemData.piecePerBox && itemData.boxRate) {
            const pricePerPiece = (parseFloat(itemData.boxRate) / parseFloat(itemData.piecePerBox)).toFixed(2);
            setItemData(prev => ({ ...prev, pricePerPiece }));
        }
    }, [itemData.piecePerBox, itemData.boxRate]);

    return (

        <div className="items-container">

            <NavBar />
            <div className="items-container">
                <Card className="card-styles">
                    <div className="card-header">
                        <Typography className="header-title">Add New Item</Typography>
                        <div className="header-buttons">
                            {btns.map(index => (
                                <Button
                                    variant="contained"
                                    key={index}
                                    className="button"
                                    onClick={() => {
                                        if (index === "Save") {
                                            handleSave();
                                        } else if (index === "List") {
                                            handleList();
                                        }
                                    }}
                                >
                                    {index}
                                </Button>
                            ))}
                        </div>
                    </div>
                    <div className="text-field-container">
                        {txtfld.map((field, idx) => (
                            <div key={field} className="text-field-wrapper">
                                <Typography className="text-field-label">{field}</Typography>
                                <TextField
                                    size="small"
                                    className="text-field-input"
                                    value={itemData[field.replace(/ /g, '')]}
                                    onChange={(e) => handleInputChange(e, field.replace(/ /g, ''))}
                                    onKeyDown={(e) => handleKeyDown(e, txtfld[idx + 1]?.replace(/ /g, ''))}
                                    inputRef={(el) => inputRefs.current[field.replace(/ /g, '')] = el}
                                />
                            </div>
                        ))}
                    </div>

                    <Grid container spacing={3} className="dropdown-container">
                        <Grid item xs={5}>
                            <div className="dropdown-wrapper">
                                <Typography className="dropdown-label">Tax Slab</Typography>
                                <div className="dropdown-actions">
                                    <TextField
                                        select
                                        size="small"
                                        value={itemData.taxSlab}
                                        onChange={(e) => handleInputChange(e, 'taxSlab')}
                                        className="tax-slab-dropdown"
                                        InputProps={{ style: { width: '420px' } }}
                                    >
                                        <MenuItem value="5">05% GST</MenuItem>
                                        <MenuItem value="12">12% GST</MenuItem>
                                        <MenuItem value="18">18% GST</MenuItem>
                                        <MenuItem value="28">28% GST</MenuItem>
                                        <MenuItem value="0">Tax Free</MenuItem>
                                    </TextField>
                                </div>
                            </div>
                            {dropdown.map(index => (
                                <div key={index} className="dropdown-wrapper">
                                    <Typography className="dropdown-label">{index}</Typography>
                                    <div className="dropdown-actions">
                                        <TextField
                                            size="small"
                                            value={itemData[index.replace(/ /g, '')]}
                                            onChange={(e) => handleInputChange(e, index.replace(/ /g, ''))}
                                            className="dropdown-text-field"
                                            InputProps={{ style: { width: '420px' } }}
                                        />
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
                                        onChange={(e) => handleInputChange(e, 'primaryUnit')}
                                        className="primary-unit-dropdown"
                                        InputProps={{ style: { width: '100%' } }}
                                    >
                                        <MenuItem value="bag">Bag</MenuItem>
                                        <MenuItem value="box">Box</MenuItem>
                                        <MenuItem value="dozen">Dozen</MenuItem>
                                        <MenuItem value="gm">Gms.</MenuItem>
                                        <MenuItem value="kg">Kgs.</MenuItem>
                                        <MenuItem value="ltr">Ltr.</MenuItem>
                                        <MenuItem value="pcs">Pcs.</MenuItem>
                                        <MenuItem value="qntl">Qntl</MenuItem>
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
                                        <TextField
                                            size="small"
                                            className="alternate-unit-field"
                                            placeholder="Piece Per Box"
                                            value={itemData.piecePerBox}
                                            onChange={(e) => handleInputChange(e, 'piecePerBox')}
                                        />
                                        <TextField
                                            size="small"
                                            className="conversion-factor-field"
                                            placeholder="Box Rate"
                                            value={itemData.boxRate}
                                            onChange={(e) => handleInputChange(e, 'boxRate')}
                                        />
                                        <TextField
                                            size="small"
                                            className="price-per-field"
                                            placeholder="Price Per Piece"
                                            value={itemData.pricePerPiece}
                                            InputProps={{ readOnly: true }}
                                        />
                                    </div>
                                )}
                            </div>
                        </Grid>
                        <Grid item xs={3}>
                            <div className="checkboxcontainer">
                                <FormControlLabel
                                    control={<Checkbox checked={itemData.maintainBatch} onChange={(e) => handleInputChange(e, 'maintainBatch')} />}
                                    label="Maintain Batch"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={itemData.serialNoTracking} onChange={(e) => handleInputChange(e, 'serialNoTracking')} />}
                                    label="Serial No. Tracking"
                                />
                            </div>
                        </Grid>
                    </Grid>
                </Card>
                <div className="action-button-container">
                    <button className="variation">Variation</button>
                    <button className="color">Color</button>
                    <button className="size">Size</button>
                    <button className="exp">Exp.Dt</button>
                    <button className="mfg">Mfg.Dt</button>
                    <button className="purchase">Purchase</button>
                    <button className="saleprice">Sale Price</button>
                    <button className="mrp">MRP</button>
                    <button className="basicprice">Basic Price</button>
                    <button className="selfval">Self.Val</button>
                    <button className="min">Min.Sale.Price</button>
                    <button className="barcode">Barcode</button>
                    <button className="openingpck">Opening Pck</button>
                    <button className="openingvalue">Opening Value</button>
                </div>
                <div className="text-field-container">
                    {[...Array(14)].map((_, index) => (
                        <input
                            key={index}
                            type="text"
                            className={`textbox${index + 1}`}
                            onKeyDown={(e) => handleKeyDown(e, index + 1 < 14 ? `textbox${index + 2}` : null)}
                            ref={(el) => inputRefs.current[`textbox${index + 1}`] = el}
                        />
                    ))}
                </div>
            </div>
            );
}

            export default Items;
