import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`backend-listfiy.vercel.app/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        // Store token and user info
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Redirect to dashboard
        navigate('/dashboard');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (error) {
      setError('An error occurred during login');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <nav className="navbar">
        <a href="/" className="logo">
          <div className="logo-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </div>
          <span className="logo-text">Listify</span>
        </a>
        <div className="nav-links">
          <a href="/about">About us</a>
          <a href="/contact">Contacts</a>
        </div>
      </nav>
      
      <div className="container">
        <div className="wave-background">
          <div className="wave"></div>
        </div>
        
        <div className="login-card">
          <h2 className="login-header">Login</h2>
          <p className="login-subheader">
            Welcome back! Sign in using your social account or email to continue us
          </p>
          
          <div className="social-login">
            <button className="social-btn" aria-label="Login with Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C18.34 21.21 22 17.06 22 12.06C22 6.53 17.5 2.04 12 2.04Z"/>
              </svg>
            </button>
            <button className="social-btn" aria-label="Login with Google">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" fill="#DB4437"/>
              </svg>
            </button>
            <button className="social-btn" aria-label="Login with Apple">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#000000">
                <path d="M12.005 2c-5.508 0-9.996 4.486-9.996 9.996 0 5.508 4.488 9.996 9.996 9.996 5.51 0 9.995-4.488 9.995-9.996 0-5.51-4.485-9.996-9.995-9.996zm0 18.992c-4.982 0-8.996-4.013-8.996-8.996 0-4.982 4.014-8.996 8.996-8.996 4.983 0 8.995 4.014 8.995 8.996 0 4.983-4.012 8.996-8.995 8.996zm-5.223-7.503h10.417c-.088-2.292-2.374-4.133-5.196-4.133-2.822 0-5.109 1.841-5.221 4.133zm4.559-5.975c.545-.36.41-1.162.164-1.162s-.708.802-1.253 1.162c-.545.359-.41 1.162-.164 1.162s.709-.803 1.253-1.162zm5.489 1.162c.246 0 .38-.803-.164-1.162s-.708-.803-1.253-1.162-.38.803.164 1.162 1.007.36 1.253 0z"/>
              </svg>
            </button>
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input 
                type="email" 
                name="email"
                className="form-control" 
                placeholder="Email" 
                value={formData.email}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="form-group">
              <input 
                type="password" 
                name="password"
                className="form-control" 
                placeholder="Password" 
                value={formData.password}
                onChange={handleChange}
                required 
              />
            </div>
            <button 
              type="submit" 
              className="login-btn"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;