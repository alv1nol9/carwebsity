import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/login.css';
import '../styles/loginVideo.css';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('✅ handleSubmit fired', form);
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      console.log('🌐 fetch complete:', res);

      const data = await res.json();
      console.log('📦 data:', data);

      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      localStorage.setItem('token', data.token);
      console.log('🔑 token set, navigating');
      navigate('/admin/add-car');
    } catch (err) {
      console.log('❌ error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
      console.log('🛑 done');
    }
  };

  return (
    <div className="login-container">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="login-background-video"
      >
        <source src="/e969871212acba4efa66ca28ed1e94d4_720w.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {error && <p className="error-msg" role="alert">{error}</p>}
      </form>
      <p style={{ marginTop: '1rem', textAlign: 'center' }}>
        New user? <Link to="/register">Create an account</Link>
      </p>
    </div>
  );
};

export default Login;
