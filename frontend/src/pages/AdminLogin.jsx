import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, loading } = useAdminAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Invalid email or password');
    }
  };

  const handlePrefill = () => {
    setEmail('vrishasenafoundation@gmail.com');
    setPassword('adminvrishasena123');
    setError('');
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <div style={styles.header}>
          <a href="/">
            <img
              src="/static/website/assets/images/logo/logo.webp"
              alt="Vrishasena Foundation"
              style={styles.logo}
            />
          </a>
          <h2 style={styles.title}>Vrishasena Foundation</h2>
          <p style={styles.subtitle}>Admin Control Center &bull; Reg. No: 254/2026</p>
        </div>

        {error && (
          <div style={styles.errorBox}>
            <i className="ri-error-warning-fill" style={{ fontSize: '18px' }}></i>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Admin Email</label>
            <div style={styles.inputWrapper}>
              <i className="ri-mail-line" style={styles.inputIcon}></i>
              <input
                type="email"
                required
                placeholder="vrishasenafoundation@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <div style={styles.inputWrapper}>
              <i className="ri-lock-2-line" style={styles.inputIcon}></i>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.toggleBtn}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                <i className={showPassword ? 'ri-eye-off-line' : 'ri-eye-line'}></i>
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.submitBtn,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? (
              <span>
                <i className="ri-loader-4-line ri-spin" style={{ marginRight: '8px' }}></i>
                Signing In...
              </span>
            ) : (
              <span>
                Sign In to Dashboard <i className="ri-arrow-right-line" style={{ marginLeft: '6px' }}></i>
              </span>
            )}
          </button>
        </form>

        <div style={styles.footerHelp}>
          <button type="button" onClick={handlePrefill} style={styles.prefillBtn}>
            ⚡ Click to Fill Default Credentials (vrishasenafoundation@gmail.com)
          </button>
          <div style={{ marginTop: '14px' }}>
            <a href="/" style={styles.backLink}>
              <i className="ri-home-4-line"></i> Back to Live Website
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0c1427',
    backgroundImage: 'radial-gradient(at 0% 0%, rgba(0, 157, 255, 0.15) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(0, 157, 255, 0.1) 0px, transparent 50%)',
    padding: '20px',
    fontFamily: "'Inter', sans-serif",
  },
  card: {
    width: '100%',
    maxWidth: '460px',
    backgroundColor: '#ffffff',
    borderRadius: '20px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.35)',
    padding: '40px 36px',
    boxSizing: 'border-box',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '28px',
  },
  logo: {
    height: '52px',
    marginBottom: '16px',
    objectFit: 'contain',
  },
  title: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#0f172a',
    margin: '0 0 6px 0',
  },
  subtitle: {
    fontSize: '13px',
    color: '#64748b',
    margin: 0,
  },
  errorBox: {
    backgroundColor: '#fef2f2',
    color: '#dc2626',
    border: '1px solid #fee2e2',
    padding: '12px 16px',
    borderRadius: '10px',
    fontSize: '13px',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#334155',
  },
  inputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  inputIcon: {
    position: 'absolute',
    left: '14px',
    color: '#94a3b8',
    fontSize: '18px',
    pointerEvents: 'none',
  },
  input: {
    width: '100%',
    padding: '12px 14px 12px 42px',
    borderRadius: '10px',
    border: '1.5px solid #e2e8f0',
    fontSize: '14px',
    color: '#1e293b',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  },
  toggleBtn: {
    position: 'absolute',
    right: '12px',
    background: 'transparent',
    border: 'none',
    color: '#94a3b8',
    fontSize: '18px',
    cursor: 'pointer',
    padding: '4px',
  },
  submitBtn: {
    backgroundColor: '#009dff',
    color: '#ffffff',
    border: 'none',
    borderRadius: '10px',
    padding: '14px',
    fontSize: '15px',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 8px 20px rgba(0, 157, 255, 0.3)',
    marginTop: '6px',
    transition: 'background-color 0.2s, transform 0.1s',
  },
  footerHelp: {
    marginTop: '24px',
    textAlign: 'center',
    paddingTop: '18px',
    borderTop: '1px solid #f1f5f9',
  },
  prefillBtn: {
    background: '#f8fafc',
    border: '1px solid #cbd5e1',
    color: '#2563eb',
    fontSize: '12px',
    fontWeight: '600',
    padding: '8px 12px',
    borderRadius: '8px',
    cursor: 'pointer',
    width: '100%',
    transition: 'background 0.2s',
  },
  backLink: {
    color: '#64748b',
    fontSize: '13px',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    fontWeight: '500',
  },
};
