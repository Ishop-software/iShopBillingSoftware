import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaCog, FaEdit, FaTrash, FaBook } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './AccountViewList.css';
import AccountExportPage from './AccountExport/AccountExportPage';
import AccountImportPage from './AccountImport/AccountImportPage';

function AccountViewList() {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [accountDetails, setAccountDetails] = useState([]);
  const [allAccountDetails, setAllAccountDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingAccountDetails, setEditingAccountDetails] = useState(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [token, setToken] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      alert('No token found. Please log in again.');
      navigate('/login');
      return;
    }
    setToken(storedToken);
    fetchAllAccountDetails(storedToken);
  }, [navigate]);

  const fetchAccountDetails = async (accountId, token) => {
    try {
      const response = await fetch('http://localhost:5000/api/users/getAccountDetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({ accountId }),
      });

      console.log('Retrieved Token:', token);
      console.log('Fetching Account Details for ID:', accountId);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${response.statusText} - ${errorText}`);
      }

      const result = await response.json();
      console.log('Fetch Account Details Response:', result);

      // Check if the result has success true and data is an object
      if (result.success && typeof result.data === 'object' && result.data !== null) {
        setAccountDetails([result.data]);  // Wrap the object in an array
      } else {
        console.error('Unexpected result format:', result);
        throw new Error('Data is not in the expected format');
      }
    } catch (error) {
      setError(error.message);
      console.error('Error fetching account details:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllAccountDetails = async (token) => {
    try {
      const response = await fetch('http://localhost:5000/api/users/getAllAccountDetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
      });

      console.log('Fetching All Account Details');

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${response.statusText} - ${errorText}`);
      }

      const result = await response.json();
      console.log('Fetch All Account Details Response:', result);

      // Check if the result has success true and data is an array
      if (result.success && Array.isArray(result.data)) {
        setAllAccountDetails(result.data);
        // Fetch details for the first account as an example, adjust as needed
        if (result.data.length > 0) {
          fetchAccountDetails(result.data[0].accountId, token);
        }
      } else {
        throw new Error('Data is not in the expected format');
      }
    } catch (error) {
      setError(error.message);
      console.error('Error fetching all account details:', error);
    }
  };

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const handleEdit = (index) => {
    setEditingAccountDetails(accountDetails[index]);
  };

  const handleDelete = async (index) => {
    const accountId = accountDetails[index].accountId;
    try {
      const response = await fetch('http://localhost:5000/api/users/deleteAccountDetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({ accountId }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${response.statusText} - ${errorText}`);
      }

      const result = await response.json();
      if (result.success) {
        setAccountDetails(prevDetails => prevDetails.filter((_, i) => i !== index));
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      setError(error.message);
      console.error('Error deleting account details:', error);
    }
  };

  const handleLedger = (index) => {
    console.log(`Ledger clicked for account at index ${index}`);
  };

  const handleExport = () => {
    setShowExportModal(true);
  };

  const handleImport = () => {
    setShowImportModal(true);
  };

  const handleSaveChanges = async () => {
    try {
      if (!editingAccountDetails) return;

      const response = await fetch('http://localhost:5000/api/users/updateAccountDetails', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(editingAccountDetails),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${response.statusText} - ${errorText}`);
      }

      const result = await response.json();
      if (result.success) {
        setAccountDetails(prevDetails => prevDetails.map(account =>
          account.accountId === editingAccountDetails.accountId ? editingAccountDetails : account
        ));
        setEditingAccountDetails(null);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      setError(error.message);
      console.error('Error updating account details:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingAccountDetails(prevDetails => ({ ...prevDetails, [name]: value }));
  };

  // Function to navigate to the AccountList page
  const handleAddNew = () => {
    navigate('/accountlist'); // Adjust the path to match your routing
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
          <button className="btn add-new" onClick={handleAddNew}>Add New</button>
          <button className="btn ok" onClick={handleSaveChanges}>Ok</button>
          <button className="btn print">Print</button>
          <button className="btn birthday-remainders">Birthday Reminders</button>
          <button className="btn app">App</button>
          <button className="btn sms-whatsapp">SMS/WhatsApp</button>
          <button className="btn export" onClick={handleExport}>Export</button>
          <button className="btn import" onClick={handleImport}>Import</button>
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
            name="accountName"
            value={account.accountName}
            readOnly={!editingAccountDetails || editingAccountDetails.accountId !== account.accountId}
            onChange={handleChange}
          />
          <input
            type="text"
            name="group"
            value={account.group}
            readOnly={!editingAccountDetails || editingAccountDetails.accountId !== account.accountId}
            onChange={handleChange}
          />
          <input
            type="text"
            name="city"
            value={account.city}
            readOnly={!editingAccountDetails || editingAccountDetails.accountId !== account.accountId}
            onChange={handleChange}
          />
          <input
            type="text"
            name="mobile"
            value={account.mobile}
            readOnly={!editingAccountDetails || editingAccountDetails.accountId !== account.accountId}
            onChange={handleChange}
          />
          <input
            type="text"
            name="taxNo"
            value={account.taxNo}
            readOnly={!editingAccountDetails || editingAccountDetails.accountId !== account.accountId}
            onChange={handleChange}
          />
          <input
            type="text"
            name="opBal"
            value={account.opBal}
            readOnly={!editingAccountDetails || editingAccountDetails.accountId !== account.accountId}
            onChange={handleChange}
          />
          <input
            type="text"
            name="dc"
            value={account.dc}
            readOnly={!editingAccountDetails || editingAccountDetails.accountId !== account.accountId}
            onChange={handleChange}
          />
          <button className="btn edit" onClick={() => handleEdit(index)}>
            <FaEdit />
          </button>
          <button className="btn delete" onClick={() => handleDelete(index)}>
            <FaTrash />
          </button>
          <button className="btn ledger" onClick={() => handleLedger(index)}>
            <FaBook />
          </button>
        </div>
      ))}
      {showExportModal && 
      <AccountExportPage
      show={showExportModal}
          onClose={() => setShowExportModal(false)}
          onExport={() => setShowExportModal(false)}
       />}
      {showImportModal && (
        <AccountImportPage
          show={showImportModal}
          onClose={() => setShowImportModal(false)}
          onImport={() => {
            setShowImportModal(false);
            fetchAllAccountDetails(token);
          }}
        />
      )}
    </div>
  );
}

export default AccountViewList;
