// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './AccountExportPage.css';

// const AccountExportPage = ({ show, onClose, accountDetails, onExport, token }) => {
//   const [selectedOption, setSelectedOption] = useState('all-accounts'); 
//   const [selectedAccounts, setSelectedAccounts] = useState(new Set());
//   const [loading, setLoading] = useState(false); 
//   const [error, setError] = useState(null); 

//   const fetchAllAccountDetails = async () => {
//     try {
//       setLoading(true);
//       console.log('Fetching account details with token:', token); 

//       const response = await fetch('http://localhost:5000/api/users/getAllAccountDetails', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': token 
//         },
//       });

//       console.log('Response status:', response.status); 

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`Error ${response.status}: ${response.statusText} - ${errorText}`);
//       }

//       const result = await response.json();
//       console.log('Fetched account details:', result); 

//       if (result.success && Array.isArray(result.data)) {
//         setSelectedAccounts(new Set(result.data.map(account => account.accountId)));
//       } else {
//         throw new Error('Data is not in the expected format');
//       }
//     } catch (error) {
//       setError(error.message);
//       console.error('Error fetching all account details:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (show) {
//       fetchAllAccountDetails();
//     }
//   }, [show]);

//   const handleExport = async () => {
//     try {
//       const exportData = {
//         exportType: selectedOption,
//         selectedAccounts: Array.from(selectedAccounts),
//       };

//       console.log('Export data:', exportData); 

//       const response = await axios.post('http://localhost:5000/api/exportDataIntoExcelInAccount', exportData, {
//         headers: {
//           'Authorization': token
//         },
//         responseType: 'blob',
//       });

//       console.log('Export response status:', response.status); 

      
//       const url = window.URL.createObjectURL(new Blob([response.data], { type: 'text/csv' }));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', 'accounts.csv'); 
//       document.body.appendChild(link);
//       link.click();
//       link.remove();

//       onExport();
//     } catch (error) {
//       console.error('Export failed', error);
//     }
//   };

//   const handleAccountSelection = (event) => {
//     const { value, checked } = event.target;
//     if (checked) {
//       setSelectedAccounts(prevSelected => new Set(prevSelected.add(value)));
//     } else {
//       setSelectedAccounts(prevSelected => {
//         const newSet = new Set(prevSelected);
//         newSet.delete(value);
//         return newSet;
//       });
//     }
//   };

//   if (!show) return null;

//   return (
//     <>
//       <div className="overlay" />
//       <div className="modal-container">
//         <div className="modal-content">
//           <div className="modal-header">
//             <h2 className='head2'>EXPORT ACCOUNTS</h2>
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
//                     checked={selectedOption === 'all-accounts'}
//                     onChange={() => setSelectedOption('all-accounts')}
//                   />
//                   All Accounts
//                 </label>
//                 <label>
//                   <input
//                     type="radio"
//                     name="export-accounts"
//                     value="selected-accounts"
//                     checked={selectedOption === 'selected-accounts'}
//                     onChange={() => setSelectedOption('selected-accounts')}
//                   />
//                   Selected Accounts Only
//                 </label>
//               </div>
//             </div>

//             {selectedOption === 'selected-accounts' && (
//               <div className="export-section">
//                 <h3>Select Accounts</h3>
//                 <div className="checkbox-container">
//                   {accountDetails.map(account => (
//                     <label key={account.accountId}>
//                       <input
//                         type="checkbox"
//                         value={account.accountId}
//                         onChange={handleAccountSelection}
//                       />
//                       {account.accountName}
//                     </label>
//                   ))}
//                 </div>
//               </div>
//             )}

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

// export default AccountExportPage;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './AccountExportPage.css';

// const AccountExportPage = ({ show, onClose, accountDetails, onExport, token }) => {
//   const [selectedOption, setSelectedOption] = useState('all-accounts');
//   const [selectedAccounts, setSelectedAccounts] = useState(new Set());
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

  
//   const fetchAllAccountDetails = async () => {
//     try {
//       setLoading(true);
//       console.log('Fetching account details with token:', token);

//       const response = await fetch('http://localhost:5000/api/users/getAllAccountDetails', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': token
//         },
//       });

//       console.log('Response status:', response.status);

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`Error ${response.status}: ${response.statusText} - ${errorText}`);
//       }

//       const result = await response.json();
//       console.log('Fetched account details:', result);

//       if (result.success && Array.isArray(result.data)) {
//         setSelectedAccounts(new Set(result.data.map(account => account.accountId)));
//       } else {
//         throw new Error('Data is not in the expected format');
//       }
//     } catch (error) {
//       setError(error.message);
//       console.error('Error fetching all account details:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (show) {
//       fetchAllAccountDetails();
//     }
//   }, [show]);

//   // Handle export functionality
//   const handleExport = async () => {
//     try {
//       const exportData = {
//         exportType: selectedOption,
//         selectedAccounts: Array.from(selectedAccounts),
//       };

//       console.log('Export data:', exportData);

//       const response = await axios.post('http://localhost:5000/api/exportDataIntoExcelInAccount', exportData, {
//         headers: {
//           'Authorization': token
//         },
//         responseType: 'blob', // Ensure we handle the response as a blob for file download
//       });

//       console.log('Export response status:', response.status);

