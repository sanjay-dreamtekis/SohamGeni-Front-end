
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './Login.css'; // Import CSS file for styles

const Login: React.FC = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const [formData, setFormData] = useState({
    clientid: '',
    userid: '',
    mailid: '',
    password: '',
    otp: ''
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://192.168.29.169:8085/login/userlogin', formData);
      console.log(response.data);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleOTPVerification = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://your-server-url/verify-otp', {
        otp: formData.otp
      });
      console.log(response.data);
      setIsLoggedIn(true);
      // Redirect to Dashboard after successful OTP verification
      navigate('/dashboard');
    } catch (error) {
      console.error('OTP verification failed:', error);
    }
  };

  return (
    <div className="login-container">
      {isLoggedIn ? (
        <div>
          <h2>Enter OTP</h2>
          <form onSubmit={handleOTPVerification}>
            <div>
              <label>
                OTP:
                <input type="text" name="otp" value={formData.otp} onChange={handleChange} />
              </label>
            </div>
            <button type="submit">Verify</button>
          </form>
        </div>
      ) : (
        <div>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>
                Client ID:
                <input type="text" name="clientid" value={formData.clientid} onChange={handleChange} />
              </label>
            </div>
            <div>
              <label>
                User ID:
                <input type="text" name="userid" value={formData.userid} onChange={handleChange} />
              </label>
            </div>
          
            <div>
              <label>
                Password:
                <input type="password" name="password" value={formData.password} onChange={handleChange} />
              </label>
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
