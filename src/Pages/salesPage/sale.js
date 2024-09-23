// import React, { useState, useEffect } from 'react';
// import Charges from './charges/charges';
// import CashPage from './cashPage/cash'; 
// import './sales.css';
// import { useNavigate, useSearchParams } from 'react-router-dom';

// const Sales = () => {
//   const [showCharges, setShowCharges] = useState(false);
//   const [showCashPage, setShowCashPage] = useState(false); 
//   const [searchParams] = useSearchParams();
//   const [itemNames, setItemNames] = useState([]);
//   const [selectedItem, setSelectedItem] = useState('');
//   const [rate, setRate] = useState('');
//   const [taxSlab, setTaxSlab] = useState('');
//   const [taxAmount, setTaxAmount] = useState('');
//   const [qty, setQty] = useState('');
//   const [discPercent, setDiscPercent] = useState('');
//   const [discAmount, setDiscAmount] = useState('');
//   const [basicAmt, setBasicAmt] = useState('');
//   const [netValue, setNetValue] = useState('');
//   const [summaryData, setSummaryData] = useState([]); // State to hold summary data
//   const [accountOptions, setAccountOptions] = useState([]); // State to hold account options
//   const [selectedAccount, setSelectedAccount] = useState('');
//   const token = searchParams.get('token');
//   const navigate = useNavigate();


//   // Additional input fields to store the calculated total values
//   const [totalCount, setTotalCount] = useState();
//   const [totalQty, setTotalQty] = useState();
//   const [totalAltQty, setTotalAltQty] = useState();
//   const [totalFree, setTotalFree] = useState();
//   const [totalBasicAmt, setTotalBasicAmt] = useState();
//   const [totalDiscount, setTotalDiscount] = useState();
//   const [totalTaxAmount, setTotalTaxAmount] = useState();
//   const [totalNetValue, setTotalNetValue] = useState();
//   const [totalchargevalue, settotalchargevalue] = useState();
//   const [totalTaxable, setTotalTaxable] = useState('');
//   const [totalNetBillAmount, setTotalNetBillAmount] = useState('');

//   useEffect(() => {
//     const fetchItemNames = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/productitems/getAllProductItems', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': token
//           },
//         });

//         if (response.ok) {
//           const data = await response.json();
//           if (Array.isArray(data.message)) {
//             setItemNames(data.message);
//           } else {
//             console.error('Fetched data.message is not an array:', data.message);
//             setItemNames([]);
//           }
//         } else {
//           console.error('Failed to fetch item names');
//           setItemNames([]);
//         }
//       } catch (error) {
//         console.error('Error fetching item names:', error);
//         setItemNames([]);
//       }
//     };

//     fetchItemNames();
//   }, [token]);

//   useEffect(() => {
//    // sale.js
// const fetchAccountOptions = async () => {
//   try {
//     const response = await fetch('http://localhost:5000/api/users/getAllAccountDetails', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': token
//       },
//     });

//     if (response.ok) {
//       const data = await response.json();
//       if (Array.isArray(data.data)) {
//         setAccountOptions(data.data);
//       } else {
//         console.error('Fetched data.data is not an array:', data.data);
//         setAccountOptions([]);
//       }
//     } else {
//       console.error('Failed to fetch account options');
//       setAccountOptions([]);
//     }
//   } catch (error) {
//     console.error('Error fetching account options:', error);
//     setAccountOptions([]);
//   }
// };


//     fetchAccountOptions();
//   }, [token]);

//   const handleItemChange = (e) => {
//     const selectedItemName = e.target.value;
//     setSelectedItem(selectedItemName);

//     const item = itemNames.find(item => item.itemName === selectedItemName);
//     if (item) {
//       setRate(item.mrp || '');
//       setTaxSlab(item.taxSlab || '');
//     } else {
//       setRate('');
//       setTaxSlab('');
//     }
//   };

//   const handleAccountChange = (e) => {
//     setSelectedAccount(e.target.value);
//   };

//   const handleaddnewitem = () => {
//     navigate(`/items?token=${token}`);
//   };

//   const handleaddnewparty = () => {
//     navigate(`/accountlist?token=${token}`);
//   };
//   const handleeditparty = () => {
//     navigate(`/accountlist?token=${token}`);
//   };

//   const handleAddCharges = () => {
//     setShowCharges(true);
//   };

//   const handleCloseCharges = () => {
//     setShowCharges(false);
//   };

