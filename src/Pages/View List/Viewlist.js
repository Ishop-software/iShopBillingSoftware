import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaCog, FaEdit, FaTrash, FaBook, FaInfoCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
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
 
  const navigate = useNavigate();

  const fetchAllProductItems = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/productitems/getAllProductItems', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}) 
      });
      const result = await response.json();
      if (result.success) {
        setProductItems(result.message);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error('Error fetching product items:', error);
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
          <button className='group'>Grap 1</button>
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
      <div className="parent-container">                    
      {filteredProductItems.map((element, index) => (
        <div className="textboxes" key={index}>
          <input type="checkbox" className="text1" />
          <input
            type="text"
            className="textitem"
            value={editingProductItem && editingProductItem.productItemId === element.productItemId ? editingProductItem.itemName : element.itemName || ''}
            placeholder="Product Name"
            onChange={(e) => setEditingProductItem({ ...editingProductItem, itemName: e.target.value })}
          />
          <input
            type="text"
            className="text3"
            value={editingProductItem && editingProductItem.productItemId === element.productItemId ? editingProductItem.shortName : element.shortName || ''}
            placeholder="Name"
            onChange={(e) => setEditingProductItem({ ...editingProductItem, shortName: e.target.value })}
          />
          <input
            type="text"
            className="text4"
            value={editingProductItem && editingProductItem.productItemId === element.productItemId ? editingProductItem.HSNCode : element.HSNCode || ''}
            placeholder=""
            onChange={(e) => setEditingProductItem({ ...editingProductItem, HSNCode: e.target.value })}
          />
          <input
            type="text"
            className="text5"
            value={editingProductItem && editingProductItem.productItemId === element.productItemId ? editingProductItem.taxSlab : element.taxSlab || ''}
            placeholder=""
            onChange={(e) => setEditingProductItem({ ...editingProductItem, taxSlab: e.target.value })}
          />
           <input
            type="text"
            className="textCompany"
            value={editingProductItem && editingProductItem.productItemId === element.productItemId ? editingProductItem.company : element.company || ''}
            placeholder=""
            onChange={(e) => setEditingProductItem({ ...editingProductItem, company: e.target.value })}
          />
           <input
            type="text"
            className="text7"
            value={editingProductItem && editingProductItem.productItemId === element.productItemId ? editingProductItem.group : element.group || ''}
            placeholder=""
            onChange={(e) => setEditingProductItem({ ...editingProductItem, group: e.target.value })}
          />
          <input
            type="text"
            className="text8"
            value={editingProductItem && editingProductItem.productItemId === element.productItemId ? editingProductItem.purchase : element.purchase || ''}
            placeholder=""
            onChange={(e) => setEditingProductItem({ ...editingProductItem, purchase: e.target.value })}
          />
          <input
            type="text"
            className="text12"
            value={editingProductItem && editingProductItem.productItemId === element.productItemId ? editingProductItem.salePrice : element.salePrice || ''}
            placeholder=""
            onChange={(e) => setEditingProductItem({ ...editingProductItem, salePrice: e.target.value })}
          />
           <input
            type="text"
            className="text13"
            value={editingProductItem && editingProductItem.productItemId === element.productItemId ? editingProductItem.mrp : element.mrp || ''}
            placeholder=""
            onChange={(e) => setEditingProductItem({ ...editingProductItem, mrp: e.target.value })}
          />
           <input
            type="text"
            className="text14"
            value={editingProductItem && editingProductItem.productItemId === element.productItemId ? editingProductItem.openingPck : element.openingPck || ''}
            placeholder=""
            onChange={(e) => setEditingProductItem({ ...editingProductItem, openingPck: e.target.value })}
          />
           <input
            type="text"
            className="text15"
            value={editingProductItem && editingProductItem.productItemId === element.productItemId ? editingProductItem.openingValue : element.openingValue || ''}
            placeholder=""
            onChange={(e) => setEditingProductItem({ ...editingProductItem, openingValue: e.target.value })}
          />
        
          <div className="text9">
            <FaEdit className="icon1" onClick={() => handleEdit(index)} />
          </div>
          <div className="text10">
            <FaTrash className="icon2" onClick={() => handleDeleteIconClick(element.productItemId)} />
          </div>
          <div className="text11">
            <FaBook className="icon3" onClick={() => handleCopy(index)} />
          </div>
          <div className="text16">
            <FaInfoCircle className="icon4" onClick={() => handleDetails(index)} />
          </div>
        </div>
      ))}
      {editingProductItem && (
        <div className="save-changes-container">
          <button className="btn save-changes" onClick={handleSaveChanges}>Save Changes</button>
        </div>
      )}
      <ExportPage show={showExportModal} onClose={() => setShowExportModal(false)} onExport={handleExport} />
      <ImportPage show={showImportModal} onClose={() => setShowImportModal(false)} onImport={handleImport} />
      <Setting show={showSettingModal} onClose={() => setShowSettingModal(false)} onSaveSettings={handleSaveSettings} />
 
      <SearchPage show={showSearchModal} onClose={() => setShowSearchModal(false)} onSearch={handleSearch} />
      <ConfirmDeleteModal
        show={showDeleteModal}
        onClose={handleCancelDelete}
        onDelete={handleDelete}
      />   
    </div>
    </div>
  );
}

export default Viewlist;