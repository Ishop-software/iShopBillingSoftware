// PageFormat.js
import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const PageFormat = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { selectedFields, shopNameAlignment, fieldsAlignment } = location.state || {};

    const [paperSize, setPaperSize] = useState('A4');
    const [open, setOpen] = useState(true);

    const handlePaperSizeChange = (event) => {
        setPaperSize(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
        navigate('/bill', { state: { selectedFields, paperSize, shopNameAlignment, fieldsAlignment } });
    };

    return (
        <Dialog open={open} onClose={handleClose} style={{ width: '800px', height: '800px' }}>
            <DialogTitle>Select Page Format</DialogTitle>
            <DialogContent>
                <FormControl component="fieldset">
                    <RadioGroup value={paperSize} onChange={handlePaperSizeChange}>
                        <FormControlLabel value="A4" control={<Radio />} label="A4" />
                        <FormControlLabel value="A3" control={<Radio />} label="A3" />
                        <FormControlLabel value="Letter" control={<Radio />} label="Letter" />
                        {/* Add more paper sizes if needed */}
                    </RadioGroup>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Bill
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PageFormat;
