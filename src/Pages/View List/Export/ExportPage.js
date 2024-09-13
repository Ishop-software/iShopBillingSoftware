// import React, { useState } from 'react';
// import axios from 'axios';
// import './ExportPage.css';

// const ExportPage = ({ show, onClose, onExport }) => {
//   const [selectedOption, setSelectedOption] = useState('');

//   if (!show) return null;

//   const handleExport = async () => {
//     try {
//       const response = await axios.post('http://localhost:5000/api/export', 
//         { exportType: selectedOption }, {
//         responseType: 'blob', 
//       });

     
//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', 'accounts.xlsx'); 
//       document.body.appendChild(link);
//       link.click();
//       link.remove();

//       onExport();
//     } catch (error) {
//       console.error('Export failed', error);
//     }
//   };

//   return (
//     <>
//       <div className="overlay" />
//       <div className="modal-container">
//         <div className="modal-content">
//           <div className="modal-header">
//             <h2 className='head2'>EXPORT ITEMS</h2>
//             <button className="close-button" onClick={onClose}>X</button>
//           </div>
//           <div className="export-container">
//             <div className="export-section">
//               <h3 className='head3'>Export What..?</h3>
//               <div className="checkbox-container">
//                 <label>
//                   <input
//                     type="radio"
//                     name="export-accounts"
//                     value="all-accounts"
//                     onChange={() => setSelectedOption('all-accounts')}
//                   />
//                   All Accounts
//                 </label>
//                 <label>
//                   <input
//                     type="radio"
//                     name="export-accounts"
//                     value="selected-accounts"
//                     onChange={() => setSelectedOption('selected-accounts')}
//                   />
//                   Selected Accounts Only
//                 </label>
//               </div>
//             </div>
//             <div className="export-section">
//               <h3>Opening Balance</h3>
//               <div className="checkbox-container">
//                 <label>
//                   <input type="radio" name="opening-balance" value="pick-op-bal" />
//                   Pick Opening Balance
//                 </label>
//                 <label>
//                   <input type="radio" name="opening-balance" value="pick-cl-bal" />
//                   Pick Closing Balance
//                 </label>
//                 <label>
//                   <input type="radio" name="opening-balance" value="no-balance" />
//                   No Balance (0 Op.Bal)
//                 </label>
//               </div>
//             </div>
//           </div>
//           <button className="btn export-action" onClick={handleExport}>Export</button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ExportPage;








import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ExportPage.css';

const ItemExportPage = ({ show, onClose, itemDetails, onExport, token }) => {
  const [selectedOption, setSelectedOption] = useState('all-items');
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all item details
  const fetchAllItemDetails = async () => {
    try {
      setLoading(true);
      console.log('Fetching item details with token:', token);

      const response = await fetch('http://localhost:5000/api/exportProtuctItemData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${response.statusText} - ${errorText}`);
      }

      const result = await response.json();
      console.log('Fetched item details:', result);

      if (result.success && Array.isArray(result.data)) {
        setSelectedItems(new Set(result.data.map(item => item.itemId)));
      } else {
        throw new Error('Data is not in the expected format');
      }
    } catch (error) {
      setError(error.message);
      console.error('Error fetching all item details:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (show) {
      fetchAllItemDetails();
    }
  }, [show]);

  const handleExport = async () => {
    try {
      const exportData = {
        exportType: selectedOption,
        selectedItems: Array.from(selectedItems),
      };

      console.log('Export data:', exportData);

      const response = await axios.post('http://localhost:5000/api/productitems/getAllProductItems', exportData, {
        headers: {
          'Authorization': token
        },
        responseType: 'blob', 
      });

      console.log('Export response status:', response.status);

    
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'ISHOP/items.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();

      onExport();
    } catch (error) {
      console.error('Export failed', error);
    }
  };

  const handleItemSelection = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedItems(prevSelected => new Set(prevSelected.add(value)));
    } else {
      setSelectedItems(prevSelected => {
        const newSet = new Set(prevSelected);
        newSet.delete(value);
        return newSet;
      });
    }
  };

  if (!show) return null;

  return (
    <>
      <div className="overlay" />
      <div className="modal-container">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className='head2'>EXPORT ITEMS</h2>
            <button className="close-button" onClick={onClose}>X</button>
          </div>
          <div className="export-container">
            <div className="export-section">
              <h3 className='head3'>Export What..?</h3>
              <div className="checkbox-container">
                <label>
                  <input
                    type="radio"
                    name="export-items"
                    value="all-items"
                    checked={selectedOption === 'all-items'}
                    onChange={() => setSelectedOption('all-items')}
                  />
                  All Items
                </label>
                <label>
                  <input
                    type="radio"
                    name="export-items"
                    value="selected-items"
                    checked={selectedOption === 'selected-items'}
                    onChange={() => setSelectedOption('selected-items')}
                  />
                  Selected Items Only
                </label>
              </div>
            </div>

            {selectedOption === 'selected-items' && (
              <div className="export-section">
                <h3>Select Items</h3>
                <div className="checkbox-container">
                  {itemDetails.map(item => (
                    <label key={item.itemId}>
                      <input
                        type="checkbox"
                        value={item.itemId}
                        onChange={handleItemSelection}
                      />
                      {item.itemName}
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div className="export-section">
              <h3>Opening Balance</h3>
              <div className="checkbox-container">
                <label>
                  <input type="radio" name="opening-balance" value="pick-op-bal" />
                  Pick Opening Balance
                </label>
                <label>
                  <input type="radio" name="opening-balance" value="pick-cl-bal" />
                  Pick Closing Balance
                </label>
                <label>
                  <input type="radio" name="opening-balance" value="no-balance" />
                  No Balance (0 Op.Bal)
                </label>
              </div>
            </div>
          </div>
          <button className="btn export-action" onClick={handleExport}>Export</button>
        </div>
      </div>
    </>
  );
};

export default ItemExportPage;