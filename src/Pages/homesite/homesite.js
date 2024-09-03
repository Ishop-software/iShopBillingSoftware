// src/Pages/homesite.js
import React from 'react';
import { FaTachometerAlt, FaFileAlt, FaBook, FaMoneyBillWave, FaReceipt, FaJournalWhills, FaGavel, FaDollarSign, FaSearch, FaCog, FaChevronDown, FaFileInvoice, FaPlus } from 'react-icons/fa';
import { useNavigate , useLocation } from 'react-router-dom';
import './homesite.css';
import axios from 'axios';
import { getToken } from '../../token';
import Subscription from '../Subscription Page/Subscription';
import { Navigate } from 'react-router-dom';




const LeftDiv = () => {

  const navigate = useNavigate();

  return (
    <div className="left-div">
      <div>
        <img src="./assets/logo.jpg" alt="Logo" className="logo" />
      </div>
      <div>
        <nav className="nav-items">
          <div className="nav-item dashboard">
            <FaTachometerAlt className="nav-icon" /> Dashboard
          </div>
          <div className="nav-item">
            <FaFileAlt className="nav-icon" /> Reports
          </div>
          <div className="nav-item">
            <FaBook className="nav-icon" /> Ledger
          </div>
          <div className="nav-item">
            <FaMoneyBillWave className="nav-icon" /> Cash Payment
          </div>
          <div className="nav-item">
            <FaReceipt className="nav-icon" /> Cash Receipt
          </div>
          <div className="nav-item">
            <FaJournalWhills className="nav-icon" /> Journal Entry
          </div>
          <div className="nav-item">
            <FaGavel className="nav-icon" /> GST
          </div>
          <div className="nav-item" onClick={() => navigate('/subscription')}>
            <FaDollarSign className="nav-icon" /> Subscriptions

          </div>
        </nav>
      </div>
    </div>
  );
}

const TopDiv = () => {
  return (
    <div className="top-div">
      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input className='search-field' type="text" placeholder="Search..." />
      </div>
      <div className="right-section">
        <FaCog className="settings-icon" />
        <div className="dropdown">
          <button className="dropbtn">EN <FaChevronDown /></button>
          <div className="dropdown-content">
            <a href="#">English</a>
            <a href="#">Spanish</a>
            <a href="#">French</a>
          </div>
        </div>
        <img className='profile-icon' src='./assets/Ellipse 1.jpg' alt='Profile' />
      </div>
    </div>
  );
}

const BottomDiv = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = getToken() || new URLSearchParams(location.search).get('token');
  console.log('Token:', token);

  const getAuthHeaders = () => ({
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

const handleApiRequest = async () => {
    try {
        const response = await axios.post('http://localhost:5000/api/productitems/addProductItem', { /* your data here */ }, getAuthHeaders());
        console.log(response.data);
    } catch (error) {
        console.error('API request error:', error);
    }
};

  const navigateToViewList = () => {
    navigate(`/view-list?token=${token}`);
  };
  const navigateToViewListS = () => {
    navigate(`/view?token=${token}`);
  };

  const navigateToAddNew = () => {
    navigate(`/add-new?token=${token}`);
  };
  const navigateToAddNewAccount = () => {
    navigate(`/accountlist?token=${token}`);
  };
  const navigateToAddNewSale = () => {
    navigate(`/sale?token=${token}`);
  };
  const navigateToAddNewS = () => {
    navigate(`/items?token=${token}`);
  };

  const navigateToEInvoices = () => {
    navigate(`/e-invoices?token=${token}`);
  };

  const cards = [
    { imgSrc: "./assets/Group 136.png", name: "Account", hasIcons: true },
    { imgSrc: "./assets/Group 137.png", name: "Item", hasIcons: true },
    { imgSrc: "./assets/Group 138.png", name: "Outstanding" },
    { imgSrc: "./assets/Group 139.png", name: "Sales", hasIcons: true }, // 4th card with new icons
    { imgSrc: "./assets/Group 140.png", name: "Purchase", hasIcons: true },
    { imgSrc: "./assets/Group 141.png", name: "POS", hasIcons: true }
  ];

  return (
    <div className="bottom-div">
      <h2 className="dashboard-heading">Dashboard</h2>
      <div className="card-grid">
        {cards.map((card, index) => (
          <div className="card" key={index}>
            <img src={card.imgSrc} alt={`Card ${index + 1}`} />
            <div className="card-name">{card.name}</div>
            {card.hasIcons && (
              <div className="card-icons">
                {index === 3 && ( // 4th card specific icons
                  <>
                    <div className="view-listT" onClick={navigateToViewList}>
                      <FaFileInvoice className="icon" /> Register
                    </div>
                    <div className="view-registerT" onClick={navigateToViewList}>
                      <FaBook className="icon" /> Bills
                    </div>
                    <div className="e-invoices1" onClick={navigateToEInvoices}>
                      <FaReceipt className="icon" /> E-invoices
                    </div>
                    <div className="add-newT" onClick={navigateToAddNewSale}>
                      <FaPlus className="icon" /> Add New
                    </div>
                  </>
                )}
                {(index === 4) && ( // Icons for other cards
                  <>
                    <div className="view-list" onClick={navigateToViewList}>
                      <FaFileInvoice className="icon" /> Bills
                    </div>
                    <div className="view-registerF" onClick={navigateToViewList}>
                      <FaBook className="icon" /> Register
                    </div>
                    <div className="add-newF" onClick={navigateToAddNew}>
                      <FaPlus className="icon" /> Add New
                    </div>
                  </>
                )}
                {(index === 5) && ( // Icons for other cards
                  <>
                    <div className="view-list" onClick={navigateToViewList}>
                      <FaFileInvoice className="icon" /> Bills
                    </div>
                    <div className="view-registerF" onClick={navigateToViewList}>
                      <FaBook className="icon" /> Register
                    </div>
                    <div className="add-newF" onClick={navigateToAddNew}>
                      <FaPlus className="icon" /> Add New
                    </div>
                  </>
                )}
                {(index === 0) && ( // Icons for other cards
                  <>
                    <div className="view-list" onClick={navigateToViewList}>
                      <FaFileInvoice className="icon" /> View List
                    </div>
                    <div className="add-newS" onClick={navigateToAddNewAccount}>
                      <FaPlus className="icon" /> Add New
                    </div>
                  </>
                )}
                {(index === 1) && ( // Icons for other cards
                  <>
                    <div className="view-list" onClick={navigateToViewListS}>
                      <FaFileInvoice className="icon" /> View List
                    </div>
                    <div className="add-newS" onClick={navigateToAddNewS}>
                      <FaPlus className="icon" /> Add New
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const Homesite = () => {
  return (
    <div className="container">
      <LeftDiv />
      <div className="rightDiv">
        <TopDiv />
        <BottomDiv />
      </div>
    </div>
  );
};

export default Homesite;
