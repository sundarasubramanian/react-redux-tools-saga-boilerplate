import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import AuthLayout from '../../components/Layout/AuthLayout';

function RegisterPage() {
  const { register, loading, error, message, clearMessages } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [clientError, setClientError] = useState(null);

  useEffect(() => {
    return () => clearMessages();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setClientError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      setClientError('Passwords do not match.');
      return;
    }
    if (form.password.length < 8) {
      setClientError('Password must be at least 8 characters.');
      return;
    }
    register({ name: form.name, email: form.email, password: form.password });
  };

  const displayError = clientError || error;

  return (
    <AuthLayout title="Create account" subtitle="Join us — it only takes a minute">
      {displayError && (
        <div className="alert alert-danger py-2 mb-3" role="alert">
          <i className="bi bi-exclamation-circle me-2" />
          {displayError}
        </div>
      )}
      {message && (
        <div className="alert alert-success py-2 mb-3" role="alert">
          <i className="bi bi-check-circle me-2" />
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* Name */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label small fw-semibold">
            Full name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="form-control"
            placeholder="Jane Smith"
            value={form.name}
            onChange={handleChange}
            required
            autoComplete="name"
          />
        </div>

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
          <label htmlFor="password" className="form-label small fw-semibold">
            Password
            <span className="ms-1 fw-normal" style={{ color: 'var(--color-text-muted)' }}>
              (min. 8 characters)
            </span>
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="form-control"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            required
            autoComplete="new-password"
          />
        </div>

        {/* Confirm password */}
        <div className="mb-3">
          <label htmlFor="confirm" className="form-label small fw-semibold">
            Confirm password
          </label>
          <input
            id="confirm"
            name="confirm"
            type="password"
            className="form-control"
            placeholder="••••••••"
            value={form.confirm}
            onChange={handleChange}
            required
            autoComplete="new-password"
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100 mt-1"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" />
              Creating account…
            </>
          ) : (
            'Create account'
          )}
        </button>
      </form>

      <p className="text-center mt-3 mb-0 small" style={{ color: 'var(--color-text-muted)' }}>
        Already have an account?{' '}
        <Link to="/login">Sign in</Link>
      </p>
    </AuthLayout>
  );
}

export default RegisterPage;
