// import React from 'react';
// import './charges.css';
// import { useNavigate } from 'react-router-dom';


// const Charges = ({ onClose }) => {
//   const navigate = useNavigate();

//   const handlecharges = () => {
//     navigate('/salelist'); 
//   };
//   const handleviewlist = () => {
//     navigate('/salelist'); 
//   };
//   return (
//     <div className="charges-modal">
//       <div className="charges-container">
//         <div className="charges-header">
//           <h2>Other Charges</h2>
//           <div className="header-buttons">
//             <button className="view-list-button" onClick={handleviewlist}>View List</button>
//             <button className="close-button" onClick={onClose}>×</button>
//           </div>
//         </div>

//         <div className="charges-body">
//           <div className="form-row">
//             <div className="form-group">
//               <label htmlFor="charges-heading">Charges Heading</label>
//               <input type="text" id="charges-heading" />
//             </div>
//             <div className="form-group">
//               <label htmlFor="print-as">Print As</label>
//               <input type="text" id="print-as" />
//             </div>
//           </div>

//           <div className="form-group full-width">
//             <label htmlFor="account-head">Account Head to Post</label>
//             <input type="text" id="account-head" />
//           </div>

//           <div className="button-group">
//             <button className="add-party-button">+ Add New Party Name</button>
//             <button className="edit-party-button">Edit</button>
//           </div>

//           <div className="box-container">
//             <div className="box">
//               <label>Types of Charges</label>
//               <div className="radio-group">
//                 <label>
//                   <input type="radio" name="charge-type" value="plus" /> Plus (+)
//                 </label>
//                 <label>
//                   <input type="radio" name="charge-type" value="minus" /> Minus (-)
//                 </label>
//               </div>
//             </div>

//             <div className="box">
//               <label>Input Amount of Charges as</label>
//               <div className="radio-group">
//                 <label>
//                   <input type="radio" name="amount-type" value="absolute" /> Absolute Amount
//                 </label>
//                 <label>
//                   <input type="radio" name="amount-type" value="on-qty" /> On Qty
//                 </label>
//                 <label>
//                   <input type="radio" name="amount-type" value="percentage" /> Percentage
//                 </label>
//                 <label>
//                   <input type="radio" name="amount-type" value="on-bags" /> On Bags
//                 </label>
//                 <label>
//                   <input type="radio" name="amount-type" value="on-weight-bags" /> On Weights / Bags
//                 </label>
//               </div>
//             </div>

//             <div className="box tax-settings">
//               <div className="form-group">
//                 <label htmlFor="tax-slab">Tax Slab</label>
//                 <select id="tax-slab">
//                   <option value="slab1">Slab 1</option>
//                   <option value="slab2">Slab 2</option>
//                   <option value="slab3">Slab 3</option>
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label htmlFor="hsn-code">HSN Code</label>
//                 <input type="text" id="hsn-code" />
//               </div>
//               <div className="form-group checkbox-group">
//                 <label>
//                   <input type="checkbox" id="tax-applicable" /> Tax Applicable
//                 </label>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="charges-footer">
//           <button className="save-button" onClick={handlecharges}>Save</button>
//           <button className="delete-button">Delete</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Charges;

import React, { useState } from 'react';
import './charges.css';
import { useNavigate } from 'react-router-dom';

