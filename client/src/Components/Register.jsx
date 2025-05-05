
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // ← import useNavigate
import './Register.css';

function Register() {
  const navigate = useNavigate();               // ← initialize navigate
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('backend-listfiy.vercel.app/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      
      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.error || `Status ${response.status}`);
      }

      const data = await response.json();
      console.log('Registration successful:', data);
      
      // Redirect to login page on success:
      navigate('/login', { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <header className="header">
        <div className="logo">
          <div className="logo-icon"></div>
          <h1>Listify</h1>
        </div>
        <nav className="nav">
          <a href="#about">About us</a>
          <a href="#contacts">Contacts</a>
        </nav>
      </header>

      <main className="main-content">
        <div className="register-card">
          <h2>Register</h2>
          <p className="subtitle">
            Welcome! Sign in using your social account or email to continue
          </p>

          <div className="social-login">
            <button className="social-btn facebook">
              <span className="fb-icon">f</span>
            </button>
            <button className="social-btn google">
              <span className="google-icon">G</span>
            </button>
            <button className="social-btn apple">
              <span className="apple-icon">⌘</span>
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
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
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            <button
              type="submit"
              className="register-button"
              disabled={loading}
            >
              {loading ? 'Registering…' : 'Register'}
            </button>
          </form>
        </div>
      </main>

      <div className="wave-background"></div>
    </div>
  );
}

export default Register;