//   const handleCashTenderedClick = () => {
//     setShowCashPage(true); 
//   };

//   const handleCloseCashPage = () => {
//     setShowCashPage(false);
//   };

//   const handleSave = async () => {
//     const data = {
//       userId: 'yourUserId',
//       saleRegId: 'someSaleRegId',
//       // partyName: document.querySelector('.party-name input').value,
//       billNo: parseInt(document.querySelector('.bill-no input').value, 10),
//       dueDate: document.querySelector('.due-date input').value,
//       itemName: selectedItem,
//       qty: parseFloat(qty) || 0,
//       altQty: parseFloat(document.querySelector('.item-inputs input[placeholder="Alt Qty"]').value) || 0,
//       free: parseFloat(document.querySelector('.item-inputs input[placeholder="Free"]').value) || 0,
//       per: document.querySelector('.item-inputs input[placeholder="Per"]').value,
//       rate: parseFloat(rate) || 0,
//       discAmount: parseFloat(discAmount) || 0,
//       basicAmount: parseFloat(basicAmt) || 0,
//       taxAmount: parseFloat(taxAmount) || 0,
//       discs: parseFloat(discPercent) || 0,
//       netValue: parseFloat(netValue) || 0,
//       otherCharges: document.querySelector('.charges-inputs input[placeholder="Remarks"]').value,
//       remarks: document.querySelector('.charges-inputs input[placeholder="Remarks"]').value,
//       onValue: parseFloat(document.querySelector('.charges-inputs input[placeholder="On Value"]').value) || 0,
//       at: document.querySelector('.charges-inputs input[placeholder="@"]').value,
//       plusMinus: document.querySelector('.charges-inputs input[placeholder="+ / -"]').value,
//       amount: parseFloat(document.querySelector('.charges-inputs input[placeholder="Amount"]').value) || 0,
//     };

//     if (!token) {
//       alert('Authentication token is missing.');
//       return;
//     }
  
//     try {
//       const response = await fetch('http://localhost:5000/api/usersales/addSalesRegister', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': token
//         },
//         body: JSON.stringify(data)
//       });
  
//       if (response.ok) {
//         const result = await response.json();
//         alert('Sales data saved successfully!');
        
//          // Update the summary table data
//          const newEntry = {
//           tick: <input type="checkbox" />,
//           item: selectedItem,
//           mQty: qty,
//           aQty: document.querySelector('.item-inputs input[placeholder="Alt Qty"]').value,
//           free: document.querySelector('.item-inputs input[placeholder="Free"]').value,
//           rate: rate,
//           per: document.querySelector('.item-inputs input[placeholder="Per"]').value,
//           basicAmt: basicAmt,
//           discPercent: discPercent,
//           discAmount: discAmount,
//           taxSlab: taxSlab,
//           taxAmount: taxAmount,
//           saleAmount: netValue,
//           chargesHeading: document.querySelector('.charges-inputs input[placeholder="Charges Heading"]').value,
//           onValue: document.querySelector('.charges-inputs input[placeholder="On Value"]').value,
//           at: document.querySelector('.charges-inputs input[placeholder="@"]').value,
//           plusMinus: document.querySelector('.charges-inputs input[placeholder="+ / -"]').value,
//           chargesAmount: document.querySelector('.charges-inputs input[placeholder="Amount"]').value
//         };

//         setSummaryData(prevData => {
//           const updatedData = [...prevData, newEntry];


//           // Recalculate totals
//           setTotalCount(updatedData.length);
//           setTotalQty(updatedData.reduce((acc, curr) => acc + parseFloat(curr.mQty || 0), 0));
//           setTotalAltQty(updatedData.reduce((acc, curr) => acc + parseFloat(curr.aQty || 0), 0));
//           setTotalFree(updatedData.reduce((acc, curr) => acc + parseFloat(curr.free || 0), 0));
//           setTotalBasicAmt(updatedData.reduce((acc, curr) => acc + parseFloat(curr.basicAmt || 0), 0));
//           setTotalDiscount(updatedData.reduce((acc, curr) => acc + parseFloat(curr.discAmount || 0), 0));
//           setTotalTaxAmount(updatedData.reduce((acc, curr) => acc + parseFloat(curr.taxAmount || 0), 0));
//           setTotalNetValue(updatedData.reduce((acc, curr) => acc + parseFloat(curr.saleAmount || 0), 0));
//           settotalchargevalue(updatedData.reduce((acc, curr) => acc + parseFloat(curr.chargesHeading || 0), 0))

