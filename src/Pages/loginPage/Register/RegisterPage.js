import React, { useState } from 'react';
import './RegisterPage.css';
import axios from 'axios'; 
import logo from '../../../Images/logo.png'; 

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    email: "",
    password: "",
    mobileNo: "",
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const fullData = {
      ...formData,
      isFirstLogin: false,
      subscription: {
        planName: 'basic',
        isFreeTrial: true,
        isFreeTrialUsed: true,
        paymentFrequency: 'monthly',
        startDate: new Date().toLocaleDateString('en-GB'),
        endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toLocaleDateString('en-GB'),
        paymentDetails: {
          transactionId: '12345',
          amount: 500,
          currency: 'INR',
          paymentDate: new Date().toLocaleDateString('en-GB'),
        },
        paymentLogs: [],
      },
    };

    try {
      const response = await axios.post('http://localhost:5000/api/users/userRegister', fullData);

      if (response.data.success) {
        setShowSuccessMessage(true);
        setErrorMessage('');
        setFormData({
          name: "",
          companyName: "",
          email: "",
          password: "",
          mobileNo: "",
        });
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCloseMessage = () => {
    setShowSuccessMessage(false);
  };

  return (
    <div className="register-container">
      
      {showSuccessMessage && (
        <div className="success-message">
          Registration Successful
          <button onClick={handleCloseMessage} className="close-button">OK</button>
        </div>
      )}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {loading && <div className="loading-message">Loading...</div>}

      <img src={logo} alt=" " className="logo" />

      <div className="register-box">
        <div className="form-left">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label>Company Name</label>
              <input
                type="text"
                name="companyName"
                placeholder="Company Name"
                value={formData.companyName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </form>
        </div>
        <div className="form-right">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label>Mobile No</label>
              <input
                type="text"
                name="mobileNo"
                placeholder="Mobile No"
                value={formData.mobileNo}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="register-button" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;