import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './forgetPassword.css'; 
import logo from '../../../Images/logo.png'; 

const ForgetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); 
    const [userId, setUserId] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        
        const params = new URLSearchParams(window.location.search);
        const userIdFromParams = params.get('userId');
        if (userIdFromParams) {
            setUserId(userIdFromParams);
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError(null);
        setSuccessMessage('');

     
        if (newPassword.length > 8) {
            setError('Password must be at most 8 characters long');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        const payload = { password: newPassword, userId };

        try {
            const response = await fetch('http://localhost:5000/api/users/forgetPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message || 'Failed to update password');
                return;
            }

            const data = await response.json();
            setSuccessMessage('Password updated successfully');
            setNewPassword(''); 
            setConfirmPassword(''); 
            navigate('/'); 
        } catch (error) {
            console.error('Network error:', error); 
            setError('Network error. Please try again.');
        }
    };

    return (
        <div className="forget-password-container">
            <img src={logo} alt="Logo" className="logo" /> 
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit} className="forget-password-form">
               
                <input
                    type="text"
                    name="username"
                    value={userId}
                    readOnly
                    hidden
                    autoComplete="username"
                />

                {successMessage && <p className="success-message">{successMessage}</p>}
                {error && <p className="error-message">{error}</p>}
                <div className="form-group">
                    <label htmlFor="new-password">User New Password</label>
                    <input
                        type="password"
                        id="new-password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter user new password"
                        required
                        maxLength={8}
                        autoComplete="new-password"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input
                        type="password"
                        id="confirm-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm your new password"
                        required
                        maxLength={8}
                        autoComplete="new-password"
                    />
                </div>
                <button type="submit" className="update-button">Update Password</button>
                <div className="login-link">
                    <p>Remembered your password? <a href="/">Login here</a></p>
                </div>
            </form>
        </div>
    );
};

export default ForgetPassword;
