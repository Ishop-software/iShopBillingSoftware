// import React, { useState } from 'react';
// import { FaArrowLeft, FaCog, FaUser, FaEdit, FaTrash, FaBook } from 'react-icons/fa';
// import './salelist.css';

// function Salelist() {


//   const handleDelete = (index) => {
//     console.log(`Delete clicked for text box ${index}`);

//   };


//   return (
//     <div className="container">
//       <div className="salebuttons">
//         <button className="saletick">Tick</button>
//         <button className="salecharges">Charges Heading</button>
//         <button className="saleaccount">Account</button>
//         <button className="salepuls">+/-</button>
//         <button className="saleinput">Input As</button>
//         <button className="saleapply">Apply On</button>
//         <button className="salecal">Calculate @</button>
//         <button className="ro">R.O</button>
//         <button className="saletax">Tax</button>
//         <button className="saleslab">Slab</button>
//         <button className="salehsn">HSN Code</button>
//         <button className="saledelete">Delete</button>
//       </div>
//       {[1, 2, 3, 4, 5].map((_, index) => (
//         <div className="saletexts" key={index}>
//           <input type="checkbox" className="text-box1" />
//           <input type="text" className="text-box2" placeholder="Product Name" />
//           <input type="text" className="text-box3" placeholder="Name" />
//           <input type="text" className="text-box4" placeholder="" />
//           <input type="text" className="text-box5" placeholder="" />
//           <input type="text" className="text-box6" placeholder="" />
//           <input type="text" className="text-box7" placeholder="0" />
//           <input type="text" className="text-box8" placeholder="D" />
//           <input type="text" className="text-box9" placeholder="D" />
//           <input type="text" className="text-box10" placeholder="D" />
//           <input type="text" className="text-box11" placeholder="D" />
      
//           <div className="text-box12">
//             {/* <input type="text" placeholder="" /> */}
//             <FaTrash className="icon2" onClick={() => handleDelete(index + 1)} />
//           </div>
       
//         </div>
         
//       ))}
//     </div>
//   );
// }

// export default Salelist;



import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import './salelist.css';

function Salelist() {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    // Fetch data from the backend
    fetch('http://localhost:5000/api/sales')
      .then(response => response.json())
      .then(data => setSalesData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleDelete = (index) => {
    console.log(`Delete clicked for text box ${index}`);
    // Implement delete functionality here
  };

  return (
    <div className="container">
      <div className="salebuttons">
        <button className="saletick">Tick</button>
        <button className="salecharges">Charges Heading</button>
        <button className="saleaccount">Account</button>
        <button className="salepuls">+/-</button>
        <button className="saleinput">Input As</button>
        <button className="saleapply">Apply On</button>
        <button className="salecal">Calculate @</button>
        <button className="ro">R.O</button>
        <button className="saletax">Tax</button>
        <button className="saleslab">Slab</button>
        <button className="salehsn">HSN Code</button>
        <button className="saledelete">Delete</button>
      </div>

      {salesData.map((sale, index) => (
        <div className="saletexts" key={index}>
          <input type="checkbox" className="text-box1" />
          <input type="text" className="text-box2" placeholder="Product Name" value={sale.productName} readOnly />
          <input type="text" className="text-box3" placeholder="Name" value={sale.name} readOnly />
          <input type="text" className="text-box4" placeholder="" value={sale.otherFields[0] || ''} readOnly />
          <input type="text" className="text-box5" placeholder="" value={sale.otherFields[1] || ''} readOnly />
          <input type="text" className="text-box6" placeholder="" value={sale.otherFields[2] || ''} readOnly />
          <input type="text" className="text-box7" placeholder="0" value={sale.otherFields[3] || '0'} readOnly />
          <input type="text" className="text-box8" placeholder="D" value={sale.otherFields[4] || 'D'} readOnly />
          <input type="text" className="text-box9" placeholder="D" value={sale.otherFields[5] || 'D'} readOnly />
          <input type="text" className="text-box10" placeholder="D" value={sale.otherFields[6] || 'D'} readOnly />
          <input type="text" className="text-box11" placeholder="D" value={sale.otherFields[7] || 'D'} readOnly />
          <div className="text-box12">
            <FaTrash className="icon2" onClick={() => handleDelete(index)} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Salelist;
