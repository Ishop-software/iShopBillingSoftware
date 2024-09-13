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
//   const token = searchParams.get('token');
//   const navigate = useNavigate();

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

//   const handleaddnewitem = () => {
//     navigate(`/items?token=${token}`);
//   };

//   const handleaddnewparty = () => {
//     navigate('/accountlist');
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
//       partyName: document.querySelector('.party-name input').value,
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
        
//         // Update the summary table data
//         setSummaryData(prevData => [
//           ...prevData,
//           {
//             tick: <input type="checkbox" />,
//             item: selectedItem,
//             mQty: qty,
//             aQty: document.querySelector('.item-inputs input[placeholder="Alt Qty"]').value,
//             free: document.querySelector('.item-inputs input[placeholder="Free"]').value,
//             rate: rate,
//             per: document.querySelector('.item-inputs input[placeholder="Per"]').value,
//             basicAmt: basicAmt,
//             discPercent: discPercent,
//             discAmount: discAmount,
//             taxSlab: taxSlab,
//             taxAmount: taxAmount,
//             saleAmount: netValue,
//             chargesHeading: document.querySelector('.charges-inputs input[placeholder="Remarks"]').value,
//             onValue: document.querySelector('.charges-inputs input[placeholder="On Value"]').value,
//             at: document.querySelector('.charges-inputs input[placeholder="@"]').value,
//             plusMinus: document.querySelector('.charges-inputs input[placeholder="+ / -"]').value,
//             chargesAmount: document.querySelector('.charges-inputs input[placeholder="Amount"]').value
//           }
//         ]);
//       } else {
//         const error = await response.json();
//         alert('Failed to save sales data: ' + error.message);
//       }
//     } catch (error) {
//       console.error('Request failed:', error);
//       alert('Failed to save sales data.');
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
//             <input type="text" />
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
//           <button className="edit-party-btn">Edit</button>
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
//           <input type="text" placeholder="Count" />
//           <input type="text" placeholder="Qty" />
//           <input type="text" placeholder="Alt" />
//           <input type="text" placeholder="Free" />
//           <input type="text" placeholder="Basic Amt" />
//           <input type="text" placeholder="Discount" />
//           <input type="text" placeholder="Ad.Disc" />
//           <input type="text" placeholder="Taxable" />
//           <input type="text" placeholder="Tax Amt" />
//           <input type="text" placeholder="Net Value" />
//           <input type="text" placeholder="Chares" />
//           <input type="text" placeholder="R.O" />
//           <input type="text" placeholder="Net Bill Amt" />
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
import React, { useState, useEffect } from 'react';
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

  const handleaddnewitem = () => {
    navigate(`/items?token=${token}`);
  };

  const handleaddnewparty = () => {
    navigate('/accountlist');
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
    const data = {
      userId: 'yourUserId',
      saleRegId: 'someSaleRegId',
      partyName: document.querySelector('.party-name input').value,
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
      otherCharges: document.querySelector('.charges-inputs input[placeholder="Remarks"]').value,
      remarks: document.querySelector('.charges-inputs input[placeholder="Remarks"]').value,
      onValue: parseFloat(document.querySelector('.charges-inputs input[placeholder="On Value"]').value) || 0,
      at: document.querySelector('.charges-inputs input[placeholder="@"]').value,
      plusMinus: document.querySelector('.charges-inputs input[placeholder="+ / -"]').value,
      amount: parseFloat(document.querySelector('.charges-inputs input[placeholder="Amount"]').value) || 0,
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
        
        // Update the summary table data
        setSummaryData(prevData => [
          ...prevData,
          {
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
            chargesHeading: document.querySelector('.charges-inputs input[placeholder="Remarks"]').value,
            onValue: document.querySelector('.charges-inputs input[placeholder="On Value"]').value,
            at: document.querySelector('.charges-inputs input[placeholder="@"]').value,
            plusMinus: document.querySelector('.charges-inputs input[placeholder="+ / -"]').value,
            chargesAmount: document.querySelector('.charges-inputs input[placeholder="Amount"]').value
          }
        ]);

        // Clear the form fields
        setSelectedItem('');
        setRate('');
        setTaxSlab('');
        setQty('');
        setDiscPercent('');
        setDiscAmount('');
        setBasicAmt('');
        setNetValue('');
        
        // Clear inputs in the DOM directly if necessary
        document.querySelectorAll('.party-name input, .bill-no input, .due-date input').forEach(input => input.value = '');
        document.querySelectorAll('.item-inputs input, .charges-inputs input').forEach(input => input.value = '');
      } else {
        const error = await response.json();
        alert('Failed to save sales data: ' + error.message);
      }
    } catch (error) {
      console.error('Request failed:', error);
      alert('Failed to save sales data.');
    }
  };

  const handleQtyChange = (e) => {
    const qtyValue = parseFloat(e.target.value) || '';
    setQty(qtyValue);
    calculateBasicAmount(qtyValue, rate);
  };

  const handleDiscPercentChange = (e) => {
    const discPercentValue = parseFloat(e.target.value) || '';
    setDiscPercent(discPercentValue);
    calculateDiscountAmount(basicAmt, discPercentValue);
  };

  const calculateBasicAmount = (qty, rate) => {
    const basicAmtValue = qty * rate;
    setBasicAmt(basicAmtValue || '');
    calculateDiscountAmount(basicAmtValue, discPercent);
    calculateTaxAmount(basicAmtValue, taxSlab);
  };

  const calculateDiscountAmount = (basicAmt, discPercent) => {
    const discAmountValue = basicAmt * (discPercent / 100);
    setDiscAmount(discAmountValue || '');
    calculateNetValue(basicAmt, discAmountValue, taxAmount);
  };

  const calculateTaxAmount = (basicAmt, taxSlab) => {
    const taxAmountValue = basicAmt * (taxSlab / 100);
    setTaxAmount(taxAmountValue || '');
    calculateNetValue(basicAmt, discAmount, taxAmountValue);
  };

  const calculateNetValue = (basicAmt, discAmount, taxAmount) => {
    const netValueCalc = basicAmt - discAmount + taxAmount;
    setNetValue(netValueCalc || '');
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
            <input type="text" placeholder="Qty" value={qty} onChange={handleQtyChange} />
            <input type="text" placeholder="Alt Qty" />
            <input type="text" placeholder="Free" />
            <input type="text" placeholder="Per" />
            <input
              type="text"
              placeholder="Rate"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
            />
            <input
              type="text"
              placeholder="Disc %"
              value={discPercent}
              onChange={handleDiscPercentChange}
            />
            <input
              type="text"
              placeholder="Disc Amount"
              value={discAmount}
              readOnly
            />
            <input
              type="text"
              placeholder="Basic Amount"
              value={basicAmt}
              readOnly
            />
            <input
              type="text"
              placeholder="Tax Slab"
              value={taxSlab}
              onChange={(e) => setTaxSlab(e.target.value)}
            />
            <input
              type="text"
              placeholder="Tax Amount"
              value={taxAmount}
              readOnly
            />
            <input
              type="text"
              placeholder="Net Value"
              value={netValue}
              readOnly
            />
          </div>
        </div>

        <div className="charges-section">
          <label className="section-title">CHARGES</label>
          <div className="charges-inputs">
            <input type="text" placeholder="Remarks" />
            <input type="text" placeholder="On Value" />
            <input type="text" placeholder="@"/>
            <input type="text" placeholder="+ / -"/>
            <input type="text" placeholder="Amount"/>
            <button className="charges-btn" onClick={handleAddCharges}>+ Add</button>
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
      {showCashPage && <CashPage onClose={handleCloseCashPage} />} 
    </div>
  );
};

export default Sales;
