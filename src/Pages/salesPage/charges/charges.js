import React from 'react';
import './charges.css';

const Charges = ({ onClose }) => {
  return (
    <div className="charges-modal">
      <div className="charges-container">
        <div className="charges-header">
          <h2>Other Charges</h2>
          <div className="header-buttons">
            <button className="view-list-button">View List</button>
            <button className="close-button" onClick={onClose}>×</button>
          </div>
        </div>

        <div className="charges-body">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="charges-heading">Charges Heading</label>
              <input type="text" id="charges-heading" />
            </div>
            <div className="form-group">
              <label htmlFor="print-as">Print As</label>
              <input type="text" id="print-as" />
            </div>
          </div>

          <div className="form-group full-width">
            <label htmlFor="account-head">Account Head to Post</label>
            <input type="text" id="account-head" />
          </div>

          <div className="button-group">
            <button className="add-party-button">+ Add New Party Name</button>
            <button className="edit-party-button">Edit</button>
          </div>

          <div className="box-container">
            <div className="box">
              <label>Types of Charges</label>
              <div className="radio-group">
                <label>
                  <input type="radio" name="charge-type" value="plus" /> Plus (+)
                </label>
                <label>
                  <input type="radio" name="charge-type" value="minus" /> Minus (-)
                </label>
              </div>
            </div>

            <div className="box">
              <label>Input Amount of Charges as</label>
              <div className="radio-group">
                <label>
                  <input type="radio" name="amount-type" value="absolute" /> Absolute Amount
                </label>
                <label>
                  <input type="radio" name="amount-type" value="on-qty" /> On Qty
                </label>
                <label>
                  <input type="radio" name="amount-type" value="percentage" /> Percentage
                </label>
                <label>
                  <input type="radio" name="amount-type" value="on-bags" /> On Bags
                </label>
                <label>
                  <input type="radio" name="amount-type" value="on-weight-bags" /> On Weights / Bags
                </label>
              </div>
            </div>

            <div className="box tax-settings">
              <div className="form-group">
                <label htmlFor="tax-slab">Tax Slab</label>
                <select id="tax-slab">
                  <option value="slab1">Slab 1</option>
                  <option value="slab2">Slab 2</option>
                  <option value="slab3">Slab 3</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="hsn-code">HSN Code</label>
                <input type="text" id="hsn-code" />
              </div>
              <div className="form-group checkbox-group">
                <label>
                  <input type="checkbox" id="tax-applicable" /> Tax Applicable
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="charges-footer">
          <button className="save-button">Save</button>
          <button className="delete-button">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default Charges;
