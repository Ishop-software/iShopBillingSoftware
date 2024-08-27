import React, { useState } from 'react';
import Charges from './charges/charges';
import CashPage from './cashPage/cash'; // Import CashPage
import './sales.css';
import { useNavigate } from 'react-router-dom';

const Sales = () => {
  const [showCharges, setShowCharges] = useState(false);
  const [showCashPage, setShowCashPage] = useState(false); // State to manage CashPage visibility

  const handleAddCharges = () => {
    setShowCharges(true);
  };

  const handleCloseCharges = () => {
    setShowCharges(false);
  };

  const handleCashTenderedClick = () => {
    setShowCashPage(true); // Show CashPage
  };

  const handleCloseCashPage = () => {
    setShowCashPage(false); // Hide CashPage
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
          <button className="add-party-btn">+ Add New Party Name</button>
          <button className="edit-party-btn">Edit</button>
        </div>
      </div>

      <div className="content-sections">
        <div className="items-section">
          <label className="section-title">ITEMS</label>
          <div className="item-name">
            <label>Item Name</label>
            <input type="text" />
            <button className="add-item-btn">+ Add New Item Name</button>
            <button className="edit-item-btn">Edit</button>
          </div>
          <div className="item-inputs">
            <input type="text" placeholder="Qty" />
            <input type="text" placeholder="Alt Qty" />
            <input type="text" placeholder="Free" />
            <input type="text" placeholder="Per" />
            <input type="text" placeholder="Rate" />
            <input type="text" placeholder="Disc Amount" />
            <input type="text" placeholder="Basic Amt" />
            <input type="text" placeholder="Tax Amount" />
            <input type="text" placeholder="Disc %" />
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
