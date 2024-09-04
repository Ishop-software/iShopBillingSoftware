
import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaCog, FaEdit, FaTrash, FaBook, FaInfoCircle } from 'react-icons/fa';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './ViewList.css';
import ExportPage from './Export/ExportPage';
import ImportPage from './Import/ImportPage';
import Setting from './Setting/Setting';
import SearchPage from './Search/SearchPage';
import ConfirmDeleteModal from './Delete/ConfirmDeleteModal';

function Viewlist() {
  const [showExportModal, setShowExportModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showSettingModal, setShowSettingModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [productItems, setProductItems] = useState([]);
  const [productData, setProductData] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteProductItemId, setDeleteProductItemId] = useState(null);
  const [editingProductItem, setEditingProductItem] = useState(null);
  const [searchCriteria, setSearchCriteria] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();


  const fetchAllProductItems = async () => {
    try {
        const token = localStorage.getItem('token');
        console.log('Retrieved Token:', token);
        if (!token) {
            console.warn('No token found. Authorization might be required.');
            alert('No token found. Please log in.');
            return;
        }

        const response = await fetch("http://localhost:5000/api/productitems/getAllProductItems", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        // Log the response details
        console.log('Response Status:', response.status);
        console.log('Response Headers:', response.headers);
        console.log('response:',Response);
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! Status: ${response.status}, Details: ${errorText}`);
        }
        const data = await response.json();
        // console.log('data:',data);
        setProductItems(data);
    } catch (error) {
        console.error("Error fetching product items:", error);
        // alert("An error occurred while fetching product items.");
        alert(`An error occurred while fetching product items: ${error.message}`);
    }
};

  const fetchProductItem = async (productItemId) => {
    try {
      const response = await fetch('http://localhost:5000/api/productitems/getProductItem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productItemId }),
      });


      console.log('Response Status:', response.status);
      console.log('Response Headers:', response.headers);
      
      const result = await response.json();
      if (result.success) {
        setProductData(result.message);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error('Error fetching product item:', error);
    }
  };

  useEffect(() => {
    fetchAllProductItems();
  }, []);

  const handleEdit = (index) => {
    const selectedProductItem = productItems[index];
    setEditingProductItem(selectedProductItem);
  };

  const handleDeleteIconClick = (productItemId) => {
    setDeleteProductItemId(productItemId);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/productitems/deleteProductItem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productItemId: deleteProductItemId }),
      });
      const result = await response.json();
      if (result.success) {
        setProductItems(productItems.filter(item => item.productItemId !== deleteProductItemId));
        console.log('Product deleted successfully');
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error('Error deleting product item:', error);
    }
    setShowDeleteModal(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleCopy = (index) => {
    const selectedProductItem = productItems[index];
    const productItemString = JSON.stringify(selectedProductItem, null, 2);
    navigator.clipboard.writeText(productItemString)
      .then(() => {
        console.log('Product item copied to clipboard');
      })
      .catch(err => {
        console.error('Failed to copy product item to clipboard:', err);
      });
  };

  const handleDetails = (index) => {
    navigate(`/details/Details/${index}`);
  };

  const handleExport = () => {
    console.log('Export button clicked');
    setShowExportModal(false);
  };

  const handleImport = () => {
    console.log('Import button clicked');
    setShowImportModal(false);
  };

  const handleSaveSettings = () => {
    console.log('Settings saved');
    setShowSettingModal(false);
  };

  const handleSearch = (criteria) => {
    setSearchCriteria(criteria);
  };

  const handleSearchButton = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
  };

  const filteredProductItems = productItems.filter(item => {
    const matchesSearchQuery = 
      item.itemName.toLowerCase().includes(searchQuery) || 
      item.shortName.toLowerCase().includes(searchQuery) || 
      item.HSNCode.toLowerCase().includes(searchQuery) ||
      item.company.toLowerCase().includes(searchQuery);
  
    return matchesSearchQuery && 
      (!searchCriteria.itemName || item.itemName.includes(searchCriteria.itemName)) &&
      (!searchCriteria.hsnCode || item.HSNCode.includes(searchCriteria.hsnCode)) &&
      (!searchCriteria.companyName || item.company.includes(searchCriteria.companyName)) &&
      (!searchCriteria.shortName || item.shortName.includes(searchCriteria.shortName)) &&
      (!searchCriteria.taxSlab || item.taxSlab.includes(searchCriteria.taxSlab)) &&
      (!searchCriteria.group || item.group.includes(searchCriteria.group)) &&
      (!searchCriteria.primaryUnit || item.primaryUnit.includes(searchCriteria.primaryUnit)) &&
      (!searchCriteria.salePriceRange || item.salesPrice >= searchCriteria.salePriceRange[0] && item.salesPrice <= searchCriteria.salePriceRange[1]) &&
      (!searchCriteria.mrpRange || item.mrp >= searchCriteria.mrpRange[0] && item.mrp <= searchCriteria.mrpRange[1]);
  });

  const handleProductIdChange = (productItemId) => {
    fetchProductItem(productItemId); 
  };

  const handleAddNewList = () => {
    navigate('/items'); 
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/productitems/updateProductItem', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingProductItem),
      });
      const result = await response.json();
      if (result.success) {
        setProductItems(productItems.map(item =>
          item.productItemId === editingProductItem.productItemId ? editingProductItem : item
        ));
        setEditingProductItem(null);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error('Error updating product item:', error);
    }
  };

  return (
    <div className="container">
      <div className="top-container">
        <h1 className='head'>List of items</h1>
        <div className="header-buttons">
          <button className="btn add-new" onClick={handleAddNewList}>Add New List</button>
          <button className="btn print">Print</button>
          <button className="btn app">App</button>
          <button className="btn sms-whatsapp">OR Code</button>
          <button className="btn export" onClick={() => setShowExportModal(true)}>Export</button>
          <button className="btn import" onClick={() => setShowImportModal(true)}>Import</button>
          <button className="btn search" onClick={() => setShowSearchModal(true)}>Search</button>
          <button className="btn setting" onClick={() => setShowSettingModal(true)}>Settings</button>
        </div>
        <div className="headbutton">
          <button className="tick">Tick</button>
          <button className="item">itemName</button>
          <button className="short">shortName</button>
          <button className="hsncode">HSN Code</button>
          <button className="tax">taxSlab</button>
          <button className="company">company</button>
          <button className='group'>Group 1</button>
          <button className="pchase">Purchase</button>
          <button className="sales">SalesPrice</button>
          <button className='mr'>MRP</button>
          <button className="opb">Op.Bal</button>
          <button className='opv'>Op.Val</button>
          <button className="Edit">Edit</button>
          <button className="Delete">Delete</button>
          <button className="Copy">Copy</button>
          <button className="Details">Details</button>
        </div>
      </div>

      <div className="list-container">
        {filteredProductItems.map((item, index) => (
          <div key={item.productItemId} className="list-item">
            <div className="list-item-content">
              <input type="checkbox" />
              <span>{item.itemName}</span>
              <span>{item.shortName}</span>
              <span>{item.HSNCode}</span>
              <span>{item.taxSlab}</span>
              <span>{item.company}</span>
              <span>{item.group}</span>
              <span>{item.purchase}</span>
              <span>{item.salesPrice}</span>
              <span>{item.MRP}</span>
              <span>{item.openingBalance}</span>
              <span>{item.openingValue}</span>
            </div>
            <div className="action-buttons">
              <button className="btn edit" onClick={() => handleEdit(index)}>
                <FaEdit />
              </button>
              <button className="btn delete" onClick={() => handleDeleteIconClick(item.productItemId)}>
                <FaTrash />
              </button>
              <button className="btn copy" onClick={() => handleCopy(index)}>
                <FaBook />
              </button>
              <button className="btn details" onClick={() => handleDetails(index)}>
                <FaInfoCircle />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      {showExportModal && <ExportPage onClose={() => setShowExportModal(false)} onExport={handleExport} />}
      {showImportModal && <ImportPage onClose={() => setShowImportModal(false)} onImport={handleImport} />}
      {showSettingModal && <Setting onClose={() => setShowSettingModal(false)} onSave={handleSaveSettings} />}
      {showSearchModal && <SearchPage onClose={() => setShowSearchModal(false)} onSearch={handleSearch} />}
      {showDeleteModal && (
        <ConfirmDeleteModal
          onConfirm={handleDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
}

export default Viewlist;
