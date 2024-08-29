import React, { useState, useEffect } from 'react';
import { FaTrash,FaArrowLeft,FaCog,FaUser} from 'react-icons/fa';
import './salelist.css';

function Salelist() {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/sales')
      .then(response => response.json())
      .then(data => setSalesData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleDelete = (index) => {
    console.log(`Delete clicked for text box ${index}`);
  };
  const handleBackClick = () => {
    console.log('Back button clicked');
  };
  return (
    <div>
    <div className="saleviewnavbar">
      <div className="left-section">
        <div className="back-icon" onClick={handleBackClick}>
          <FaArrowLeft />
        </div>
        <label className="navbar-label">Account</label>
        <label className="navbar-label">Sales</label>
        <label className="navbar-label">Purchase</label>
        <label className="navbar-label">POS</label>
        <label className="navbar-label">Help</label>
        <label className="navbar-label">Customize</label>
      </div>
      <div className="right-section">
        <FaCog className="icon settings-icon" />
        <select className="dropdown-select">
    <option value="EN">EN</option>
    <option value="Tamil">Tamil</option>
    <option value="French">French</option>
    <option value="Spanish">Spanish</option>
  </select>
        <FaUser className="icon profile-icon" />
      </div>
    </div>
      
      <div className="saleviewcontainer">
        <div className="salebuttons">
          <button className="saletick">Tick</button>
          <button className="salecharges">Charges Heading</button>
          <button className="saleaccount">Account</button>
          <button className="salepuls">+/-</button>
          <button className="saleinput">Input As</button>
          <button className="saleapply">Apply On</button>
          <button className="salecal">Calculate @</button>
          <button className="ro">R.O</button>
          <button className="saletax">Tax</button>
          <button className="saleslab">Slab</button>
          <button className="salehsn">HSN Code</button>
          <button className="saledelete">Delete</button>
        </div>

        {salesData.map((sale, index) => (
          <div className="saletexts" key={index}>
            <input type="checkbox" className="text-box1" />
            <input type="text" className="text-box2" placeholder="Product Name" value={sale.productName} readOnly />
            <input type="text" className="text-box3" placeholder="Name" value={sale.name} readOnly />
            <input type="text" className="text-box4" placeholder="" value={sale.otherFields[0] || ''} readOnly />
            <input type="text" className="text-box5" placeholder="" value={sale.otherFields[1] || ''} readOnly />
            <input type="text" className="text-box6" placeholder="" value={sale.otherFields[2] || ''} readOnly />
            <input type="text" className="text-box7" placeholder="0" value={sale.otherFields[3] || '0'} readOnly />
            <input type="text" className="text-box8" placeholder="D" value={sale.otherFields[4] || 'D'} readOnly />
            <input type="text" className="text-box9" placeholder="D" value={sale.otherFields[5] || 'D'} readOnly />
            <input type="text" className="text-box10" placeholder="D" value={sale.otherFields[6] || 'D'} readOnly />
            <input type="text" className="text-box11" placeholder="D" value={sale.otherFields[7] || 'D'} readOnly />
            <div className="text-box12">
              <FaTrash className="icon2" onClick={() => handleDelete(index)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Salelist;
