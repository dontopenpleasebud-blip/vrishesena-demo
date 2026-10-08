import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { newBlogHtml } from './NewBlogContent.js';

export default function NewBlog() {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    // Scroll to top on load
    window.scrollTo({ top: 0, behavior: 'instant' });

    // 1. Link Interceptor
    // Intercept clicks on links so unbuilt pages navigate to UnderConstruction
    const handleLinkClick = (e) => {
      const a = e.target.closest('a');
      if (!a) return;
      const href = a.getAttribute('href');
      if (!href) return;

      // Ignore external or anchor/hash/download links
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
      if (href === '/new-blog' || href === '/new-blog/index.html') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate(href);
      }
    };

    root.addEventListener('click', handleLinkClick);

    // 2. Desktop Corporate Member Logo Click Interaction
    const logoMap = {
      'img_1': 'content_1',
      'img_2': 'content_2',
      'img_8': 'content_8',
      'img_3': 'content_3',
      'img_4': 'content_4',
      'img_5': 'content_5',
      'img_6': 'content_6',
      'img_7': 'content_7',
    };

    const firstImg = root.querySelector('#img_1');
    if (firstImg) firstImg.classList.add('active-logo');

    const logoCleanupHandlers = [];

    Object.keys(logoMap).forEach((imgId) => {
      const img = root.querySelector(`#${imgId}`);
      if (!img) return;

      const onLogoClick = () => {
        root.querySelectorAll('.inner_content_section').forEach((el) => {
          el.classList.remove('active');
        });
        root.querySelectorAll('.image_section img').forEach((el) => {
          el.classList.remove('active-logo');
        });
        const target = root.querySelector(`#${logoMap[imgId]}`);
        if (target) target.classList.add('active');
        img.classList.add('active-logo');
      };

      img.addEventListener('click', onLogoClick);
      logoCleanupHandlers.push(() => img.removeEventListener('click', onLogoClick));
    });

    // 3. Mobile Member Carousel Auto-Scroll
    let autoScrollTimer = null;
    const isMobile = window.matchMedia('(max-width: 991.98px)').matches;
    const memberStack = root.querySelector('#mobileMemberStack');

    const handleTouchStart = () => {
      if (autoScrollTimer) {
        clearInterval(autoScrollTimer);
        autoScrollTimer = null;
      }
    };

    let startAutoScroll = () => {};

    if (isMobile && memberStack) {
      const cards = memberStack.querySelectorAll('.mobile-member-card');
      if (cards.length > 1) {
        const originalCount = cards.length;
        for (let i = 0; i < originalCount; i++) {
          memberStack.appendChild(cards[i].cloneNode(true));
        }

        let currentIndex = 0;
        const getStep = () => {
          const firstCard = memberStack.querySelector('.mobile-member-card');
          return firstCard ? firstCard.offsetWidth + 12 : 0;
        };

        startAutoScroll = () => {
          if (autoScrollTimer) return;
          autoScrollTimer = setInterval(() => {
            const step = getStep();
            if (!step) return;
            currentIndex += 1;
            memberStack.scrollTo({ left: currentIndex * step, behavior: 'smooth' });
            if (currentIndex >= originalCount) {
              setTimeout(() => {
                memberStack.scrollTo({ left: 0, behavior: 'auto' });
                currentIndex = 0;
              }, 420);
            }
          }, 2800);
        };

        startAutoScroll();
        memberStack.addEventListener('touchstart', handleTouchStart, { passive: true });
        memberStack.addEventListener('touchend', startAutoScroll);
      }
    }

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
      logoCleanupHandlers.forEach((cleanup) => cleanup());
      if (autoScrollTimer) clearInterval(autoScrollTimer);
      if (memberStack) {
        memberStack.removeEventListener('touchstart', handleTouchStart);
        memberStack.removeEventListener('touchend', startAutoScroll);
      }
      if (menuIcon) menuIcon.removeEventListener('click', openSidebar);
      if (closeMenu) closeMenu.removeEventListener('click', closeSidebar);
      document.removeEventListener('click', outsideClick);
      if (searchIcon) searchIcon.removeEventListener('click', openSearch);
      if (searchClose) searchClose.removeEventListener('click', closeSearch);
      if (eduTab) eduTab.removeEventListener('click', onEduClick);
      if (healthTab) healthTab.removeEventListener('click', onHealthClick);
    };
  }, [navigate]);

  return <div ref={containerRef} dangerouslySetInnerHTML={{ __html: newBlogHtml }} />;
}
