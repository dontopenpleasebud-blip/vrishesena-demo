import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Education.css';
import { educationHtml } from './EducationContent.js';

export default function Education() {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Home One || Vrishasena Foundation || Education Crowdfunding';
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
        href === '/CrowdFundEducation/Educationindex' ||
        href === '/CrowdFundEducation/Educationindex/' ||
        href === '/CrowdFundEducation/Educationindex/index.html' ||
        href === '/education' ||
        href === '/education/' ||
        href === '/education/index.html'
      ) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate(href);
      }
    };

    root.addEventListener('click', handleLinkClick);

    // ── 2. Category & Search Filtering ──
    function normalizeSlug(str) {
      return (str || '').toLowerCase().replace(/[-_\s]/g, '');
    }

    // ===== Mobile filtering =====
    const mobileCategoryButtons = root.querySelectorAll('.all_categories_data');
    const mobileCampaigns = root.querySelectorAll('.feature-container');
    const searchInput = root.querySelector('#searchInput');
    const mobileNoResults = root.querySelector('#mobileNoResults');

    const handleMobileCategoryClick = (btn) => {
      mobileCategoryButtons.forEach((b) => b.classList.remove('categories_active'));
      btn.classList.add('categories_active');
      const selectedCategory = normalizeSlug(btn.dataset.category);

      let visibleCount = 0;
      mobileCampaigns.forEach((card) => {
        const cardCategories = (card.dataset.category || '').split(',').map(normalizeSlug);
        const show = selectedCategory === 'all' || cardCategories.includes(selectedCategory);
        card.style.display = show ? 'block' : 'none';
        if (show) visibleCount++;
      });
      if (mobileNoResults) mobileNoResults.style.display = visibleCount === 0 ? 'block' : 'none';
    };

    mobileCategoryButtons.forEach((btn) => {
      btn.addEventListener('click', () => handleMobileCategoryClick(btn));
    });

    const handleSearchInput = () => {
      const searchText = (searchInput.value || '').toLowerCase();
      let visibleCount = 0;
      mobileCampaigns.forEach((card) => {
        const studentName = (card.dataset.student || '').toLowerCase();
        const show = studentName.includes(searchText);
        card.style.display = show ? 'block' : 'none';
        if (show) visibleCount++;
      });
      if (mobileNoResults) mobileNoResults.style.display = visibleCount === 0 ? 'block' : 'none';
    };

    if (searchInput) {
      searchInput.addEventListener('input', handleSearchInput);
    }

    // ===== Desktop filtering =====
    const desktopCategoryItems = root.querySelectorAll('.category_item');
    const desktopCards = root.querySelectorAll('.category_card');
    const desktopNoResults = root.querySelector('#desktopNoResults');

    const handleDesktopCategoryClick = (item) => {
      desktopCategoryItems.forEach((i) => i.classList.remove('active_category'));
      item.classList.add('active_category');
      const selectedCategory = normalizeSlug(item.dataset.category);

      let visibleCount = 0;
      desktopCards.forEach((card) => {
        const cardCategories = (card.dataset.category || '').split(',').map(normalizeSlug);
        const show = selectedCategory === 'all' || cardCategories.includes(selectedCategory);
        if (card.parentElement) {
          card.parentElement.style.display = show ? 'block' : 'none';
        }
        if (show) visibleCount++;
      });
      if (desktopNoResults) desktopNoResults.style.display = visibleCount === 0 ? 'block' : 'none';
    };

    desktopCategoryItems.forEach((item) => {
      item.addEventListener('click', () => handleDesktopCategoryClick(item));
    });

    // ── 3. Mobile Sidebar Menu ──
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

    // ── 4. Mobile Scroll Header ──
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
      className="education-page-container"
      dangerouslySetInnerHTML={{ __html: educationHtml }}
    />
  );
}
