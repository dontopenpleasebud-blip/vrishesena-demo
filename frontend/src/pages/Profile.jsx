import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { profileHtml } from './ProfileContent.js';
import './Profile.css';

export default function Profile() {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const [notification, setNotification] = useState({ show: false, type: 'success', message: '' });

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    // Scroll to top on load
    window.scrollTo({ top: 0, behavior: 'instant' });

    // 1. Link Interceptor
    const handleLinkClick = (e) => {
      const a = e.target.closest('a');
      if (!a) return;

      const href = a.getAttribute('href');
      if (!href) return;

      // Ignore external or protocol links
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
      if (href === '/profile' || href === '/profile/index.html') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate(href);
      }
    };

    root.addEventListener('click', handleLinkClick);

    // 2. Toggle Login Type (Phone vs Email)
    const phoneRadio = root.querySelector('#loginTypePhone');
    const emailRadio = root.querySelector('#loginTypeEmail');
    const phoneContainer = root.querySelector('#phoneInputContainer');
    const emailContainer = root.querySelector('#emailInputContainer');
    const phoneInput = root.querySelector('#donorPhoneInput');
    const emailInput = root.querySelector('#donorEmailInput');

    const updateLoginType = () => {
      if (emailRadio && emailRadio.checked) {
        if (phoneContainer) phoneContainer.style.display = 'none';
        if (emailContainer) emailContainer.style.display = 'block';
        if (emailInput) emailInput.focus();
      } else {
        if (phoneContainer) phoneContainer.style.display = 'block';
        if (emailContainer) emailContainer.style.display = 'none';
        if (phoneInput) phoneInput.focus();
      }
    };

    if (phoneRadio) phoneRadio.addEventListener('change', updateLoginType);
    if (emailRadio) emailRadio.addEventListener('change', updateLoginType);
    updateLoginType();

    // 3. OTP Flow Management
    const donorOtpForm = root.querySelector('#donorOtpForm');
    const sendOtpBtn = root.querySelector('#sendOtpBtn');
    const otpModal = root.querySelector('#otpVerificationModal');
    const closeOtpModalBtn = root.querySelector('#closeOtpModal');
    const otpVerificationForm = root.querySelector('#otpVerificationForm');
    const donorOtpInput = root.querySelector('#donorOtpInput');
    const verifyOtpBtn = root.querySelector('#verifyOtpBtn');
    const resendOtpBtn = root.querySelector('#resendOtpBtn');
    const resendTimerDisplay = root.querySelector('#resendTimerDisplay');
    const otpStatusMessage = root.querySelector('#otpStatusMessage');
    const donorContactInfo = root.querySelector('#donorContactInfo');

    // Inject Demo Mode Banner above donorOtpForm
    let donorDemoBanner = root.querySelector('#donorDemoBanner');
    if (!donorDemoBanner && donorOtpForm) {
      donorDemoBanner = document.createElement('div');
      donorDemoBanner.id = 'donorDemoBanner';
      donorDemoBanner.className = 'demo-mode-banner';
      donorDemoBanner.style.cssText = `
        background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
        border: 1.5px dashed #0284c7;
        border-radius: 10px;
        padding: 12px 14px;
        margin-bottom: 18px;
        box-shadow: 0 4px 12px rgba(2, 132, 199, 0.08);
      `;
      donorDemoBanner.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <div style="font-size: 13px; font-weight: 600; color: #0369a1; line-height: 1.4; display: flex; align-items: flex-start; gap: 6px;">
            <span style="font-size: 16px; line-height: 1;">⚡</span>
            <span><strong>Demo Mode:</strong> Enter any 4-digit code (e.g., 1234) or click below to auto-fill sample phone.</span>
          </div>
          <button type="button" id="btnFillDonorPhone" style="
            align-self: flex-start;
            background: #0284c7;
            color: #ffffff;
            border: none;
            padding: 6px 12px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 600;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            box-shadow: 0 2px 6px rgba(2, 132, 199, 0.25);
            transition: all 0.2s ease;
          ">
            <span>⚡ Auto-fill Sample Phone (9951672673)</span>
          </button>
        </div>
      `;
      donorOtpForm.parentNode.insertBefore(donorDemoBanner, donorOtpForm);

      const fillPhoneBtn = donorDemoBanner.querySelector('#btnFillDonorPhone');
      if (fillPhoneBtn) {
        fillPhoneBtn.addEventListener('click', () => {
          if (phoneRadio) phoneRadio.checked = true;
          updateLoginType();
          if (phoneInput) {
            phoneInput.value = '9951672673';
            phoneInput.focus();
          }
          setNotification({
            show: true,
            type: 'success',
            message: 'Sample phone (9951672673) filled! Click "Send OTP" to test verification.',
          });
        });
      }
    }

    // Inject Demo Helper inside OTP Verification Form
    let donorOtpDemoHelper = root.querySelector('#donorOtpDemoHelper');
    if (!donorOtpDemoHelper && otpVerificationForm) {
      donorOtpDemoHelper = document.createElement('div');
      donorOtpDemoHelper.id = 'donorOtpDemoHelper';
      donorOtpDemoHelper.style.cssText = `
        background: #f0fdf4;
        border: 1px dashed #16a34a;
        border-radius: 8px;
        padding: 10px 12px;
        margin-bottom: 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        flex-wrap: wrap;
      `;
      donorOtpDemoHelper.innerHTML = `
        <span style="font-size: 12px; color: #15803d; font-weight: 600;">
          ⚡ Demo OTP: Any 4-digit code works
        </span>
        <button type="button" id="btnFillDemoDonorOtp" style="
          background: #16a34a;
          color: #ffffff;
          border: none;
          padding: 4px 10px;
          border-radius: 5px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        ">
          Fill 1234
        </button>
      `;
      otpVerificationForm.insertBefore(donorOtpDemoHelper, otpVerificationForm.firstChild);

      const fillOtpBtn = donorOtpDemoHelper.querySelector('#btnFillDemoDonorOtp');
      if (fillOtpBtn) {
        fillOtpBtn.addEventListener('click', () => {
          if (donorOtpInput) {
            donorOtpInput.value = '1234';
            donorOtpInput.focus();
          }
        });
      }
    }

    let countdownInterval = null;
    let secondsLeft = 60;

    const startCountdown = () => {
      if (countdownInterval) clearInterval(countdownInterval);
      secondsLeft = 60;
      if (resendOtpBtn) resendOtpBtn.disabled = true;
      if (resendTimerDisplay) resendTimerDisplay.textContent = `(${secondsLeft}s)`;

      countdownInterval = setInterval(() => {
        secondsLeft -= 1;
        if (secondsLeft <= 0) {
          clearInterval(countdownInterval);
          if (resendOtpBtn) resendOtpBtn.disabled = false;
          if (resendTimerDisplay) resendTimerDisplay.textContent = '';
        } else {
          if (resendTimerDisplay) resendTimerDisplay.textContent = `(${secondsLeft}s)`;
        }
      }, 1000);
    };

    const showModal = (contactVal) => {
      if (otpModal) {
        otpModal.style.display = 'flex';
        otpModal.classList.add('show');
      }
      if (donorContactInfo) {
        donorContactInfo.textContent = contactVal;
      }
      if (donorOtpInput) {
        donorOtpInput.value = '';
        donorOtpInput.focus();
      }
      if (otpStatusMessage) {
        otpStatusMessage.textContent = `An OTP has been sent to ${contactVal}`;
        otpStatusMessage.className = 'status_message success';
        otpStatusMessage.style.display = 'block';
      }
      startCountdown();
    };

    const hideModal = () => {
      if (otpModal) {
        otpModal.style.display = 'none';
        otpModal.classList.remove('show');
      }
      if (countdownInterval) clearInterval(countdownInterval);
    };

    const handleSendOtp = (e) => {
      e.preventDefault();
      const isEmail = emailRadio && emailRadio.checked;
      const contactVal = isEmail ? emailInput?.value.trim() : phoneInput?.value.trim();

      if (!contactVal) {
        alert(isEmail ? 'Please enter your email address' : 'Please enter your phone number');
        return;
      }

      if (sendOtpBtn) {
        sendOtpBtn.disabled = true;
        sendOtpBtn.textContent = 'Sending OTP...';
      }

      setTimeout(() => {
        if (sendOtpBtn) {
          sendOtpBtn.disabled = false;
          sendOtpBtn.textContent = 'Send OTP';
        }
        showModal(contactVal);
      }, 1000);
    };

    const handleVerifyOtp = (e) => {
      e.preventDefault();
      const otpVal = donorOtpInput?.value.trim();

      if (!otpVal || otpVal.length < 4) {
        if (otpStatusMessage) {
          otpStatusMessage.textContent = 'Please enter a valid OTP code';
          otpStatusMessage.className = 'status_message error';
          otpStatusMessage.style.display = 'block';
        }
        return;
      }

      if (verifyOtpBtn) {
        verifyOtpBtn.disabled = true;
        verifyOtpBtn.textContent = 'Verifying...';
      }

      setTimeout(() => {
        if (verifyOtpBtn) {
          verifyOtpBtn.disabled = false;
          verifyOtpBtn.textContent = 'Verify OTP';
        }
        hideModal();
        setNotification({
          show: true,
          type: 'success',
          message: 'Welcome back! You have successfully signed in.',
        });
      }, 1200);
    };

    const handleResendOtp = (e) => {
      e.preventDefault();
      if (resendOtpBtn && resendOtpBtn.disabled) return;

      const isEmail = emailRadio && emailRadio.checked;
      const contactVal = isEmail ? emailInput?.value.trim() : phoneInput?.value.trim();

      if (otpStatusMessage) {
        otpStatusMessage.textContent = `A fresh OTP has been sent to ${contactVal}`;
        otpStatusMessage.className = 'status_message success';
      }
      startCountdown();
    };

    if (donorOtpForm) donorOtpForm.addEventListener('submit', handleSendOtp);
    if (otpVerificationForm) otpVerificationForm.addEventListener('submit', handleVerifyOtp);
    if (resendOtpBtn) resendOtpBtn.addEventListener('click', handleResendOtp);
    if (closeOtpModalBtn) closeOtpModalBtn.addEventListener('click', hideModal);

    // Close on backdrop click
    const handleModalBackdrop = (e) => {
      if (e.target === otpModal) {
        hideModal();
      }
    };
    if (otpModal) otpModal.addEventListener('click', handleModalBackdrop);

    // 4. Mobile Navigation Menu Toggle
    const menuIcon = root.querySelector('.menu_icon');
    const closeMenu = root.querySelector('.close-menu');
    const mobileNav = root.querySelector('.mobile_nav_version');
    const body = document.body;

    const openSidebar = (e) => {
      e.stopPropagation();
      if (mobileNav) mobileNav.classList.add('active_sidebar');
      body.classList.add('no-scroll');
      body.style.overflow = 'hidden';
      if (menuIcon) menuIcon.style.display = 'none';
      if (closeMenu) closeMenu.style.display = 'inline-block';
    };

    const closeSidebar = (e) => {
      if (e) e.stopPropagation();
      if (mobileNav) mobileNav.classList.remove('active_sidebar');
      body.classList.remove('no-scroll');
      body.style.overflow = '';
      if (menuIcon) menuIcon.style.display = 'inline-block';
      if (closeMenu) closeMenu.style.display = 'none';
    };

    const outsideClick = (e) => {
      if (
        mobileNav &&
        mobileNav.classList.contains('active_sidebar') &&
        !mobileNav.contains(e.target) &&
        (!menuIcon || !menuIcon.contains(e.target))
      ) {
        closeSidebar(e);
      }
    };

    if (menuIcon) menuIcon.addEventListener('click', openSidebar);
    if (closeMenu) closeMenu.addEventListener('click', closeSidebar);
    document.addEventListener('click', outsideClick);

    // 5. Search bar toggle
    const searchIcon = root.querySelector('.search_icon');
    const searchBox = root.querySelector('.search');
    const searchClose = root.querySelector('.search_close');

    const openSearch = () => {
      if (searchBox) searchBox.classList.add('search_active');
    };
    const closeSearch = () => {
      if (searchBox) searchBox.classList.remove('search_active');
    };

    if (searchIcon) searchIcon.addEventListener('click', openSearch);
    if (searchClose) searchClose.addEventListener('click', closeSearch);

    // 6. Donate monthly modal tab pills
    const eduTab = root.querySelector('#home-tab');
    const healthTab = root.querySelector('#profile-tab');
    const eduPane = root.querySelector('#education');
    const healthPane = root.querySelector('#healthcare');

    const switchTab = (activeTab, inactiveTab, showPane, hidePane) => {
      if (activeTab) {
        activeTab.classList.add('active');
        activeTab.setAttribute('aria-selected', 'true');
      }
      if (inactiveTab) {
        inactiveTab.classList.remove('active');
        inactiveTab.setAttribute('aria-selected', 'false');
      }
      if (showPane) {
        showPane.classList.add('show', 'active');
      }
      if (hidePane) {
        hidePane.classList.remove('show', 'active');
      }
    };

    const onEduClick = () => switchTab(eduTab, healthTab, eduPane, healthPane);
    const onHealthClick = () => switchTab(healthTab, eduTab, healthPane, eduPane);

    if (eduTab) eduTab.addEventListener('click', onEduClick);
    if (healthTab) healthTab.addEventListener('click', onHealthClick);

    return () => {
      root.removeEventListener('click', handleLinkClick);
      if (phoneRadio) phoneRadio.removeEventListener('change', updateLoginType);
      if (emailRadio) emailRadio.removeEventListener('change', updateLoginType);
      if (donorOtpForm) donorOtpForm.removeEventListener('submit', handleSendOtp);
      if (otpVerificationForm) otpVerificationForm.removeEventListener('submit', handleVerifyOtp);
      if (resendOtpBtn) resendOtpBtn.removeEventListener('click', handleResendOtp);
      if (closeOtpModalBtn) closeOtpModalBtn.removeEventListener('click', hideModal);
      if (otpModal) otpModal.removeEventListener('click', handleModalBackdrop);
      if (countdownInterval) clearInterval(countdownInterval);
      if (menuIcon) menuIcon.removeEventListener('click', openSidebar);
      if (closeMenu) closeMenu.removeEventListener('click', closeSidebar);
      document.removeEventListener('click', outsideClick);
      if (searchIcon) searchIcon.removeEventListener('click', openSearch);
      if (searchClose) searchClose.removeEventListener('click', closeSearch);
      if (eduTab) eduTab.removeEventListener('click', onEduClick);
      if (healthTab) healthTab.removeEventListener('click', onHealthClick);
    };
  }, [navigate]);

  return (
    <>
      <div ref={containerRef} dangerouslySetInnerHTML={{ __html: profileHtml }} />

      {/* Floating Status Notification Toast */}
      {notification.show && (
        <div
          role="alert"
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            zIndex: 99999,
            backgroundColor: notification.type === 'success' ? '#28a745' : '#dc3545',
            color: '#ffffff',
            padding: '16px 24px',
            borderRadius: '10px',
            boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '15px',
            fontWeight: 500,
            maxWidth: '420px',
            animation: 'fadeIn 0.3s ease-out',
          }}
        >
          <i className="ri-checkbox-circle-fill" style={{ fontSize: '24px' }}></i>
          <span>{notification.message}</span>
          <button
            onClick={() => setNotification({ show: false, type: 'success', message: '' })}
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
    </>
  );
}
