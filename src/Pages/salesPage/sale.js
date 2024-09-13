import React, { useState, useEffect } from 'react';
import Charges from './charges/charges';
import CashPage from './cashPage/cash'; 
import './sales.css';
import { useNavigate,useSearchParams } from 'react-router-dom';

const Sales = () => {
  const [showCharges, setShowCharges] = useState(false);
  const [showCashPage, setShowCashPage] = useState(false); 
  const [searchParams] = useSearchParams();
  const [itemNames, setItemNames] = useState([]); // Initialize as empty array
  const [selectedItem, setSelectedItem] = useState('');
  const [rate, setRate] = useState('');
  const [taxAmount, setTaxAmount] = useState('');
  const token = searchParams.get('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItemNames = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/productitems/getAllProductItems', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          },
        });

        if (response.ok) {
          const data = await response.json();
          // Check if data.message is an array
          if (Array.isArray(data.message)) {
            setItemNames(data.message); // Update state with the array of items
          } else {
            console.error('Fetched data.message is not an array:', data.message);
            setItemNames([]); // Set to empty array on unexpected response
          }
        } else {
          console.error('Failed to fetch item names');
          setItemNames([]); // Set to empty array on failed fetch
        }
      } catch (error) {
        console.error('Error fetching item names:', error);
        setItemNames([]); // Set to empty array on fetch error
      }
    };

    fetchItemNames();
  }, [token]);
  
  const handleaddnewitem = () => {
    navigate('/items');
};

const handleaddnewparty = () => {
  navigate('/accountlist');
};


  const handleItemChange = (e) => {
    const selectedItemName = e.target.value;
    setSelectedItem(selectedItemName);

 
    const item = itemNames.find(item => item.itemName === selectedItemName);
    if (item) {
      setRate(item.mrp || ''); 
      setTaxAmount(item.taxSlab || ''); 
    } else {
      setRate(''); 
      setTaxAmount(''); 
    }
  };


  const handleAddCharges = (token) => {
    console.log('charges button clicked with token:', token);
   
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

  const handleSave = async () => {
    
    const data = {
      userId: 'yourUserId', 
      saleRegId: 'someSaleRegId', 
      partyName: document.querySelector('.party-name input').value,
      billNo: parseInt(document.querySelector('.bill-no input').value, 10),
      dueDate: document.querySelector('.due-date input').value,
      itemName: selectedItem,
      qty: parseFloat(document.querySelector('.item-inputs input[placeholder="Qty"]').value),
      altQty: parseFloat(document.querySelector('.item-inputs input[placeholder="Alt Qty"]').value),
      free: parseFloat(document.querySelector('.item-inputs input[placeholder="Free"]').value),
      per: document.querySelector('.item-inputs input[placeholder="Per"]').value,
      rate: parseFloat(rate), 
      discAmount: parseFloat(document.querySelector('.item-inputs input[placeholder="Disc Amount"]').value),
      basicAmount: parseFloat(document.querySelector('.item-inputs input[placeholder="Basic Amt"]').value),
      taxAmount: parseFloat(taxAmount), 
      discs: parseFloat(document.querySelector('.item-inputs input[placeholder="Disc %"]').value),
      netValue: parseFloat(document.querySelector('.item-inputs input[placeholder="Net Value"]').value),
      otherCharges: document.querySelector('.charges-inputs input[placeholder="Remarks"]').value,
      remarks: document.querySelector('.charges-inputs input[placeholder="Remarks"]').value,
      onValue: parseFloat(document.querySelector('.charges-inputs input[placeholder="On Value"]').value),
      at: document.querySelector('.charges-inputs input[placeholder="@"]').value,
      plusMinus: document.querySelector('.charges-inputs input[placeholder="+ / -"]').value,
      amount: parseFloat(document.querySelector('.charges-inputs input[placeholder="Amount"]').value),
    };

    if (!token) {
      alert('Authentication token is missing.');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/api/usersales/addSalesRegister', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(data)
      });
  
      if (response.ok) {
        const result = await response.json();
        alert('Sales data saved successfully!');
        // Redirect or clear the form as needed
      } else {
        const error = await response.json();
        alert('Failed to save sales data: ' + error.message);
      }
    } catch (error) {
      console.error('Request failed:', error);
      alert('Failed to save sales data.');
    }
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
          <button className="save-btn" onClick={handleSave}>Save</button>
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
          <button className="add-party-btn" onClick={handleaddnewparty}>+ Add New Party Name</button>
          <button className="edit-party-btn">Edit</button>
        </div>
      </div>

      <div className="content-sections">
        <div className="items-section">
          <label className="section-title">ITEMS</label>
          <div className="item-name">
            <label>Item Name</label>
            <select
              value={selectedItem}
              onChange={handleItemChange}
            >
              <option value="">Select Item</option>
              {itemNames.map((item) => (
                <option key={item._id} value={item.itemName}>{item.itemName}</option>
              ))}
            </select>
            
            <button className="add-item-btn" onClick={handleaddnewitem}>+ Add New Item Name</button>
            <button className="edit-item-btn">Edit</button>
          </div>
          <div className="item-inputs">
            <input type="text" placeholder="Qty" />
            <input type="text" placeholder="Alt Qty" />
            <input type="text" placeholder="Free" />
            <input type="text" placeholder="Per" />
            <input type="text" placeholder="Rate" value={rate} readOnly />
            <input type="text" placeholder="Disc Amount" />
            <input type="text" placeholder="Basic Amt" />
            <input type="text" placeholder="Tax Amount" value={taxAmount} readOnly />
            <input type="text" placeholder="Disc %" />
            <input type="text" placeholder="Net Value" />
          </div>
        </div>

        <div className="charges-section">
          <label className="section-title">CHARGES</label>
          <div className="charges-inputs">
            <input type="text" placeholder="Remarks" />
            <input type="text" placeholder="On Value" />
            <input type="text" placeholder="@" />
            <input type="text" placeholder="+ / -" />
            <input type="text" placeholder="Amount" />
          </div>
          <button className="add-charges-btn" onClick={handleAddCharges}>+ Add Charges</button>
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
        
        {/* New input fields section */}
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
      <div className="cash-section">
        {/* <button className="cash-tendered-btn" onClick={handleCashTenderedClick}>Cash Tendered</button> */}
        {showCashPage && <CashPage onClose={handleCloseCashPage} />}
      </div>

      {showCharges && <Charges onClose={handleCloseCharges} />}
    </div>
  );
};

export default Sales;
