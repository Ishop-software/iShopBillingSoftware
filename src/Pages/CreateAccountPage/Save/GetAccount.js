import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import './GetAccount.css';

function GetAccount() {
  const [gstNumber, setGstNumber] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const handleGstNumberChange = (e) => {
    setGstNumber(e.target.value);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = () => {
   
    if (isChecked && gstNumber) {
      console.log('Fetching account information for GST No:', gstNumber);
      
    }
  };

  return (
    <div className="get-account-container">
      <div className="gst-input-container">
        <input
          type="text"
          value={gstNumber}
          onChange={handleGstNumberChange}
          placeholder="Enter GST No"
          className="gst-input"
        />
        <div className="checkbox-container">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="checkbox"
          />
          {isChecked && <FaCheck className="check-icon" />}
        </div>
      </div>
      
    </div>
  );
}

export default GetAccount;