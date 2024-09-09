import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

import './GroupEntry.css';

const GroupEntry = ({ onClose }) => {
  const [group, setGroup] = useState('');
  const [underGroup, setUnderGroup] = useState('');
  const [isPrimaryGroup, setIsPrimaryGroup] = useState(false);
  const [groupsList] = useState([
    { groupName: 'Bank Accounts' },
    { groupName: 'Bank O/D Account' },
    { groupName: 'Broker' },
    { groupName: 'Captial Account' },
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
    { groupName: 'SUspense Account' },
    { groupName: 'Unsecured Loans' },
  ]);
  const [tableData, setTableData] = useState([]);

  const handleSave = () => {
    const newRow = {
      group,
      underGroup,
      primary: isPrimaryGroup ? 'Yes' : 'No',
    };

    setTableData([...tableData, newRow]);

    // Reset form fields after saving
    setGroup('');
    setUnderGroup('');
    setIsPrimaryGroup(false);
  };

  const handleDelete = () => {
    // Remove the last added row from the table
    setTableData(tableData.slice(0, -1));
  };

  return (
    <div className="group-entry-overlay" onClick={onClose}>
      <div className="group-entry-modal" onClick={(e) => e.stopPropagation()}>
        <div className="header-container">
          <h2>ACCOUNT GROUP ENTRY</h2>
          <button className="close-button" onClick={onClose}>
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
                <td>{row.primary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GroupEntry;
