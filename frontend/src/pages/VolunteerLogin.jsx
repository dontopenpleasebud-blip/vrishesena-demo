import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { volunteerLoginHtml } from './VolunteerLoginContent.js';
import './VolunteerLogin.css';

export default function VolunteerLogin() {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const [toast, setToast] = useState({ show: false, type: 'info', message: '' });

  const showToast = (message, type = 'info') => {
    setToast({ show: true, type, message });
    setTimeout(() => {
      setToast({ show: false, type: 'info', message: '' });
    }, 4000);
  };

  useEffect(() => {
    document.title = 'Vrishasena | Volunteer';
    const root = containerRef.current;
    if (!root) return;

    // Scroll to top on load
    window.scrollTo({ top: 0, behavior: 'instant' });

    // ----------------------------------------------------
    // 1. Link Interceptor
    // ----------------------------------------------------
    const handleLinkClick = (e) => {
      const a = e.target.closest('a');
      if (!a) return;
      const href = a.getAttribute('href');
      if (!href) return;

      // Ignore external, phone, email, or anchor/download links
      if (
        href.startsWith('http://') ||
        href.startsWith('https://') ||
        href.startsWith('tel:') ||
        href.startsWith('mailto:') ||
        href.startsWith('javascript:') ||
        href.endsWith('.pdf') ||
        a.hasAttribute('download')
      ) {
        return;
      }

      if (href.startsWith('#')) {
        const target = root.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
        return;
      }

      e.preventDefault();
      if (
        href === '/volunteer/volunteer_login' ||
        href === '/volunteer/volunteer_login/' ||
        href === '/volunteer/volunteer_login/index.html'
      ) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate(href);
      }
    };

    root.addEventListener('click', handleLinkClick);

    // ----------------------------------------------------
    // 2. Mobile Navbar Toggle (Menubar)
    // ----------------------------------------------------
    const menubar = root.querySelector('.menubar');
    const mobileNav = root.querySelector('.mobile_nav');
    const topLine = root.querySelector('.top_menu_line');
    const middleLine = root.querySelector('.middle_menu_line');
    const bottomLine = root.querySelector('.bottom_menu_line');

    const handleMenuToggle = () => {
      if (mobileNav) {
        mobileNav.classList.toggle('mobile_nav_active');
      }
      if (topLine) topLine.classList.toggle('top_menu_line_active');
      if (middleLine) middleLine.classList.toggle('middle_menu_line_active');
      if (bottomLine) bottomLine.classList.toggle('bottom_menu_line_active');
    };

    if (menubar) {
      menubar.addEventListener('click', handleMenuToggle);
    }

    // ----------------------------------------------------
    // 3. Password Show / Hide Toggle
    // ----------------------------------------------------
    const togglePassBtn = root.querySelector('.toggle-password');
    if (togglePassBtn) {
      const handleTogglePass = () => {
        const input = root.querySelector('#vol-confirm') || root.querySelector('input[name="password"]');
        const icon = togglePassBtn.querySelector('i');
        if (!input) return;

        if (input.type === 'password') {
          input.type = 'text';
          if (icon) {
            icon.className = 'ri-eye-off-line fa-regular fa-eye-slash fa fa-eye-slash';
          }
        } else {
          input.type = 'password';
          if (icon) {
            icon.className = 'ri-eye-line fa-regular fa-eye fa fa-eye';
          }
        }
      };
      togglePassBtn.addEventListener('click', handleTogglePass);
    }

    // ----------------------------------------------------
    // 4. Form Submission Handling
    // ----------------------------------------------------
    // 4. Form Submission Handling & Demo Quick-Fill
    // ----------------------------------------------------
    const loginForm = root.querySelector('.donation-form');
    if (loginForm) {
      // Inject Demo Quick Fill Banner
      let volLoginDemo = root.querySelector('#volunteerLoginDemoBanner');
      if (!volLoginDemo) {
        volLoginDemo = document.createElement('div');
        volLoginDemo.id = 'volunteerLoginDemoBanner';
        volLoginDemo.style.cssText = `
          background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
          border: 1.5px dashed #16a34a;
          border-radius: 12px;
          padding: 14px 16px;
          margin-bottom: 22px;
          text-align: center;
          box-shadow: 0 4px 14px rgba(22, 163, 74, 0.1);
        `;
        volLoginDemo.innerHTML = `
          <div style="font-size: 13px; font-weight: 700; color: #15803d; margin-bottom: 8px; display: flex; align-items: center; justify-content: center; gap: 6px;">
            <span style="font-size: 16px;">⚡</span> Demo Mode: Volunteer Portal
          </div>
          <p style="font-size: 12px; color: #166534; margin: 0 0 10px 0; line-height: 1.4;">
            Sign in with the verified sample volunteer account to explore volunteer features.
          </p>
          <button type="button" id="btnFillVolDemo" style="
            background: #16a34a;
            color: #ffffff;
            border: none;
            padding: 8px 16px;
            border-radius: 8px;
            font-size: 13px;
            font-weight: 600;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            box-shadow: 0 2px 8px rgba(22, 163, 74, 0.25);
            transition: all 0.2s ease;
          ">
            <span>⚡ Fill Demo Volunteer Account (volunteer@vrishasena.org / pass123)</span>
          </button>
        `;
        loginForm.parentNode.insertBefore(volLoginDemo, loginForm);

        const btnFill = volLoginDemo.querySelector('#btnFillVolDemo');
        if (btnFill) {
          btnFill.addEventListener('click', () => {
            const emailInp = loginForm.querySelector('input[name="email"]');
            const passInp = loginForm.querySelector('#vol-confirm') || loginForm.querySelector('input[name="password"]');
            if (emailInp) {
              emailInp.value = 'volunteer@vrishasena.org';
              emailInp.focus();
            }
            if (passInp) {
              passInp.value = 'pass123';
            }
            showToast('⚡ Demo volunteer credentials populated! Click Login to proceed.', 'info');
          });
        }
      }

      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = loginForm.querySelector('input[name="email"]');
        const passInput = loginForm.querySelector('input[name="password"]');

        const emailVal = emailInput ? emailInput.value.trim() : '';
        const passVal = passInput ? passInput.value : '';

        if (!emailVal) {
          showToast('Please enter your email or phone number.', 'error');
          if (emailInput) emailInput.focus();
          return;
        }

        if (!passVal) {
          showToast('Please enter your password.', 'error');
          if (passInput) passInput.focus();
          return;
        }

        showToast('Logging in to Volunteer Portal...', 'info');
        setTimeout(() => {
          showToast('Login successful! Redirecting to Volunteer Dashboard...', 'success');
          setTimeout(() => {
            navigate('/volunteer/volunteer_service');
          }, 1000);
        }, 800);
      });
    }

    // Cleanup on unmount
    return () => {
      root.removeEventListener('click', handleLinkClick);
      if (menubar) menubar.removeEventListener('click', handleMenuToggle);
    };
  }, [navigate]);

  return (
    <div className="volunteer-login-wrapper" ref={containerRef}>
      <div dangerouslySetInnerHTML={{ __html: volunteerLoginHtml }} />
      {toast.show && (
        <div className={`volunteer-toast ${toast.type}`}>
          {toast.message}
        </div>
      )}
    </div>
  );
}
