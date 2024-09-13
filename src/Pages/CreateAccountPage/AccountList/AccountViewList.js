import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaCog, FaEdit, FaTrash, FaBook } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './AccountViewList.css';
import AccountExportPage from './AccountExport/AccountExportPage';
import AccountImportPage from './AccountImport/AccountImportPage';

function AccountViewList() {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [accountDetails, setAccountDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingAccountDetails, setEditingAccountDetails] = useState(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [token, setToken] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      alert('No token found. Please log in again.');
      navigate('/login');
      return;
    }
    setToken(storedToken);
    fetchAllAccountDetails(storedToken);
  }, [navigate]);

  const fetchAllAccountDetails = async (token) => {
    try {
      const response = await fetch('http://localhost:5000/api/users/getAllAccountDetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token 
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${response.statusText} - ${errorText}`);
      }

      const result = await response.json();
      if (result.success && Array.isArray(result.data)) {
        setAccountDetails(result.data);
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

  const fetchAccountDetailsById = async (accountId) => {
    try {
      const response = await fetch('http://localhost:5000/api/users/getAccountDetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token 
        },
        body: JSON.stringify({ accountId }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${response.statusText} - ${errorText}`);
      }

      const result = await response.json();
      if (result.success) {
        return result.data;
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      setError(error.message);
      console.error('Error fetching account details by ID:', error);
    }
  };

  const handleEdit = (index) => {
    fetchAccountDetailsById(accountDetails[index].accountId).then(account => {
      setEditingAccountDetails(account);
    });
  };

  const handleDelete = async (index) => {
    const accountId = accountDetails[index].accountId;
    try {
      const response = await fetch('http://localhost:5000/api/users/deleteAccountDetails', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({ accountId }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${response.statusText} - ${errorText}`);
      }

      const result = await response.json();
      if (result.success) {
        setAccountDetails(prevDetails => prevDetails.filter((_, i) => i !== index));
        setSuccessMessage('Account deleted successfully!');
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      setError(error.message);
      console.error('Error deleting account details:', error);
    }
  };

  const handleSaveChanges = async () => {
    if (!editingAccountDetails) return;

    try {
      const response = await fetch('http://localhost:5000/api/users/updateAccountDetails', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token 
        },
        body: JSON.stringify(editingAccountDetails),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${response.statusText} - ${errorText}`);
      }

      const result = await response.json();
      if (result.success) {
        setAccountDetails(prevDetails => prevDetails.map(account =>
          account.accountId === editingAccountDetails.accountId ? editingAccountDetails : account
        ));
        setEditingAccountDetails(null);
        setSuccessMessage('Changes saved successfully!');
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      setError(error.message);
      console.error('Error updating account details:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingAccountDetails(prevDetails => ({ ...prevDetails, [name]: value }));
  };

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const handleAddNew = () => {
    navigate('/accountlist'); // Adjust the path to match your routing
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      <div className="navbar">
        <div className="navbar-left">
          <FaArrowLeft className="icon" />
          <div className="navbar-links">
            <a href="#account">Account</a>
            <a href="#sales">Sales</a>
            <a href="#purchase">Purchase</a>
            <a href="#pos">POS</a>
            <a href="#help">Help</a>
            <a href="#customize">Customize</a>
          </div>
        </div>
        <div className="navbar-center">
          <input type="text" placeholder="Search..." className="search-bar" />
        </div>
        <div className="navbar-right">
          <FaCog className="icon" />
          <select
            className="language-dropdown"
            value={selectedLanguage}
            onChange={handleLanguageChange}
          >
            <option value="English">EN</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="German">German</option>
          </select>
          <img className="profile-icon" src="./assets/Ellipse 1.jpg" alt="Profile" />
        </div>
      </div>
      <div className="header-container">
        <h1>ADDRESS BOOK</h1>
        <div className="header-buttons">
          <button className="btn add-new" onClick={handleAddNew}>Add New</button>
          <button className="btn print">Print</button>
          <button className="btn birthday-remainders">Birthday Reminders</button>
          <button className="btn app">App</button>
          <button className="btn sms-whatsapp">SMS/WhatsApp</button>
          <button className="btn export" onClick={() => setShowExportModal(true)}>Export</button>
          <button className="btn import" onClick={() => setShowImportModal(true)}>Import</button>
          <button className="btn search">Search</button>
        </div>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Account Name</th>
              <th>Group</th>
              <th>City</th>
              <th>Mobile</th>
              <th>Tax No</th>
              <th>Op. Bal</th>
              <th>DC</th>
              <th>Edit</th>
              <th>Delete</th>
              <th>Ledger</th>
            </tr>
          </thead>
          <tbody>
            {accountDetails.map((account, index) => (
              <tr key={account.accountId}>
                <td><input type="checkbox" /></td>
                <td>
                  <input
                    type="text"
                    name="name"
                    value={editingAccountDetails?.accountId === account.accountId ? editingAccountDetails.name : account.name}
                    readOnly={!editingAccountDetails || editingAccountDetails.accountId !== account.accountId}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="group"
                    value={editingAccountDetails?.accountId === account.accountId ? editingAccountDetails.group : account.group}
                    readOnly={!editingAccountDetails || editingAccountDetails.accountId !== account.accountId}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="city"
                    value={editingAccountDetails?.accountId === account.accountId ? editingAccountDetails.city : account.city}
                    readOnly={!editingAccountDetails || editingAccountDetails.accountId !== account.accountId}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="mobile"
                    value={editingAccountDetails?.accountId === account.accountId ? editingAccountDetails.mobile : account.mobile}
                    readOnly={!editingAccountDetails || editingAccountDetails.accountId !== account.accountId}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="taxNo"
                    value={editingAccountDetails?.accountId === account.accountId ? editingAccountDetails.taxNo : account.taxNo}
                    readOnly={!editingAccountDetails || editingAccountDetails.accountId !== account.accountId}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="openingBal"
                    value={editingAccountDetails?.accountId === account.accountId ? editingAccountDetails.openingBal : account.openingBal}
                    readOnly={!editingAccountDetails || editingAccountDetails.accountId !== account.accountId}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="dc"
                    value={editingAccountDetails?.accountId === account.accountId ? editingAccountDetails.dc : account.dc}
                    readOnly={!editingAccountDetails || editingAccountDetails.accountId !== account.accountId}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <button onClick={() => handleEdit(index)}><FaEdit /></button>
                </td>
                <td>
                  <button onClick={() => handleDelete(index)}><FaTrash /></button>
                </td>
                <td>
                  <button><FaBook /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {editingAccountDetails && (
          <div className="edit-actions">
            <button onClick={handleSaveChanges}>Save Changes</button>
            <button onClick={() => setEditingAccountDetails(null)}>Cancel</button>
          </div>
        )}
        {successMessage && <div className="success-message">{successMessage}</div>}
      </div>
      {showExportModal && 
        <AccountExportPage
          show={showExportModal}
          onClose={() => setShowExportModal(false)}
          accountDetails={accountDetails}
          onExport={() => setShowExportModal(false)}
          token={token} // Pass token to AccountExportPage
        />
      }
      {showImportModal && (
        <AccountImportPage
          show={showImportModal}
          onClose={() => setShowImportModal(false)}
          onImport={() => {
            setShowImportModal(false);
            fetchAllAccountDetails(token);
          }}
          token={token} // Pass token to AccountImportPage
        />
      )}
    </div>
  );
}

export default AccountViewList;



// import React, { useState, useEffect } from 'react';
// import { FaArrowLeft, FaCog, FaEdit, FaTrash, FaBook } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import './AccountViewList.css';
// import AccountExportPage from './AccountExport/AccountExportPage';
// import AccountImportPage from './AccountImport/AccountImportPage';

// function AccountViewList() {
//   const [selectedLanguage, setSelectedLanguage] = useState('English');
//   const [accountDetails, setAccountDetails] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [editingAccountDetails, setEditingAccountDetails] = useState(null);
//   const [showExportModal, setShowExportModal] = useState(false);
//   const [showImportModal, setShowImportModal] = useState(false);
//   const [token, setToken] = useState(null);
//   const [successMessage, setSuccessMessage] = useState('');

//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedToken = localStorage.getItem('token');
//     if (!storedToken) {
//       alert('No token found. Please log in again.');
//       navigate('/login');
//       return;
//     }
//     setToken(storedToken);
//     fetchAllAccountDetails(storedToken);
//   }, [navigate]);

//   const fetchAllAccountDetails = async (token) => {
//     try {
//       const response = await fetch('http://localhost:5000/api/users/getAllAccountDetails', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': token 
//         },
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`Error ${response.status}: ${response.statusText} - ${errorText}`);
//       }

//       const result = await response.json();
//       if (result.success && Array.isArray(result.data)) {
//         setAccountDetails(result.data);
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

//   const fetchAccountDetailsById = async (accountId) => {
//     try {
//       const response = await fetch('http://localhost:5000/api/users/getAccountDetails', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': token // Correct header format
//         },
//         body: JSON.stringify({ accountId }),
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`Error ${response.status}: ${response.statusText} - ${errorText}`);
//       }

//       const result = await response.json();
//       if (result.success) {
//         return result.data;
//       } else {
//         throw new Error(result.message);
//       }
//     } catch (error) {
//       setError(error.message);
//       console.error('Error fetching account details by ID:', error);
//     }
//   };

//   const handleEdit = (index) => {
//     fetchAccountDetailsById(accountDetails[index].accountId).then(account => {
//       setEditingAccountDetails(account);
//     });
//   };

//   const handleDelete = async (index) => {
//     const accountId = accountDetails[index].accountId;
//     try {
//       const response = await fetch('http://localhost:5000/api/users/deleteAccountDetails', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': token // Correct header format
//         },
//         body: JSON.stringify({ accountId }),
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`Error ${response.status}: ${response.statusText} - ${errorText}`);
//       }

//       const result = await response.json();
//       if (result.success) {
//         setAccountDetails(prevDetails => prevDetails.filter((_, i) => i !== index));
//       } else {
//         throw new Error(result.message);
//       }
//     } catch (error) {
//       setError(error.message);
//       console.error('Error deleting account details:', error);
//     }
//   };

//   const handleSaveChanges = async () => {
//     if (!editingAccountDetails) return;

//     try {
//       const response = await fetch('http://localhost:5000/api/users/updateAccountDetails', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': token // Correct header format
//         },
//         body: JSON.stringify(editingAccountDetails),
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`Error ${response.status}: ${response.statusText} - ${errorText}`);
//       }

//       const result = await response.json();
//       if (result.success) {
//         setAccountDetails(prevDetails => prevDetails.map(account =>
//           account.accountId === editingAccountDetails.accountId ? editingAccountDetails : account
//         ));
//         setEditingAccountDetails(null);
//         setSuccessMessage('Changes saved successfully!');
//       } else {
//         throw new Error(result.message);
//       }
//     } catch (error) {
//       setError(error.message);
//       console.error('Error updating account details:', error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEditingAccountDetails(prevDetails => ({ ...prevDetails, [name]: value }));
//   };

//   const handleLanguageChange = (e) => {
//     setSelectedLanguage(e.target.value);
//   };

//   const handleAddNew = () => {
//     navigate('/accountlist'); // Adjust the path to match your routing
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className="container">
//       <div className="navbar">
//         <div className="navbar-left">
//           <FaArrowLeft className="icon" />
//           <div className="navbar-links">
//             <a href="#account">Account</a>
//             <a href="#sales">Sales</a>
//             <a href="#purchase">Purchase</a>
//             <a href="#pos">POS</a>
//             <a href="#help">Help</a>
//             <a href="#customize">Customize</a>
//           </div>
//         </div>
//         <div className="navbar-center">
//           <input type="text" placeholder="Search..." className="search-bar" />
//         </div>
//         <div className="navbar-right">
//           <FaCog className="icon" />
//           <select
//             className="language-dropdown"
//             value={selectedLanguage}
//             onChange={handleLanguageChange}
//           >
//             <option value="English">EN</option>
//             <option value="Spanish">Spanish</option>
//             <option value="French">French</option>
//             <option value="German">German</option>
//           </select>
//           <img className="profile-icon" src="./assets/Ellipse 1.jpg" alt="Profile" />
//         </div>
//       </div>
//       <div className="header-container">
//         <h1>ADDRESS BOOK</h1>
//         <div className="header-buttons">
//           <button className="btn add-new" onClick={handleAddNew}>Add New</button>
//           <button className="btn print">Print</button>
//           <button className="btn birthday-remainders">Birthday Reminders</button>
//           <button className="btn app">App</button>
//           <button className="btn sms-whatsapp">SMS/WhatsApp</button>
//           <button className="btn export" onClick={() => setShowExportModal(true)}>Export</button>
//           <button className="btn import" onClick={() => setShowImportModal(true)}>Import</button>
//           <button className="btn search">Search</button>
//         </div>
//       </div>
//       <div className="table-container">
//         <table>
//           <thead>
//             <tr>
//               <th></th>
//               <th>Account Name</th>
//               <th>Group</th>
//               <th>City</th>
//               <th>Mobile</th>
//               <th>Tax No</th>
//               <th>Op. Bal</th>
//               <th>DC</th>
//               <th>Edit</th>
//               <th>Delete</th>
//               <th>Ledger</th>
//             </tr>
//           </thead>
//           <tbody>
//             {accountDetails.map((account, index) => (
//               <tr key={account.accountId}>
//                 <td><input type="checkbox" /></td>
//                 <td>
//                   <input
//                     type="text"
//                     name="name"
//                     value={editingAccountDetails?.accountId === account.accountId ? editingAccountDetails.name : account.name}
//                     readOnly={!editingAccountDetails || editingAccountDetails.accountId !== account.accountId}
//                     onChange={handleChange}
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     name="group"
//                     value={editingAccountDetails?.accountId === account.accountId ? editingAccountDetails.group : account.group}
//                     readOnly={!editingAccountDetails || editingAccountDetails.accountId !== account.accountId}
//                     onChange={handleChange}
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     name="city"
//                     value={editingAccountDetails?.accountId === account.accountId ? editingAccountDetails.city : account.city}
//                     readOnly={!editingAccountDetails || editingAccountDetails.accountId !== account.accountId}
//                     onChange={handleChange}
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     name="mobile"
//                     value={editingAccountDetails?.accountId === account.accountId ? editingAccountDetails.mobile : account.mobile}
//                     readOnly={!editingAccountDetails || editingAccountDetails.accountId !== account.accountId}
//                     onChange={handleChange}
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     name="taxNo"
//                     value={editingAccountDetails?.accountId === account.accountId ? editingAccountDetails.taxNo : account.taxNo}
//                     readOnly={!editingAccountDetails || editingAccountDetails.accountId !== account.accountId}
//                     onChange={handleChange}
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="number"
//                     name="openingBal"
//                     value={editingAccountDetails?.accountId === account.accountId ? editingAccountDetails.openingBal : account.openingBal}
//                     readOnly={!editingAccountDetails || editingAccountDetails.accountId !== account.accountId}
//                     onChange={handleChange}
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     name="dc"
//                     value={editingAccountDetails?.accountId === account.accountId ? editingAccountDetails.dc : account.dc}
//                     readOnly={!editingAccountDetails || editingAccountDetails.accountId !== account.accountId}
//                     onChange={handleChange}
//                   />
//                 </td>
//                 <td>
//                   <button onClick={() => handleEdit(index)}><FaEdit /></button>
//                 </td>
//                 <td>
//                   <button onClick={() => handleDelete(index)}><FaTrash /></button>
//                 </td>
//                 <td>
//                   <button><FaBook /></button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         {editingAccountDetails && (
//           <div className="edit-actions">
//             <button onClick={handleSaveChanges}>Save Changes</button>
//             <button onClick={() => setEditingAccountDetails(null)}>Cancel</button>
//           </div>
//         )}
//         {successMessage && <div className="success-message">{successMessage}</div>}
//       </div>
//       {showExportModal && 
//         <AccountExportPage
//           show={showExportModal}
//           onClose={() => setShowExportModal(false)}
//           accountDetails={accountDetails}
//           onExport={() => setShowExportModal(false)}
//           token={token} // Pass token to AccountExportPage
//         />
//       }
//       {showImportModal && (
//         <AccountImportPage
//           show={showImportModal}
//           onClose={() => setShowImportModal(false)}
//           onImport={() => {
//             setShowImportModal(false);
//             fetchAllAccountDetails(token);
//           }}
//           token={token} // Pass token to AccountImportPage
//         />
//       )}
//     </div>
//   );
// }

// export default AccountViewList;





// import React, { useState, useEffect } from 'react';
// import { FaArrowLeft, FaCog, FaEdit, FaTrash, FaBook } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import './AccountViewList.css';
// import AccountExportPage from './AccountExport/AccountExportPage';
// import AccountImportPage from './AccountImport/AccountImportPage';

// function AccountViewList() {
//     const [selectedLanguage, setSelectedLanguage] = useState('English');
//     const [accountDetails, setAccountDetails] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [editingAccountDetails, setEditingAccountDetails] = useState(null);
//     const [showExportModal, setShowExportModal] = useState(false);
//     const [showImportModal, setShowImportModal] = useState(false);
//     const [token, setToken] = useState(null);
//     const [successMessage, setSuccessMessage] = useState('');

//     const navigate = useNavigate();

//     useEffect(() => {
//         const storedToken = localStorage.getItem('token');
//         if (!storedToken) {
//             alert('No token found. Please log in again.');
//             navigate('/login');
//             return;
//         }
//         setToken(storedToken);
//         fetchAllAccountDetails(storedToken);
//     }, [navigate]);

//     const fetchAllAccountDetails = async (token) => {
//         try {
//             const response = await fetch('http://localhost:5000/api/users/getAllAccountDetails', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': token 
//                 },
//             });

//             if (!response.ok) {
//                 const errorText = await response.text();
//                 throw new Error(`Error ${response.status}: ${response.statusText} - ${errorText}`);
//             }

//             const result = await response.json();
//             if (result.success && Array.isArray(result.data)) {
//                 setAccountDetails(result.data);
//             } else {
//                 throw new Error('Data is not in the expected format');
//             }
//         } catch (error) {
//             setError(error.message);
//             console.error('Error fetching all account details:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const fetchAccountDetailsById = async (accountId) => {
//         try {
//             const response = await fetch('http://localhost:5000/api/users/getAccountDetails', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': token 
//                 },
//                 body: JSON.stringify({ accountId }),
//             });

//             if (!response.ok) {
//                 const errorText = await response.text();
//                 throw new Error(`Error ${response.status}: ${response.statusText} - ${errorText}`);
//             }

//             const result = await response.json();
//             if (result.success) {
//                 return result.data;
//             } else {
//                 throw new Error(result.message);
//             }
//         } catch (error) {
//             setError(error.message);
//             console.error('Error fetching account details by ID:', error);
//         }
//     };

//     const handleEdit = (index) => {
//         fetchAccountDetailsById(accountDetails[index].accountId).then(account => {
//             setEditingAccountDetails(account);
//         });
//     };

//     const handleDelete = async (index) => {
//         const accountId = accountDetails[index].accountId;
//         try {
//             const response = await fetch('http://localhost:5000/api/users/deleteAccountDetails', {
//                 method: 'DELETE', // Changed to DELETE
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': token
//                 },
//                 body: JSON.stringify({ accountId }),
//             });

//             if (!response.ok) {
//                 const errorText = await response.text();
//                 throw new Error(`Error ${response.status}: ${response.statusText} - ${errorText}`);
//             }

//             const result = await response.json();
//             if (result.success) {
//                 setAccountDetails(prevDetails => prevDetails.filter((_, i) => i !== index));
//                 setSuccessMessage('Account deleted successfully!');
//             } else {
//                 throw new Error(result.message);
//             }
//         } catch (error) {
//             setError(error.message);
//             console.error('Error deleting account details:', error);
//         }
//     };

//     const handleSaveChanges = async () => {
//         if (!editingAccountDetails) return;

//         try {
//             const response = await fetch('http://localhost:5000/api/users/updateAccountDetails', {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': token 
//                 },
//                 body: JSON.stringify(editingAccountDetails),
//             });

//             if (!response.ok) {
//                 const errorText = await response.text();
//                 throw new Error(`Error ${response.status}: ${response.statusText} - ${errorText}`);
//             }

//             const result = await response.json();
//             if (result.success) {
//                 setAccountDetails(prevDetails => prevDetails.map(account =>
//                     account.accountId === editingAccountDetails.accountId ? editingAccountDetails : account
//                 ));
//                 setEditingAccountDetails(null);
//                 setSuccessMessage('Changes saved successfully!');
//             } else {
//                 throw new Error(result.message);
//             }
//         } catch (error) {
//             setError(error.message);
//             console.error('Error updating account details:', error);
//         }
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setEditingAccountDetails(prevDetails => ({ ...prevDetails, [name]: value }));
//     };

//     const handleLanguageChange = (e) => {
//         setSelectedLanguage(e.target.value);
//     };

//     const handleAddNew = () => {
//         navigate('/accountlist'); // Adjust the path to match your routing
//     };

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div>Error: {error}</div>;
//     }

//     return (
//         <div className="container">
//             <div className="navbar">
//                 <div className="navbar-left">
//                     <FaArrowLeft className="icon" />
//                     <div className="navbar-links">
//                         <a href="#account">Account</a>
//                         <a href="#sales">Sales</a>
//                         <a href="#purchase">Purchase</a>
//                         <a href="#pos">POS</a>
//                         <a href="#help">Help</a>
//                         <a href="#customize">Customize</a>
//                     </div>
//                 </div>
//                 <div className="navbar-center">
//                     <input type="text" placeholder="Search..." className="search-bar" />
//                 </div>
//                 <div className="navbar-right">
//                     <FaCog className="icon" />
//                     <select
//                         className="language-dropdown"
//                         value={selectedLanguage}
//                         onChange={handleLanguageChange}
//                     >
//                         <option value="English">EN</option>
//                         <option value="Spanish">Spanish</option>
//                         <option value="French">French</option>
//                         <option value="German">German</option>
//                     </select>
//                     <img className="profile-icon" src="./assets/Ellipse 1.jpg" alt="Profile" />
//                 </div>
//             </div>
//             <div className="header-container">
//                 <h1>ADDRESS BOOK</h1>
//                 <div className="header-buttons">
//                     <button className="btn add-new" onClick={handleAddNew}>Add New</button>
//                     <button className="btn print">Print</button>
//                     <button className="btn birthday-remainders">Birthday Reminders</button>
//                     <button className="btn app">App</button>
//                     <button className="btn sms-whatsapp">SMS/WhatsApp</button>
//                     <button className="btn export" onClick={() => setShowExportModal(true)}>Export</button>
//                     <button className="btn import" onClick={() => setShowImportModal(true)}>Import</button>
//                     <button className="btn search">Search</button>
//                 </div>
//             </div>
//             <div className="table-container">
//                 <table>
//                     <thead>
//                         <tr>
//                             <th></th>
//                             <th>Account Name</th>
//                             <th>Group</th>
//                             <th>City</th>
//                             <th>Mobile</th>
//                             <th>Tax No</th>
//                             <th>Op. Bal</th>
//                             <th>DC</th>
//                             <th>Edit</th>
//                             <th>Delete</th>
//                             <th>Ledger</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {accountDetails.map((account, index) => (
//                             <tr key={account.accountId}>
//                                 <td><input type="checkbox" /></td>
//                                 <td>
//                                     <input
//                                         type="text"
//                                         name="name"
//                                         value={editingAccountDetails?.accountId === account.accountId ? editingAccountDetails.name : account.name}
//                                         readOnly={!editingAccountDetails || editingAccountDetails.accountId !== account.accountId}
//                                         onChange={handleChange}
//                                     />
//                                 </td>
//                                 <td>
//                                     <input
//                                         type="text"
//                                         name="group"
//                                         value={editingAccountDetails?.accountId === account.accountId ? editingAccountDetails.group : account.group}
//                                         readOnly={!editingAccountDetails || editingAccountDetails.accountId !== account.accountId}
//                                         onChange={handleChange}
//                                     />
//                                 </td>
//                                 <td>
//                                     <input
//                                         type="text"
//                                         name="city"
//                                         value={editingAccountDetails?.accountId === account.accountId ? editingAccountDetails.city : account.city}
//                                         readOnly={!editingAccountDetails || editingAccountDetails.accountId !== account.accountId}
//                                         onChange={handleChange}
//                                     />
//                                 </td>
//                                 <td>
//                                     <input
//                                         type="text"
//                                         name="mobile"
//                                         value={editingAccountDetails?.accountId === account.accountId ? editingAccountDetails.mobile : account.mobile}
//                                         readOnly={!editingAccountDetails || editingAccountDetails.accountId !== account.accountId}
//                                         onChange={handleChange}
//                                     />
//                                 </td>
//                                 <td>
//                                     <input
//                                         type="text"
//                                         name="taxNo"
//                                         value={editingAccountDetails?.accountId === account.accountId ? editingAccountDetails.taxNo : account.taxNo}
//                                         readOnly={!editingAccountDetails || editingAccountDetails.accountId !== account.accountId}
//                                         onChange={handleChange}
//                                     />
//                                 </td>
//                                 <td>
//                                     <input
//                                         type="number"
//                                         name="openingBal"
//                                         value={editingAccountDetails?.accountId === account.accountId ? editingAccountDetails.openingBal : account.openingBal}
//                                         readOnly={!editingAccountDetails || editingAccountDetails.accountId !== account.accountId}
//                                         onChange={handleChange}
//                                     />
//                                 </td>
//                                 <td>
//                                     <input
//                                         type="text"
//                                         name="dc"
//                                         value={editingAccountDetails?.accountId === account.accountId ? editingAccountDetails.dc : account.dc}
//                                         readOnly={!editingAccountDetails || editingAccountDetails.accountId !== account.accountId}
//                                         onChange={handleChange}
//                                     />
//                                 </td>
//                                 <td>
//                                     <button onClick={() => handleEdit(index)}><FaEdit /></button>
//                                 </td>
//                                 <td>
//                                     <button onClick={() => handleDelete(index)}><FaTrash /></button>
//                                 </td>
//                                 <td>
//                                     <button><FaBook /></button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//                 {editingAccountDetails && (
//                     <div className="edit-actions">
//                         <button onClick={handleSaveChanges}>Save Changes</button>
//                         <button onClick={() => setEditingAccountDetails(null)}>Cancel</button>
//                     </div>
//                 )}
//                 {successMessage && <div className="success-message">{successMessage}</div>}
//             </div>
//             {showExportModal && 
//                 <AccountExportPage
//                     show={showExportModal}
//                     onClose={() => setShowExportModal(false)}
//                     accountDetails={accountDetails}
//                     onExport={() => setShowExportModal(false)}
//                     token={token} // Pass token to AccountExportPage
//                 />
//             }
//             {showImportModal && (
//                 <AccountImportPage
//                     show={showImportModal}
//                     onClose={() => setShowImportModal(false)}
//                     onImport={() => {
//                         setShowImportModal(false);
//                         fetchAllAccountDetails(token);
//                     }}
//                     token={token} // Pass token to AccountImportPage
//                 />
//             )}
//         </div>
//     );
// }

// export default AccountViewList;


