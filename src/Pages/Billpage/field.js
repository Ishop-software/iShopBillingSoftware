// FieldSelection.js
import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, FormGroup, FormControlLabel, Checkbox, RadioGroup, Radio } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const fieldsList = [
    'GST', 'SGST', 'Discount', 'Total Amount', 'Paid Amount', 'Balance Amount',
    'Taxable Value', 'Invoice Number', 'Date of Purchase', 'Item Description',
    'Quantity', 'Rate', 'Sub-Total', 'Payment Method', 'Delivery Charges'
];

const FieldSelection = () => {
    const [selectedFields, setSelectedFields] = useState([]);
    const [shopNameAlignment, setShopNameAlignment] = useState('center');
    const [fieldsAlignment, setFieldsAlignment] = useState('left');
    const navigate = useNavigate();

    const handleCheckboxChange = (field) => {
        setSelectedFields((prev) => prev.includes(field)
            ? prev.filter((item) => item !== field)
            : [...prev, field]);
    };

    const handleSubmit = () => {
        navigate('/page', { state: { selectedFields, shopNameAlignment, fieldsAlignment } });
    };

    return (
        <Card style={{
            margin: '20px',
            padding: '20px',
            width: '800px',
            height: '800px',
            overflow: 'auto'
        }}>
            <CardContent>
                <Typography variant="h5" component="div" style={{ marginBottom: '20px' }}>
                    Select Fields and Alignment
                </Typography>
                <FormGroup>
                    {fieldsList.map((field) => (
                        <FormControlLabel
                            key={field}
                            control={
                                <Checkbox
                                    checked={selectedFields.includes(field)}
                                    onChange={() => handleCheckboxChange(field)}
                                />
                            }
                            label={field}
                        />
                    ))}
                </FormGroup>

                <Typography variant="h6" component="div" style={{ marginTop: '20px' }}>
                    Shop Name Alignment
                </Typography>
                <RadioGroup value={shopNameAlignment} onChange={(e) => setShopNameAlignment(e.target.value)} row>
                    <FormControlLabel value="left" control={<Radio />} label="Left" />
                    <FormControlLabel value="center" control={<Radio />} label="Center" />
                    <FormControlLabel value="right" control={<Radio />} label="Right" />
                </RadioGroup>

                <Typography variant="h6" component="div" style={{ marginTop: '20px' }}>
                    Fields Alignment
                </Typography>
                <RadioGroup value={fieldsAlignment} onChange={(e) => setFieldsAlignment(e.target.value)} row>
                    <FormControlLabel value="left" control={<Radio />} label="Left" />
                    <FormControlLabel value="center" control={<Radio />} label="Center" />
                    <FormControlLabel value="right" control={<Radio />} label="Right" />
                </RadioGroup>

                <Button variant="contained" color="primary" onClick={handleSubmit} style={{ marginTop: '20px' }}>
                    Submit
                </Button>
            </CardContent>
        </Card>
    );
};

export default FieldSelection;
