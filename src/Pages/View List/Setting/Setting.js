import React, { useState } from 'react';
import './Setting.css';

const Setting = ({ show, onClose, onSave }) => {
  const [settings, setSettings] = useState({
    serialNoTracking: true,
    salePriceCalculation: true,
    barcodePrefix: '',
    checkpoints: [
      { label: "Require Salt", value: true, writeAs: '' },
      { label: "Require Checkpoint 1", value: true, writeAs: '' },
      { label: "Require Checkpoint 2", value: true, writeAs: '' },
      { label: "Require Checkpoint 3", value: true, writeAs: '' },
      { label: "Require Checkpoint 4", value: true, writeAs: '' },
      { label: "Require Checkpoint 5", value: true, writeAs: '' },
      { label: "Maintain Critical Levels", value: true },
      { label: "Item Shortname Unique", value: true},
      { label: "Expand List of Items", value: true },
    ],
  });

  if (!show) {
    return null;
  }

  const toggleSetting = (key, index) => {
    if (key === 'checkpoints') {
      const updatedCheckpoints = [...settings.checkpoints];
      updatedCheckpoints[index].value = !updatedCheckpoints[index].value;
      setSettings({ ...settings, checkpoints: updatedCheckpoints });
    } else {
      setSettings({ ...settings, [key]: !settings[key] });
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">Settings</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <div className="setting-item">
            <span>Enable Serial No. Tracking</span>
            <div className="toggle-buttons">
              <button
                className={settings.serialNoTracking ? 'active' : ''}
                onClick={() => toggleSetting('serialNoTracking')}
              >
                ON
              </button>
              <button
                className={!settings.serialNoTracking ? 'active' : ''}
                onClick={() => toggleSetting('serialNoTracking')}
              >
                OFF
              </button>
              <button className="edit-button">&#9998;</button>
            </div>
          </div>
          <div className="setting-item">
            <span>Calculate Sale Price / MRP From Purchase Price</span>
            <div className="toggle-buttons">
              <button
                className={settings.salePriceCalculation ? 'active' : ''}
                onClick={() => toggleSetting('salePriceCalculation')}
              >
                ON
              </button>
              <button
                className={!settings.salePriceCalculation ? 'active' : ''}
                onClick={() => toggleSetting('salePriceCalculation')}
              >
                OFF
              </button>
              <button className="edit-button">&#9998;</button>
            </div>
          </div>
          <div className="setting-item">
            <span>Barcode Prefix</span>
            <input
              type="text"
              value={settings.barcodePrefix}
              onChange={(e) => setSettings({ ...settings, barcodePrefix: e.target.value })}
            />
          </div>
          <div className="setting-item">
            <span>Write As</span>
          </div>
          {settings.checkpoints.map((checkpoint, index) => (
            <div className="setting-item" key={index}>
              <span>{checkpoint.label}</span>
              <div className="toggle-buttons">
                <button
                  className={checkpoint.value ? 'active' : ''}
                  onClick={() => toggleSetting('checkpoints', index)}
                >
                  ON
                </button>
                <button
                  className={!checkpoint.value ? 'active' : ''}
                  onClick={() => toggleSetting('checkpoints', index)}
                >
                  OFF
                </button>
                {index < 5 && (
                  <input
                    type="text"
                    value={checkpoint.writeAs}
                    placeholder=""
                    onChange={(e) => {
                      const updatedCheckpoints = [...settings.checkpoints];
                      updatedCheckpoints[index].writeAs = e.target.value;
                      setSettings({ ...settings, checkpoints: updatedCheckpoints });
                    }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="modal-footer">
          <button className="save-button" onClick={onSave}>Submit Masters</button>
          <button className="additional-settings-button">Additional Settings</button>
        </div>
      </div>
    </div>
  );
};

export default Setting;