//           return updatedData;
//         });

//       } else {
//         alert('Failed to save sales data'); 
//       }
//     } catch (error) {
//       console.error('Error saving sales data:', error);
//     }
//   };
//   const handleQtyChange = (e) => {
//     const qtyValue = parseFloat(e.target.value) || '';
//     setQty(qtyValue);
//     calculateBasicAmount(qtyValue, rate);
//   };

//   const handleDiscPercentChange = (e) => {
//     const discPercentValue = parseFloat(e.target.value) || '';
//     setDiscPercent(discPercentValue);
//     calculateDiscountAmount(basicAmt, discPercentValue);
//   };

//   const calculateBasicAmount = (qty, rate) => {
//     const basicAmtValue = qty * rate;
//     setBasicAmt(basicAmtValue || '');
//     calculateDiscountAmount(basicAmtValue, discPercent);
//     calculateTaxAmount(basicAmtValue, taxSlab);
//   };

//   const calculateDiscountAmount = (basicAmt, discPercent) => {
//     const discAmountValue = basicAmt * (discPercent / 100);
//     setDiscAmount(discAmountValue || '');
//     calculateNetValue(basicAmt, discAmountValue, taxAmount);
//   };

//   const calculateTaxAmount = (basicAmt, taxSlab) => {
//     const taxAmountValue = basicAmt * (taxSlab / 100);
//     setTaxAmount(taxAmountValue || '');
//     calculateNetValue(basicAmt, discAmount, taxAmountValue);
//   };

//   const calculateNetValue = (basicAmt, discAmount, taxAmount) => {
//     const netValueCalc = basicAmt - discAmount + taxAmount;
//     setNetValue(netValueCalc || '');
//   };
//   useEffect(() => {
//     const taxableValue = totalBasicAmt - totalDiscount;
//     setTotalTaxable(taxableValue || ''); // Calculate and update taxable value
//   }, [totalBasicAmt, totalDiscount]);

//   useEffect(() => {
//     const netBillAmountValue = totalNetValue + totalchargevalue;
//     setTotalNetBillAmount(netBillAmountValue || ''); // Calculate and update the Net Bill Amount
//   }, [totalNetValue, totalchargevalue]);
  
//   return (
//     <div className="sales-container">
//       <div className="sales-header">
//         <div className="sales-header-left">
//           <div className="sales-form">
//             <label>Date</label>
//             <input type="date" />
//           </div>
//           <div className="sales-form">
//             <label>Terms</label>
//             <input type="text" />
//           </div>
//         </div>
//         <div className="sales-header-right">
//           <button className="save-btn" onClick={handleSave}>Save</button>
//           <button className="print-btn">Print</button>
//           <button className="einvoice-btn">E-Invoice</button>
//           <button className="details-btn">Delete</button>
//           <button className="attach-btn">Attach</button>
//         </div>
//       </div>
       
//       <div className="party-info">
//         <div className="party-details">
//           <div className="party-name">
//             <label>Party Name</label>
//             <select
//               value={selectedAccount}
//               onChange={handleAccountChange}
//             >
//               <option value="">Select Party</option>
//               {accountOptions.map((account) => (
//                 <option key={account.id} value={account.id}>
//                   {account.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="bill-no">
//             <label>Bill No</label>
//             <input type="text" />
//           </div>
//           <div className="due-date">
//             <label>Due Date</label>
//             <input type="date" />
//           </div>
//         </div>
//         <div className="party-buttons">
//           <button className="add-party-btn" onClick={handleaddnewparty}>+ Add New Party Name</button>
//           <button className="edit-party-btn" onClick={handleeditparty}>Edit</button>
//         </div>
//       </div>
      
