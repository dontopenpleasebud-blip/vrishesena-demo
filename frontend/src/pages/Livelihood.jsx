import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Livelihood.css';
import { livelihoodHtml } from './LivelihoodContent.js';

export default function Livelihood() {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Livelihood — College & Career CrowdFund | Vrishasena Foundation';
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
        href === '/livelihood' ||
        href === '/livelihood/' ||
        href === '/livelihood/index.html'
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
    const mobBtns = root.querySelectorAll('.all_categories_data');
    const mobCards = root.querySelectorAll('#campaignContainerMob .feature-container');
    const searchMob = root.querySelector('#searchInputMob');
    const mobileNoResults = root.querySelector('#mobileNoResults');

    let currentSelectedMobCategory = 'all';

    const filterMobileCards = () => {
      const query = (searchMob ? searchMob.value : '').toLowerCase().trim();
      let count = 0;

      mobCards.forEach((card) => {
        const cardCats = (card.dataset.category || '').split(',').map(normalizeSlug);
        const matchesCategory =
          currentSelectedMobCategory === 'all' ||
          cardCats.includes(currentSelectedMobCategory);

        const cardName = (card.dataset.name || '').toLowerCase();
        const matchesSearch = !query || cardName.includes(query);

        const show = matchesCategory && matchesSearch;
        card.style.display = show ? 'block' : 'none';
        if (show) count++;
      });

      if (mobileNoResults) {
        mobileNoResults.style.display = count === 0 ? 'block' : 'none';
      }
    };

    const handleMobCategoryClick = (btn) => {
      mobBtns.forEach((b) => b.classList.remove('categories_active'));
      btn.classList.add('categories_active');
      currentSelectedMobCategory = normalizeSlug(btn.dataset.category);
      filterMobileCards();
    };

    mobBtns.forEach((btn) => {
      btn.addEventListener('click', () => handleMobCategoryClick(btn));
    });

    const handleSearchMobInput = () => {
      filterMobileCards();
    };

    if (searchMob) {
      searchMob.addEventListener('input', handleSearchMobInput);
    }

    // ===== Desktop filtering =====
    const deskItems = root.querySelectorAll('.category_item');
    const deskCards = root.querySelectorAll('#card-container .category_card');
    const desktopNoResults = root.querySelector('#desktopNoResults');

    const handleDeskCategoryClick = (item) => {
      deskItems.forEach((i) => i.classList.remove('active_category'));
      item.classList.add('active_category');
      const sel = normalizeSlug(item.dataset.category);

      let count = 0;
      deskCards.forEach((card) => {
        const cats = (card.dataset.category || '').split(',').map(normalizeSlug);
        const show = sel === 'all' || cats.includes(sel);
        if (card.parentElement) {
          card.parentElement.style.display = show ? 'block' : 'none';
        }
        if (show) count++;
      });

      if (desktopNoResults) {
        desktopNoResults.style.display = count === 0 ? 'block' : 'none';
      }
    };

    deskItems.forEach((item) => {
      item.addEventListener('click', () => handleDeskCategoryClick(item));
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
      if (searchMob) searchMob.removeEventListener('input', handleSearchMobInput);
      if (menuIcon) menuIcon.removeEventListener('click', openSidebar);
      if (closeMenu) closeMenu.removeEventListener('click', closeSidebar);
      document.removeEventListener('click', outsideClick);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [navigate]);

  return (
    <div
      ref={containerRef}
      className="livelihood-page-container"
      dangerouslySetInnerHTML={{ __html: livelihoodHtml }}
    />
  );
}
