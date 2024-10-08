import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './activation.css';
import logo from '../../../Images/logo.png'; 
import { getToken } from '../../../token'; 

const ActivationPage = () => {
    const [activationCode, setActivationCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [activationStatus, setActivationStatus] = useState('');

    const navigate = useNavigate();
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    const hardcodedActivationKey = queryParams.get('key');

    const globalToken = getToken();

    console.log('Activation Code:', activationCode);
    console.log('Hardcoded Activation Key:', hardcodedActivationKey);
    console.log('Global Token:', globalToken);
    console.log('Query Token:', token);

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        setActivationStatus('');

        setTimeout(() => {
            if (activationCode.trim() === hardcodedActivationKey.trim()) {
                
                navigate(`/home?token=${globalToken}`);
            } else {
               
                setActivationStatus('Invalid activation code. Please recheck the activation key sent by email.');
            }
            setLoading(false);
        }, 1000);
    };

    return (
        <>
            <img src={logo} alt="Logo" className="logo" />
            <div className="activation-page">
                <h2>CHECK ACTIVATION</h2>
                <form onSubmit={handleSubmit} className="activation-form">
                    <div className="form-group">
                        <label htmlFor="activation-code">Enter Code</label>
                        <input
                            type="text"
                            id="activation-code"
                            value={activationCode}
                            onChange={(e) => setActivationCode(e.target.value)}
                            placeholder="Enter your activation code"
                            required
                        />
                    </div>
                    <button type="submit" className="activate-button" disabled={loading}>
                        {loading ? 'Activating...' : 'Activate'}
                    </button>
                    {activationStatus && <p className="activation-status">{activationStatus}</p>}
                </form>
            </div>
        </>
    );
};

export default ActivationPage;
