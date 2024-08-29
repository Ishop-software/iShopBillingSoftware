import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [previousPassword, setPreviousPassword] = useState('');

    const navigate = useNavigate();

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

                setSuccessMessage(`Login successful! Activation Key: ${data.activationkey}&token=${data.token}`);

                setPreviousPassword(password);

               
                navigate(`/activation?token=${data.token}&key=${data.activationkey}`);
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
                    <a href="/ForgetPassword" className="forgot-password-link">Forgot Password?</a>
                </div>
                <button className="login" type="submit">Login</button>
                <div className="register-link">
                    <p>Don't have an account? <Link to="/register">Register here</Link></p>
                </div>
            </form>
        </div>
    );
};

export default Login;
