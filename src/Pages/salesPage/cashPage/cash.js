import React from 'react';
import './cash.css';

const Cash = ({ onClose }) => {
  return (
    <div className="payment-options">
      <span className="close-icon" onClick={onClose}>
        &times;
      </span>
      <h2 className="title">PAYMENT OPTIONS</h2>

      
      <div className="payment-methods">
        <label>
          <input type="radio" name="paymentMethod" value="cash" /> Cash
        </label>
        <label>
          <input type="radio" name="paymentMethod" value="card" /> Card
        </label>
        <label>
          <input type="radio" name="paymentMethod" value="eWallet" /> E-Wallet
        </label>
        <label>
          <input type="radio" name="paymentMethod" value="cheque" /> Cheque
        </label>
        <label>
          <input type="radio" name="paymentMethod" value="credit" /> Credit
        </label>
        <label className="cash-amount">
          Cash Amt <input type="text" placeholder="Amount" />
        </label>
      </div>

      <div className="payment-details">
        <div className="form-row">
          <label>Credit Amt.1</label>
          <input type="text" placeholder="Amount" />
          <div className="input-group">
            <select className="card-account-dropdown">
              <option value="">Select Card Account</option>
              <option value="card1">Card Account 1</option>
              <option value="card2">Card Account 2</option>
              <option value="card3">Card Account 3</option>
            </select>
            <div className="btn-group">
              <button className="add-new-card">+ Add New Card</button>
              <button className="edit-card">✏️ Edit</button>
            </div>
          </div>
          <input type="text" placeholder="Transaction Ref. No." />
        </div>

        
        <div className="form-row">
          <label>Credit Amt.2</label>
          <input type="text" placeholder="Amount" />
          <div className="input-group">
            <select className="card-account-dropdown">
              <option value="">Select Card Account</option>
              <option value="card1">Card Account 1</option>
              <option value="card2">Card Account 2</option>
              <option value="card3">Card Account 3</option>
            </select>
            <div className="btn-group">
              <button className="add-new-card">+ Add New Card</button>
              <button className="edit-card">✏️ Edit</button>
            </div>
          </div>
          <input type="text" placeholder="Transaction Ref. No." />
        </div>

        <div className="form-row">
          <label>eWallet Amt</label>
          <input type="text" placeholder="Amount" />
          <div className="input-group">
            <select className="card-account-dropdown">
              <option value="">Select Card Account</option>
              <option value="card1">Card Account 1</option>
              <option value="card2">Card Account 2</option>
              <option value="card3">Card Account 3</option>
            </select>
            <div className="btn-group">
              <button className="add-new-card">+ Add New Card</button>
              <button className="edit-card">✏️ Edit</button>
            </div>
          </div>
          <input type="text" placeholder="Transaction Ref. No." />
        </div>

        <div className="form-row">
          <label>Cheque Amt</label>
          <input type="text" placeholder="Amount" />
          <div className="input-group">
            <select className="card-account-dropdown">
              <option value="">Select Card Account</option>
              <option value="card1">Card Account 1</option>
              <option value="card2">Card Account 2</option>
              <option value="card3">Card Account 3</option>
            </select>
            <div className="btn-group">
              <button className="add-new-card">+ Add New Card</button>
              <button className="edit-card">✏️ Edit</button>
            </div>
          </div>
          <input type="text" placeholder="Transaction Ref. No." />
        </div>

        <div className="form-row">
          <div className="cheque">
            <label>Cheque No</label>
            <input type="text" placeholder="Cheque No" />
            <input type="text" placeholder="Bank Name" />
            <input type="date" />
          </div>
        </div>

        <div className="form-row">
          <div className="redeem">
            <label>Redeem Points</label>
            <input type="text" placeholder="Points" />
            <input type="text" placeholder="Amount" />
          </div>
        </div>
      </div>

      
      <div className="form-row">
        <div className="available-points">Available Points: 100</div>
        <div className="submit-btn">
          <button>OK</button>
        </div>
      </div>
    </div>
  );
};

export default Cash;
