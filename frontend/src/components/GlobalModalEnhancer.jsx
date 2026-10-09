import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function GlobalModalEnhancer() {
  const navigate = useNavigate();
  const location = useLocation();

  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [monthlyModalOpen, setMonthlyModalOpen] = useState(false);
  const [monthlyTab, setMonthlyTab] = useState('education');
  const [monthlyAmount, setMonthlyAmount] = useState('1000');
  const [monthlyName, setMonthlyName] = useState('');
  const [monthlyPhone, setMonthlyPhone] = useState('');
  const [monthlyEmail, setMonthlyEmail] = useState('');
  const [monthlyPan, setMonthlyPan] = useState('');

  // Mobile Drawer State
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [causesMenuOpen, setCausesMenuOpen] = useState(false);

  // Auto-close drawer on route changes
  useEffect(() => {
    setMobileDrawerOpen(false);
    setCausesMenuOpen(false);
  }, [location.pathname]);

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

    // ----------------------------------------------------
    // 3. Global Mobile Drawer Sidebar Toggling
    // ----------------------------------------------------
    const handleMenuClick = (e) => {
      // Menu Hamburger Icon Trigger
      const menuBtn = e.target.closest(
        '.menu_icon, .menubar, .ri-menu-4-line, .middle_menu_line, .top_menu_line, .bottom_menu_line, .mob_navbar_cstm .menubar, .menu_line'
      );
      if (menuBtn) {
        e.preventDefault();
        e.stopPropagation();
        setMobileDrawerOpen((prev) => !prev);
        return;
      }

      // ----------------------------------------------------
      // 4. Search Overlay Toggling
      // ----------------------------------------------------
      const searchTrigger = e.target.closest('.search_icon');
      if (searchTrigger) {
        e.preventDefault();
        const searchDiv = document.querySelector('.search');
        if (searchDiv) {
          searchDiv.style.display = 'block';
          searchDiv.classList.add('active_search');
          const input = searchDiv.querySelector('input');
          if (input) input.focus();
        }
        return;
      }

      const searchCloseBtn = e.target.closest('.search_close, .search_close_container button');
      if (searchCloseBtn) {
        e.preventDefault();
        const searchDiv = document.querySelector('.search');
        if (searchDiv) {
          searchDiv.style.display = 'none';
          searchDiv.classList.remove('active_search');
        }
        return;
      }
    };

    document.addEventListener('click', handleMenuClick);

    // Escape key listener for drawer and search
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileDrawerOpen(false);
        const searchDiv = document.querySelector('.search');
        if (searchDiv) searchDiv.style.display = 'none';

        setMonthlyModalOpen(false);
        setTrackModalOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    // Clean up any old backdrop element if present
    const oldBackdrop = document.querySelector('.mobile-drawer-backdrop');
    if (oldBackdrop) {
      oldBackdrop.remove();
    }

    // Inject Responsive CSS Fixes for Navbars & Mobile Drawer
    if (!document.querySelector('#responsive-navbar-styles')) {
      const style = document.createElement('style');
      style.id = 'responsive-navbar-styles';
      style.textContent = `
        /* Guarantee Remixicon icons always render properly across all elements */
        [class^="ri-"], [class*=" ri-"], i[class*="ri-"], i[class^="ri-"], .cstm-icon-color {
          font-family: 'remixicon' !important;
          font-style: normal !important;
          -webkit-font-smoothing: antialiased !important;
          -moz-osx-font-smoothing: grayscale !important;
        }

        /* Hide legacy static mobile sidebars to prevent blurred trapping */
        .mobile_nav_version,
        .mobile_nav {
          display: none !important;
        }

        /* Unified React Mobile Drawer Backdrop */
        .custom-mobile-drawer-backdrop {
          position: fixed !important;
          inset: 0 !important;
          width: 100vw !important;
          height: 100vh !important;
          height: 100dvh !important;
          background: rgba(15, 23, 42, 0.6) !important;
          backdrop-filter: blur(6px) !important;
          -webkit-backdrop-filter: blur(6px) !important;
          z-index: 99998 !important;
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.3s !important;
        }
        .custom-mobile-drawer-backdrop.is-active {
          opacity: 1 !important;
          visibility: visible !important;
          pointer-events: auto !important;
        }

        /* Unified React Mobile Drawer Sidebar */
        .custom-mobile-drawer {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          width: 320px !important;
          max-width: 86vw !important;
          height: 100vh !important;
          height: 100dvh !important;
          background: #ffffff !important;
          z-index: 999999 !important;
          overflow-y: auto !important;
          -webkit-overflow-scrolling: touch !important;
          display: flex !important;
          flex-direction: column !important;
          box-shadow: 8px 0 35px rgba(0, 0, 0, 0.25) !important;
          transform: translateX(-105%) !important;
          transition: transform 0.32s cubic-bezier(0.16, 1, 0.3, 1) !important;
          pointer-events: auto !important;
          opacity: 1 !important;
          filter: none !important;
          backdrop-filter: none !important;
        }
        .custom-mobile-drawer.is-open {
          transform: translateX(0) !important;
        }

        /* Drawer Header */
        .drawer-header {
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
          padding: 16px 20px !important;
          border-bottom: 1px solid #f1f5f9 !important;
          background: #ffffff !important;
          position: sticky !important;
          top: 0 !important;
          z-index: 10 !important;
        }
        .drawer-logo img {
          height: 44px !important;
          width: auto !important;
          object-fit: contain !important;
        }
        .drawer-close-btn {
          width: 36px !important;
          height: 36px !important;
          border-radius: 50% !important;
          border: 1px solid #e2e8f0 !important;
          background: #f8fafc !important;
          color: #334155 !important;
          font-size: 20px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          cursor: pointer !important;
          transition: all 0.2s ease !important;
          padding: 0 !important;
        }
        .drawer-close-btn:hover {
          background: #fee2e2 !important;
          color: #ef4444 !important;
          border-color: #fca5a5 !important;
          transform: scale(1.05) !important;
        }

        /* Drawer Quick Action Buttons */
        .drawer-quick-actions {
          display: grid !important;
          grid-template-columns: 1fr 1fr !important;
          gap: 10px !important;
          padding: 14px 20px !important;
          background: #f8fafc !important;
          border-bottom: 1px solid #f1f5f9 !important;
        }
        .drawer-action-btn {
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 6px !important;
          padding: 9px 12px !important;
          border-radius: 10px !important;
          font-size: 13px !important;
          font-weight: 700 !important;
          text-decoration: none !important;
          cursor: pointer !important;
          border: none !important;
          transition: all 0.2s ease !important;
          text-align: center !important;
        }
        .drawer-donate-btn {
          background: #ff4500 !important;
          color: #ffffff !important;
          box-shadow: 0 4px 12px rgba(255, 69, 0, 0.25) !important;
        }
        .drawer-donate-btn:hover {
          background: #e03d00 !important;
          color: #ffffff !important;
        }
        .drawer-volunteer-btn {
          background: #0284c7 !important;
          color: #ffffff !important;
          box-shadow: 0 4px 12px rgba(2, 132, 199, 0.25) !important;
        }
        .drawer-volunteer-btn:hover {
          background: #0369a1 !important;
          color: #ffffff !important;
        }

        /* Drawer Nav */
        .drawer-nav {
          padding: 10px 16px !important;
          flex: 1 !important;
        }
        .drawer-links-list {
          list-style: none !important;
          padding: 0 !important;
          margin: 0 !important;
        }
        .drawer-links-list > li {
          margin-bottom: 2px !important;
          border-bottom: 1px solid #f8fafc !important;
        }
        .drawer-nav-item {
          display: flex !important;
          align-items: center !important;
          gap: 12px !important;
          padding: 12px 14px !important;
          color: #1e293b !important;
          font-size: 15px !important;
          font-weight: 600 !important;
          text-decoration: none !important;
          border-radius: 10px !important;
          transition: all 0.2s ease !important;
          cursor: pointer !important;
        }
        .drawer-nav-item i {
          font-size: 18px !important;
          color: #64748b !important;
          transition: color 0.2s ease !important;
        }
        .drawer-nav-item:hover,
        .drawer-nav-item.active {
          background: #f0f9ff !important;
          color: #0284c7 !important;
        }
        .drawer-nav-item:hover i,
        .drawer-nav-item.active i {
          color: #0284c7 !important;
        }

        /* Drawer Accordion */
        .drawer-accordion-header {
          justify-content: space-between !important;
        }
        .drawer-accordion-title {
          display: flex !important;
          align-items: center !important;
          gap: 12px !important;
        }
        .accordion-arrow {
          font-size: 18px !important;
          color: #94a3b8 !important;
          transition: transform 0.25s ease !important;
        }
        .accordion-arrow.is-rotated {
          transform: rotate(180deg) !important;
          color: #0284c7 !important;
        }
        .drawer-sublinks-list {
          list-style: none !important;
          padding: 6px 10px 10px 10px !important;
          margin: 0 0 8px 0 !important;
          background: #f8fafc !important;
          border-radius: 12px !important;
          border: 1px solid #e2e8f0 !important;
          max-height: 340px !important;
          overflow-y: auto !important;
        }
        .drawer-all-causes {
          display: block !important;
          font-size: 13px !important;
          font-weight: 700 !important;
          color: #0284c7 !important;
          padding: 8px 10px !important;
          background: #e0f2fe !important;
          border-radius: 8px !important;
          text-decoration: none !important;
          margin-bottom: 8px !important;
          text-align: center !important;
        }
        .drawer-sublink-header {
          display: block !important;
          font-size: 11px !important;
          font-weight: 700 !important;
          color: #64748b !important;
          text-transform: uppercase !important;
          letter-spacing: 0.5px !important;
          padding: 8px 6px 4px 6px !important;
        }
        .drawer-nested-links {
          list-style: none !important;
          padding: 0 !important;
          margin: 0 0 6px 0 !important;
        }
        .drawer-nested-links li a {
          display: block !important;
          padding: 6px 10px !important;
          font-size: 13px !important;
          font-weight: 500 !important;
          color: #334155 !important;
          text-decoration: none !important;
          border-radius: 6px !important;
          transition: background 0.15s ease, color 0.15s ease !important;
        }
        .drawer-nested-links li a:hover {
          background: #ffffff !important;
          color: #0284c7 !important;
        }

        /* Drawer Footer */
        .drawer-footer {
          padding: 16px 20px 80px 20px !important;
          background: #f8fafc !important;
          border-top: 1px solid #f1f5f9 !important;
          margin-top: auto !important;
        }
        .drawer-contact-snippet {
          display: flex !important;
          flex-direction: column !important;
          gap: 6px !important;
          margin-bottom: 14px !important;
        }
        .drawer-phone-link,
        .drawer-email-link {
          font-size: 12px !important;
          color: #64748b !important;
          text-decoration: none !important;
          display: flex !important;
          align-items: center !important;
          gap: 8px !important;
        }
        .drawer-phone-link:hover,
        .drawer-email-link:hover {
          color: #0284c7 !important;
        }
        .drawer-socials {
          display: flex !important;
          align-items: center !important;
          gap: 10px !important;
        }
        .drawer-socials a {
          width: 34px !important;
          height: 34px !important;
          border-radius: 50% !important;
          background: #ffffff !important;
          border: 1px solid #e2e8f0 !important;
          color: #64748b !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          text-decoration: none !important;
          font-size: 16px !important;
          transition: all 0.2s ease !important;
        }
        .drawer-socials a:hover {
          background: #0284c7 !important;
          border-color: #0284c7 !important;
          color: #ffffff !important;
          transform: translateY(-2px) !important;
        }

        /* Hide awkward floating vertical tab on small screens */
        @media (max-width: 768px) {
          .donate_monthly_btn {
            display: none !important;
          }
          .navbar_cstm {
            height: 64px !important;
            padding: 8px 16px !important;
          }
          .first_nav {
            gap: 16px !important;
          }
          .logo_cstm img {
            max-height: 44px !important;
          }
          .track_menu {
            gap: 10px !important;
          }
          .desk-login-btn {
            padding: 6px 12px !important;
            font-size: 13px !important;
          }
          .donate_monthly_btn_2 {
            padding: 6px 10px !important;
            font-size: 18px !important;
          }
          .menubar {
            height: 38px !important;
            width: 38px !important;
            padding: 8px !important;
          }
        }

        /* Bottom Sticky Mobile Navigation Bar */
        @media (max-width: 991px) {
          .bottom-nav {
            display: flex !important;
            position: fixed !important;
            bottom: 12px !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            width: calc(100% - 24px) !important;
            max-width: 480px !important;
            height: 62px !important;
            background: rgba(255, 255, 255, 0.95) !important;
            backdrop-filter: blur(12px) !important;
            border-radius: 18px !important;
            border: 1px solid rgba(226, 232, 240, 0.8) !important;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15) !important;
            z-index: 99990 !important;
            padding: 4px 12px !important;
            align-items: center !important;
            justify-content: space-around !important;
          }
          .bottom-nav .nav-container {
            display: flex !important;
            width: 100% !important;
            align-items: center !important;
            justify-content: space-around !important;
          }
          .bottom-nav .nav-item {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            color: #64748b !important;
            text-decoration: none !important;
            font-size: 11px !important;
            font-weight: 600 !important;
            transition: color 0.2s ease !important;
          }
          .bottom-nav .nav-item i {
            font-size: 20px !important;
            margin-bottom: 2px !important;
          }
          .bottom-nav .nav-item.active,
          .bottom-nav .nav-item:hover {
            color: #ea580c !important;
          }
          .bottom-nav .heart_container .heart-btn {
            background: linear-gradient(135deg, #ea580c, #c2410c) !important;
            color: #ffffff !important;
            width: 46px !important;
            height: 46px !important;
            border-radius: 50% !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            box-shadow: 0 6px 16px rgba(234, 88, 12, 0.4) !important;
            margin-top: -18px !important;
          }
          .bottom-nav .heart_container .heart-btn i {
            font-size: 24px !important;
            margin-bottom: 0 !important;
            color: #ffffff !important;
          }
        }

        @media (min-width: 992px) {
          .bottom-nav {
            display: none !important;
          }
        }

        /* Search Overlay Styles */
        .search {
          z-index: 999995 !important;
        }
      `;
      document.head.appendChild(style);
    }

    // Also hide any native staticBackdrop that might try to open
    const hideLegacyModals = () => {
      const legacyModals = document.querySelectorAll('#staticBackdrop, #trackDonationModal');
      legacyModals.forEach((m) => {
        if (m.id === 'staticBackdrop' && !m.classList.contains('react-managed')) {
          m.style.display = 'none';
          m.classList.remove('show');
        }
      });

      // Highlight active route in bottom navigation
      const currentPath = window.location.pathname;
      document.querySelectorAll('.bottom-nav .nav-item').forEach((item) => {
        const href = item.getAttribute('href');
        if (href === currentPath || (href !== '/' && currentPath.startsWith(href))) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    };

    const timer = setInterval(hideLegacyModals, 1000);

    return () => {
      document.removeEventListener('click', handleDocumentClick, true);
      document.removeEventListener('click', handleMenuClick);
      document.removeEventListener('keydown', handleKeyDown);
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

      {/* ── Global Mobile Bottom Navigation Bar ── */}
      <nav className="bottom-nav">
        <div className="nav-container">
          <a href="/" className="nav-item" data-nav="home">
            <i className="ri-home-5-fill"></i>
            <span>Home</span>
          </a>

          <a href="/causes" className="nav-item" data-nav="explore">
            <i className="ri-gift-fill"></i>
            <span>Campaigns</span>
          </a>

          <div className="heart_container">
            <a
              href="#track"
              className="nav-item heart-btn"
              data-nav="volunteer"
              onClick={(e) => {
                e.preventDefault();
                setTrackModalOpen(true);
                setTrackRecordsLoaded(true);
              }}
            >
              <i className="ri-heart-3-fill heart_icon_bottom"></i>
            </a>
          </div>

          <a href="/volunteer" className="nav-item" data-nav="donate">
            <i className="ri-hand-heart-fill"></i>
            <span>Volunteer</span>
          </a>

          <a href="/profile" className="nav-item" data-nav="profile">
            <i className="ri-user-3-fill"></i>
            <span>Profile</span>
          </a>
        </div>
      </nav>

      {/* ── Global Custom Mobile Drawer & Backdrop ── */}
      <div
        className={`custom-mobile-drawer-backdrop ${mobileDrawerOpen ? 'is-active' : ''}`}
        onClick={() => setMobileDrawerOpen(false)}
        aria-hidden={!mobileDrawerOpen}
      />

      <aside
        className={`custom-mobile-drawer ${mobileDrawerOpen ? 'is-open' : ''}`}
        aria-label="Mobile Navigation Drawer"
      >
        {/* Drawer Header with Logo and Close Button */}
        <div className="drawer-header">
          <a
            href="/"
            className="drawer-logo"
            onClick={(e) => {
              e.preventDefault();
              setMobileDrawerOpen(false);
              navigate('/');
            }}
          >
            <img src="/static/website/assets/images/logo/logo.webp" alt="Vrishasena Foundation" />
          </a>
          <button
            type="button"
            className="drawer-close-btn"
            onClick={() => setMobileDrawerOpen(false)}
            aria-label="Close menu"
          >
            <i className="ri-close-line"></i>
          </button>
        </div>

        {/* Quick Action Badges */}
        <div className="drawer-quick-actions">
          <button
            type="button"
            className="drawer-action-btn drawer-donate-btn"
            onClick={() => {
              setMobileDrawerOpen(false);
              setMonthlyModalOpen(true);
            }}
          >
            <i className="ri-heart-add-fill"></i> Donate Monthly
          </button>
          <a
            href="/volunteer"
            className="drawer-action-btn drawer-volunteer-btn"
            onClick={(e) => {
              e.preventDefault();
              setMobileDrawerOpen(false);
              navigate('/volunteer');
            }}
          >
            <i className="ri-hand-heart-line"></i> Volunteer
          </a>
        </div>

        {/* Navigation Links */}
        <nav className="drawer-nav">
          <ul className="drawer-links-list">
            <li>
              <a
                href="/"
                className={`drawer-nav-item ${location.pathname === '/' ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setMobileDrawerOpen(false);
                  navigate('/');
                }}
              >
                <i className="ri-home-5-line"></i> Home
              </a>
            </li>

            <li>
              <a
                href="/about"
                className={`drawer-nav-item ${location.pathname === '/about' ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setMobileDrawerOpen(false);
                  navigate('/about');
                }}
              >
                <i className="ri-information-line"></i> About Us
              </a>
            </li>

            {/* Causes Accordion */}
            <li className="drawer-accordion-group">
              <div
                className="drawer-nav-item drawer-accordion-header"
                onClick={() => setCausesMenuOpen((prev) => !prev)}
              >
                <div className="drawer-accordion-title">
                  <i className="ri-heart-pulse-line"></i>
                  <span>Causes & Programs</span>
                </div>
                <i
                  className={`ri-arrow-down-s-line accordion-arrow ${
                    causesMenuOpen ? 'is-rotated' : ''
                  }`}
                ></i>
              </div>

              {causesMenuOpen && (
                <ul className="drawer-sublinks-list">
                  <li>
                    <a
                      href="/causes"
                      className="drawer-sublink drawer-all-causes"
                      onClick={(e) => {
                        e.preventDefault();
                        setMobileDrawerOpen(false);
                        navigate('/causes');
                      }}
                    >
                      <span>🌟 View All Causes</span>
                    </a>
                  </li>
                  <li>
                    <span className="drawer-sublink-header">🥗 Food & Nutrition</span>
                    <ul className="drawer-nested-links">
                      <li>
                        <a
                          href="/food"
                          onClick={(e) => {
                            e.preventDefault();
                            setMobileDrawerOpen(false);
                            navigate('/food');
                          }}
                        >
                          Fight Hunger Together
                        </a>
                      </li>
                      <li>
                        <a
                          href="/homeless"
                          onClick={(e) => {
                            e.preventDefault();
                            setMobileDrawerOpen(false);
                            navigate('/homeless');
                          }}
                        >
                          Feed a Homeless Person
                        </a>
                      </li>
                      <li>
                        <a
                          href="/causes-detail/water_bottle"
                          onClick={(e) => {
                            e.preventDefault();
                            setMobileDrawerOpen(false);
                            navigate('/causes-detail/water_bottle');
                          }}
                        >
                          Fight Thirst. Share Water
                        </a>
                      </li>
                      <li>
                        <a
                          href="/causes-detail/chicken_briyani"
                          onClick={(e) => {
                            e.preventDefault();
                            setMobileDrawerOpen(false);
                            navigate('/causes-detail/chicken_briyani');
                          }}
                        >
                          Chicken Biryani
                        </a>
                      </li>
                      <li>
                        <a
                          href="/causes-detail/stray_dog"
                          onClick={(e) => {
                            e.preventDefault();
                            setMobileDrawerOpen(false);
                            navigate('/causes-detail/stray_dog');
                          }}
                        >
                          Feed a Stray Dog
                        </a>
                      </li>
                      <li>
                        <a
                          href="/causes-detail/thaali"
                          onClick={(e) => {
                            e.preventDefault();
                            setMobileDrawerOpen(false);
                            navigate('/causes-detail/thaali');
                          }}
                        >
                          Thaali Meals
                        </a>
                      </li>
                      <li>
                        <a
                          href="/causes-detail/cow_feeding"
                          onClick={(e) => {
                            e.preventDefault();
                            setMobileDrawerOpen(false);
                            navigate('/causes-detail/cow_feeding');
                          }}
                        >
                          Cow Feeding
                        </a>
                      </li>
                    </ul>
                  </li>

                  <li>
                    <span className="drawer-sublink-header">👶 Child & Mother Care</span>
                    <ul className="drawer-nested-links">
                      <li>
                        <a
                          href="/egg_milk"
                          onClick={(e) => {
                            e.preventDefault();
                            setMobileDrawerOpen(false);
                            navigate('/egg_milk');
                          }}
                        >
                          Egg & Milk Distribution
                        </a>
                      </li>
                      <li>
                        <a
                          href="/causes-detail/hygiene_kit"
                          onClick={(e) => {
                            e.preventDefault();
                            setMobileDrawerOpen(false);
                            navigate('/causes-detail/hygiene_kit');
                          }}
                        >
                          Hygiene Kit
                        </a>
                      </li>
                      <li>
                        <a
                          href="/causes-detail/childcare_kit"
                          onClick={(e) => {
                            e.preventDefault();
                            setMobileDrawerOpen(false);
                            navigate('/causes-detail/childcare_kit');
                          }}
                        >
                          Child Care Kit
                        </a>
                      </li>
                      <li>
                        <a
                          href="/causes-detail/bicycle"
                          onClick={(e) => {
                            e.preventDefault();
                            setMobileDrawerOpen(false);
                            navigate('/causes-detail/bicycle');
                          }}
                        >
                          Bicycle For Girls
                        </a>
                      </li>
                    </ul>
                  </li>

                  <li>
                    <span className="drawer-sublink-header">📚 Education & Welfare</span>
                    <ul className="drawer-nested-links">
                      <li>
                        <a
                          href="/CrowdFundEducation/Educationindex"
                          onClick={(e) => {
                            e.preventDefault();
                            setMobileDrawerOpen(false);
                            navigate('/CrowdFundEducation/Educationindex');
                          }}
                        >
                          Stop Child Labour
                        </a>
                      </li>
                      <li>
                        <a
                          href="/causes-detail/child_education"
                          onClick={(e) => {
                            e.preventDefault();
                            setMobileDrawerOpen(false);
                            navigate('/causes-detail/child_education');
                          }}
                        >
                          Educate a Child
                        </a>
                      </li>
                      <li>
                        <a
                          href="/causes-detail/school_bag"
                          onClick={(e) => {
                            e.preventDefault();
                            setMobileDrawerOpen(false);
                            navigate('/causes-detail/school_bag');
                          }}
                        >
                          School Bag & Supplies
                        </a>
                      </li>
                    </ul>
                  </li>

                  <li>
                    <span className="drawer-sublink-header">🏥 Healthcare & Special Events</span>
                    <ul className="drawer-nested-links">
                      <li>
                        <a
                          href="/CrowdFundHealthcare"
                          onClick={(e) => {
                            e.preventDefault();
                            setMobileDrawerOpen(false);
                            navigate('/CrowdFundHealthcare');
                          }}
                        >
                          Save Lives Through Healthcare
                        </a>
                      </li>
                      <li>
                        <a
                          href="/celebration"
                          onClick={(e) => {
                            e.preventDefault();
                            setMobileDrawerOpen(false);
                            navigate('/celebration');
                          }}
                        >
                          Birthday Celebration
                        </a>
                      </li>
                      <li>
                        <a
                          href="/orphanage"
                          onClick={(e) => {
                            e.preventDefault();
                            setMobileDrawerOpen(false);
                            navigate('/orphanage');
                          }}
                        >
                          Support An Orphanage
                        </a>
                      </li>
                      <li>
                        <a
                          href="/livelihood"
                          onClick={(e) => {
                            e.preventDefault();
                            setMobileDrawerOpen(false);
                            navigate('/livelihood');
                          }}
                        >
                          Empower Dreams Through Livelihood
                        </a>
                      </li>
                      <li>
                        <a
                          href="/environment"
                          onClick={(e) => {
                            e.preventDefault();
                            setMobileDrawerOpen(false);
                            navigate('/environment');
                          }}
                        >
                          Environment Welfare
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <a
                href="/new-blog"
                className={`drawer-nav-item ${location.pathname === '/new-blog' ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setMobileDrawerOpen(false);
                  navigate('/new-blog');
                }}
              >
                <i className="ri-article-line"></i> Blog
              </a>
            </li>

            <li>
              <a
                href="/blog"
                className={`drawer-nav-item ${location.pathname === '/blog' ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setMobileDrawerOpen(false);
                  navigate('/blog');
                }}
              >
                <i className="ri-building-line"></i> CSR Activities
              </a>
            </li>

            <li>
              <a
                href="/gallery"
                className={`drawer-nav-item ${location.pathname === '/gallery' ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setMobileDrawerOpen(false);
                  navigate('/gallery');
                }}
              >
                <i className="ri-image-line"></i> Gallery
              </a>
            </li>

            <li>
              <a
                href="/contact"
                className={`drawer-nav-item ${location.pathname === '/contact' ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setMobileDrawerOpen(false);
                  navigate('/contact');
                }}
              >
                <i className="ri-phone-line"></i> Contact Us
              </a>
            </li>

            <li>
              <a
                href="/profile"
                className={`drawer-nav-item ${location.pathname === '/profile' ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setMobileDrawerOpen(false);
                  navigate('/profile');
                }}
              >
                <i className="ri-user-line"></i> My Account / Login
              </a>
            </li>
          </ul>
        </nav>

        {/* Drawer Footer & Social Media */}
        <div className="drawer-footer">
          <div className="drawer-contact-snippet">
            <a href="tel:+919951672673" className="drawer-phone-link">
              <i className="ri-phone-fill"></i> +91 9951 672 673
            </a>
            <a href="mailto:office@thaagam.email" className="drawer-email-link">
              <i className="ri-mail-line"></i> office@thaagam.email
            </a>
          </div>

          <div className="drawer-socials">
            <a
              href="https://www.facebook.com/people/Vrishasena-Foundation-NGO/100077294806563/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <i className="ri-facebook-circle-fill"></i>
            </a>
            <a
              href="https://twitter.com/vrishasenango"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <i className="ri-twitter-x-fill"></i>
            </a>
            <a
              href="https://www.instagram.com/vrishasenafoundation/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <i className="ri-instagram-fill"></i>
            </a>
            <a
              href="https://www.linkedin.com/company/vrishasenafoundation/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <i className="ri-linkedin-box-fill"></i>
            </a>
            <a
              href="https://www.youtube.com/@vrishasenafoundation9777"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <i className="ri-youtube-fill"></i>
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
