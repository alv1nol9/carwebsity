<<<<<<< HEAD
import React, { useState } from 'react'
=======
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";
import GoogleAuthButton from "./GoogleAuthButton";

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
      }
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Create Account</h2>
      <GoogleAuthButton
        onSuccess={async credentialResponse => {
          setError("");
          setSuccess("");
          setLoading(true);
          try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/google`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ credential: credentialResponse.credential }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Google sign up failed");
            // Store JWT in localStorage or context as needed
            localStorage.setItem("token", data.token);
            setSuccess("Google sign up successful! Redirecting...");
            setTimeout(() => navigate("/"), 1200);
          } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        }}
        onError={() => {
          setError("Google sign up failed.");
        }}
        disabled={loading}
      />
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          disabled={loading}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          disabled={loading}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          disabled={loading}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
        {error && <p className="error-msg" role="alert">{error}</p>}
        {success && <p className="success-msg">{success}</p>}
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
>>>>>>> kerrei/main
