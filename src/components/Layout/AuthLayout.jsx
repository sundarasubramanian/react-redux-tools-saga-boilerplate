import React from 'react';

function AuthLayout({ children, title, subtitle }) {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: '100vh', background: 'var(--color-bg)' }}
    >
      <div className="w-100" style={{ maxWidth: 420, padding: '0 1rem' }}>
        {/* Brand */}
        <div className="text-center mb-4">
          <div
            className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
            style={{
              width: 52,
              height: 52,
              background: 'var(--color-primary)',
              fontSize: 24,
            }}
          >
            <i className="bi bi-layers-fill text-white" />
          </div>
          <h1 className="fs-4 fw-bold" style={{ color: 'var(--color-text)' }}>
            {title}
          </h1>
          {subtitle && (
            <p className="mb-0 mt-1" style={{ color: 'var(--color-text-muted)', fontSize: 14 }}>
              {subtitle}
            </p>
          )}
        </div>

        {/* Card */}
        <div
          className="card p-4 shadow"
          style={{ border: '1px solid var(--color-border)' }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