//       // Create a downloadable link for the CSV file
//       const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', 'accounts.csv'); // CSV format as requested
//       document.body.appendChild(link);
//       link.click();
//       link.remove();

//       onExport(); // Callback after export
//     } catch (error) {
//       console.error('Export failed', error);
//     }
//   };

//   // Handle selection of individual accounts
//   const handleAccountSelection = (event) => {
//     const { value, checked } = event.target;
//     if (checked) {
//       setSelectedAccounts(prevSelected => new Set(prevSelected.add(value)));
//     } else {
//       setSelectedAccounts(prevSelected => {
//         const newSet = new Set(prevSelected);
//         newSet.delete(value);
//         return newSet;
//       });
//     }
//   };

//   if (!show) return null;

//   return (
//     <>
//       <div className="overlay" />
//       <div className="modal-container">
//         <div className="modal-content">
//           <div className="modal-header">
//             <h2 className='head2'>EXPORT ACCOUNTS</h2>
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
//                     checked={selectedOption === 'all-accounts'}
//                     onChange={() => setSelectedOption('all-accounts')}
//                   />
//                   All Accounts
//                 </label>
//                 <label>
//                   <input
//                     type="radio"
//                     name="export-accounts"
//                     value="selected-accounts"
//                     checked={selectedOption === 'selected-accounts'}
//                     onChange={() => setSelectedOption('selected-accounts')}
//                   />
//                   Selected Accounts Only
//                 </label>
//               </div>
//             </div>

//             {selectedOption === 'selected-accounts' && (
//               <div className="export-section">
//                 <h3>Select Accounts</h3>
//                 <div className="checkbox-container">
//                   {accountDetails.map(account => (
//                     <label key={account.accountId}>
//                       <input
//                         type="checkbox"
//                         value={account.accountId}
//                         onChange={handleAccountSelection}
//                       />
//                       {account.accountName}
//                     </label>
//                   ))}
//                 </div>
//               </div>
//             )}

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

// export default AccountExportPage;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AccountExportPage.css';

const AccountExportPage = ({ show, onClose, accountDetails, onExport, token }) => {
  const [selectedOption, setSelectedOption] = useState('all-accounts');
  const [selectedAccounts, setSelectedAccounts] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllAccountDetails = async () => {
    try {
      setLoading(true);
      console.log('Fetching account details with token:', token);

      const response = await fetch('http://localhost:5000/api/users/getAllAccountDetails', {
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
      console.log('Fetched account details:', result);

      if (result.success && Array.isArray(result.data)) {
        setSelectedAccounts(new Set(result.data.map(account => account.accountId)));
      } else {
        throw new Error('Data is not in the expected format');
      }
    } catch (error) {
      setError(error.message);
      console.error('Error fetching all account details:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (show) {
      fetchAllAccountDetails();
    }
  }, [show]);

  // Handle export functionality
  const handleExport = async () => {
    try {
      const exportData = {
        exportType: selectedOption,
        selectedAccounts: Array.from(selectedAccounts),
      };

      console.log('Export data:', exportData);

      const response = await axios.post('http://localhost:5000/api/exportDataIntoExcelInAccount', exportData, {
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        },
        responseType: 'blob', // Ensure we handle the response as a blob for file download
      });

      console.log('Export response status:', response.status);

      // Check if response is successful
      if (response.status === 200) {
        // Create a URL for the blob object
        const url = window.URL.createObjectURL(new Blob([response.data], { type: 'text/csv' }));

        // Create an anchor element and trigger the download
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'accounts.csv'); // Name of the file to be downloaded
        document.body.appendChild(link);
        link.click(); // Programmatically click the link to trigger the download
        link.remove(); // Clean up the DOM

        // Revoke the blob URL to free up memory
        window.URL.revokeObjectURL(url);

        onExport(); // Callback after export
      } else {
        throw new Error('Failed to export data');
      }
    } catch (error) {
      console.error('Export failed', error);
      setError('Export failed. Please try again.');
    }
  };

  // Handle selection of individual accounts
  const handleAccountSelection = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedAccounts(prevSelected => new Set(prevSelected.add(value)));
    } else {
      setSelectedAccounts(prevSelected => {
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
            <h2 className='head2'>EXPORT ACCOUNTS</h2>
            <button className="close-button" onClick={onClose}>X</button>
          </div>
          <div className="export-container">
            <div className="export-section">
              <h3 className='head3'>Export What..?</h3>
              <div className="checkbox-container">
                <label>
                  <input
                    type="radio"
                    name="export-accounts"
                    value="all-accounts"
                    checked={selectedOption === 'all-accounts'}
                    onChange={() => setSelectedOption('all-accounts')}
                  />
                  All Accounts
                </label>
                <label>
                  <input
                    type="radio"
                    name="export-accounts"
                    value="selected-accounts"
                    checked={selectedOption === 'selected-accounts'}
                    onChange={() => setSelectedOption('selected-accounts')}
                  />
                  Selected Accounts Only
                </label>
              </div>
            </div>

            {selectedOption === 'selected-accounts' && (
              <div className="export-section">
                <h3>Select Accounts</h3>
                <div className="checkbox-container">
                  {accountDetails.map(account => (
                    <label key={account.accountId}>
                      <input
                        type="checkbox"
                        value={account.accountId}
                        onChange={handleAccountSelection}
                      />
                      {account.accountName}
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

export default AccountExportPage;
