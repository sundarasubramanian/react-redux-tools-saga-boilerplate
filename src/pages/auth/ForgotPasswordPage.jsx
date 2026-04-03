import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import AuthLayout from '../../components/Layout/AuthLayout';

function ForgotPasswordPage() {
  const { forgotPassword, loading, error, message, clearMessages } = useAuth();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    return () => clearMessages();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    forgotPassword({ email });
    setSubmitted(true);
  };

  return (
    <AuthLayout
      title="Forgot password?"
      subtitle="Enter your email and we'll send you a reset link"
    >
      {error && (
        <div className="alert alert-danger py-2 mb-3" role="alert">
          <i className="bi bi-exclamation-circle me-2" />
          {error}
        </div>
      )}
      {message && (
        <div className="alert alert-success py-2 mb-3" role="alert">
          <i className="bi bi-envelope-check me-2" />
          {message}
        </div>
      )}

      {!submitted || error ? (
        <form onSubmit={handleSubmit} noValidate>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" />
                Sending…
              </>
            ) : (
              'Send reset link'
            )}
          </button>
        </form>
      ) : (
        <div className="text-center py-2">
          <i
            className="bi bi-send-check-fill d-block mb-2"
            style={{ fontSize: 32, color: 'var(--color-primary)' }}
          />
          <p className="mb-0 small" style={{ color: 'var(--color-text-muted)' }}>
            Check your inbox. The link expires in 30 minutes.
          </p>
        </div>
      )}

      <p className="text-center mt-3 mb-0 small" style={{ color: 'var(--color-text-muted)' }}>
        <Link to="/login">
          <i className="bi bi-arrow-left me-1" />
          Back to sign in
        </Link>
      </p>
    </AuthLayout>
  );
}

export default ForgotPasswordPage;
