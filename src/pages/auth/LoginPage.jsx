import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import AuthLayout from '../../components/Layout/AuthLayout';

function LoginPage() {
  const { login, loading, error, clearMessages } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    return () => clearMessages();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(form);
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to your account">
      {error && (
        <div className="alert alert-danger py-2 mb-3" role="alert">
          <i className="bi bi-exclamation-circle me-2" />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* Email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label small fw-semibold">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="form-control"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <div className="d-flex justify-content-between align-items-center">
            <label htmlFor="password" className="form-label small fw-semibold mb-0">
              Password
            </label>
            <Link to="/forgot-password" className="small">
              Forgot password?
            </Link>
          </div>
          <div className="input-group mt-1">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              className="form-control"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}
              onClick={() => setShowPassword((v) => !v)}
              tabIndex={-1}
            >
              <i className={`bi bi-eye${showPassword ? '-slash' : ''}`} />
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100 mt-1"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" />
              Signing in…
            </>
          ) : (
            'Sign in'
          )}
        </button>
      </form>

      <p className="text-center mt-3 mb-0 small" style={{ color: 'var(--color-text-muted)' }}>
        Don't have an account?{' '}
        <Link to="/register">Create one</Link>
      </p>
    </AuthLayout>
  );
}

export default LoginPage;
