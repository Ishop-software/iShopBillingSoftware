import React, { useState, useEffect, useRef } from "react";
import { Button, Card, TextField, Typography, Grid, MenuItem } from "@mui/material";
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import { useNavigate } from 'react-router-dom';
import NavBar from '../AppBar_Item/AppBar';
import './Items.css';

const btns = ["Save", "List"];
const txtfld = ["itemName", "shortName", "HSNCode"];
const dropdown = ["company", "group"];

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
            console.log('Retrieved token:', token);
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Authentication token is missing.');
                return;
            }

         
            const response = await fetch('http://localhost:5000/api/productitems/addProductItem', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token 
                },
                body: JSON.stringify(itemData)
            });

            if (response.ok) {
                const result = await response.json();
                alert('Item saved successfully!');
                navigate('/View'); 
              
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
                const error = await response.json();
                alert('Failed to save item: ' + error.message);
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
                                <Typography className="text-field-label">{field.replace(/([A-Z])/g, ' $1')}</Typography>
                                <TextField
                                    size="small"
                                    className="text-field-input"
                                    value={itemData[field]}
                                    onChange={(e) => handleInputChange(e, field)}
                                    onKeyDown={(e) => handleKeyDown(e, txtfld[idx + 1])}
                                    inputRef={(el) => inputRefs.current[field] = el}
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
                                    <Typography className="dropdown-label">{index.replace(/([A-Z])/g, ' $1')}</Typography>
                                    <div className="dropdown-actions">
                                        <TextField
                                            size="small"
                                            value={itemData[index]}
                                            onChange={(e) => handleInputChange(e, index)}
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
                            </div>
                            {showAlternateUnit && (
                                <div className="alternate-unit-container">
                                    <Typography className="alternate-unit-title">Alternate Unit</Typography>
                                    <div className="alternate-unit-actions">
                                        <TextField
                                            select
                                            size="small"
                                            value={itemData.alternateUnit}
                                            onChange={(e) => handleInputChange(e, 'alternateUnit')}
                                            className="alternate-unit-dropdown"
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
                                    </div>
                                </div>
                            )}
                        </Grid>
                        <Grid item xs={3}>
                            <div className="image-upload-container">
                                <Typography className="image-upload-label">Upload Image</Typography>
                                <div className="image-upload-actions">
                                    <Button variant="contained" color="primary" onClick={handleUploadClick}>
                                        Upload Image
                                    </Button>
                                    <input
                                        id="fileInput"
                                        type="file"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        onChange={handleImageUpload}
                                    />
                                    {selectedImage && <img src={selectedImage} alt="Selected" className="selected-image" />}
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </Card>
            </div>
        </div>
    );
}

export default Items;
