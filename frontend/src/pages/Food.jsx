import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Food.css';
import { foodHtml } from './FoodContent.js';
import { setupFoodWizard } from './FoodWizard.js';

export default function Food() {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title =
      'Donate Food | Feed a Homeless Person @ ₹30 | Vrishasena Foundation';
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
        href === '/food' ||
        href === '/food/index.html' ||
        href === '/causes-detail/food'
      ) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate(href);
      }
    };

    root.addEventListener('click', handleLinkClick);

    // ── 2. Mobile sidebar drawer ──
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

    // ── 3. Search drawer ──
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

    // ── 4. Monthly donation tab pills ──
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
      if (showPane) showPane.classList.add('show', 'active');
      if (hidePane) hidePane.classList.remove('show', 'active');
    };

    const onEduClick = () => switchTab(eduTab, healthTab, eduPane, healthPane);
    const onHealthClick = () => switchTab(healthTab, eduTab, healthPane, eduPane);

    if (eduTab) eduTab.addEventListener('click', onEduClick);
    if (healthTab) healthTab.addEventListener('click', onHealthClick);

    // ── 5. Hero Slider (Section 1) ──
    const slides = root.querySelectorAll('.charity-hero');
    const nextHeroBtn = root.querySelector('#nextBtn');
    const prevHeroBtn = root.querySelector('#prevBtn');
    let currentHeroIndex = 0;
    let heroAutoTimer = null;

    const showHeroSlide = (index) => {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });
    };

    const nextHeroSlide = () => {
      if (!slides.length) return;
      currentHeroIndex = (currentHeroIndex + 1) % slides.length;
      showHeroSlide(currentHeroIndex);
    };

    const prevHeroSlide = () => {
      if (!slides.length) return;
      currentHeroIndex = (currentHeroIndex - 1 + slides.length) % slides.length;
      showHeroSlide(currentHeroIndex);
    };

    if (nextHeroBtn) nextHeroBtn.addEventListener('click', nextHeroSlide);
    if (prevHeroBtn) prevHeroBtn.addEventListener('click', prevHeroSlide);
    heroAutoTimer = setInterval(nextHeroSlide, 6000);

    // ── 6. Category Carousel (Section 2) ──
    const track = root.querySelector('#categoryTrack');
    const carouselContainer = root.querySelector('#carouselContainer');
    let categoryAutoInterval = null;

    if (track && carouselContainer) {
      const originalItems = Array.from(track.querySelectorAll('.category-item'));
      const totalOriginalItems = originalItems.length;

      // Duplicate for infinite seamless scroll if not already cloned
      if (!track.querySelector('.clone')) {
        const cloneCount = 2;
        for (let i = 0; i < cloneCount; i++) {
          originalItems.forEach((item) => {
            const clone = item.cloneNode(true);
            clone.classList.add('clone');
            track.appendChild(clone);
          });
        }
        for (let i = 0; i < cloneCount; i++) {
          originalItems.forEach((item) => {
            const clone = item.cloneNode(true);
            clone.classList.add('clone');
            track.prepend(clone);
          });
        }
      }

      const getScrollAmount = () => {
        const item = track.querySelector('.category-item');
        if (!item) return 170;
        const style = window.getComputedStyle(track);
        const gap = parseInt(style.gap, 10) || 30;
        return item.offsetWidth + gap;
      };

      const startCategoryAuto = () => {
        clearInterval(categoryAutoInterval);
        categoryAutoInterval = setInterval(() => {
          track.scrollLeft += getScrollAmount();
          if (track.scrollLeft >= track.scrollWidth - track.clientWidth - 10) {
            track.scrollLeft = 0;
          }
        }, 3000);
      };

      startCategoryAuto();
      carouselContainer.addEventListener('mouseenter', () => clearInterval(categoryAutoInterval));
      carouselContainer.addEventListener('mouseleave', startCategoryAuto);
    }

    // ── 7. Toggle Card ("More details" accordion in Section 3) ──
    window.toggleCard = function (btn) {
      if (!btn) return;
      const card = btn.closest('.menu-card');
      if (!card) return;
      const isExpanded = card.classList.contains('expanded');
      card.classList.toggle('expanded');
      const textSpan = btn.querySelector('.toggle-text');
      if (textSpan) {
        textSpan.textContent = isExpanded ? 'More details' : 'Less details';
      }
    };

    // ── 8. Image Popup Modal ──
    window.popImg = function (src) {
      const modal = root.querySelector('#imageModal');
      const popupImage = root.querySelector('#popupImage');
      if (!modal || !popupImage) return;
      modal.style.display = 'flex';
      popupImage.src = src;
      setTimeout(() => modal.classList.add('active'), 10);
    };

    window.closeImg = function () {
      const modal = root.querySelector('#imageModal');
      if (!modal) return;
      modal.classList.remove('active');
      setTimeout(() => {
        modal.style.display = 'none';
      }, 400);
    };

    // ── 9. Mobile Card Selection Accordion (Section 4) ──
    window.scrollToCard = function (id, el) {
      const target = root.querySelector('#wrap-' + id);
      root.querySelectorAll('.cat-card').forEach((c) => c.classList.remove('active'));
      root.querySelectorAll('.cat-label').forEach((l) => l.classList.remove('label-active'));
      if (el) {
        const cardEl = el.querySelector('.cat-card');
        const labelEl = el.querySelector('.cat-label');
        if (cardEl) cardEl.classList.add('active');
        if (labelEl) labelEl.classList.add('label-active');
      }
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        window.selectCard(id);
      }
    };

    window.selectCard = function (id) {
      const targetWrap = root.querySelector('#wrap-' + id);
      if (!targetWrap) return;
      const panel = targetWrap.querySelector('.detail-panel');
      const allWrappers = root.querySelectorAll('.card-wrapper');
      const isOpen = targetWrap.classList.contains('active');

      allWrappers.forEach((w) => {
        if (w !== targetWrap) {
          w.classList.remove('active');
          const p = w.querySelector('.detail-panel');
          if (p) p.style.maxHeight = null;
        }
      });

      if (isOpen) {
        targetWrap.classList.remove('active');
        if (panel) panel.style.maxHeight = null;
      } else {
        targetWrap.classList.add('active');
        if (panel) {
          panel.style.maxHeight = panel.scrollHeight + 'px';
        }
      }
    };

    // ── 10. About Us Section: Video Loop & Stats Counters ──
    const foodVideos = [
      { label: 'Veg Briyani', desktop: '/static/website/assets/videos/vb.mp4' },
      { label: 'Chicken Briyani', desktop: '/static/website/assets/videos/cb.mp4' },
      { label: 'Egg Briyani', desktop: '/static/website/assets/videos/eb.mp4' },
      { label: 'Egg & Milk', desktop: '/static/website/assets/videos/em.mp4' },
      { label: 'Thaali Meals', desktop: '/static/website/assets/videos/tm.mp4' },
      { label: 'Homeless Food', desktop: '/static/website/assets/videos/hf.mp4' },
    ];
    const bgColors = ['#ffffff', '#fbfaf8', '#ffffff', '#fbfaf8', '#ffffff', '#fbfaf8'];
    const video = root.querySelector('#about-video');
    const titleEl = root.querySelector('#video-label');
    const section = root.querySelector('#about-section');
    let videoIndex = 0;

    if (video && foodVideos.length) {
      const loadVideo = (i) => {
        const v = foodVideos[i];
        video.src = v.desktop;
        video.load();
        if (titleEl) titleEl.textContent = v.label;
        if (section) section.style.backgroundColor = bgColors[i % bgColors.length];
        const p = video.play();
        if (p && typeof p.catch === 'function') p.catch(() => {});
      };
      video.addEventListener('ended', () => {
        videoIndex = (videoIndex + 1) % foodVideos.length;
        loadVideo(videoIndex);
      });
      loadVideo(videoIndex);
    }

    // Stats Counter Animation
    const counters = root.querySelectorAll('.stat-number');
    const statsContainer = root.querySelector('.stats-container');
    let statsObserver = null;

    if (counters.length && statsContainer && 'IntersectionObserver' in window) {
      statsObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              counters.forEach((counter) => {
                const target = +counter.getAttribute('data-target') || 0;
                if (counter.dataset.animated !== 'true') {
                  counter.dataset.animated = 'true';
                  const startTimestamp = performance.now();
                  const animationDuration = 2000;

                  const step = (timestamp) => {
                    const progress = Math.min((timestamp - startTimestamp) / animationDuration, 1);
                    const currentValue = Math.floor(progress * target);
                    counter.textContent = currentValue;

                    if (progress < 1) {
                      window.requestAnimationFrame(step);
                    } else {
                      let finalValue = target.toString();
                      if (target === 2000 || target === 150) {
                        finalValue += '+';
                      }
                      counter.textContent = finalValue;
                    }
                  };
                  window.requestAnimationFrame(step);
                }
              });
            }
          });
        },
        { threshold: 0.2 }
      );
      statsObserver.observe(statsContainer);
    }

    // ── 11. Gallery Controls ──
    window.scrollOtherGallery = function (direction) {
      const gallery = root.querySelectorAll('.fx-gallery')[1] || root.querySelector('.fx-gallery');
      if (!gallery) return;
      const img = gallery.querySelector('.fx-img-wrapper');
      const scrollAmount = (img ? img.offsetWidth : 200) + 20;
      gallery.scrollLeft += scrollAmount * direction;
    };

    // ── 12. Setup Donation Wizard ──
    const cleanupWizard = setupFoodWizard(navigate);

    return () => {
      root.removeEventListener('click', handleLinkClick);
      if (menuIcon) menuIcon.removeEventListener('click', openSidebar);
      if (closeMenu) closeMenu.removeEventListener('click', closeSidebar);
      document.removeEventListener('click', outsideClick);
      if (searchIcon) searchIcon.removeEventListener('click', openSearch);
      if (searchClose) searchClose.removeEventListener('click', closeSearch);
      if (eduTab) eduTab.removeEventListener('click', onEduClick);
      if (healthTab) healthTab.removeEventListener('click', onHealthClick);
      if (nextHeroBtn) nextHeroBtn.removeEventListener('click', nextHeroSlide);
      if (prevHeroBtn) prevHeroBtn.removeEventListener('click', prevHeroSlide);
      clearInterval(heroAutoTimer);
      clearInterval(categoryAutoInterval);
      if (statsObserver) statsObserver.disconnect();
      cleanupWizard();

      delete window.toggleCard;
      delete window.popImg;
      delete window.closeImg;
      delete window.scrollToCard;
      delete window.selectCard;
      delete window.scrollOtherGallery;
    };
  }, [navigate]);

  return (
    <div
      ref={containerRef}
      className="food-page-wrapper"
      dangerouslySetInnerHTML={{ __html: foodHtml }}
    />
  );
}
