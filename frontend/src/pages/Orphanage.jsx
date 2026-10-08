import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Orphanage.css';
import { orphanageHtml } from './OrphanageContent.js';

export default function Orphanage() {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Orphanages in Tamil Nadu | Sponsor a Meal from Rs.30';
    const root = containerRef.current;
    if (!root) return;

    window.scrollTo({ top: 0, behavior: 'instant' });

    // ── 1. Link Interceptor for SPA Navigation ──
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
        href === '/orphanage' ||
        href === '/orphanage/' ||
        href === '/orphanage/index.html'
      ) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate(href);
      }
    };

    root.addEventListener('click', handleLinkClick);

    // ── 2. Filter & Search Logic for Orphanage Cards ──
    const chips = root.querySelectorAll('#orphFilters .orph-chip');
    const cards = root.querySelectorAll('#orphGrid .orph-card');
    const searchInput = root.querySelector('#searchInput');
    const noMatch = root.querySelector('#orphNoMatch');
    const counter = root.querySelector('#orphCount');

    let selectedType = 'all';
    let searchTerm = '';

    function filterCards() {
      let visible = 0;
      const words = searchTerm.split(/\s+/).filter(Boolean);

      cards.forEach((card) => {
        const cardType = (card.dataset.type || '').toLowerCase().trim();
        const haystack = (card.dataset.search || card.dataset.name || '').toLowerCase();
        const typeMatch = selectedType === 'all' || cardType === selectedType;
        const searchMatch = !words.length || words.some((w) => haystack.includes(w));
        const show = typeMatch && searchMatch;
        card.style.display = show ? '' : 'none';
        if (show) visible++;
      });

      if (cards.length > 0) {
        if (noMatch) noMatch.style.display = visible === 0 ? '' : 'none';
        if (counter) {
          counter.textContent = visible + ' home' + (visible === 1 ? '' : 's') + ' available';
        }
      }
    }

    const handleChipClick = (chip) => {
      selectedType = (chip.dataset.type || 'all').toLowerCase().trim();
      chips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      filterCards();
    };

    chips.forEach((chip) => {
      chip.addEventListener('click', () => handleChipClick(chip));
    });

    if (searchInput) {
      searchInput.addEventListener('input', () => {
        searchTerm = searchInput.value.toLowerCase().trim();
        filterCards();
      });
    }

    filterCards();

    // ── 3. Desktop Hero Slideshow ──
    const slides = root.querySelectorAll('.orph-slide');
    let currentSlide = 0;
    let slideInterval = null;

    if (slides.length > 1) {
      slideInterval = setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
      }, 3000);
    }

    // ── 4. Impact Counters Animation ──
    const counters = root.querySelectorAll('.orph-counter');
    const formatNum = (n) => (n >= 1000 ? (n / 1000).toFixed(n % 1000 === 0 ? 0 : 1) + 'k' : Math.floor(n));
    function runCounter(el) {
      const target = parseInt(el.dataset.target, 10) || 0;
      const dur = 1500;
      const start = performance.now();
      function tick(now) {
        const p = Math.min((now - start) / dur, 1);
        const val = Math.floor(target * (1 - Math.pow(1 - p, 3)));
        el.textContent = formatNum(val);
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = formatNum(target);
      }
      requestAnimationFrame(tick);
    }

    if ('IntersectionObserver' in window) {
      const cIo = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            runCounter(e.target);
            cIo.unobserve(e.target);
          }
        });
      }, { threshold: 0.4 });
      counters.forEach((c) => cIo.observe(c));
    } else {
      counters.forEach(runCounter);
    }

    // ── 5. Scroll Reveals ──
    const reveals = root.querySelectorAll('.orph-reveal');
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add('in'), i * 60);
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
      reveals.forEach((el) => io.observe(el));
    } else {
      reveals.forEach((el) => el.classList.add('in'));
    }

    // ── 6. Mobile Today/Tomorrow Dates ──
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);

    const formatDate = (d) => String(d.getDate()).padStart(2, '0') + ' ' + months[d.getMonth()];
    const todayEl = root.querySelector('#today-date');
    const tomorrowEl = root.querySelector('#tomorrow-date');
    if (todayEl && tomorrowEl) {
      todayEl.textContent = formatDate(now);
      tomorrowEl.textContent = formatDate(tomorrow);
    }

    // ── 7. Mobile Sidebar Menu ──
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

    // ── 8. Mobile Scroll Header ──
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
      if (slideInterval) clearInterval(slideInterval);
      if (menuIcon) menuIcon.removeEventListener('click', openSidebar);
      if (closeMenu) closeMenu.removeEventListener('click', closeSidebar);
      document.removeEventListener('click', outsideClick);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [navigate]);

  return (
    <div
      ref={containerRef}
      className="orphanage-page-container"
      dangerouslySetInnerHTML={{ __html: orphanageHtml }}
    />
  );
}
