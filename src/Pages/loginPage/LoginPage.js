import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import './login.css';
import { setToken } from '../../token';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [previousPassword, setPreviousPassword] = useState('');
    const [userId, setUserId] = useState('');

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const userIdFromParams = params.get('userId');
        if (userIdFromParams) {
            setUserId(userIdFromParams);
        } else {
            console.warn('User ID not found in URL');
        }
    }, [location.search]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError(null);

        if (password.length > 8) {
            setError('Password must be at most 8 characters long');
            return;
        }

        if (password === previousPassword) {
            setError('Password cannot be the same as the previous password');
            return;
        }

        const payload = { email, password };

        try {
            const response = await fetch('http://localhost:5000/api/users/userLogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('activationkey', data.activationkey);
                setToken(data.token);

                setSuccessMessage('Login successful!');

                setPreviousPassword(password);

                
                if (data.activationkey) {
                    
                    navigate(`/activation?token=${data.token}&key=${data.activationkey}`);
                } else {
                   
                    navigate(`/home?token=${data.token}`);
                }
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (error) {
            setError('Network error. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Login</h2>
                {successMessage && <p className="success-message">{successMessage}</p>}
                {error && <p className="error-message">{error}</p>}
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div className="form-group password-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                        maxLength={8}
                    />
                    <Link to={`/ForgetPassword?userId=${userId}`} className="forgot-password-link">Forgot Password?</Link>
                </div>
                <button className="login" type="submit">Login</button>
                <div className="register-link">
                    <p>Don't have an account? <Link to={`/register?userId=${userId}`}>Register here</Link></p>
                </div>
            </form>
        </div>
    );
};

export default Login;
