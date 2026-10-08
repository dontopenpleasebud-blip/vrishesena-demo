import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { contactHtml } from './ContactContent.js';

export default function Contact() {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const [formStatus, setFormStatus] = useState({ isSubmitting: false, isSuccess: false, message: '' });

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    // Scroll to top on load
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Expose validation helpers globally in case inline event attributes call them
    window.validateNames = function (el) {
      if (el) el.value = el.value.replace(/[^A-Za-z\s]/g, '');
    };
    window.handlePastes = function (e) {
      e.preventDefault();
      const text = (e.clipboardData || window.clipboardData)?.getData('text') || '';
      const clean = text.replace(/[^A-Za-z\s]/g, '');
      const nameEl = root.querySelector('#name');
      if (nameEl) nameEl.value += clean;
    };

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
      if (href === '/contact' || href === '/contact/index.html') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate(href);
      }
    };

    root.addEventListener('click', handleLinkClick);

    // 2. Contact Form Submit Handler & Demo Quick Fill
    const contactForm = root.querySelector('#contactForm');
    const submitBtn = root.querySelector('#submitBtn');

    let contactDemoBanner = root.querySelector('#contactDemoBanner');
    if (!contactDemoBanner && contactForm) {
      contactDemoBanner = document.createElement('div');
      contactDemoBanner.id = 'contactDemoBanner';
      contactDemoBanner.style.cssText = `
        background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
        border: 1.5px dashed #0284c7;
        border-radius: 12px;
        padding: 14px 18px;
        margin-bottom: 24px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 12px;
        box-shadow: 0 4px 14px rgba(2, 132, 199, 0.08);
      `;
      contactDemoBanner.innerHTML = `
        <div>
          <div style="font-size: 14px; font-weight: 700; color: #0369a1; display: flex; align-items: center; gap: 6px;">
            <span style="font-size: 16px;">⚡</span> Demo Mode: Quick Inquiry Fill
          </div>
          <div style="font-size: 12px; color: #0284c7; margin-top: 2px;">
            Pre-fills sample contact message & enables instant simulation
          </div>
        </div>
        <button type="button" id="btnFillContactDemo" style="
          background: #0284c7;
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
          box-shadow: 0 2px 8px rgba(2, 132, 199, 0.25);
          transition: all 0.2s ease;
        ">
          <span>⚡ Fill Demo Contact Inquiry</span>
        </button>
      `;
      contactForm.parentNode.insertBefore(contactDemoBanner, contactForm);

      const btnFill = contactDemoBanner.querySelector('#btnFillContactDemo');
      if (btnFill) {
        btnFill.addEventListener('click', () => {
          const nameInp = contactForm.querySelector('#name');
          const emailInp = contactForm.querySelector('#email');
          const phoneInp = contactForm.querySelector('#phone');
          const addressInp = contactForm.querySelector('#address');
          const noteInp = contactForm.querySelector('#note');

          if (nameInp) nameInp.value = 'Aditya Sharma';
          if (emailInp) emailInp.value = 'aditya.sharma@example.com';
          if (phoneInp) phoneInp.value = '9951672673';
          if (addressInp) addressInp.value = 'Vijayawada, Andhra Pradesh';
          if (noteInp) noteInp.value = 'Hello Vrishasena Foundation team, I would like to learn more about your community education and food support programs. Please share details on how our company can collaborate.';

          setFormStatus({
            isSubmitting: false,
            isSuccess: true,
            message: '⚡ Sample inquiry details filled! Click "Submit Now" to test submission.',
          });
        });
      }
    }

    const handleFormSubmit = (e) => {
      e.preventDefault();

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';
      }
      setFormStatus({ isSubmitting: true, isSuccess: false, message: '' });

      // Simulate submission handling
      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Submit Now';
        }
        contactForm.reset();
        setFormStatus({
          isSubmitting: false,
          isSuccess: true,
          message: 'Thank you! Your message has been received. Our team will get in touch with you shortly.',
        });
      }, 1500);
    };

    if (contactForm) {
      contactForm.addEventListener('submit', handleFormSubmit);
    }

    // 3. Mobile Navigation Menu Toggle
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

    // 4. Search bar toggle
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

    // 5. Donate monthly modal tab pills
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
      if (contactForm) contactForm.removeEventListener('submit', handleFormSubmit);
      if (menuIcon) menuIcon.removeEventListener('click', openSidebar);
      if (closeMenu) closeMenu.removeEventListener('click', closeSidebar);
      document.removeEventListener('click', outsideClick);
      if (searchIcon) searchIcon.removeEventListener('click', openSearch);
      if (searchClose) searchClose.removeEventListener('click', closeSearch);
      if (eduTab) eduTab.removeEventListener('click', onEduClick);
      if (healthTab) healthTab.removeEventListener('click', onHealthClick);
      delete window.validateNames;
      delete window.handlePastes;
    };
  }, [navigate]);

  return (
    <>
      <div ref={containerRef} dangerouslySetInnerHTML={{ __html: contactHtml }} />

      {/* Floating Success Notification Modal / Toast */}
      {formStatus.isSuccess && (
        <div
          role="alert"
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            zIndex: 99999,
            backgroundColor: '#28a745',
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
          <span>{formStatus.message}</span>
          <button
            onClick={() => setFormStatus({ isSubmitting: false, isSuccess: false, message: '' })}
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
