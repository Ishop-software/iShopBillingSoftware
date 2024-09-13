// import React, { useState } from 'react';
// import axios from 'axios'; 
// import './AccountImportPage.css';

// const AccountImportPage = ({ show, onClose, onImport, token }) => {
//   const [file, setFile] = useState(null);
//   const [fromRow, setFromRow] = useState('');
//   const [toRow, setToRow] = useState('');
//   const [importType, setImportType] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [successMessage, setSuccessMessage] = useState('');

//   if (!show) return null;

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//     console.log('File selected:', event.target.files[0]);
//   };

//   const handleImport = async () => {
//     if (!file) {
//       alert('Please select a file to upload.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('fromRow', fromRow);
//     formData.append('toRow', toRow);
//     formData.append('importType', importType);

//     console.log('FormData prepared:', {
//       file: file.name,
//       fromRow,
//       toRow,
//       importType,
//     });

//     setLoading(true);
//     setError(null);
//     setSuccessMessage('');

//     try {
//       console.log('Sending request to backend...');
//       const response = await axios.post('http://localhost:5000/api/importExcelDataInAccount', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           'Authorization': token // Pass the token in the Authorization header
//         },
//       });

//       console.log('Response received:', response.data);

//       if (response.data.success) {
//         setSuccessMessage(response.data.message || 'Data imported successfully.');
//         onImport(); // Callback after import
//       } else {
//         setError(response.data.message || 'Import failed. Please try again.');
//       }
//     } catch (error) {
//       console.error('Import failed', error);
//       setError('Import failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <div className="overlay" /> 
//       <div className="modal-container">
//         <div className="modal-content">
//           <div className="modal-header">
//             <h2 className="head5">IMPORT ITEMS MASTER FORM EXCEL</h2>
//             <button className="close-button" onClick={onClose}>X</button>
//           </div>
//           <div className="import-container">
//             <div className="step">
//               <h3 className="step-heading">Step 1</h3>
//               <div className="step-content">
//                 <input
//                   type="file"
//                   className="file-input1"
//                   onChange={handleFileChange}
//                 />
//                 <input
//                   type="text"
//                   placeholder="Enter file name..."
//                   className="file-input"
//                   readOnly
//                   value={file ? file.name : ''}
//                 />
//               </div>
//               <div className="row-number">
//                 <input
//                   type="number"
//                   placeholder="From row number"
//                   className="row-input"
//                   value={fromRow}
//                   onChange={(e) => setFromRow(e.target.value)}
//                 />
//                 <input
//                   type="number"
//                   placeholder="To row number"
//                   className="row-input"
//                   value={toRow}
//                   onChange={(e) => setToRow(e.target.value)}
//                 />
//               </div>
//             </div>

//             <div className="step">
//               <h3 className="step-heading">Step 2</h3>
//               <div className="step-content1">
//                 <label className="import-type2">
//                   <input
//                     type="radio"
//                     name="import-type"
//                     value="new"
//                     checked={importType === 'new'}
//                     onChange={() => setImportType('new')}
//                   />
//                   Import as all items are new from Excel Sheets
//                 </label>
//                 <label className="import-type2">
//                   <input
//                     type="radio"
//                     name="import-type"
//                     value="overwrite"
//                     checked={importType === 'overwrite'}
//                     onChange={() => setImportType('overwrite')}
//                   />
//                   Overwriting Existing items with new item details
//                 </label>
//               </div>
//             </div>

//             <div className="step">
//               <h3 className="step-heading">Step 3</h3>
//               <button className="btn import-btn" onClick={handleImport} disabled={loading}>
//                 {loading ? 'Importing...' : 'Import Data'}
//               </button>
//               {error && <p className="error-message">{error}</p>}
//               {successMessage && <p className="success-message">{successMessage}</p>}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AccountImportPage;





// import React, { useState, useEffect } from 'react';
// import axios from 'axios'; 
// import './AccountImportPage.css';

// const AccountImportPage = ({ show, onClose, onImport, token }) => {
//   const [file, setFile] = useState(null);
//   const [fromRow, setFromRow] = useState('');
//   const [toRow, setToRow] = useState('');
//   const [importType, setImportType] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [successMessage, setSuccessMessage] = useState('');

//   // Function to fetch all account details
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
//         // You might want to handle the result here if necessary
//         console.log('Account details fetched:', result.data);
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

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//     console.log('File selected:', event.target.files[0]);
//   };

//   const handleImport = async () => {
//     if (!file) {
//       alert('Please select a file to upload.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('fromRow', fromRow);
//     formData.append('toRow', toRow);
//     formData.append('importType', importType);

//     console.log('FormData prepared:', {
//       file: file.name,
//       fromRow,
//       toRow,
//       importType,
//     });

//     setLoading(true);
//     setError(null);
//     setSuccessMessage('');

//     try {
//       console.log('Sending request to backend...');
//       const response = await axios.post('http://localhost:5000/api/importExcelDataInAccount', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           'Authorization': token // Pass the token in the Authorization header
//         },
//       });

//       console.log('Response received:', response.data);

