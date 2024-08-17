
import React, { useState } from 'react';
import axios from 'axios';
import './ExportPage.css';

const ExportPage = ({ show, onClose, onExport }) => {
  const [selectedOption, setSelectedOption] = useState('');

  if (!show) return null;

  const handleExport = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/export', 
        { exportType: selectedOption }, {
        responseType: 'blob', 
      });

     
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'accounts.xlsx'); 
      document.body.appendChild(link);
      link.click();
      link.remove();

      onExport();
    } catch (error) {
      console.error('Export failed', error);
    }
  };

  return (
    <>
      <div className="overlay" />
      <div className="modal-container">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className='head2'>EXPORT ITEMS</h2>
            <button className="close-button" onClick={onClose}>X</button>
          </div>
          <div className="export-container">
            <div className="export-section">
              <h3 className='head3'>Export What..?</h3>
              <div className="checkbox-container">
                <label>
                  <input
                    type="radio"
                    name="export-accounts"
                    value="all-accounts"
                    onChange={() => setSelectedOption('all-accounts')}
                  />
                  All Accounts
                </label>
                <label>
                  <input
                    type="radio"
                    name="export-accounts"
                    value="selected-accounts"
                    onChange={() => setSelectedOption('selected-accounts')}
                  />
                  Selected Accounts Only
                </label>
              </div>
            </div>
            <div className="export-section">
              <h3>Opening Balance</h3>
              <div className="checkbox-container">
                <label>
                  <input type="radio" name="opening-balance" value="pick-op-bal" />
                  Pick Opening Balance
                </label>
                <label>
                  <input type="radio" name="opening-balance" value="pick-cl-bal" />
                  Pick Closing Balance
                </label>
                <label>
                  <input type="radio" name="opening-balance" value="no-balance" />
                  No Balance (0 Op.Bal)
                </label>
              </div>
            </div>
          </div>
          <button className="btn export-action" onClick={handleExport}>Export</button>
        </div>
      </div>
    </>
  );
};

export default ExportPage;
