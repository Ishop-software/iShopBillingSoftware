import React, { useState } from 'react';
import './SearchPage.css';
import { FaTimes, FaSearch } from 'react-icons/fa';

function SearchPage({ show, onClose, onSearch }) {
  const [itemName, setItemName] = useState('');
  const [hsnCode, setHsnCode] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [barcode, setBarcode] = useState('');
  const [salePriceRange, setSalePriceRange] = useState('');
  const [mrpRange, setMrpRange] = useState('');
  const [searchCriteria, setSearchCriteria] = useState({
    itemName: '',
    hsnCode: '',
    companyName: '',
    barcode: '',
    salePriceRange: '',
    mrpRange: ''
  });

  const handleInputChange = (e) => {
    setSearchCriteria({
      ...searchCriteria,
      [e.target.name]: e.target.value
    });
  };

  const handleSearchClick = () => {
    onSearch({ itemName, hsnCode, companyName, barcode, salePriceRange, mrpRange });
    onClose();
  };

  if (!show) return null;

  

  return (
    <div className="search-modal-overlay">
      <div className="search-modal-content">
        <div className="search-header">
          <h2 className="search-title">Search Items</h2>
         
          <button onClick={handleSearchClick}>Search</button>
          <FaTimes className="close-icon" onClick={onClose} />
        </div>
        <div className="search-body">
          <div className="search-group">
            <select className="dropdown" onChange={(e) => setItemName(e.target.value)}>
              <option value="">Item Name</option>
              <option value="">shortName</option>
              <option value="">taxSlab</option>
              <option value="">company</option>               
              <option value="">group</option>
             <option value="">primaryUnit</option>
             
            </select>
            <input type="text" placeholder="Enter Item Name" className="text-input" onChange={(e) => setItemName(e.target.value)} />
          </div>

          <div className="search-group">
            <select className="dropdown" onChange={(e) => setHsnCode(e.target.value)}>
              <option value="">HSN Code</option>
              <option value="">Item Name</option>
              <option value="">shortName</option>
              <option value="">taxSlab</option>
              <option value="">company</option>               
              <option value="">group</option>
             <option value="">primaryUnit</option>
              
            </select>
            <input type="text" placeholder="Enter HSN Code" className="text-input" onChange={(e) => setHsnCode(e.target.value)} />
          </div>

          <div className="search-group">
            <select className="dropdown" onChange={(e) => setCompanyName(e.target.value)}>
              <option value="">Item Company Name</option>
              <option value="">Item Name</option>
              <option value="">HSN Code</option>
              <option value="">shortName</option>
              <option value="">taxSlab</option>
              <option value="">group</option>
              <option value="">primaryUnit</option>
              
            </select>
            <input type="text" placeholder="Enter Company Name" className="text-input" onChange={(e) => setCompanyName(e.target.value)} />
          </div>

          <div className="search-group">
            <label className="header-label">Barcode</label>
            <input type="text" className="text-input1" onChange={(e) => setBarcode(e.target.value)} />
          </div>

          <div className="search-group">
            <label className="header-label">Sale Price (Range)</label>
            <input type="text" className="text-input1" onChange={(e) => setSalePriceRange(e.target.value)} />
          </div>

          <div className="search-group">
            <label className="header-label">MRP (Range)</label>
            <input type="text" className="text-input1" onChange={(e) => setMrpRange(e.target.value)} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
