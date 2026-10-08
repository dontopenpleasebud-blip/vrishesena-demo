import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { volunteerHtml } from './VolunteerContent.js';
import './Volunteer.css';

export default function Volunteer() {
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
    document.title = 'Vrishasena Foundation | Volunteer';
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
        href === '/volunteer' ||
        href === '/volunteer/' ||
        href === '/volunteer/index.html' ||
        href === '/volunteer/volunteer_logout' ||
        href === '/volunteer/volunteer_logout/index.html'
      ) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate(href);
      }
    };

    root.addEventListener('click', handleLinkClick);

    // ----------------------------------------------------
    // 2. Mobile sidebar toggle
    // ----------------------------------------------------
    const menuIcon = root.querySelector('.menu_icon');
    const closeMenu = root.querySelector('.close-menu');
    const mobileNav = root.querySelector('.mobile_nav_version');
    const body = document.body;

    const openMobileNav = () => {
      if (mobileNav) {
        mobileNav.style.transform = 'translateX(0%)';
        mobileNav.style.display = 'block';
        if (menuIcon) menuIcon.style.display = 'none';
        if (closeMenu) closeMenu.style.display = 'block';
        body.classList.add('mobile-nav-open');
      }
    };

    const closeMobileNav = () => {
      if (mobileNav) {
        mobileNav.style.transform = 'translateX(-100%)';
        mobileNav.style.display = 'none';
        if (menuIcon) menuIcon.style.display = 'block';
        if (closeMenu) closeMenu.style.display = 'none';
        body.classList.remove('mobile-nav-open');
      }
    };

    if (menuIcon) menuIcon.addEventListener('click', openMobileNav);
    if (closeMenu) closeMenu.addEventListener('click', closeMobileNav);

    // ----------------------------------------------------
    // 3. Search overlay toggle
    // ----------------------------------------------------
    const searchIcon = root.querySelector('.search_icon');
    const searchModal = root.querySelector('.search');
    const searchClose = root.querySelector('.search_close');

    const openSearch = () => {
      if (searchModal) {
        searchModal.style.display = 'block';
        const input = searchModal.querySelector('.search_input');
        if (input) input.focus();
      }
    };

    const closeSearch = () => {
      if (searchModal) {
        searchModal.style.display = 'none';
      }
    };

    if (searchIcon) searchIcon.addEventListener('click', openSearch);
    if (searchClose) searchClose.addEventListener('click', closeSearch);

    // ----------------------------------------------------
    // 4. Password Show / Hide Toggle
    // ----------------------------------------------------
    const secureInputs = root.querySelectorAll('.secure-input .show-pass');
    secureInputs.forEach((icon) => {
      const togglePass = () => {
        const input = icon.closest('.secure-input')?.querySelector('input');
        if (!input) return;
        if (input.type === 'password') {
          input.type = 'text';
          icon.innerHTML = '<i class="ri-eye-off-line fa-regular fa-eye-slash"></i>';
        } else {
          input.type = 'password';
          icon.innerHTML = '<i class="ri-eye-line fa-regular fa-eye"></i>';
        }
      };
      icon.addEventListener('click', togglePass);
    });

    // ----------------------------------------------------
    // 5. Date of Birth Limits (Must be at least 18 years old)
    // ----------------------------------------------------
    const dobInput = root.querySelector('#volunteerdob');
    if (dobInput) {
      const today = new Date();
      const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
      dobInput.max = maxDate.toISOString().split('T')[0];
      dobInput.min = '1900-01-01';
    }

    // ----------------------------------------------------
    // 6. Mobile Volunteer Login (Phone vs Email Toggle)
    // ----------------------------------------------------
    const volTypePhone = root.querySelector('#volTypePhone');
    const volTypeEmail = root.querySelector('#volTypeEmail');
    const volPhoneContainer = root.querySelector('#volPhoneContainer');
    const volEmailContainer = root.querySelector('#volEmailContainer');
    const phoneInput = root.querySelector('#vol-phone-mobile');
    const emailInput = root.querySelector('#vol-email-mobile');
    const inlineError = root.querySelector('#email-phone-error');

    const handleLoginTypeChange = () => {
      if (volTypeEmail && volTypeEmail.checked) {
        if (volPhoneContainer) volPhoneContainer.style.display = 'none';
        if (volEmailContainer) volEmailContainer.style.display = 'block';
        if (phoneInput) phoneInput.value = '';
        if (emailInput) emailInput.focus();
      } else {
        if (volPhoneContainer) volPhoneContainer.style.display = 'block';
        if (volEmailContainer) volEmailContainer.style.display = 'none';
        if (emailInput) emailInput.value = '';
        if (phoneInput) phoneInput.focus();
      }
      if (inlineError) inlineError.style.display = 'none';
    };

    if (volTypePhone) volTypePhone.addEventListener('change', handleLoginTypeChange);
    if (volTypeEmail) volTypeEmail.addEventListener('change', handleLoginTypeChange);

    // ----------------------------------------------------
    // 7. OTP Modals and Resend Timers
    // ----------------------------------------------------
    const phoneOtpModal = root.querySelector('#phoneOtpModal');
    const gmailOtpModal = root.querySelector('#gmailOtpModal');
    let phoneTimerInterval = null;
    let gmailTimerInterval = null;
    let currentIdentifier = '';

    const startResendTimer = (type) => {
      let timeLeft = 60;
      const resendLink = root.querySelector(`#${type}-resend-link`);
      const timerSpan = root.querySelector(`#${type}-timer`);

      if (resendLink) resendLink.style.display = 'none';
      if (timerSpan) {
        timerSpan.style.display = 'inline';
        timerSpan.textContent = `Resend in ${timeLeft}s`;
      }

      if (type === 'phone' && phoneTimerInterval) clearInterval(phoneTimerInterval);
      if (type === 'gmail' && gmailTimerInterval) clearInterval(gmailTimerInterval);

      const interval = setInterval(() => {
        timeLeft--;
        if (timerSpan) timerSpan.textContent = `Resend in ${timeLeft}s`;
        if (timeLeft <= 0) {
          clearInterval(interval);
          if (resendLink) resendLink.style.display = 'inline';
          if (timerSpan) timerSpan.style.display = 'none';
        }
      }, 1000);

      if (type === 'phone') phoneTimerInterval = interval;
      else gmailTimerInterval = interval;
    };

    const openOtpModal = (type, identifier) => {
      currentIdentifier = identifier;
      const modal = type === 'phone' ? phoneOtpModal : gmailOtpModal;
      if (!modal) return;

      const span = modal.querySelector('.otp-destination-text span');
      if (span) {
        if (type === 'phone') {
          // Mask phone: e.g. +91 98*** ***10
          const clean = identifier.replace(/\s+/g, '');
          const masked = clean.length > 5 
            ? clean.substring(0, clean.length - 7) + '*** ***' + clean.slice(-2)
            : identifier;
          span.textContent = masked;
        } else {
          // Mask email: e.g. p***@gmail.com
          const parts = identifier.split('@');
          const masked = parts[0].charAt(0) + '***@' + (parts[1] || 'gmail.com');
          span.textContent = masked;
        }
      }

      modal.style.display = 'block';
      const inputs = modal.querySelectorAll('.otp-box');
      inputs.forEach((input) => (input.value = ''));
      const firstInput = modal.querySelector(`#${type === 'phone' ? 'p' : 'g'}-otp-1`);
      if (firstInput) firstInput.focus();

      const verifyBtn = modal.querySelector('.verify-btn');
      if (verifyBtn) verifyBtn.disabled = true;

      const errorDiv = modal.querySelector('.error-message');
      if (errorDiv) errorDiv.style.display = 'none';

      // Inject 1-click Demo OTP button inside OTP Modal if not present
      let demoOtpBox = modal.querySelector('.vol-demo-otp-box');
      if (!demoOtpBox) {
        demoOtpBox = document.createElement('div');
        demoOtpBox.className = 'vol-demo-otp-box';
        demoOtpBox.style.cssText = `
          background: #f0fdf4;
          border: 1px dashed #16a34a;
          border-radius: 8px;
          padding: 8px 12px;
          margin: 12px auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          max-width: 320px;
        `;
        demoOtpBox.innerHTML = `
          <span style="font-size: 12px; color: #15803d; font-weight: 600;">⚡ Demo OTP: 123456</span>
          <button type="button" class="btn-fill-vol-otp" style="
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
            Fill 123456
          </button>
        `;
        const modalForm = modal.querySelector('form');
        if (modalForm) {
          modalForm.insertBefore(demoOtpBox, modalForm.firstChild);
        }

        const fillBtn = demoOtpBox.querySelector('.btn-fill-vol-otp');
        if (fillBtn) {
          fillBtn.addEventListener('click', () => {
            const boxes = modal.querySelectorAll('.otp-box');
            ['1', '2', '3', '4', '5', '6'].forEach((digit, i) => {
              if (boxes[i]) {
                boxes[i].value = digit;
              }
            });
            if (verifyBtn) verifyBtn.disabled = false;
            if (errorDiv) errorDiv.style.display = 'none';
            if (boxes[5]) boxes[5].focus();
          });
        }
      }

      startResendTimer(type);
    };

    const closeOtpModal = (type) => {
      const modal = type === 'phone' ? phoneOtpModal : gmailOtpModal;
      if (modal) modal.style.display = 'none';
      if (type === 'phone' && phoneTimerInterval) clearInterval(phoneTimerInterval);
      if (type === 'gmail' && gmailTimerInterval) clearInterval(gmailTimerInterval);
    };

    // Close buttons on OTP modals
    const backArrows = root.querySelectorAll('.modal-pho-emi .back-arrow');
    backArrows.forEach((arrow) => {
      arrow.addEventListener('click', () => {
        closeOtpModal('phone');
        closeOtpModal('gmail');
      });
    });

    // Resend links
    const phoneResendLink = root.querySelector('#phone-resend-link');
    if (phoneResendLink) {
      phoneResendLink.addEventListener('click', (e) => {
        e.preventDefault();
        showToast('OTP resent successfully to your mobile number!', 'info');
        startResendTimer('phone');
      });
    }

    const gmailResendLink = root.querySelector('#gmail-resend-link');
    if (gmailResendLink) {
      gmailResendLink.addEventListener('click', (e) => {
        e.preventDefault();
        showToast('OTP resent successfully to your email address!', 'info');
        startResendTimer('gmail');
      });
    }

    // ----------------------------------------------------
    // 8. 6-Digit OTP Box Controls (Input, Backspace, Paste)
    // ----------------------------------------------------
    const setupOtpBoxes = (formId) => {
      const form = root.querySelector(`#${formId}`);
      if (!form) return;
      const inputs = [...form.querySelectorAll('.otp-box')];
      const verifyBtn = form.querySelector('.verify-btn');

      const checkFilled = () => {
        const allFilled = inputs.every((inp) => inp.value.trim().length > 0);
        if (verifyBtn) verifyBtn.disabled = !allFilled;
      };

      inputs.forEach((input, idx) => {
        input.addEventListener('input', () => {
          input.value = input.value.replace(/[^0-9]/g, '').slice(0, 1);
          if (input.value && idx < inputs.length - 1) {
            inputs[idx + 1].focus();
          }
          checkFilled();
        });

        input.addEventListener('keydown', (e) => {
          if (e.key === 'Backspace' && !input.value && idx > 0) {
            e.preventDefault();
            inputs[idx - 1].focus();
          }
        });

        input.addEventListener('paste', (e) => {
          e.preventDefault();
          const pasted = e.clipboardData.getData('text').trim();
          if (/^\d+$/.test(pasted)) {
            const digits = pasted.split('');
            digits.forEach((d, i) => {
              if (idx + i < inputs.length) {
                inputs[idx + i].value = d;
              }
            });
            const nextIdx = Math.min(idx + digits.length, inputs.length - 1);
            inputs[nextIdx].focus();
            checkFilled();
          }
        });
      });
    };

    setupOtpBoxes('phoneOtpForm');
    setupOtpBoxes('gmailOtpForm');

    // ----------------------------------------------------
    // 9. Mobile Form Submit (Phone / Email -> Open OTP)
    // ----------------------------------------------------
    const signupForm = root.querySelector('#signupForm');
    if (signupForm) {
      let mobDemoBanner = root.querySelector('#volunteerMobileDemoBanner');
      if (!mobDemoBanner) {
        mobDemoBanner = document.createElement('div');
        mobDemoBanner.id = 'volunteerMobileDemoBanner';
        mobDemoBanner.style.cssText = `
          background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
          border: 1.5px dashed #16a34a;
          border-radius: 10px;
          padding: 10px 14px;
          margin-bottom: 16px;
          text-align: center;
        `;
        mobDemoBanner.innerHTML = `
          <div style="font-size: 12px; font-weight: 700; color: #15803d; margin-bottom: 4px;">
            ⚡ Demo Mode: Quick Volunteer Signup
          </div>
          <div style="font-size: 11px; color: #166534; margin-bottom: 8px;">
            Demo OTP: Use 123456 to verify instantly
          </div>
          <button type="button" id="btnFillMobVolDemo" style="
            background: #16a34a;
            color: #ffffff;
            border: none;
            padding: 5px 12px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
          ">
            ⚡ Fill Sample Mobile Details
          </button>
        `;
        signupForm.parentNode.insertBefore(mobDemoBanner, signupForm);

        const btnFillMob = mobDemoBanner.querySelector('#btnFillMobVolDemo');
        if (btnFillMob) {
          btnFillMob.addEventListener('click', () => {
            if (volTypePhone) volTypePhone.checked = true;
            if (toggleInputType) toggleInputType();
            if (phoneInput) {
              phoneInput.value = '9951672673';
              phoneInput.focus();
            }
            if (emailInput) {
              emailInput.value = 'volunteer@gmail.com';
            }
            showToast('⚡ Sample volunteer number (9951672673) filled! Demo OTP: Use 123456 to verify instantly.', 'success');
          });
        }
      }

      signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (inlineError) inlineError.style.display = 'none';

        if (volTypeEmail && volTypeEmail.checked) {
          const emailVal = emailInput ? emailInput.value.trim() : '';
          const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          if (!emailVal) {
            if (inlineError) {
              inlineError.textContent = 'Please enter your email address.';
              inlineError.style.display = 'block';
            }
            if (emailInput) emailInput.focus();
            return;
          }
          if (!emailRegex.test(emailVal)) {
            if (inlineError) {
              inlineError.textContent = 'Please enter a valid email address.';
              inlineError.style.display = 'block';
            }
            if (emailInput) emailInput.focus();
            return;
          }
          openOtpModal('gmail', emailVal);
          showToast(`OTP sent to ${emailVal}`, 'success');
        } else {
          const phoneVal = phoneInput ? phoneInput.value.trim() : '';
          const cleanPhone = phoneVal.replace(/[^0-9]/g, '');
          if (!cleanPhone || cleanPhone.length < 10) {
            if (inlineError) {
              inlineError.textContent = 'Please enter a valid 10-digit mobile number.';
              inlineError.style.display = 'block';
            }
            if (phoneInput) phoneInput.focus();
            return;
          }
          openOtpModal('phone', phoneVal);
          showToast(`OTP sent to ${phoneVal}`, 'success');
        }
      });
    }

    // ----------------------------------------------------
    // 10. OTP Form Submissions
    // ----------------------------------------------------
    const phoneOtpForm = root.querySelector('#phoneOtpForm');
    if (phoneOtpForm) {
      phoneOtpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const inputs = phoneOtpForm.querySelectorAll('.otp-box');
        let code = '';
        inputs.forEach((inp) => (code += inp.value));
        if (code.length === 6) {
          showToast('Volunteer phone verified successfully!', 'success');
          closeOtpModal('phone');
          setTimeout(() => {
            navigate('/volunteer/volunteer_service');
          }, 800);
        } else {
          const err = phoneOtpForm.querySelector('#phone-otp-error');
          if (err) {
            err.textContent = 'Please enter a valid 6-digit OTP code.';
            err.style.display = 'block';
          }
        }
      });
    }

    const gmailOtpForm = root.querySelector('#gmailOtpForm');
    if (gmailOtpForm) {
      gmailOtpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const inputs = gmailOtpForm.querySelectorAll('.otp-box');
        let code = '';
        inputs.forEach((inp) => (code += inp.value));
        if (code.length === 6) {
          showToast('Volunteer email verified successfully!', 'success');
          closeOtpModal('gmail');
          setTimeout(() => {
            navigate('/volunteer/volunteer_service');
          }, 800);
        } else {
          const err = gmailOtpForm.querySelector('#gmail-otp-error');
          if (err) {
            err.textContent = 'Please enter a valid 6-digit OTP code.';
            err.style.display = 'block';
          }
        }
      });
    }

    // ----------------------------------------------------
    // 11. Desktop Volunteer Registration Form Submit & Demo Fill
    // ----------------------------------------------------
    const deskForm = root.querySelector('.donation-form.causes_form');
    if (deskForm) {
      let deskDemoBanner = root.querySelector('#volunteerDeskDemoBanner');
      if (!deskDemoBanner) {
        deskDemoBanner = document.createElement('div');
        deskDemoBanner.id = 'volunteerDeskDemoBanner';
        deskDemoBanner.style.cssText = `
          background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
          border: 1.5px dashed #16a34a;
          border-radius: 12px;
          padding: 14px 18px;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          box-shadow: 0 4px 14px rgba(22, 163, 74, 0.08);
        `;
        deskDemoBanner.innerHTML = `
          <div>
            <div style="font-size: 14px; font-weight: 700; color: #15803d; display: flex; align-items: center; gap: 6px;">
              <span style="font-size: 16px;">⚡</span> Demo Mode: Volunteer Onboarding
            </div>
            <div style="font-size: 12px; color: #166534; margin-top: 2px;">
              Demo OTP: Use 123456 to verify instantly
            </div>
          </div>
          <button type="button" id="btnFillDeskVolDemo" style="
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
            <span>⚡ Fill Sample Volunteer Details</span>
          </button>
        `;
        deskForm.parentNode.insertBefore(deskDemoBanner, deskForm);

        const btnFillDesk = deskDemoBanner.querySelector('#btnFillDeskVolDemo');
        if (btnFillDesk) {
          btnFillDesk.addEventListener('click', () => {
            const nameInput = deskForm.querySelector('#vol-name');
            const mobInput = deskForm.querySelector('#vol-mob');
            const emailInputDesk = deskForm.querySelector('#vol-email');
            const genderSelect = deskForm.querySelector('select[name="gender"]');
            const dobInput = deskForm.querySelector('#volunteerdob');
            const bloodSelect = deskForm.querySelector('select[name="blood_group"]');
            const streetInput = deskForm.querySelector('#vol-street');
            const cityInput = deskForm.querySelector('#vol-add');
            const activeBlood = deskForm.querySelector('select[name="active_blood_donor"]');
            const passInput = deskForm.querySelector('#vol-password');
            const confirmPass = deskForm.querySelector('#vol-confirm');
            const volTypeSelect = deskForm.querySelector('#vol-file');

            if (nameInput) nameInput.value = 'Ramesh Varma';
            if (mobInput) mobInput.value = '9951672673';
            if (emailInputDesk) emailInputDesk.value = 'volunteer@gmail.com';
            if (genderSelect) genderSelect.value = '1';
            if (dobInput) dobInput.value = '1998-05-15';
            if (bloodSelect) bloodSelect.value = '7';
            if (streetInput) streetInput.value = '1-42, Main Road, Lankala Gannavaram';
            if (cityInput) cityInput.value = 'Rajamahendravaram';
            if (activeBlood) activeBlood.value = '1';
            if (passInput) passInput.value = 'pass123';
            if (confirmPass) confirmPass.value = 'pass123';
            if (volTypeSelect) volTypeSelect.value = 'Individuval Volunteer';

            showToast('⚡ Sample volunteer details filled! Demo OTP: Use 123456 to verify instantly.', 'success');
          });
        }
      }

      deskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameInput = deskForm.querySelector('#vol-name');
        const mobInput = deskForm.querySelector('#vol-mob');
        const emailInputDesk = deskForm.querySelector('#vol-email');
        const passInput = deskForm.querySelector('#vol-password');
        const confirmPass = deskForm.querySelector('#vol-confirm');

        if (!nameInput?.value.trim()) {
          showToast('Please enter your full name.', 'error');
          nameInput?.focus();
          return;
        }

        if (!mobInput?.value.trim()) {
          showToast('Please enter your mobile number.', 'error');
          mobInput?.focus();
          return;
        }

        if (!emailInputDesk?.value.trim()) {
          showToast('Please enter your email address.', 'error');
          emailInputDesk?.focus();
          return;
        }

        if (!passInput?.value) {
          showToast('Please create a password.', 'error');
          passInput?.focus();
          return;
        }

        if (passInput?.value !== confirmPass?.value) {
          showToast('Passwords do not match. Please verify.', 'error');
          confirmPass?.focus();
          return;
        }

        showToast('Volunteer application submitted successfully! Welcome to Vrishasena Foundation.', 'success');
        deskForm.reset();
      });
    }

    // Cleanup on unmount
    return () => {
      root.removeEventListener('click', handleLinkClick);
      if (menuIcon) menuIcon.removeEventListener('click', openMobileNav);
      if (closeMenu) closeMenu.removeEventListener('click', closeMobileNav);
      if (searchIcon) searchIcon.removeEventListener('click', openSearch);
      if (searchClose) searchClose.removeEventListener('click', closeSearch);
      if (phoneTimerInterval) clearInterval(phoneTimerInterval);
      if (gmailTimerInterval) clearInterval(gmailTimerInterval);
      body.classList.remove('mobile-nav-open');
    };
  }, [navigate]);

  return (
    <div className="volunteer-page-wrapper" ref={containerRef}>
      <div dangerouslySetInnerHTML={{ __html: volunteerHtml }} />
      {toast.show && (
        <div className={`volunteer-toast ${toast.type}`}>
          {toast.message}
        </div>
      )}
    </div>
  );
}
