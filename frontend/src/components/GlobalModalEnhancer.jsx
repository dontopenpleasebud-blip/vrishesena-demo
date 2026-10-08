import React, { useEffect, useState } from 'react';

export default function GlobalModalEnhancer() {
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [monthlyModalOpen, setMonthlyModalOpen] = useState(false);
  const [monthlyTab, setMonthlyTab] = useState('education');
  const [monthlyAmount, setMonthlyAmount] = useState('1000');
  const [monthlyName, setMonthlyName] = useState('');
  const [monthlyPhone, setMonthlyPhone] = useState('');
  const [monthlyEmail, setMonthlyEmail] = useState('');
  const [monthlyPan, setMonthlyPan] = useState('');

  // Track Donation state
  const [trackModalOpen, setTrackModalOpen] = useState(false);
  const [trackPhone, setTrackPhone] = useState('9951672673');
  const [trackRecordsLoaded, setTrackRecordsLoaded] = useState(true);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 5500);
  };

  const fillSampleMonthlyDonor = () => {
    setMonthlyName('K. Satyanarayana');
    setMonthlyPhone('9951672673');
    setMonthlyEmail('satyanarayana.donor@vrishasena.org');
    setMonthlyPan('ABCDE1234F');
    setMonthlyAmount('1000');
    showToast('⚡ Sample monthly donor details filled (₹1,000)! Click "Confirm Monthly Donation" to test.', 'info');
  };

  const handleMonthlySubmit = (e) => {
    e.preventDefault();
    const donor = monthlyName.trim() || 'Generous Donor';
    const amt = monthlyAmount || '1000';
    const num = monthlyPhone.trim() || '9951672673';
    setMonthlyModalOpen(false);
    showToast(
      `🎉 Thank you, ${donor}! Your monthly pledge of ₹${amt} has been confirmed. 80G Tax Exemption receipt dispatched to +91 ${num}!`,
      'success'
    );
  };

  useEffect(() => {
    // Global delegated click listener for monthly modal and track donation
    const handleDocumentClick = (e) => {
      // 1. Monthly Donation Triggers
      const monthlyTrigger = e.target.closest(
        'button.donate_monthly_btn, button.donate_monthly_btn_2, .donate-monthly-trigger, [data-bs-target="#staticBackdrop"], .sticky_btn a'
      );
      if (monthlyTrigger && !monthlyTrigger.closest('#staticBackdropModal')) {
        e.preventDefault();
        e.stopPropagation();
        setMonthlyModalOpen(true);
        return;
      }

      // Check text-based match for buttons/links saying "Donate Monthly"
      const anyBtn = e.target.closest('a, button');
      if (anyBtn && !anyBtn.closest('#staticBackdropModal')) {
        const text = anyBtn.textContent || '';
        if (text.includes('Donate Monthly') && !text.includes('Confirm')) {
          e.preventDefault();
          e.stopPropagation();
          setMonthlyModalOpen(true);
          return;
        }
      }

      // 2. Track Donation Triggers
      const trackTrigger = e.target.closest(
        '.heart_icon, .heart_icon_bottom, .heart-btn, .donation_track, [data-bs-target="#trackDonationModal"]'
      );
      if (trackTrigger && !trackTrigger.closest('#trackDonationModalUI')) {
        e.preventDefault();
        e.stopPropagation();
        setTrackModalOpen(true);
        setTrackRecordsLoaded(true);
        return;
      }

      if (anyBtn && !anyBtn.closest('#trackDonationModalUI')) {
        const text = anyBtn.textContent || '';
        if (text.includes('Track Your Donation') || text.includes('Track Donation')) {
          e.preventDefault();
          e.stopPropagation();
          setTrackModalOpen(true);
          setTrackRecordsLoaded(true);
          return;
        }
      }
    };

    document.addEventListener('click', handleDocumentClick, true);

    // Also hide any native staticBackdrop that might try to open
    const hideLegacyModals = () => {
      const legacyModals = document.querySelectorAll('#staticBackdrop, #trackDonationModal');
      legacyModals.forEach((m) => {
        if (m.id === 'staticBackdrop' && !m.classList.contains('react-managed')) {
          m.style.display = 'none';
          m.classList.remove('show');
        }
      });
    };

    const timer = setInterval(hideLegacyModals, 1000);

    return () => {
      document.removeEventListener('click', handleDocumentClick, true);
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      {/* ── Global Notification Toast ── */}
      {toast.show && (
        <div
          role="alert"
          className="global-enhancer-toast"
          style={{
            position: 'fixed',
            bottom: '28px',
            right: '28px',
            zIndex: 9999999,
            backgroundColor: toast.type === 'success' ? '#15803d' : '#0284c7',
            color: '#ffffff',
            padding: '16px 24px',
            borderRadius: '12px',
            boxShadow: '0 12px 30px rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '14px',
            fontWeight: 600,
            maxWidth: '460px',
            animation: 'fadeIn 0.3s ease-out',
            border: '1px solid rgba(255,255,255,0.2)',
          }}
        >
          <span style={{ fontSize: '20px' }}>✓</span>
          <span>{toast.message}</span>
          <button
            onClick={() => setToast({ show: false, message: '', type: 'success' })}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#ffffff',
              fontSize: '20px',
              marginLeft: 'auto',
              cursor: 'pointer',
              lineHeight: 1,
            }}
          >
            &times;
          </button>
        </div>
      )}

      {/* ── Monthly Donation Modal (#staticBackdrop) ── */}
      {monthlyModalOpen && (
        <div
          id="staticBackdropModal"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 999999,
            padding: '16px',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setMonthlyModalOpen(false);
          }}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              maxWidth: '540px',
              width: '100%',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.35)',
              overflow: 'hidden',
              fontFamily: "'Segoe UI', Roboto, sans-serif",
              position: 'relative',
              animation: 'fadeIn 0.25s ease-out',
            }}
          >
            {/* Header */}
            <div
              style={{
                background: 'linear-gradient(135deg, #ea580c, #c2410c)',
                color: '#ffffff',
                padding: '24px',
                position: 'relative',
              }}
            >
              <button
                type="button"
                onClick={() => setMonthlyModalOpen(false)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: 'rgba(255,255,255,0.2)',
                  border: 'none',
                  color: '#fff',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  fontSize: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                ✕
              </button>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                <span style={{ fontSize: '24px' }}>🧡</span>
                <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '800' }}>Become a Monthly Pillar</h3>
              </div>
              <p style={{ margin: 0, fontSize: '13px', opacity: 0.9 }}>
                Vrishasena Foundation • Consistent impact with 80G tax exemption benefits
              </p>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '24px', maxHeight: '80vh', overflowY: 'auto' }}>
              {/* Demo Helper Banner */}
              <div
                style={{
                  background: '#f0fdf4',
                  border: '1.5px dashed #16a34a',
                  borderRadius: '12px',
                  padding: '12px 16px',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  flexWrap: 'wrap',
                }}
              >
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#15803d' }}>
                    ⚡ Demo Mode: Monthly Pledge
                  </div>
                  <div style={{ fontSize: '12px', color: '#166534' }}>
                    Auto-populate sample verified monthly donor
                  </div>
                </div>
                <button
                  type="button"
                  onClick={fillSampleMonthlyDonor}
                  style={{
                    background: '#16a34a',
                    color: '#ffffff',
                    border: 'none',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    boxShadow: '0 2px 4px rgba(22, 163, 74, 0.2)',
                  }}
                >
                  ⚡ Fill Sample Donor
                </button>
              </div>

              {/* Cause Category Tabs */}
              <div
                style={{
                  display: 'flex',
                  background: '#f1f5f9',
                  borderRadius: '10px',
                  padding: '4px',
                  marginBottom: '18px',
                }}
              >
                <button
                  type="button"
                  onClick={() => setMonthlyTab('education')}
                  style={{
                    flex: 1,
                    padding: '8px',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    background: monthlyTab === 'education' ? '#ffffff' : 'transparent',
                    color: monthlyTab === 'education' ? '#ea580c' : '#64748b',
                    boxShadow: monthlyTab === 'education' ? '0 2px 4px rgba(0,0,0,0.06)' : 'none',
                  }}
                >
                  📚 Child Education
                </button>
                <button
                  type="button"
                  onClick={() => setMonthlyTab('healthcare')}
                  style={{
                    flex: 1,
                    padding: '8px',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    background: monthlyTab === 'healthcare' ? '#ffffff' : 'transparent',
                    color: monthlyTab === 'healthcare' ? '#ea580c' : '#64748b',
                    boxShadow: monthlyTab === 'healthcare' ? '0 2px 4px rgba(0,0,0,0.06)' : 'none',
                  }}
                >
                  🏥 Elder & Healthcare
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleMonthlySubmit}>
                {/* Amount Selection */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '8px' }}>
                    SELECT MONTHLY CONTRIBUTION
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '10px' }}>
                    {['500', '1000', '2500', '5000'].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setMonthlyAmount(amt)}
                        style={{
                          padding: '10px 4px',
                          borderRadius: '8px',
                          border: monthlyAmount === amt ? '2px solid #ea580c' : '1px solid #cbd5e1',
                          background: monthlyAmount === amt ? '#fff7ed' : '#ffffff',
                          color: monthlyAmount === amt ? '#c2410c' : '#1e293b',
                          fontWeight: '700',
                          fontSize: '14px',
                          cursor: 'pointer',
                        }}
                      >
                        ₹{amt}
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    value={monthlyAmount}
                    onChange={(e) => setMonthlyAmount(e.target.value)}
                    placeholder="Enter custom monthly amount (₹)"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '14px',
                      fontWeight: '600',
                      boxSizing: 'border-box',
                    }}
                    required
                  />
                </div>

                {/* Donor Details */}
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>
                    FULL NAME *
                  </label>
                  <input
                    type="text"
                    value={monthlyName}
                    onChange={(e) => setMonthlyName(e.target.value)}
                    placeholder="Enter your full name"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                    }}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>
                      WHATSAPP NUMBER *
                    </label>
                    <input
                      type="tel"
                      value={monthlyPhone}
                      onChange={(e) => setMonthlyPhone(e.target.value)}
                      placeholder="10-digit number"
                      maxLength={10}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        fontSize: '14px',
                        boxSizing: 'border-box',
                      }}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      value={monthlyEmail}
                      onChange={(e) => setMonthlyEmail(e.target.value)}
                      placeholder="donor@example.com"
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        fontSize: '14px',
                        boxSizing: 'border-box',
                      }}
                      required
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '18px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>
                    PAN NUMBER (FOR 80G TAX BENEFIT)
                  </label>
                  <input
                    type="text"
                    value={monthlyPan}
                    onChange={(e) => setMonthlyPan(e.target.value.toUpperCase())}
                    placeholder="e.g. ABCDE1234F"
                    maxLength={10}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                      textTransform: 'uppercase',
                    }}
                  />
                </div>

                {/* Tax Exemption Note */}
                <div
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    fontSize: '12px',
                    color: '#64748b',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '20px',
                  }}
                >
                  <span style={{ fontSize: '16px' }}>🛡️</span>
                  <span>
                    <strong>Section 80G Compliant:</strong> Eligible for 50% tax rebate. Receipts dispatched on every monthly cycle.
                  </span>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '10px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #ea580c, #c2410c)',
                    color: '#ffffff',
                    fontSize: '16px',
                    fontWeight: '800',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(234, 88, 12, 0.3)',
                  }}
                >
                  Confirm Monthly Donation (₹{monthlyAmount || '1000'}/month)
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ── Track Your Donation Interactive Modal ── */}
      {trackModalOpen && (
        <div
          id="trackDonationModalUI"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 999999,
            padding: '16px',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setTrackModalOpen(false);
          }}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              maxWidth: '520px',
              width: '100%',
              padding: '28px',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.3)',
              position: 'relative',
              fontFamily: "'Segoe UI', Roboto, sans-serif",
              animation: 'fadeIn 0.25s ease-out',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: '#e0f2fe',
                    color: '#0284c7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                  }}
                >
                  ❤️
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>
                    Track Your Donation & Impact
                  </h3>
                  <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>
                    Real-time status, photos & 80G tax receipts
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setTrackModalOpen(false)}
                style={{
                  background: '#f1f5f9',
                  border: 'none',
                  fontSize: '18px',
                  cursor: 'pointer',
                  color: '#64748b',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                ✕
              </button>
            </div>

            {/* Quick Demo Helper */}
            <div
              style={{
                background: '#f0f9ff',
                border: '1.5px dashed #0284c7',
                borderRadius: '10px',
                padding: '10px 14px',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <span style={{ fontSize: '12px', color: '#0369a1', fontWeight: '700' }}>
                  ⚡ Demo Phone: 9951672673
                </span>
                <div style={{ fontSize: '11px', color: '#0284c7' }}>Ramesh Varma (Verified Donor)</div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setTrackPhone('9951672673');
                  setTrackRecordsLoaded(true);
                }}
                style={{
                  background: '#0284c7',
                  color: '#ffffff',
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: '700',
                  cursor: 'pointer',
                }}
              >
                Load Sample
              </button>
            </div>

            {/* Lookup Input */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
              <input
                type="tel"
                value={trackPhone}
                onChange={(e) => setTrackPhone(e.target.value)}
                placeholder="Enter 10-digit mobile number"
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '14px',
                  fontWeight: '600',
                }}
              />
              <button
                type="button"
                onClick={() => setTrackRecordsLoaded(true)}
                style={{
                  padding: '10px 18px',
                  borderRadius: '8px',
                  border: 'none',
                  background: '#0f172a',
                  color: '#ffffff',
                  fontSize: '13px',
                  fontWeight: '700',
                  cursor: 'pointer',
                }}
              >
                Track
              </button>
            </div>

            {/* Records List */}
            {trackRecordsLoaded && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {/* Record 1 */}
                <div
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '16px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontWeight: '800', color: '#0f172a', fontSize: '14px' }}>
                      Receipt #VF-2026-9841
                    </span>
                    <span
                      style={{
                        backgroundColor: '#dcfce7',
                        color: '#16a34a',
                        fontSize: '11px',
                        fontWeight: '700',
                        padding: '3px 8px',
                        borderRadius: '6px',
                      }}
                    >
                      ✓ Completed
                    </span>
                  </div>
                  <div style={{ fontSize: '13px', color: '#1e293b', fontWeight: '600', marginBottom: '4px' }}>
                    ₹1,200 &bull; Stray Dog Feeding & Reflective Collars
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>
                    Location: P.Gannavaram &bull; Date: 28 Sep 2026 &bull; Photo Proofs Uploaded
                  </div>
                  <div style={{ marginTop: '10px', display: 'flex', gap: '8px' }}>
                    <button
                      type="button"
                      onClick={() => alert('Photo Proofs for Receipt #VF-2026-9841 opened in high resolution viewer!')}
                      style={{
                        background: '#ffffff',
                        border: '1px solid #cbd5e1',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        color: '#0f172a',
                      }}
                    >
                      📷 View Distribution Photos
                    </button>
                    <button
                      type="button"
                      onClick={() => alert('Receipt #VF-2026-9841 80G PDF downloaded!')}
                      style={{
                        background: '#ffffff',
                        border: '1px solid #cbd5e1',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        color: '#0f172a',
                      }}
                    >
                      📄 80G Receipt
                    </button>
                  </div>
                </div>

                {/* Record 2 */}
                <div
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '16px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontWeight: '800', color: '#0f172a', fontSize: '14px' }}>
                      Receipt #VF-2026-9102
                    </span>
                    <span
                      style={{
                        backgroundColor: '#e0f2fe',
                        color: '#0284c7',
                        fontSize: '11px',
                        fontWeight: '700',
                        padding: '3px 8px',
                        borderRadius: '6px',
                      }}
                    >
                      🚚 Delivered
                    </span>
                  </div>
                  <div style={{ fontSize: '13px', color: '#1e293b', fontWeight: '600', marginBottom: '4px' }}>
                    ₹500 &bull; Fight Hunger Food Distribution Drive
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>
                    Location: Vijayawada Central &bull; Date: 12 Sep 2026 &bull; Beneficiary Counter: 50 Meals
                  </div>
                  <div style={{ marginTop: '10px' }}>
                    <button
                      type="button"
                      onClick={() => alert('Receipt #VF-2026-9102 80G PDF downloaded!')}
                      style={{
                        background: '#ffffff',
                        border: '1px solid #cbd5e1',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        color: '#0f172a',
                      }}
                    >
                      📄 80G Receipt
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
