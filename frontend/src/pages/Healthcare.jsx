import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Healthcare.css';
import { healthcareHtml } from './HealthcareContent.js';

export default function Healthcare() {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Vrishasena Foundation || HealthCare';
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
        href === '/CrowdFundHealthcare' ||
        href === '/CrowdFundHealthcare/' ||
        href === '/CrowdFundHealthcare/index.html' ||
        href === '/healthcare' ||
        href === '/healthcare/' ||
        href === '/healthcare/index.html' ||
        href === '/medical' ||
        href === '/medical/' ||
        href === '/medical/index.html'
      ) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate(href);
      }
    };

    root.addEventListener('click', handleLinkClick);

    // ── 2. Desktop Category Filtering ──
    const deskCategoryButtons = root.querySelectorAll('.category_list');
    const deskCards = root.querySelectorAll('.category_card');

    deskCards.forEach((c) => {
      c.style.display = '';
    });

    const handleDeskCategoryClick = (btn) => {
      deskCategoryButtons.forEach((b) => b.classList.remove('active_category'));
      btn.classList.add('active_category');

      const filter = (btn.dataset.filter || 'all').toLowerCase().trim();
      deskCards.forEach((card) => {
        if (filter === 'all') {
          card.style.display = '';
        } else {
          const match = card.classList.contains(filter) || (card.dataset.category || '').toLowerCase().includes(filter);
          card.style.display = match ? '' : 'none';
        }
      });
    };

    deskCategoryButtons.forEach((btn) => {
      btn.addEventListener('click', () => handleDeskCategoryClick(btn));
    });

    // ── 3. Mobile Category & Search Filtering ──
    const mobileCategoryButtons = root.querySelectorAll('.all_categories_data');
    const mobileCampaigns = root.querySelectorAll('.feature-container');
    const searchInput = root.querySelector('#mobileSearch');

    const handleMobileCategoryClick = (btn) => {
      mobileCategoryButtons.forEach((b) => b.classList.remove('categories_active'));
      btn.classList.add('categories_active');

      const selectedCategory = (btn.dataset.category || 'all').toLowerCase().trim();
      mobileCampaigns.forEach((card) => {
        const cardCategory = (card.dataset.category || '').toLowerCase().trim();
        const show = selectedCategory === 'all' || cardCategory.includes(selectedCategory);
        card.style.display = show ? 'block' : 'none';
      });
    };

    mobileCategoryButtons.forEach((btn) => {
      btn.addEventListener('click', () => handleMobileCategoryClick(btn));
    });

    const handleSearchInput = () => {
      const query = (searchInput.value || '').toLowerCase().trim();
      mobileCampaigns.forEach((card) => {
        const patientName = (card.dataset.patient || '').toLowerCase();
        card.style.display = patientName.includes(query) ? 'block' : 'none';
      });
    };

    if (searchInput) {
      searchInput.addEventListener('input', handleSearchInput);
    }

    // ── 4. Mobile Sidebar Menu ──
    const menuIcon = root.querySelector('.menu_icon');
    const closeMenu = root.querySelector('.close-menu');
    const mobileNav = root.querySelector('.mobile_nav_version');
    const body = document.body;

    const openSidebar = (e) => {
      e.stopPropagation();
      if (mobileNav) mobileNav.classList.add('active_sidebar');
      body.classList.add('no-scroll');
      if (menuIcon) menuIcon.style.display = 'none';
      if (closeMenu) closeMenu.style.display = 'inline-block';
    };

    const closeSidebar = (e) => {
      if (e) e.stopPropagation();
      if (mobileNav) mobileNav.classList.remove('active_sidebar');
      body.classList.remove('no-scroll');
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

    // ── 5. Mobile Scroll Header ──
    let lastScrollTop = 0;
    const mobNavbar = root.querySelector('.mob_navbar_cstm');
    const bottomNav = root.querySelector('.bottom-nav');

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScrollTop) {
        if (mobNavbar) mobNavbar.classList.add('scrolled');
        if (bottomNav) bottomNav.classList.add('scrolled');
      } else {
        if (mobNavbar) mobNavbar.classList.remove('scrolled');
        if (bottomNav) bottomNav.classList.remove('scrolled');
      }
      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      root.removeEventListener('click', handleLinkClick);
      if (searchInput) searchInput.removeEventListener('input', handleSearchInput);
      if (menuIcon) menuIcon.removeEventListener('click', openSidebar);
      if (closeMenu) closeMenu.removeEventListener('click', closeSidebar);
      document.removeEventListener('click', outsideClick);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [navigate]);

  return (
    <div
      ref={containerRef}
      className="healthcare-page-container"
      dangerouslySetInnerHTML={{ __html: healthcareHtml }}
    />
  );
}
