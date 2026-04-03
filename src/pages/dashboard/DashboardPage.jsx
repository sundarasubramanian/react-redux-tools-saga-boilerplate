import React from 'react';
import { useAuth } from '../../hooks/useAuth';

function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)' }}>
      {/* Navbar */}
      <nav
        className="navbar px-4"
        style={{
          background: 'var(--color-surface)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <span className="navbar-brand fw-bold" style={{ color: 'var(--color-text)' }}>
          <i className="bi bi-layers-fill me-2" style={{ color: 'var(--color-primary)' }} />
          MyApp
        </span>
        <div className="d-flex align-items-center gap-3">
          <span className="small" style={{ color: 'var(--color-text-muted)' }}>
            {user?.email || 'user@example.com'}
          </span>
          <button
            className="btn btn-sm btn-outline-secondary"
            style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}
            onClick={logout}
          >
            <i className="bi bi-box-arrow-right me-1" />
            Sign out
          </button>
        </div>
      </nav>

      {/* Content */}
      <div className="container py-5">
        <div className="mb-4">
          <h2 className="fw-bold" style={{ color: 'var(--color-text)' }}>
            Dashboard
          </h2>
          <p style={{ color: 'var(--color-text-muted)' }}>
            Welcome back{user?.name ? `, ${user.name}` : ''}! You're now authenticated.
          </p>
        </div>

        {/* Stat cards */}
        <div className="row g-3">
          {[
            { icon: 'bi-shield-check-fill', label: 'Auth Status', value: 'Active', color: 'var(--color-primary)' },
            { icon: 'bi-cookie', label: 'Session', value: 'Cookie-based', color: '#58a6ff' },
            { icon: 'bi-lightning-charge-fill', label: 'State', value: 'Redux + Saga', color: '#f0883e' },
          ].map((card) => (
            <div key={card.label} className="col-sm-6 col-md-4">
              <div
                className="card p-3"
                style={{ border: '1px solid var(--color-border)' }}
              >
                <div className="d-flex align-items-center gap-3">
                  <div
                    className="d-flex align-items-center justify-content-center rounded"
                    style={{
                      width: 40,
                      height: 40,
                      background: `${card.color}22`,
                      color: card.color,
                      fontSize: 18,
                    }}
                  >
                    <i className={`bi ${card.icon}`} />
                  </div>
                  <div>
                    <p className="mb-0 small" style={{ color: 'var(--color-text-muted)' }}>
                      {card.label}
                    </p>
                    <p className="mb-0 fw-semibold" style={{ color: 'var(--color-text)' }}>
                      {card.value}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Placeholder */}
        <div
          className="card mt-4 p-4 text-center"
          style={{
            border: '1px dashed var(--color-border)',
            background: 'transparent',
          }}
        >
          <i
            className="bi bi-grid-1x2-fill mb-2"
            style={{ fontSize: 28, color: 'var(--color-text-muted)' }}
          />
          <p className="mb-0" style={{ color: 'var(--color-text-muted)' }}>
            Your feature pages go here
          </p>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
