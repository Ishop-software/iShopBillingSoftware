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


import React, { useState,useEffect } from 'react';
import './charges.css';
import { useNavigate } from 'react-router-dom';

const Charges = ({ onClose }) => {
  const [showPercentageBox, setShowPercentageBox] = useState(false);
  const [formData, setFormData] = useState({
    chargesHeading: '',
    printAs: '',
    accountHeadToPost: '',
    typeOfCharges: 'plus', // For types of charges (plus or minus)
    inputAmountOfChargesAs: '', // For input amount types
    applyOn: '',
    percentage: '',
    calculateAt: '',
    roundOff: false,
    amountType: 'absolute', // For amount type options (absolute, on-qty, etc.)
    taxSettings: [
      {
        taxSlab: '',
        HSNCode: '',
        taxApplicable: false,
      }
    ],
  });
  

  const [accountNames, setAccountNames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccountNames = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/users/getAllAccountDetails', {
          method: 'POST', // Changed to POST
          headers: {
            'Content-Type': 'application/json',
            Authorization: token, // Pass the token for authentication
          },
        });
        const result = await response.json();
        if (response.ok) {
          setAccountNames(result.data); // Assuming result.data contains account names
        } else {
          alert('Error fetching account names');
        }
      } catch (error) {
        alert('Error: ' + error.message);
      }
    };
  
    fetchAccountNames();
  }, []);
  
 
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    console.log(`Updating field ${name} with value ${value}`);
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };
  
  const handleTaxSettingsChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    console.log(`Updating taxSettings index ${index} with ${name} = ${value}`);
    const newTaxSettings = [...formData.taxSettings];
    newTaxSettings[index] = {
      ...newTaxSettings[index],
      [name]: type === 'checkbox' ? checked : value,
    };
    setFormData({
      ...formData,
      taxSettings: newTaxSettings,
    });
  };
  
  const handleAddTaxSetting = () => {
    setFormData({
      ...formData,
      taxSettings: [
        ...formData.taxSettings,
        {
          taxSlab: '',
          HSNCode: '',
          taxApplicable: false,
        },
      ],
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
    const { name, value } = event.target;
  
    if (name === 'typeOfCharges') {
      setFormData({
        ...formData,
        typeOfCharges: value,
      });
    } else if (name === 'amountType') {
      setFormData({
        ...formData,
        amountType: value,
      });
  
      // This should be outside setFormData
      setShowPercentageBox(value === 'percentage');
    }
  };
    
  

  const handleViewList = () => {
    const token = localStorage.getItem('token');
    navigate(`/salelist?token=${token}`);
  };
  const handleaccountname = () => {
    const token = localStorage.getItem('token');
    navigate(`/accountlist?token=${token}`);
  };
  const handleeditpartybutton = () => {
    const token = localStorage.getItem('token');
    navigate(`/accountlist?token=${token}`);
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
              <select
                id="account-head"
                name="accountHeadToPost"
                value={formData.accountHeadToPost}
                onChange={handleInputChange}
              >
                <option value="">Select Account</option>
                {accountNames.map((account) => (
                  <option key={account._id} value={account._id}>
                    {account.name} {/* Assuming account object has a 'name' field */}
                  </option>
                ))}
              </select>
            </div>

            {showPercentageBox && (
              <div className="percentage-box">
                <div className="box-header">
                  <span>Types of Charges</span>
                </div>
                <div className="form-group">
                  <label htmlFor="apply-on">Apply On</label>
                  <input type="text" id="apply-on" />
                </div>
                <div className="form-group">
                  <label htmlFor="percentage">Percentage</label>
                  <input type="text" id="percentage" />
                </div>
                <div className="form-group">
                  <label htmlFor="calculate-at">Calculate @</label>
                  <input type="text" id="calculate-at" />
                </div>
                <div className="checkbox-group">
                  <label>
                    <input type="checkbox" id="round-off" /> Round Off Amount of Charges
                  </label>
                </div>
              </div>
            )}
          </div>

          <div className="button-group">
            <button className="add-party-button" onClick={handleaccountname}>+ Add New Party Name</button>
            <button className="edit-party-button" onClick={handleeditpartybutton}>Edit</button>
          </div>

          <div className="box-container">
            <div className="box">
              <label>Types of Charges</label>
              <div className="radio-group">
                <label>
                <input
  type="radio"
  name="typeOfCharges"
  value="plus"
  checked={formData.typeOfCharges === 'plus'}
  onChange={handleRadioChange}
/> Plus (+)
                </label>
                <label>
                <input
  type="radio"
  name="typeOfCharges"
  value="minus"
  checked={formData.typeOfCharges === 'minus'}
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

            {formData.taxSettings.map((taxSetting, index) => (
              <div key={index} className="box tax-settings">
                <div className="form-group">
                  <label htmlFor={`tax-slab-${index}`}>Tax Slab</label>
                  <select
                    id={`tax-slab-${index}`}
                    name="taxSlab"
                    value={taxSetting.taxSlab}
                    onChange={(e) => handleTaxSettingsChange(index, e)}
                  >
                    <option value="">Select Slab</option>
                    <option value="slab1">Slab 1</option>
                    <option value="slab2">Slab 2</option>
                    <option value="slab3">Slab 3</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor={`hsn-code-${index}`}>HSN Code</label>
                  <input
                    type="text"
                    id={`hsn-code-${index}`}
                    name="HSNCode"
                    value={taxSetting.HSNCode}
                    onChange={(e) => handleTaxSettingsChange(index, e)}
                  />
                </div>
                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      id={`tax-applicable-${index}`}
                      name="taxApplicable"
                      checked={taxSetting.taxApplicable}
                      onChange={(e) => handleTaxSettingsChange(index, e)}
                    /> Tax Applicable
                  </label>
                </div>
              </div>
            ))}
            <button className="add-tax-setting-button" onClick={handleAddTaxSetting}>+ Add Tax Setting</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charges;