const Charges = ({ onClose }) => {
  const [showPercentageBox, setShowPercentageBox] = useState(false);
  const [formData, setFormData] = useState({
    chargesHeading: '',
    printAs: '',
    accountHead: '',
    applyOn: '',
    percentage: '',
    calculateAt: '',
    roundOff: false,
    chargeType: 'plus',
    amountType: 'absolute',
    taxSlab: '',
    hsnCode: '',
    taxApplicable: false,
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handlecharges = async () => {
    try {

      console.log('Data being sent to the server:', formData);
      const token = localStorage.getItem('token'); 
      const response = await fetch('http://localhost:5000/api/usercharge/addChargeRegister', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message);
        navigate('/salelist');
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert('Error saving sales register: ' + error.message);
    }
  };

  const handleRadioChange = (event) => {
    setShowPercentageBox(event.target.value === 'percentage');
    handleInputChange(event); 
  };

  const handleViewList = () => {
    const token = localStorage.getItem('token'); 
    navigate(`/salelist?token=${token}`);
  };

  return (
    <div className="charges-modal">
      <div className="charges-container">
        <div className="charges-header">
          <h2>Other Charges</h2>
          <div className="header-buttons">
            <button className="view-list-button" onClick={handleViewList}>View List</button>
            <button className="save-button" onClick={handlecharges}>Save</button>
            <button className="delete-button">Delete</button>
            <button className="close-button" onClick={onClose}>×</button>
          </div>
        </div>

        <div className="charges-body">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="charges-heading">Charges Heading</label>
              <input
                type="text"
                id="charges-heading"
                name="chargesHeading"
                value={formData.chargesHeading}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="print-as">Print As</label>
              <input
                type="text"
                id="print-as"
                name="printAs"
                value={formData.printAs}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="account-head">Account Head to Post</label>
              <input
                type="text"
                id="account-head"
                name="accountHead"
                value={formData.accountHead}
                onChange={handleInputChange}
              />
            </div>

            {showPercentageBox && (
              <div className="percentage-box">
                <div className="box-header">
                  <span>Types of Charges</span>
                </div>
                <div className="form-group">
                  <label htmlFor="apply-on">Apply On</label>
                  <input
                    type="text"
                    id="apply-on"
                    name="applyOn"
                    value={formData.applyOn}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="percentage">Percentage</label>
                  <input
                    type="text"
                    id="percentage"
                    name="percentage"
                    value={formData.percentage}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="calculate-at">Calculate @</label>
                  <input
                    type="text"
                    id="calculate-at"
                    name="calculateAt"
                    value={formData.calculateAt}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      id="round-off"
                      name="roundOff"
                      checked={formData.roundOff}
                      onChange={handleInputChange}
                    /> Round Off Amount of Charges
                  </label>
                </div>
              </div>
            )}
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
                  <input
                    type="radio"
                    name="chargeType"
                    value="plus"
                    checked={formData.chargeType === 'plus'}
                    onChange={handleRadioChange}
                  /> Plus (+)
                </label>
                <label>
                  <input
                    type="radio"
                    name="chargeType"
                    value="minus"
                    checked={formData.chargeType === 'minus'}
                    onChange={handleRadioChange}
                  /> Minus (-)
                </label>
              </div>
            </div>

            <div className="box">
              <label>Input Amount of Charges as</label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="amountType"
                    value="absolute"
                    checked={formData.amountType === 'absolute'}
                    onChange={handleRadioChange}
                  /> Absolute Amount
                </label>
                <label>
                  <input
                    type="radio"
                    name="amountType"
                    value="on-qty"
                    checked={formData.amountType === 'on-qty'}
                    onChange={handleRadioChange}
                  /> On Qty
                </label>
                <label>
                  <input
                    type="radio"
                    name="amountType"
                    value="percentage"
                    checked={formData.amountType === 'percentage'}
                    onChange={handleRadioChange}
                  /> Percentage
                </label>
                <label>
                  <input
                    type="radio"
                    name="amountType"
                    value="on-bags"
                    checked={formData.amountType === 'on-bags'}
                    onChange={handleRadioChange}
                  /> On Bags
                </label>
                <label>
                  <input
                    type="radio"
                    name="amountType"
                    value="on-weight-bags"
                    checked={formData.amountType === 'on-weight-bags'}
                    onChange={handleRadioChange}
                  /> On Weights / Bags
                </label>
              </div>
            </div>

            <div className="box tax-settings">
              <div className="form-group">
                <label htmlFor="tax-slab">Tax Slab</label>
                <select
                  id="tax-slab"
                  name="taxSlab"
                  value={formData.taxSlab}
                  onChange={handleInputChange}
                >
                  <option value="slab1">Slab 1</option>
                  <option value="slab2">Slab 2</option>
                  <option value="slab3">Slab 3</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="hsn-code">HSN Code</label>
                <input
                  type="text"
                  id="hsn-code"
                  name="hsnCode"
                  value={formData.hsnCode}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    id="tax-applicable"
                    name="taxApplicable"
                    checked={formData.taxApplicable}
                    onChange={handleInputChange}
                  /> Tax Applicable
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charges;