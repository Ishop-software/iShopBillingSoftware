
import React, { useState } from 'react';
import axios from 'axios'; 
import './ImportPage.css';

const ImportPage = ({ show, onClose, onImport }) => {
  const [file, setFile] = useState(null);
  const [fromRow, setFromRow] = useState('');
  const [toRow, setToRow] = useState('');
  const [importType, setImportType] = useState('');

  if (!show) return null;


  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };


  const handleImport = async () => {
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('fromRow', fromRow);
    formData.append('toRow', toRow);
    formData.append('importType', importType);

    try {
      await axios.post('http://localhost:5000/api/import', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      onImport(); 
    } catch (error) {
      console.error('Import failed', error);
    }
  };

  return (
    <>
      <div className="overlay" /> 
      <div className="modal-container">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="head5">IMPORT ITEMS MASTER FORM EXCEL</h2>
            <button className="close-button" onClick={onClose}>X</button>
          </div>
          <div className="import-container">
            <div className="step">
              <h3 className="step-heading">Step 1</h3>
              <div className="step-content">
                <input
                  type="file"
                  className="file-input1"
                  onChange={handleFileChange}
                />
                <input
                  type="text"
                  placeholder="Enter file name..."
                  className="file-input"
                  readOnly
                  value={file ? file.name : ''}
                />
              </div>
              <div className="row-number">
                <input
                  type="number"
                  placeholder="From row number"
                  className="row-input"
                  value={fromRow}
                  onChange={(e) => setFromRow(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="To row number"
                  className="row-input"
                  value={toRow}
                  onChange={(e) => setToRow(e.target.value)}
                />
              </div>
            </div>

            <div className="step">
              <h3 className="step-heading">Step 2</h3>
              <div className="step-content1">
                <label className="import-type2">
                  <input
                    type="radio"
                    name="import-type"
                    value="new"
                    checked={importType === 'new'}
                    onChange={() => setImportType('new')}
                  />
                  Import as all items are new from Excel Sheets
                </label>
                <label className="import-type2">
                  <input
                    type="radio"
                    name="import-type"
                    value="overwrite"
                    checked={importType === 'overwrite'}
                    onChange={() => setImportType('overwrite')}
                  />
                  Overwriting Existing items with new item details
                </label>
              </div>
            </div>

            <div className="step">
              <h3 className="step-heading">Step 3</h3>
              <button className="btn import-btn" onClick={handleImport}>Import Data</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImportPage;
