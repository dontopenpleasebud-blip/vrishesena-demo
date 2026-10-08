import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './ReportBugs.css';
import { reportBugsHtml } from './ReportBugsContent.js';

export default function ReportBugs() {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Vrishasena Foundation | Report Bugs';
    const root = containerRef.current;
    if (!root) return;

    window.scrollTo({ top: 0, behavior: 'instant' });

    // ── 1. Link Interceptor ──
    const handleLinkClick = (e) => {
      const a = e.target.closest('a');
      if (!a) return;
      const href = a.getAttribute('href');
      if (!href) return;

      if (
        href.startsWith('http://') ||
        href.startsWith('https://') ||
        href.startsWith('tel:') ||
        href.startsWith('mailto:') ||
        href.startsWith('javascript:') ||
        href.endsWith('.pdf') ||
        href.includes('.pdf') ||
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
        href === '/Report_bugs' ||
        href === '/Report_bugs/' ||
        href === '/Report_bugs/index.html' ||
        href === '/report_bugs' ||
        href === '/report_bugs/' ||
        href === '/report-bugs' ||
        href === '/report-bugs/'
      ) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate(href);
      }
    };

    root.addEventListener('click', handleLinkClick);

    // ── 2. Mobile Sidebar Toggle ──
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

    // ── 3. Search Bar Toggle ──
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

    // ── 4. File Upload Label Update ──
    window.updateFileLabel = (input) => {
      const label = root.querySelector('#fileUploadLabel');
      if (!label) return;
      const mainText = label.querySelector('.rb-file-main');
      const subText = label.querySelector('.rb-file-sub');
      const icon = label.querySelector('.rb-file-icon i');

      if (input.files && input.files[0]) {
        const file = input.files[0];
        const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
        if (mainText) mainText.textContent = file.name;
        if (subText) subText.textContent = sizeMB + ' MB';
        if (icon) icon.className = 'fa fa-check-circle';
        label.classList.add('rb-file-selected');
      } else {
        if (mainText) mainText.textContent = 'Tap to attach a screenshot';
        if (subText) subText.textContent = 'JPG, PNG, GIF up to 10MB';
        if (icon) icon.className = 'fa fa-cloud-upload';
        label.classList.remove('rb-file-selected');
      }
    };

    // ── 5. Form Submission Feedback & Demo Quick Fill ──
    const form = root.querySelector('#reportBugForm');
    const submitBtn = root.querySelector('#submitBtn');

    let bugDemoBanner = root.querySelector('#reportBugDemoBanner');
    if (!bugDemoBanner && form) {
      bugDemoBanner = document.createElement('div');
      bugDemoBanner.id = 'reportBugDemoBanner';
      bugDemoBanner.style.cssText = `
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
      bugDemoBanner.innerHTML = `
        <div>
          <div style="font-size: 14px; font-weight: 700; color: #15803d; display: flex; align-items: center; gap: 6px;">
            <span style="font-size: 16px;">⚡</span> Demo Mode: Bug Tracking Simulation
          </div>
          <div style="font-size: 12px; color: #166534; margin-top: 2px;">
            Pre-fills sample bug report data for instant UI verification
          </div>
        </div>
        <button type="button" id="btnFillBugDemo" style="
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
          <span>⚡ Fill Demo Bug Report</span>
        </button>
      `;
      form.parentNode.insertBefore(bugDemoBanner, form);

      const btnFill = bugDemoBanner.querySelector('#btnFillBugDemo');
      if (btnFill) {
        btnFill.addEventListener('click', () => {
          const nameInp = form.querySelector('#name');
          const emailInp = form.querySelector('#email');
          const phoneInp = form.querySelector('#phone');
          const titleInp = form.querySelector('#bug_title');
          const descInp = form.querySelector('#bug_desc');

          if (nameInp) nameInp.value = 'Suresh Kumar';
          if (emailInp) emailInp.value = 'suresh.k@example.com';
          if (phoneInp) phoneInp.value = '9951672673';
          if (titleInp) titleInp.value = 'Responsive Navigation Layout Check';
          if (descInp) descInp.value = 'Tested website responsiveness across mobile and desktop viewpoints. Layout is rendering cleanly with zero layout shift.';
        });
      }
    }

    const handleFormSubmit = (e) => {
      e.preventDefault();
      if (submitBtn) {
        submitBtn.disabled = true;
        const textSpan = submitBtn.querySelector('span');
        const icon = submitBtn.querySelector('i');
        if (textSpan) textSpan.textContent = 'Submitting...';
        if (icon) icon.className = 'fa fa-spinner fa-spin';

        setTimeout(() => {
          submitBtn.disabled = false;
          if (textSpan) textSpan.textContent = 'Submit Bug Report';
          if (icon) icon.className = 'fa fa-paper-plane';

          // Show success modal or alert
          const successModal = root.querySelector('#successModal');
          if (successModal) {
            successModal.classList.add('show');
            successModal.style.display = 'block';
          } else {
            alert('Thank you! Your bug report has been submitted successfully.');
          }
        }, 1500);
      }
    };

    if (form) form.addEventListener('submit', handleFormSubmit);

    return () => {
      root.removeEventListener('click', handleLinkClick);
      if (menuIcon) menuIcon.removeEventListener('click', openSidebar);
      if (closeMenu) closeMenu.removeEventListener('click', closeSidebar);
      document.removeEventListener('click', outsideClick);
      if (searchIcon) searchIcon.removeEventListener('click', openSearch);
      if (searchClose) searchClose.removeEventListener('click', closeSearch);
      if (form) form.removeEventListener('submit', handleFormSubmit);

      delete window.updateFileLabel;
    };
  }, [navigate]);

  return (
    <div
      ref={containerRef}
      className="report_bugs_page_wrapper"
      dangerouslySetInnerHTML={{ __html: reportBugsHtml }}
    />
  );
}
