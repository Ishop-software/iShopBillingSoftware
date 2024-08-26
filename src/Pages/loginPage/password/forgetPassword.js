import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './forgetPassword.css'; 
import logo from '../../../Images/logo.png'; 

const ForgotPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [userId, setUserId] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();
    
    const userIdPlaceholder = 'user-id-placeholder'; 

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (newPassword.length > 8) {
            alert('Password must be at most 8 characters long');
            return;
        }

        const payload = { password: newPassword, userId: userId || userIdPlaceholder };

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
            setSuccessMessage(data.message);
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
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="user-id">User ID</label>
                    <input
                        type="text"
                        id="user-id"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        placeholder="Enter your user ID"
                        required
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

export default ForgotPassword;
