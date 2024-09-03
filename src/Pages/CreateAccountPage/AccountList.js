import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCog, FaUser, FaEye, FaPlus, FaEdit } from 'react-icons/fa';
import './AccountList.css';
import CreateSetting from './Setting/CreateSetting';
import GroupEntry from './Entry/GroupEntry';
import GetAccount from './Save/GetAccount';

function AccountList() {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [showSettingModal, setShowSettingModal] = useState(false);
  const [showGroupEntry, setShowGroupEntry] = useState(false);
  const [showGetAccount, setShowGetAccount] = useState(false);

  const navigate = useNavigate();

  const groupOptions = ['Assets', 'Liabilities', 'Equity', 'Revenue', 'Expenses'];

  const [formData, setFormData] = useState({
    name: "",
    printAs: "",
    group: "",
    openingBal: "",
    drCr: "dr",
    taxNo: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    pincode: "",
    state: "",
    statePincode: "",
    mobileNo: "",
    phone: "",
    email: "",
    contactPerson: "",
    panCard: ""
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users/createAccount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message || 'Saved successfully');
      } else {
        alert(result.message || 'Failed to save');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while saving. Please try again.');
    }
  };

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const handleSettingClick = () => {
    setShowSettingModal(true);
  };

  const closeModal = () => {
    setShowSettingModal(false);
  };

  const openGroupEntry = () => {
    setShowGroupEntry(true);
  };

  const closeGroupEntry = () => {
    setShowGroupEntry(false);
  };

  const toggleGetAccount = () => {
    setShowGetAccount(!showGetAccount);
  };

  const goToViewList = () => {
    navigate('/accountviewlist');
  };

  return (
    <div className="container">
      {/* Navbar */}
      <div className="navbar">
        <div className="navbar-left">
          <FaArrowLeft className="icon" />
          <div className="navbar-links">
            <a href="#account">Account</a>
            <a href="#sales">Sales</a>
            <a href="#purchase">Purchase</a>
            <a href="#pos">POS</a>
            <a href="#help">Help</a>
            <a href="#customize">Customize</a>
          </div>
        </div>
        <div className="navbar-right">
          <FaCog className="icon" />
          <select
            className="language-dropdown"
            value={selectedLanguage}
            onChange={handleLanguageChange}
          >
            <option value="English">EN</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="German">German</option>
          </select>
          <FaUser className="icon" />
        </div>
      </div>

    
      <div className="header-container">
        <h1>CREATE ACCOUNT</h1>
        <div className="header-buttons">
          <button className="btn setting" onClick={handleSettingClick}>Setting</button>
          <button className="btn delete">Delete</button>
          <button className="btn list" onClick={goToViewList}>List</button>
          <button className="btn get" onClick={toggleGetAccount}>Get Account Information with GST.NO</button>
        </div>
      </div>

   
      <div className="form-container">
        <div className="form-item">
          <label htmlFor="name"></label>
          <input id="name" type="text" placeholder="Name" value={formData.name} onChange={handleInputChange} />
        </div>
        <div className="form-item">
          <label htmlFor="printAs"></label>
          <input id="printAs" type="text" placeholder="Print As" value={formData.printAs} onChange={handleInputChange} />
        </div>
        <div className="form-row">
          <div className="form-item group-item">
            <label htmlFor="group"></label>
            <div className="group-container">
              <select
                id="group"
                value={formData.group}
                onChange={handleInputChange}
              >
                <option value="" disabled>Select Group</option>
                {groupOptions.map((group, index) => (
                  <option key={index} value={group}>{group}</option>
                ))}
              </select>
              <div className="form-actions">
                <button className="action-btn plus-btn" onClick={openGroupEntry}>+</button>
                <button className="action-btn edit-btn"><FaEdit /></button>
              </div>
            </div>
          </div>
          <div className="form-item opening-bal-item">
            <label htmlFor="openingBal">Opening Bal</label>
            <input id="openingBal" type="text" placeholder="Opening Bal" value={formData.openingBal} onChange={handleInputChange} />
          </div>
          <div className="form-item dr-cr-item">
            <label htmlFor="drCr">Dr./Cr.</label>
            <select id="drCr" value={formData.drCr} onChange={handleInputChange}>
              <option value="dr">Dr.</option>
              <option value="cr">Cr.</option>
            </select>
          </div>
          <div className="form-item tax-no-item">
            <label htmlFor="taxNo">Tax No (GSTIN/VAT.NO)</label>
            <div className="tax-no-container">
              <input id="taxNo" type="text" placeholder="Tax No" value={formData.taxNo} onChange={handleInputChange} />
              <div className="eye-icon-box">
                <FaEye className="eye-icon" />
              </div>
            </div>
          </div>
        </div>
        <div className="form-item">
          <label htmlFor="addressLine1"></label>
          <input id="addressLine1" type="text" placeholder="Address Line 1" value={formData.addressLine1} onChange={handleInputChange} />
        </div>
        <div className="form-item">
          <label htmlFor="addressLine2"></label>
          <input id="addressLine2" type="text" placeholder="Address Line 2" value={formData.addressLine2} onChange={handleInputChange} />
        </div>
        <div className="form-row">
          <div className="form-item city-item">
            <label htmlFor="city"></label>
            <input id="city" type="text" placeholder="City" value={formData.city} onChange={handleInputChange} />
          </div>
          <div className="form-item pincode-item">
            <label htmlFor="pincode"></label>
            <input id="pincode" type="text" placeholder="Pincode" value={formData.pincode} onChange={handleInputChange} />
          </div>
          <div className="form-item state-item">
            <label htmlFor="state"></label>
            <input id="state" type="text" placeholder="State" value={formData.state} onChange={handleInputChange} />
          </div>
          <div className="form-item state-pincode-item">
            <label htmlFor="statePincode"></label>
            <input id="statePincode" type="text" placeholder="State Pin Code" value={formData.statePincode} onChange={handleInputChange} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-item mobile-No-item">
            <label htmlFor="mobileNo"></label>
            <input id="mobileNo" type="text" placeholder="Mobile No" value={formData.mobileNo} onChange={handleInputChange} />
          </div>
          <div className="form-item phone-item">
            <label htmlFor="phone"></label>
            <input id="phone" type="text" placeholder="Phone" value={formData.phone} onChange={handleInputChange} />
          </div>
          <div className="form-item email-item">
            <label htmlFor="email"></label>
            <input id="email" type="email" placeholder="E-mail" value={formData.email} onChange={handleInputChange} />
          </div>
          <div className="form-item contact-person-item">
            <label htmlFor="contactPerson"></label>
            <input id="contactPerson" type="text" placeholder="Contact Person" value={formData.contactPerson} onChange={handleInputChange} />
          </div>
          <div className="form-item pan-card-item">
            <label htmlFor="panCard"></label>
            <input id="panCard" type="text" placeholder="PanCard No" value={formData.panCard} onChange={handleInputChange} />
          </div>
        </div>
      </div>

      <div className="footer">
        <button className="btn save" onClick={handleSave}>Save</button>
        <button className="btn delete">Delete</button>
      </div>

      {showSettingModal && <CreateSetting onClose={closeModal} />}
      {showGroupEntry && <GroupEntry onClose={closeGroupEntry} />}
      {showGetAccount && <GetAccount />}
    </div>
  );
}

export default AccountList;