import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL ;

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log({ email, password });

    if (!email || !password) {
      setErrorMessage('Please fill in both email and password.');
      return;
    }

    try {
      // Sending POST request to backend
      const response = await axios.post(`${API_URL}/login`, { email, password }, {
        headers: { 'Content-Type': 'application/json' },
      });

      // Store the token in local storage if login is successful
      localStorage.setItem('authToken', response.data.token);

      // Redirect user to the dashboard or any protected page
      navigate('/dashboard');

    } catch (err) {
      // Check if there's an error response and display a message
      if (err.response && err.response.status === 400) {
        setErrorMessage(err.response.data.message || 'Invalid email or password.');
      } else {
        setErrorMessage('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <h2>Login</h2>
        <form onSubmit={handleLogin} className={styles.form}>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.inputField}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.inputField}
            />
          </div>
          {errorMessage && <p className={styles.error}>{errorMessage}</p>}
          <button type="submit" className={styles.submitButton}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
