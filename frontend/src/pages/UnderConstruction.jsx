import React from 'react';
import { Hammer, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function UnderConstruction({ pageName }) {
  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      textAlign: 'center',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      color: '#333'
    }}>
      <div style={{
        background: '#fff3e0',
        padding: '24px',
        borderRadius: '50%',
        marginBottom: '24px',
        color: '#f57c00'
      }}>
        <Hammer size={56} />
      </div>

      <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '12px', color: '#1a1a1a' }}>
        {pageName ? `${pageName} is Under Construction` : 'Page Under Construction'}
      </h1>

      <p style={{ fontSize: '1.1rem', color: '#666', maxWidth: '500px', marginBottom: '28px', lineHeight: '1.6' }}>
        This page has not been added yet and is currently being built. Send the HTML code or screenshot to build this exact page!
      </p>

      <Link
        to="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 24px',
          background: '#0d6efd',
          color: '#ffffff',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: '600',
          transition: 'background 0.2s'
        }}
      >
        <ArrowLeft size={18} />
        Back to Home
      </Link>
    </div>
  );
}
