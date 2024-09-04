import React, { useState,useEffect } from 'react';
import Charges from './charges/charges';
import CashPage from './cashPage/cash'; 
import './sales.css';
import { useNavigate } from 'react-router-dom';

const Sales = () => {
  const [showCharges, setShowCharges] = useState(false);
  const [showCashPage, setShowCashPage] = useState(false); 
  const [items, setItems] = useState([]); 
  const [selectedItem, setSelectedItem] = useState(''); 
  const [quantity, setQuantity] = useState(''); 
  const [rate, setRate] = useState(''); 
  const [basicAmt, setBasicAmt] = useState('');
  const [discPercent, setDiscPercent] = useState(''); 
  const [discAmt, setDiscAmt] = useState(''); 

  const navigate = useNavigate();
  useEffect(() => {
    
    const fetchProductItems = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/productitems/getProductItem');
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching product items:', error);
      }
    };

    fetchProductItems();
  }, []);

  useEffect(() => {
    
    const fetchItemRate = async () => {
      if (selectedItem) {
        try {
          const response = await fetch(`http://localhost:5000/api/productitems/getProductItem?itemName=${selectedItem}`);
          const data = await response.json();
          if (data && data.length > 0) {
            setRate(data[0].salePrice || '');
          } else {
            setRate('');
          }
        } catch (error) {
          console.error('Error fetching item rate:', error);
        }
      } else {
        setRate('');
      }
    };

    fetchItemRate();
  }, [selectedItem]);

  useEffect(() => {
    const calculateBasicAmt = () => {
      const qty = parseFloat(quantity) || 0;
      const rateValue = parseFloat(rate) || 0;
      const calculatedBasicAmt = qty * rateValue;
      setBasicAmt(calculatedBasicAmt > 0 ? calculatedBasicAmt.toFixed(2) : '');
    };

    calculateBasicAmt();
  }, [quantity, rate]);

  useEffect(() => {
    const calculateDiscAmt = () => {
      const basic = parseFloat(basicAmt) || 0;
      const percent = parseFloat(discPercent) || 0;
      const calculatedDiscAmt = (basic * percent) / 100;
      setDiscAmt(calculatedDiscAmt > 0 ? calculatedDiscAmt.toFixed(2) : '');
    };

    calculateDiscAmt();
  }, [basicAmt, discPercent]);

  const handleAddCharges = () => {
    setShowCharges(true);
  };

  const handleCloseCharges = () => {
    setShowCharges(false);
  };

  const handleCashTenderedClick = () => {
    setShowCashPage(true); 
  };

  const handleCloseCashPage = () => {
    setShowCashPage(false); 
  };

  const handleItemChange = (event) => {
    setSelectedItem(event.target.value);
  };
  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleDiscPercentChange = (event) => {
    setDiscPercent(event.target.value);
  };
  const handlepartyname = () => {
    navigate('/items'); 
  };
  const handleadditem = () => {
    navigate('/items'); 
  };
  
  return (
    <div className="sales-container">
      <div className="sales-header">
        <div className="sales-header-left">
          <div className="sales-form">
            <label>Date</label>
            <input type="date" />
          </div>
          <div className="sales-form">
            <label>Terms</label>
            <input type="text" />
          </div>
        </div>
        <div className="sales-header-right">
          <button className="save-btn">Save</button>
          <button className="print-btn">Print</button>
          <button className="einvoice-btn">E-Invoice</button>
          <button className="details-btn">Delete</button>
          <button className="attach-btn">Attach</button>
        </div>
      </div>

      <div className="party-info">
        <div className="party-details">
          <div className="party-name">
            <label>Party Name</label>
            <input type="text" />
          </div>
          <div className="bill-no">
            <label>Bill No</label>
            <input type="text" />
          </div>
          <div className="due-date">
            <label>Due Date</label>
            <input type="date" />
          </div>
        </div>
        <div className="party-buttons">
          <button className="add-party-btn"  onClick={handlepartyname}>+ Add New Party Name</button>
          <button className="edit-party-btn">Edit</button>
        </div>
      </div>

      <div className="content-sections">
        <div className="items-section">
          <label className="section-title">ITEMS</label>
          <div className="item-name">
            <label>Item Name</label>
            <select value={selectedItem} onChange={handleItemChange}>
              <option value="">Select Item</option>
              {items.map((item) => (
                <option key={item.id} value={item.itemName}>
                  {item.itemName}
                </option>
              ))}
            </select>
          
            
            <button className="add-item-btn" onClick={handleadditem}>+ Add New Item Name</button>
            <button className="edit-item-btn">Edit</button>
          </div>
          <div className="item-inputs">
            <input type="text" placeholder="Qty"  value={quantity} onChange={handleQuantityChange}  />
            <input type="text" placeholder="Alt Qty" />
            <input type="text" placeholder="Free" />
            <input type="text" placeholder="Per" />
            <input type="text" placeholder="Rate" value={rate} readOnly/>
            <input type="text" placeholder="Disc Amount" value={discAmt} readOnly />
            <input type="text" placeholder="Basic Amt" value={basicAmt} readOnly />
            <input type="text" placeholder="Tax Amount" />
            <input type="text" placeholder="Disc %" value={discPercent} onChange={handleDiscPercentChange}/>
            <input type="text" placeholder="Net Value" />
          </div>
        </div>

        <div className="charges-section">
          <label className="section-title">CHARGES</label>
          <div className="other-charges">
            <label>Other Charges</label>
            <input type="text" />
            <button className="add-charge-btn" onClick={handleAddCharges}>+ Add New Charge</button>
            <button className="edit-charge-btn">Edit</button>
          </div>
          <div className="charges-inputs">
            <input type="text" placeholder="Remarks" />
            <input type="text" placeholder="On Value" />
            <input type="text" placeholder="@" />
            <input type="text" placeholder="+ / -" />
            <input type="text" placeholder="Amount" />
          </div>
        </div>
      </div>

      <div className="bottom-section">
        <table className="summary-table">
          <thead>
            <tr>
              <th>Tick</th>
              <th>Item</th>
              <th>M.Qty</th>
              <th>A.Qty</th>
              <th>Free</th>
              <th>Rate</th>
              <th>Per</th>
              <th>Basic Amt</th>
              <th>D.%</th>
              <th>D. Amt</th>
              <th>T.%</th>
              <th>T. Amt</th>
              <th>Sale Amount</th>
              <th>Charges Heading</th>
              <th>On Value</th>
              <th>@</th>
              <th>+ / -</th>
              <th>Charges Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><input type="checkbox" /></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
        
        
       
        <div className="additional-inputs">
          <input type="text" placeholder="Count" />
          <input type="text" placeholder="Qty" />
          <input type="text" placeholder="Alt" />
          <input type="text" placeholder="Free" />
          <input type="text" placeholder="Basic Amt" />
          <input type="text" placeholder="Discount" />
          <input type="text" placeholder="Ad.Disc" />
          <input type="text" placeholder="Taxable" />
          <input type="text" placeholder="Tax Amt" />
          <input type="text" placeholder="Net Value" />
          <input type="text" placeholder="Chares" />
          <input type="text" placeholder="R.O" />
          <input type="text" placeholder="Net Bill Amt" />
          <input
            type="text"
            placeholder="Cash Tendered +"
            onClick={handleCashTenderedClick}
          />
          <input type="text" placeholder="change" />
        </div>
      </div>

      {showCharges && <Charges onClose={handleCloseCharges} />}
      {showCashPage && (
        <div className="cash-page-overlay">
          <CashPage onClose={handleCloseCashPage} />
        </div>
      )}
    </div>
  );
};

export default Sales;