//       if (response.data.success) {
//         setSuccessMessage(response.data.message || 'Data imported successfully.');
//         onImport(); // Notify parent to refresh data
//         fetchAllAccountDetails(); // Fetch updated account details
//       } else {
//         setError(response.data.message || 'Import failed. Please try again.');
//       }
//     } catch (error) {
//       console.error('Import failed', error);
//       setError('Import failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <div className="overlay" /> 
//       <div className="modal-container">
//         <div className="modal-content">
//           <div className="modal-header">
//             <h2 className="head5">IMPORT ITEMS MASTER FORM EXCEL</h2>
//             <button className="close-button" onClick={onClose}>X</button>
//           </div>
//           <div className="import-container">
//             <div className="step">
//               <h3 className="step-heading">Step 1</h3>
//               <div className="step-content">
//                 <input
//                   type="file"
//                   className="file-input1"
//                   onChange={handleFileChange}
//                 />
//                 <input
//                   type="text"
//                   placeholder="Enter file name..."
//                   className="file-input"
//                   readOnly
//                   value={file ? file.name : ''}
//                 />
//               </div>
//               <div className="row-number">
//                 <input
//                   type="number"
//                   placeholder="From row number"
//                   className="row-input"
//                   value={fromRow}
//                   onChange={(e) => setFromRow(e.target.value)}
//                 />
//                 <input
//                   type="number"
//                   placeholder="To row number"
//                   className="row-input"
//                   value={toRow}
//                   onChange={(e) => setToRow(e.target.value)}
//                 />
//               </div>
//             </div>

//             <div className="step">
//               <h3 className="step-heading">Step 2</h3>
//               <div className="step-content1">
//                 <label className="import-type2">
//                   <input
//                     type="radio"
//                     name="import-type"
//                     value="new"
//                     checked={importType === 'new'}
//                     onChange={() => setImportType('new')}
//                   />
//                   Import as all items are new from Excel Sheets
//                 </label>
//                 <label className="import-type2">
//                   <input
//                     type="radio"
//                     name="import-type"
//                     value="overwrite"
//                     checked={importType === 'overwrite'}
//                     onChange={() => setImportType('overwrite')}
//                   />
//                   Overwrite existing items with new item details
//                 </label>
//               </div>
//             </div>

//             <div className="step">
//               <h3 className="step-heading">Step 3</h3>
//               <button className="btn import-btn" onClick={handleImport} disabled={loading}>
//                 {loading ? 'Importing...' : 'Import Data'}
//               </button>
//               {error && <p className="error-message">{error}</p>}
//               {successMessage && <p className="success-message">{successMessage}</p>}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AccountImportPage;



import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import './AccountImportPage.css';

const AccountImportPage = ({ show, onClose, onImport, token }) => {
  const [file, setFile] = useState(null);
  const [fromRow, setFromRow] = useState('');
  const [toRow, setToRow] = useState('');
  const [importType, setImportType] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Function to fetch all account details
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

      console.log('Response status for fetching account details:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${response.statusText} - ${errorText}`);
      }

      const result = await response.json();
      console.log('Fetched account details:', result);

      if (result.success && Array.isArray(result.data)) {
        console.log('Account details fetched:', result.data);
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

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    console.log('File selected:', event.target.files[0]);
  };

  const handleImport = async () => {
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('fromRow', fromRow);
    formData.append('toRow', toRow);
    formData.append('importType', importType);

    console.log('Preparing FormData with:', {
      file: file.name,
      fromRow,
      toRow,
      importType,
    });

    setLoading(true);
    setError(null);
    setSuccessMessage('');

    try {
      console.log('Sending request to backend...');
      const response = await axios.post('http://localhost:5000/api/importExcelDataInAccount', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': token // Pass the token in the Authorization header
        },
      });

      console.log('Response received from backend:', response.data);

      if (response.data.success) {
        setSuccessMessage(response.data.message || 'Data imported successfully.');
        console.log('Import successful:', response.data.message);
        onImport(); // Notify parent to refresh data
        fetchAllAccountDetails(); // Fetch updated account details
      } else {
        setError(response.data.message || 'Import failed. Please try again.');
        console.error('Import failed:', response.data.message);
      }
    } catch (error) {
      console.error('Import failed with error:', error);
      setError('Import failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="overlay" /> 
      <div className="modal-container">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="head5">IMPORT ITEMS MASTER FORM EXCEL</h2>
            <button className="close-button" onClick={onClose}>X</button>
          </div>
          <div className="import-container">
            <div className="step">
              <h3 className="step-heading">Step 1</h3>
              <div className="step-content">
                <input
                  type="file"
                  className="file-input1"
                  onChange={handleFileChange}
                />
                <input
                  type="text"
                  placeholder="Enter file name..."
                  className="file-input"
                  readOnly
                  value={file ? file.name : ''}
                />
              </div>
              <div className="row-number">
                <input
                  type="number"
                  placeholder="From row number"
                  className="row-input"
                  value={fromRow}
                  onChange={(e) => setFromRow(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="To row number"
                  className="row-input"
                  value={toRow}
                  onChange={(e) => setToRow(e.target.value)}
                />
              </div>
            </div>

            <div className="step">
              <h3 className="step-heading">Step 2</h3>
              <div className="step-content1">
                <label className="import-type2">
                  <input
                    type="radio"
                    name="import-type"
                    value="new"
                    checked={importType === 'new'}
                    onChange={() => setImportType('new')}
                  />
                  Import as all items are new from Excel Sheets
                </label>
                <label className="import-type2">
                  <input
                    type="radio"
                    name="import-type"
                    value="overwrite"
                    checked={importType === 'overwrite'}
                    onChange={() => setImportType('overwrite')}
                  />
                  Overwrite existing items with new item details
                </label>
              </div>
            </div>

            <div className="step">
              <h3 className="step-heading">Step 3</h3>
              <button className="btn import-btn" onClick={handleImport} disabled={loading}>
                {loading ? 'Importing...' : 'Import Data'}
              </button>
              {error && <p className="error-message">{error}</p>}
              {successMessage && <p className="success-message">{successMessage}</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountImportPage;
