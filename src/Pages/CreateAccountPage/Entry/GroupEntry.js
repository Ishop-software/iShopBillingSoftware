import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for API requests
import { FaTimes } from 'react-icons/fa';
import './GroupEntry.css';

const GroupEntry = ({ closeGroupEntry, onGroupUpdate }) => {
  const [group, setGroup] = useState('');
  const [underGroup, setUnderGroup] = useState('');
  const [isPrimaryGroup, setIsPrimaryGroup] = useState(false);
  const [groupsList, setGroupsList] = useState([]);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    // Fetching all group accounts from the backend
    const fetchGroupAccounts = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/groupaccounts/getAllGroupAccount');
        if (response.data.success) {
          setGroupsList([
            ...response.data.message,
            { groupName: 'Bank Accounts' },
            { groupName: 'Bank O/D Account' },
            { groupName: 'Broker' },
            { groupName: 'Capital Account' },
            { groupName: 'Cash-in-hand' },
            { groupName: 'Current Assets' },
            { groupName: 'Current Liabilities' },
            { groupName: 'CUSTOMERS' },
            { groupName: 'Duties & Taxes' },
            { groupName: 'Expenses(Dirsct/mfg.)' },
            { groupName: 'Expenses(Indirect/Admn.)' },
            { groupName: 'Fixed Assets' },
            { groupName: 'Income(Direct/Opr.)' },
            { groupName: 'Income(Indirect)' },
            { groupName: 'Investments' },
            { groupName: 'Loans & Advance(Asset)' },
            { groupName: 'Loans(Liability)' },
            { groupName: 'Pre-Operative Expenses' },
            { groupName: 'Profit & Loss' },
            { groupName: 'Provisions/Expenses payable' },
            { groupName: 'Purchase' },
            { groupName: 'Reserves & Surplus' },
            { groupName: 'Revenue Accounts' },
            { groupName: 'Sale' },
            { groupName: 'Secured Loans' },
            { groupName: 'Securities & Deposits(Asset)' },
            { groupName: 'SELF STOCK' },
            { groupName: 'Stock-in-hand' },
            { groupName: 'Sundry Creditors' },
            { groupName: 'Sundry Debtors' },
            { groupName: 'SUPPLIERS' },
            { groupName: 'Suspense Account' },
            { groupName: 'Unsecured Loans' },
          ]);
        } else {
          alert('Failed to fetch group accounts');
        }
      } catch (error) {
        console.error('Error fetching group accounts:', error);
        alert('Error fetching group accounts!');
      }
    };

    fetchGroupAccounts(); // Fetch group accounts on component mount
  }, []);

  const handleSave = async () => {
    const newRow = {
      group,
      underGroup,
      isPrimaryGroup,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/groupaccounts/addGroupAccount', newRow);

      if (response.data.success) {
        // Notify the parent component of the new group
        onGroupUpdate(group);

        // Reset form fields after saving
        setGroup('');
        setUnderGroup('');
        setIsPrimaryGroup(false);
        alert('Account Group Data Added Successfully!');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error saving group account:', error);
      alert('Internal Server Error!');
    }
  };

  const handleDelete = () => {
    // Remove the last added row from the table
    setTableData(tableData.slice(0, -1));
  };

  return (
    <div className="group-entry-overlay" onClick={closeGroupEntry}>
      <div className="group-entry-modal" onClick={(e) => e.stopPropagation()}>
        <div className="header-container">
          <h2>ACCOUNT GROUP ENTRY</h2>
          <button className="close-button" onClick={closeGroupEntry}>
            <FaTimes />
          </button>
        </div>
        <div className="form-item">
          <label htmlFor="group">Group</label>
          <input
            id="group"
            type="text"
            value={group}
            onChange={(e) => setGroup(e.target.value)}
            placeholder="Group"
          />
        </div>
        <div className="form-item">
          <label htmlFor="under-group">Under Group</label>
          <select
            id="under-group"
            value={underGroup}
            onChange={(e) => setUnderGroup(e.target.value)}
          >
            <option value="">Select Under Group</option>
            {groupsList.map((grp, index) => (
              <option key={index} value={grp.groupName}>
                {grp.groupName}
              </option>
            ))}
          </select>
        </div>
        <label className="primary-group">
          <input
            type="checkbox"
            checked={isPrimaryGroup}
            onChange={() => setIsPrimaryGroup(!isPrimaryGroup)}
          />
          This is a Primary Group
        </label>
        <div className="form-actions">
          <button className="btn save" onClick={handleSave}>Save</button>
          <button className="btn delete" onClick={handleDelete}>Delete</button>
        </div>
        <table className="info-table">
          <thead>
            <tr>
              <th>Group</th>
              <th>Under Group</th>
              <th>Primary</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                <td>{row.group}</td>
                <td>{row.underGroup}</td>
                <td>{row.isPrimaryGroup ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GroupEntry;
