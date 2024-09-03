import React, { useState } from 'react';
import './CreateSetting.css';
import { FaTimes } from 'react-icons/fa';

const CreateSetting = ({ closeModal }) => {
  const [settings, setSettings] = useState({
    birthdayDetails: true,
    bankDetails: true,
    partyType: true,
    uniqueID: false,
    billBalance: false,
    drugLicence: false,
    uCard: false,
  });

  const handleToggle = (setting) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      [setting]: !prevSettings[setting],
    }));
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-button" onClick={closeModal}><FaTimes /></button>
        <h2>SETTINGS</h2>
        <div className="setting-item">
          Need Birthday/Anniversary Details
          <button
            className={`toggle-button ${settings.birthdayDetails ? 'on' : 'off'}`}
            onClick={() => handleToggle('birthdayDetails')}
          >
            {settings.birthdayDetails ? 'ON' : 'OFF'}
          </button>
        </div>
        <div className="setting-item">
          Enter bank details
          <button
            className={`toggle-button ${settings.bankDetails ? 'on' : 'off'}`}
            onClick={() => handleToggle('bankDetails')}
          >
            {settings.bankDetails ? 'ON' : 'OFF'}
          </button>
        </div>
        <div className="setting-item">
          Let me choose party type (B2B/B2C) etc.
          <button
            className={`toggle-button ${settings.partyType ? 'on' : 'off'}`}
            onClick={() => handleToggle('partyType')}
          >
            {settings.partyType ? 'ON' : 'OFF'}
          </button>
        </div>
        <div className="setting-item">
          Enter party's unique ID (Aadhar card)
          <button
            className={`toggle-button ${settings.uniqueID ? 'on' : 'off'}`}
            onClick={() => handleToggle('uniqueID')}
          >
            {settings.uniqueID ? 'ON' : 'OFF'}
          </button>
        </div>
        <div className="setting-item">
          Maintain bill by bill balance
          <button
            className={`toggle-button ${settings.billBalance ? 'on' : 'off'}`}
            onClick={() => handleToggle('billBalance')}
          >
            {settings.billBalance ? 'ON' : 'OFF'}
          </button>
        </div>
        <div className="setting-item">
          Keep record of DL no's (Drug Licence no)
          <button
            className={`toggle-button ${settings.drugLicence ? 'on' : 'off'}`}
            onClick={() => handleToggle('drugLicence')}
          >
            {settings.drugLicence ? 'ON' : 'OFF'}
          </button>
        </div>
        <div className="setting-item">
          Maintain U.card No
          <button
            className={`toggle-button ${settings.uCard ? 'on' : 'off'}`}
            onClick={() => handleToggle('uCard')}
          >
            {settings.uCard ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateSetting;