//       <div className="content-sections">
//         <div className="items-section">
//           <label className="section-title">ITEMS</label>
//           <div className="item-name">
//             <label>Item Name</label>
//             <select
//               value={selectedItem}
//               onChange={handleItemChange}
//             >
//               <option value="">Select Item</option>
//               {itemNames.map((item) => (
//                 <option key={item._id} value={item.itemName}>
//                   {item.itemName}
//                 </option>
//               ))}
//             </select>
//             <button className="add-item-btn" onClick={handleaddnewitem}>
//               + Add New Item
//             </button>
//           </div>
//           <div className="item-inputs">
//             <input type="text" placeholder="Qty" value={qty} onChange={handleQtyChange} />
//             <input type="text" placeholder="Alt Qty" />
//             <input type="text" placeholder="Free" />
//             <input type="text" placeholder="Per" />
//             <input
//               type="text"
//               placeholder="Rate"
//               value={rate}
//               onChange={(e) => setRate(e.target.value)}
//             />
//             <input
//               type="text"
//               placeholder="Disc %"
//               value={discPercent}
//               onChange={handleDiscPercentChange}
//             />
//             <input
//               type="text"
//               placeholder="Disc Amount"
//               value={discAmount}
//               readOnly
//             />
//             <input
//               type="text"
//               placeholder="Basic Amount"
//               value={basicAmt}
//               readOnly
//             />
//             <input
//               type="text"
//               placeholder="Tax Slab"
//               value={taxSlab}
//               onChange={(e) => setTaxSlab(e.target.value)}
//             />
//             <input
//               type="text"
//               placeholder="Tax Amount"
//               value={taxAmount}
//               readOnly
//             />
//             <input
//               type="text"
//               placeholder="Net Value"
//               value={netValue}
//               readOnly
//             />
//           </div>
//         </div>

//         <div className="charges-section">
//           <label className="section-title">CHARGES</label>
//           <div className="charges-inputs">
//             <input type="text" placeholder="Charges Heading" />
//             <input type="text" placeholder="Remarks" />
//             <input type="text" placeholder="On Value" />
//             <input type="text" placeholder="@"/>
//             <input type="text" placeholder="+ / -"/>
//             <input type="text" placeholder="Amount"/>
//             <button className="charges-btn" onClick={handleAddCharges}>+ Add</button>
//           </div>
//         </div>
//       </div>
//       <div className="bottom-section">
//         <table className="summary-table">
//           <thead>
//             <tr>
//               <th>Tick</th>
//               <th>Item</th>
//               <th>M.Qty</th>
//               <th>A.Qty</th>
//               <th>Free</th>
//               <th>Rate</th>
//               <th>Per</th>
//               <th>Basic Amt</th>
//               <th>D.%</th>
//               <th>D. Amt</th>
//               <th>T.%</th>
//               <th>T. Amt</th>
//               <th>Sale Amount</th>
//               <th>Charges Heading</th>
//               <th>On Value</th>
//               <th>@</th>
//               <th>+ / -</th>
//               <th>Charges Amount</th>
//             </tr>
//           </thead>
//           <tbody>
//             {summaryData.map((data, index) => (
//               <tr key={index}>
//                 <td>{data.tick}</td>
//                 <td>{data.item}</td>
//                 <td>{data.mQty}</td>
//                 <td>{data.aQty}</td>
//                 <td>{data.free}</td>
//                 <td>{data.rate}</td>
//                 <td>{data.per}</td>
//                 <td>{data.basicAmt}</td>
//                 <td>{data.discPercent}</td>
//                 <td>{data.discAmount}</td>
//                 <td>{data.taxSlab}</td>
//                 <td>{data.taxAmount}</td>
//                 <td>{data.saleAmount}</td>
//                 <td>{data.chargesHeading}</td>
//                 <td>{data.onValue}</td>
//                 <td>{data.at}</td>
//                 <td>{data.plusMinus}</td>
//                 <td>{data.chargesAmount}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
        
//         <div className="additional-inputs">
//           <input type="text" placeholder="Count" value={totalCount} readOnly/>
//           <input type="text" placeholder="Qty" value={totalQty} readOnly />
//           <input type="text" placeholder="Alt" value={totalAltQty} readOnly/>
//           <input type="text" placeholder="Free" value={totalFree} readOnly  />
//           <input type="text" placeholder="Basic Amt" value={totalBasicAmt} readOnly />
//           <input type="text" placeholder="Discount" value={totalDiscount} readOnly/>
//           <input type="text" placeholder="Ad.Disc" />
//           <input type="text" placeholder="Taxable" value={totalTaxable} readOnly />
//           <input type="text" placeholder="Tax Amt" value={totalTaxAmount} readOnly/>
//           <input type="text" placeholder="Net Value"  value={totalNetValue} readOnly/>
//           <input type="text" placeholder="Charges" value={totalchargevalue} readOnly/>
//           <input type="text" placeholder="R.O" />
//           <input type="text" placeholder="Net Bill Amt" value={totalNetBillAmount} readOnly />
//           <input
//             type="text"
//             placeholder="Cash Tendered +"
//             onClick={handleCashTenderedClick}
//           />
//           <input type="text" placeholder="change" />
//         </div>
    
