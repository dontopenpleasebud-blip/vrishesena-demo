import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function VolunteerService() {
  const navigate = useNavigate();
  const [downloading, setDownloading] = useState(false);
  const [toast, setToast] = useState('');

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 4000);
  };

  const handleDownloadCertificate = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      showToast('🎉 Volunteer Certificate (VF-2026-VOL-084) generated and downloaded successfully!');
    }, 1200);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', color: '#1e293b', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Top Navbar */}
      <header style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        padding: '14px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/static/website/assets/images/logo/logo.webp" alt="Vrishasena" style={{ height: '48px', width: 'auto', objectFit: 'contain' }} />
          </a>
          <div>
            <span style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.3px' }}>
              Vrishasena Volunteer Portal
            </span>
            <span style={{ display: 'block', fontSize: '11px', color: '#16a34a', fontWeight: '700' }}>
              ● Verified Volunteer Account
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <a
            href="/"
            style={{
              fontSize: '13px',
              fontWeight: '600',
              color: '#64748b',
              textDecoration: 'none',
              padding: '6px 12px',
              borderRadius: '6px',
            }}
          >
            ← Back to Home
          </a>
          <button
            onClick={() => {
              navigate('/volunteer/volunteer_login');
            }}
            style={{
              backgroundColor: '#fee2e2',
              color: '#dc2626',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <i className="ri-logout-box-r-line"></i> Logout
          </button>
        </div>
      </header>

      {/* Main Content Container */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 20px' }}>
        
        {/* Profile Card Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #0c1427 0%, #1e293b 100%)',
          borderRadius: '16px',
          padding: '28px 32px',
          color: '#ffffff',
          boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.2)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px',
          marginBottom: '32px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: '#16a34a',
              color: '#ffffff',
              fontSize: '32px',
              fontWeight: '800',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 0 4px rgba(22, 163, 74, 0.2)'
            }}>
              RV
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>Ramesh Varma</h1>
                <span style={{
                  backgroundColor: 'rgba(34, 197, 94, 0.2)',
                  color: '#4ade80',
                  border: '1px solid #22c55e',
                  borderRadius: '20px',
                  fontSize: '11px',
                  fontWeight: '700',
                  padding: '3px 10px'
                }}>Active Volunteer</span>
              </div>
              <p style={{ margin: '6px 0 0', color: '#94a3b8', fontSize: '13px' }}>
                Volunteer ID: <strong style={{ color: '#f8fafc' }}>VF-2026-VOL-084</strong> &bull; Location: <strong>Vijayawada & Konaseema</strong>
              </p>
              <p style={{ margin: '4px 0 0', color: '#94a3b8', fontSize: '13px' }}>
                Email: volunteer@vrishasena.org &bull; Phone: +91 9951672673
              </p>
            </div>
          </div>

          <button
            onClick={handleDownloadCertificate}
            disabled={downloading}
            style={{
              backgroundColor: '#16a34a',
              color: '#ffffff',
              border: 'none',
              padding: '12px 20px',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 14px rgba(22, 163, 74, 0.4)',
              transition: 'all 0.2s ease'
            }}
          >
            <i className={downloading ? "ri-loader-4-line ri-spin" : "ri-award-fill"} style={{ fontSize: '18px' }}></i>
            <span>{downloading ? 'Generating Certificate...' : 'Download Volunteer Certificate'}</span>
          </button>
        </div>

        {/* Metric Counter Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px',
          marginBottom: '32px'
        }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '20px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <div style={{ color: '#64748b', fontSize: '13px', fontWeight: '600' }}>Service Hours Logged</div>
            <div style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a', margin: '6px 0' }}>48 Hours</div>
            <div style={{ color: '#16a34a', fontSize: '12px', fontWeight: '700' }}>↑ 12 hours this month</div>
          </div>

          <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '20px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <div style={{ color: '#64748b', fontSize: '13px', fontWeight: '600' }}>Drives Completed</div>
            <div style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a', margin: '6px 0' }}>14 Drives</div>
            <div style={{ color: '#0284c7', fontSize: '12px', fontWeight: '700' }}>Food & Animal Welfare</div>
          </div>

          <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '20px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <div style={{ color: '#64748b', fontSize: '13px', fontWeight: '600' }}>Beneficiaries Impacted</div>
            <div style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a', margin: '6px 0' }}>1,240+ People</div>
            <div style={{ color: '#eab308', fontSize: '12px', fontWeight: '700' }}>Direct community outreach</div>
          </div>

          <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '20px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <div style={{ color: '#64748b', fontSize: '13px', fontWeight: '600' }}>Recognition Level</div>
            <div style={{ fontSize: '28px', fontWeight: '800', color: '#7c3aed', margin: '6px 0' }}>Gold Tier</div>
            <div style={{ color: '#64748b', fontSize: '12px', fontWeight: '700' }}>Eligible for Leadership Award</div>
          </div>
        </div>

        {/* Assigned Community Drives Section */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', margin: 0 }}>Assigned Community Drives</h2>
              <p style={{ color: '#64748b', fontSize: '13px', margin: '4px 0 0' }}>Your scheduled outreach programs and active field initiatives.</p>
            </div>
            <button
              onClick={() => showToast('✅ You have registered interest for the upcoming Weekend Drive!')}
              style={{
                backgroundColor: '#0284c7',
                color: '#ffffff',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              + Register for New Drive
            </button>
          </div>

          {/* Drives List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 20px',
              backgroundColor: '#f8fafc',
              borderRadius: '10px',
              border: '1px solid #e2e8f0',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <div>
                <span style={{ backgroundColor: '#dcfce7', color: '#15803d', fontSize: '11px', fontWeight: '700', padding: '2px 8px', borderRadius: '4px' }}>
                  CONFIRMED &bull; UPCOMING
                </span>
                <h3 style={{ fontSize: '16px', fontWeight: '700', margin: '8px 0 4px', color: '#0f172a' }}>
                  Fight Hunger Food Distribution Drive
                </h3>
                <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>
                  <i className="ri-map-pin-line"></i> Vijayawada Central &bull; <i className="ri-calendar-line"></i> Sunday, 10:00 AM &bull; Coordinator: Dr. B. R. Ambedkar Team
                </p>
              </div>
              <button
                onClick={() => showToast('📍 Location GPS details sent to WhatsApp (+91 9951672673)!')}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #cbd5e1',
                  color: '#334155',
                  padding: '7px 14px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                View Dispatch Location
              </button>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 20px',
              backgroundColor: '#f8fafc',
              borderRadius: '10px',
              border: '1px solid #e2e8f0',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <div>
                <span style={{ backgroundColor: '#e0f2fe', color: '#0369a1', fontSize: '11px', fontWeight: '700', padding: '2px 8px', borderRadius: '4px' }}>
                  ANIMAL WELFARE
                </span>
                <h3 style={{ fontSize: '16px', fontWeight: '700', margin: '8px 0 4px', color: '#0f172a' }}>
                  Stray Dog Feeding & Reflective Collar Drive
                </h3>
                <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>
                  <i className="ri-map-pin-line"></i> P.Gannavaram & Rajahmundry &bull; <i className="ri-calendar-line"></i> Next Saturday, 7:30 AM
                </p>
              </div>
              <button
                onClick={() => showToast('📍 Location GPS details sent to WhatsApp (+91 9951672673)!')}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #cbd5e1',
                  color: '#334155',
                  padding: '7px 14px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                View Dispatch Location
              </button>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 20px',
              backgroundColor: '#f8fafc',
              borderRadius: '10px',
              border: '1px solid #e2e8f0',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <div>
                <span style={{ backgroundColor: '#f1f5f9', color: '#475569', fontSize: '11px', fontWeight: '700', padding: '2px 8px', borderRadius: '4px' }}>
                  COMPLETED &bull; VERIFIED
                </span>
                <h3 style={{ fontSize: '16px', fontWeight: '700', margin: '8px 0 4px', color: '#0f172a' }}>
                  Orphanage Educational Material Kit Handover
                </h3>
                <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>
                  <i className="ri-map-pin-line"></i> Konaseema District &bull; Logged: 6 Hours &bull; 120 Children Benefited
                </p>
              </div>
              <span style={{ color: '#16a34a', fontSize: '13px', fontWeight: '700' }}>
                <i className="ri-checkbox-circle-fill"></i> Hours Approved
              </span>
            </div>
          </div>
        </div>

      </main>

      {/* Floating Toast Notification */}
      {toast && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          backgroundColor: '#0f172a',
          color: '#ffffff',
          padding: '14px 22px',
          borderRadius: '10px',
          fontSize: '14px',
          fontWeight: '600',
          boxShadow: '0 10px 25px rgba(0,0,0,0.25)',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          borderLeft: '4px solid #16a34a',
        }}>
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
}
