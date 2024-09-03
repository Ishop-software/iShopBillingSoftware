import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaCog, FaEdit, FaTrash, FaBook } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './AccountViewList.css';
import AccountExportPage from './AccountExport/AccountExportPage';
import AccountImportPage from './AccountImport/AccountImportPage';

function AccountViewList() {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [accountDetails, setAccountDetails] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [editingAccountDetails, setEditingAccountDetails] = useState(null); 
  const [showExportModal, setShowExportModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);

  const navigate = useNavigate();

  
  const fetchAllAccountDetails = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users/getAllAccountDetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const result = await response.json();
      console.log('Fetched result:', result);
      
      const { data } = result;
      
      if (Array.isArray(data)) {
        setAccountDetails(data);
      } else {
        console.error('Data is not an array:', data);
        setError('Data is not in the expected format');
      }
    } catch (error) {
      setError(error.message);
      console.error('Error fetching account details:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllAccountDetails();
  }, []);

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const handleEdit = (index) => {
    setEditingAccountDetails(accountDetails[index]);
    console.log('Edit clicked for account at index ${index}');
  };

  const handleDelete = async (index) => {
    const accountId = accountDetails[index].accountId;
    try {
      const response = await fetch('http://localhost:5000/api/deleteAccountDetails', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accountId }),
      });

      const result = await response.json();
      if (result.success) {
      
        setAccountDetails(prevDetails => prevDetails.filter((_, i) => i !== index));
        console.log('Account deleted successfully');
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error('Error deleting account details:', error);
    }
  };

  const handleLedger = (index) => {
    console.log('Ledger clicked for account at index ${index}');
   
  };

  const handleExport = () => {
    console.log('Export button clicked');
    setShowExportModal(true);
  };

  const handleImport = () => {
    console.log('Import button clicked');
    setShowImportModal(true);
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/updateAccountDetails', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingAccountDetails),
      });
      const result = await response.json();
      if (result.success) {
        setAccountDetails(prevDetails => prevDetails.map(account =>
          account.accountId === editingAccountDetails.accountId ? editingAccountDetails : account
        ));
        setEditingAccountDetails(null);
        console.log('Account details updated successfully');
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error('Error updating account details:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>Error: {error}</div>; 
  }

  return (
    <div className="container">
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
        <div className="navbar-center">
          <input type="text" placeholder="Search..." className="search-bar" />
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
          <img className="profile-icon" src="./assets/Ellipse 1.jpg" alt="Profile" />
        </div>
      </div>
      <div className="header-container">
        <h1>ADDRESS BOOK</h1>
        <div className="header-buttons">
          <button className="btn add-new">Add New</button>
          <button className="btn ok" onClick={handleSaveChanges}>Ok</button>
          <button className="btn print">Print</button>
          <button className="btn birthday-remainders">Birthday Reminders</button>
          <button className="btn app">App</button>
          <button className="btn sms-whatsapp">SMS/WhatsApp</button>
          <button className="btn export" onClick={() => setShowExportModal(true)}>Export</button>
          <button className="btn import" onClick={() => setShowImportModal(true)}>Import</button>
          <button className="btn search">Search</button>
        </div>
      </div>
      <div className="action-buttons">
        <button className="btn tick">Tick</button>
        <button className="btn account-name">Account Name</button>
        <button className="btn group">Group</button>
        <button className="btn city">City</button>
        <button className="btn mobile">Mobile</button>
        <button className="btn tax-no">Tax No</button>
        <button className="btn op-bal">Op.Bal</button>
        <button className="btn dc">DC</button>
        <button className="btn edit">Edit</button>
        <button className="btn delete">Delete</button>
        <button className="btn ledger">Ledger</button>
      </div>
      {Array.isArray(accountDetails) && accountDetails.map((account, index) => (
        <div className="text-boxes" key={index}>
          <input type="checkbox" className="text-box1" />
          <input
            type="text"
            className="text-box2"
            placeholder="Product Name"
            value={account.accountName}
            readOnly={!editingAccountDetails || editingAccountDetails.accountId !== account.accountId}
            onChange={(e) =>
              setEditingAccountDetails({
                ...editingAccountDetails,
                accountName: e.target.value,
              })
            }
          />
          <input
            type="text"
            className="text-box3"
            placeholder="Name"
            value={account.group}
            readOnly={!editingAccountDetails || editingAccountDetails.accountId !== account.accountId}
            onChange={(e) =>
              setEditingAccountDetails({
                ...editingAccountDetails,
                group: e.target.value,
              })
            }
          />
          <input
            type="text"
            className="text-box4"
            placeholder="City"
            value={account.city}
            readOnly={!editingAccountDetails || editingAccountDetails.accountId !== account.accountId}
            onChange={(e) =>
              setEditingAccountDetails({
                ...editingAccountDetails,
                city: e.target.value,
              })
            }
          />
          <input
            type="text"
            className="text-box5"
            placeholder="Mobile"
            value={account.mobile}
            readOnly={!editingAccountDetails || editingAccountDetails.accountId !== account.accountId}
            onChange={(e) =>
              setEditingAccountDetails({
                ...editingAccountDetails,
                mobile: e.target.value,
              })
            }
          />
          <input
            type="text"
            className="text-box6"
            placeholder="Tax No"
            value={account.taxNo}
            readOnly={!editingAccountDetails || editingAccountDetails.accountId !== account.accountId}
            onChange={(e) =>
              setEditingAccountDetails({
                ...editingAccountDetails,
                taxNo: e.target.value,
              })
            }
          />
          <input
            type="text"
            className="text-box7"
            placeholder="Op.Bal"
            value={account.opBal}
            readOnly={!editingAccountDetails || editingAccountDetails.accountId !== account.accountId}
            onChange={(e) =>
              setEditingAccountDetails({
                ...editingAccountDetails,
                opBal: e.target.value,
              })
            }
          />
          <input
            type="text"
            className="text-box8"
            placeholder="DC"
            value={account.dc}
            readOnly={!editingAccountDetails || editingAccountDetails.accountId !== account.accountId}
            onChange={(e) =>
              setEditingAccountDetails({
                ...editingAccountDetails,
                dc: e.target.value,
              })
            }
          />
          <button
            className="btn edit"
            onClick={() => handleEdit(index)}
          >
            <FaEdit /> Edit
          </button>
          <button
            className="btn delete"
            onClick={() => handleDelete(index)}
          >
            <FaTrash /> Delete
          </button>
          <button
            className="btn ledger"
            onClick={() => handleLedger(index)}
          >
            <FaBook /> Ledger
          </button>
        </div>
      ))}
     <AccountExportPage show={showExportModal} onClose={() => setShowExportModal(false)} onExport={handleExport} />
     <AccountImportPage show={showImportModal} onClose={() => setShowImportModal(false)} onImport={handleImport} />
    </div>
  );
}

export default AccountViewList;