import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { data, Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  useEffect(() => {
  if (localStorage.getItem('authToken')) {
    navigate('/'); // Redirect if already logged in
  }
}, []);


  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError('');

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
        email: loginData.email,
        password: loginData.password
      });

      // Store authentication data
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      
      // Redirect to home/dashboard
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      setLoginError(error.response?.data?.message || 'Login failed. Please try again.');
      // Clear any existing auth data on failure
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Welcome Back</h1>
        <p>Sign in to access your account</p>

        {loginError && <div className="alert error">{loginError}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>

          <button 
            type="submit" 
            className="submit-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;