//       </div>
//       {showCharges && <Charges onClose={handleCloseCharges} />}
//       {showCashPage && <CashPage onClose={handleCloseCashPage} />} 
      
//     </div>
//   );
// };

// export default Sales;




import React, { useState, useEffect, useRef } from 'react';
import Charges from './charges/charges';
import CashPage from './cashPage/cash'; 
import './sales.css';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Sales = () => {
  const [showCharges, setShowCharges] = useState(false);
  const [showCashPage, setShowCashPage] = useState(false); 
  const [searchParams] = useSearchParams();
  const [itemNames, setItemNames] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [rate, setRate] = useState('');
  const [taxSlab, setTaxSlab] = useState('');
  const [taxAmount, setTaxAmount] = useState('');
  const [qty, setQty] = useState('');
  const [discPercent, setDiscPercent] = useState('');
  const [discAmount, setDiscAmount] = useState('');
  const [basicAmt, setBasicAmt] = useState('');
  const [netValue, setNetValue] = useState('');
  const [summaryData, setSummaryData] = useState([]); // State to hold summary data
  const [accountOptions, setAccountOptions] = useState([]); // State to hold account options
  const [selectedAccount, setSelectedAccount] = useState('');
  const token = searchParams.get('token');
  const navigate = useNavigate();


  // Additional input fields to store the calculated total values
  const [totalCount, setTotalCount] = useState();
  const [totalQty, setTotalQty] = useState();
  const [totalAltQty, setTotalAltQty] = useState();
  const [totalFree, setTotalFree] = useState();
  const [totalBasicAmt, setTotalBasicAmt] = useState();
  const [totalDiscount, setTotalDiscount] = useState();
  const [totalTaxAmount, setTotalTaxAmount] = useState();
  const [totalNetValue, setTotalNetValue] = useState();
  const [totalchargevalue, settotalchargevalue] = useState();
  const [totalTaxable, setTotalTaxable] = useState('');
  const [totalNetBillAmount, setTotalNetBillAmount] = useState('');

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
          if (Array.isArray(data.message)) {
            setItemNames(data.message);
          } else {
            console.error('Fetched data.message is not an array:', data.message);
            setItemNames([]);
          }
        } else {
          console.error('Failed to fetch item names');
          setItemNames([]);
        }
      } catch (error) {
        console.error('Error fetching item names:', error);
        setItemNames([]);
      }
    };

    fetchItemNames();
  }, [token]);

  useEffect(() => {
   // sale.js
const fetchAccountOptions = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/users/getAllAccountDetails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
    });

    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data.data)) {
        setAccountOptions(data.data);
      } else {
        console.error('Fetched data.data is not an array:', data.data);
        setAccountOptions([]);
      }
    } else {
      console.error('Failed to fetch account options');
      setAccountOptions([]);
    }
  } catch (error) {
    console.error('Error fetching account options:', error);
    setAccountOptions([]);
  }
};


    fetchAccountOptions();
  }, [token]);

  const handleItemChange = (e) => {
    const selectedItemName = e.target.value;
    setSelectedItem(selectedItemName);

    const item = itemNames.find(item => item.itemName === selectedItemName);
    if (item) {
      setRate(item.mrp || '');
      setTaxSlab(item.taxSlab || '');
    } else {
      setRate('');
      setTaxSlab('');
    }
  };

  const handleAccountChange = (e) => {
    setSelectedAccount(e.target.value);
  };

  const handleaddnewitem = () => {
    navigate(`/items?token=${token}`);
  };

  const handleaddnewparty = () => {
    navigate(`/accountlist?token=${token}`);
  };
  const handleeditparty = () => {
    navigate(`/accountlist?token=${token}`);
  };

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

  const handleSave = async () => {
    // Collect data from additional inputs
    const additionalInputsData = {
      totalCount: totalCount || 0,
      totalQty: totalQty || 0,
      totalAltQty: totalAltQty || 0,
      totalFree: totalFree || 0,
      totalBasicAmt: totalBasicAmt || 0,
      totalDiscount: totalDiscount || 0,
      totalTaxAmount: totalTaxAmount || 0,
      totalNetValue: totalNetValue || 0,
      totalChargeValue: totalchargevalue || 0,
      netBillAmt: parseFloat(document.querySelector('.additional-inputs input[placeholder="Net Bill Amt"]').value) || 0,
      cashTendered: parseFloat(document.querySelector('.additional-inputs input[placeholder="Cash Tendered +"]').value) || 0,
      change: parseFloat(document.querySelector('.additional-inputs input[placeholder="change"]').value) || 0,
    };
  
    // Collect other relevant data
    const data = {
      userId: 'yourUserId',
      saleRegId: 'someSaleRegId',
      partyName: selectedAccount,
      billNo: parseInt(document.querySelector('.bill-no input').value, 10),
      dueDate: document.querySelector('.due-date input').value,
      itemName: selectedItem,
      qty: parseFloat(qty) || 0,
      altQty: parseFloat(document.querySelector('.item-inputs input[placeholder="Alt Qty"]').value) || 0,
      free: parseFloat(document.querySelector('.item-inputs input[placeholder="Free"]').value) || 0,
      per: document.querySelector('.item-inputs input[placeholder="Per"]').value,
      rate: parseFloat(rate) || 0,
      discAmount: parseFloat(discAmount) || 0,
      basicAmount: parseFloat(basicAmt) || 0,
      taxAmount: parseFloat(taxAmount) || 0,
      discs: parseFloat(discPercent) || 0,
      netValue: parseFloat(netValue) || 0,
      otherCharges: document.querySelector('.charges-inputs input[placeholder="Charges Heading"]').value,
      remarks: document.querySelector('.charges-inputs input[placeholder="Remarks"]').value,
      onValue: parseFloat(document.querySelector('.charges-inputs input[placeholder="On Value"]').value) || 0,
      at: document.querySelector('.charges-inputs input[placeholder="@"]').value,
      plusMinus: document.querySelector('.charges-inputs input[placeholder="+ / -"]').value,
      amount: parseFloat(document.querySelector('.charges-inputs input[placeholder="Amount"]').value) || 0,
      ...additionalInputsData
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
        
        const newEntry = {
          tick: <input type="checkbox" />,
          item: selectedItem,
          mQty: qty,
          aQty: document.querySelector('.item-inputs input[placeholder="Alt Qty"]').value,
          free: document.querySelector('.item-inputs input[placeholder="Free"]').value,
          rate: rate,
          per: document.querySelector('.item-inputs input[placeholder="Per"]').value,
          basicAmt: basicAmt,
          discPercent: discPercent,
          discAmount: discAmount,
          taxSlab: taxSlab,
          taxAmount: taxAmount,
          saleAmount: netValue,
          chargesHeading: document.querySelector('.charges-inputs input[placeholder="Charges Heading"]').value,
          onValue: document.querySelector('.charges-inputs input[placeholder="On Value"]').value,
          at: document.querySelector('.charges-inputs input[placeholder="@"]').value,
          plusMinus: document.querySelector('.charges-inputs input[placeholder="+ / -"]').value,
          chargesAmount: document.querySelector('.charges-inputs input[placeholder="Amount"]').value
        };
  
        setSummaryData(prevData => {
          const updatedData = [...prevData, newEntry];
          // Recalculate totals
          setTotalCount(updatedData.length);
          setTotalQty(updatedData.reduce((acc, curr) => acc + parseFloat(curr.mQty || 0), 0));
          setTotalAltQty(updatedData.reduce((acc, curr) => acc + parseFloat(curr.aQty || 0), 0));
          setTotalFree(updatedData.reduce((acc, curr) => acc + parseFloat(curr.free || 0), 0));
          setTotalBasicAmt(updatedData.reduce((acc, curr) => acc + parseFloat(curr.basicAmt || 0), 0));
          setTotalDiscount(updatedData.reduce((acc, curr) => acc + parseFloat(curr.discAmount || 0), 0));
          setTotalTaxAmount(updatedData.reduce((acc, curr) => acc + parseFloat(curr.taxAmount || 0), 0));
          setTotalNetValue(updatedData.reduce((acc, curr) => acc + parseFloat(curr.saleAmount || 0), 0));
          settotalchargevalue(updatedData.reduce((acc, curr) => acc + parseFloat(curr.chargesHeading || 0), 0));
  
          return updatedData;
        });
  
      } else {
        alert('Failed to save sales data');
      }
    } catch (error) {
      console.error('Error saving sales data:', error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  const handleQtyChange = (e) => {
    const qtyValue = parseFloat(e.target.value) || 0;
    setQty(qtyValue);
  
    // Calculate basic amount with current values
    const newBasicAmt = calculateBasicAmount(qtyValue, rate);
    calculateDiscountAmount(newBasicAmt, discPercent);
    calculateTaxAmount(newBasicAmt, taxSlab);
  };
  
  const handleDiscPercentChange = (e) => {
    const discPercentValue = parseFloat(e.target.value) || 0;
    setDiscPercent(discPercentValue);
  
    // Calculate discount with the latest basic amount
    calculateDiscountAmount(basicAmt, discPercentValue);
  };
  
  const calculateBasicAmount = (qty, rate) => {
    const basicAmtValue = qty * rate;
    setBasicAmt(basicAmtValue || 0);
  
    return basicAmtValue; // Return the basic amount so it can be used in subsequent calculations
  };
  
  const calculateDiscountAmount = (basicAmt, discPercent) => {
    const discAmountValue = basicAmt * (discPercent / 100);
    setDiscAmount(discAmountValue || 0);
  
    // Use the current values for taxAmount
    calculateNetValue(basicAmt, discAmountValue, taxAmount);
  };
  
  const calculateTaxAmount = (basicAmt, taxSlab) => {
    const taxAmountValue = basicAmt * (taxSlab / 100);
    setTaxAmount(taxAmountValue || 0);
  
    // Use the current values for discAmount
    calculateNetValue(basicAmt, discAmount, taxAmountValue);
  };
  
  const calculateNetValue = (basicAmt, discAmount, taxAmount) => {
    const netValueCalc = basicAmt - discAmount + taxAmount;
    setNetValue(netValueCalc || 0);
  };
  useEffect(() => {
    const taxableValue = totalBasicAmt - totalDiscount;
    setTotalTaxable(taxableValue || ''); // Calculate and update taxable value
  }, [totalBasicAmt, totalDiscount]);

  useEffect(() => {
    const netBillAmountValue = totalNetValue + totalchargevalue;
    setTotalNetBillAmount(netBillAmountValue || ''); // Calculate and update the Net Bill Amount
  }, [totalNetValue, totalchargevalue]);
 
   // Define refs for the input fields
   const qtyRef = useRef(null);
   const altQtyRef =useRef(null);
   const freeRef =useRef(null);
   const perRef =useRef(null);
   const rateRef = useRef(null);
   const discPercentRef = useRef(null);
   const discAmountRef = useRef(null);
   const basicAmtRef = useRef(null);
   const taxSlabRef = useRef(null);
   const taxAmountRef = useRef(null);
   const netValueRef = useRef(null);
   const chargesHeadingRef =useRef(null);
   const remarksRef =useRef(null);
   const onValueRef =useRef(null);
   const atRef =useRef(null);
   const plusMinusRef =useRef(null);
   const chargesAmountRef =useRef(null);
   const handleKeyDownInput = (e, fieldRef) => {
     if (e.key === 'Enter') {
       e.preventDefault();
       fieldRef.current?.focus(); // Focus on the next input field
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
            <select
              value={selectedAccount}
              onChange={handleAccountChange}
            >
              <option value="">Select Party</option>
              {accountOptions.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.name}
                </option>
              ))}
            </select>
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
          <button className="edit-party-btn" onClick={handleeditparty}>Edit</button>
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
                <option key={item._id} value={item.itemName}>
                  {item.itemName}
                </option>
              ))}
            </select>
            <button className="add-item-btn" onClick={handleaddnewitem}>
              + Add New Item
            </button>
          </div>
          <div className="item-inputs">
            <input type="text" placeholder="Qty" value={qty} onChange={handleQtyChange}  onKeyDown={(e) => handleKeyDownInput(e, altQtyRef)}
          ref={qtyRef} />
            <input type="text" placeholder="Alt Qty"  onKeyDown={(e) => handleKeyDownInput(e, freeRef)}
          ref={altQtyRef}  />
            <input type="text" placeholder="Free"  onKeyDown={(e) => handleKeyDownInput(e, perRef)}
          ref={freeRef}  />
            <input type="text" placeholder="Per"  onKeyDown={(e) => handleKeyDownInput(e, rateRef)}
          ref={perRef}  />
            <input
              type="text"
              placeholder="Rate"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              onKeyDown={(e) => handleKeyDownInput(e, discPercentRef)}
              ref={rateRef}
            />
            <input
              type="text"
              placeholder="Disc %"
              value={discPercent}
              onChange={handleDiscPercentChange}
              onKeyDown={(e) => handleKeyDownInput(e, discAmountRef)}
              ref={discPercentRef}
            />
            <input
              type="text"
              placeholder="Disc Amount"
              value={discAmount}
              onKeyDown={(e) => handleKeyDownInput(e, basicAmtRef)}
              ref={discAmountRef}
              readOnly
            />
            <input
              type="text"
              placeholder="Basic Amount"
              value={basicAmt}
              onKeyDown={(e) => handleKeyDownInput(e, taxSlabRef)}
              ref={basicAmtRef}
              readOnly
            />
            <input
              type="text"
              placeholder="Tax Slab"
              value={taxSlab}
              onChange={(e) => setTaxSlab(e.target.value)}
              onKeyDown={(e) => handleKeyDownInput(e, taxAmountRef)}
              ref={taxSlabRef}
            />
            <input
              type="text"
              placeholder="Tax Amount"
              value={taxAmount}
              onKeyDown={(e) => handleKeyDownInput(e, netValueRef)}
              ref={taxAmountRef}
              readOnly
            />
            <input
              type="text"
              placeholder="Net Value"
              value={netValue}
              onKeyDown={(e) => handleKeyDownInput(e, chargesHeadingRef)}
          ref={netValueRef}
              readOnly
            />
          </div>
        </div>

        <div className="charges-section">
          <label className="section-title">CHARGES</label>
          <div className="charges-inputs">
            <input type="text" placeholder="Charges Heading"  onKeyDown={(e) => handleKeyDownInput(e, remarksRef)}
          ref={chargesHeadingRef}  />
            <input type="text" placeholder="Remarks"  onKeyDown={(e) => handleKeyDownInput(e, onValueRef)}
          ref={remarksRef} />
            <input type="text" placeholder="On Value"  onKeyDown={(e) => handleKeyDownInput(e, atRef)}
          ref={onValueRef}/>
            <input type="text" placeholder="@"  onKeyDown={(e) => handleKeyDownInput(e, plusMinusRef)}
          ref={atRef}/>
            <input type="text" placeholder="+ / -"  onKeyDown={(e) => handleKeyDownInput(e, chargesAmountRef)}
          ref={plusMinusRef} />
            <input type="text" placeholder="Amount"onKeyDown={handleKeyDown} ref={chargesAmountRef}/>
            <button className="charges-btn" onClick={handleAddCharges} >+ Add</button>
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
            {summaryData.map((data, index) => (
              <tr key={index}>
                <td>{data.tick}</td>
                <td>{data.item}</td>
                <td>{data.mQty}</td>
                <td>{data.aQty}</td>
                <td>{data.free}</td>
                <td>{data.rate}</td>
                <td>{data.per}</td>
                <td>{data.basicAmt}</td>
                <td>{data.discPercent}</td>
                <td>{data.discAmount}</td>
                <td>{data.taxSlab}</td>
                <td>{data.taxAmount}</td>
                <td>{data.saleAmount}</td>
                <td>{data.chargesHeading}</td>
                <td>{data.onValue}</td>
                <td>{data.at}</td>
                <td>{data.plusMinus}</td>
                <td>{data.chargesAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="additional-inputs">
          <input type="text" placeholder="Count" value={totalCount} readOnly/>
          <input type="text" placeholder="Qty" value={totalQty} readOnly />
          <input type="text" placeholder="Alt" value={totalAltQty} readOnly/>
          <input type="text" placeholder="Free" value={totalFree} readOnly  />
          <input type="text" placeholder="Basic Amt" value={totalBasicAmt} readOnly />
          <input type="text" placeholder="Discount" value={totalDiscount} readOnly/>
          <input type="text" placeholder="Ad.Disc" />
          <input type="text" placeholder="Taxable" value={totalTaxable} readOnly />
          <input type="text" placeholder="Tax Amt" value={totalTaxAmount} readOnly/>
          <input type="text" placeholder="Net Value"  value={totalNetValue} readOnly/>
          <input type="text" placeholder="Charges" value={totalchargevalue} readOnly/>
          <input type="text" placeholder="R.O" />
          <input type="text" placeholder="Net Bill Amt" value={totalNetBillAmount} readOnly />
          <input
            type="text"
            placeholder="Cash Tendered +"
            onClick={handleCashTenderedClick}
          />
          <input type="text" placeholder="change" />
        </div>
    
      </div>
      {showCharges && <Charges onClose={handleCloseCharges} />}
      {showCashPage && <CashPage onClose={handleCloseCashPage} />} 
      
    </div>
  );
};

export default Sales;