// Bill.js
import React from 'react';
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useLocation } from 'react-router-dom';

const paperStyles = {
  A4: { width: '800px', height: '1120px' },
  A3: { width: '1120px', height: '1600px' },
  Letter: { width: '864px', height: '1120px' },
};

const backgroundColors = {
  pink: '#f8bbd0',
  green: '#c8e6c9',
  blue: '#bbdefb'
};

const Bill = () => {
  const location = useLocation();
  const { selectedFields = [], paperSize = 'A4', shopNameAlignment = 'center', fieldsAlignment = 'left' } = location.state || {};

  const { width, height } = paperStyles[paperSize] || paperStyles['A4'];
  const bgColor = Object.values(backgroundColors)[Math.floor(Math.random() * Object.values(backgroundColors).length)];

  return (
    <Card style={{ 
      margin: '20px', 
      padding: '20px', 
      backgroundColor: bgColor, 
      width: '800px', 
      height: '800px', 
      overflow: 'auto' 
    }}>
      <CardContent>
        {/* Shop Name */}
        <Typography variant="h4" component="div" align={shopNameAlignment} style={{ fontWeight: 'bold', color: '#2c3e50' }}>
          JUJU Market
        </Typography>

        {/* Customer Name */}
        <Typography variant="h6" component="div" style={{ textAlign: 'left', marginTop: '20px', color: '#34495e' }}>
          Customer Name: Jeni
        </Typography>

        {/* Invoice Table */}
        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
          <Table aria-label="invoice table">
            <TableHead>
              <TableRow>
                <TableCell>Field</TableCell>
                <TableCell align="right">Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedFields.length > 0 ? (
                selectedFields.map((field, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row" align={fieldsAlignment}>
                      {field}
                    </TableCell>
                    <TableCell align="right">[Enter Value]</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell component="th" scope="row" align="center" colSpan={2}>
                    No fields selected.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Company Name */}
        <Typography variant="caption" component="div" align="center" style={{ marginTop: '40px', color: '#95a5a6' }}>
          iShop Software Solution, Thiruvar
        </Typography>
        <Typography variant="caption" component="div" align="center" style={{ color: '#95a5a6' }}>
          Thank you for visiting again!
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Bill;
