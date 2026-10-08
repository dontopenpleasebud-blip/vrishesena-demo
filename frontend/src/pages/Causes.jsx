import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { causesHtml } from './CausesContent.js';

export default function Causes() {
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
      if (href === '/causes' || href === '/causes/index.html') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate(href);
      }
    };

    root.addEventListener('click', handleLinkClick);

    // 2. Desktop Category Filter
    const catTabs = root.querySelectorAll('.card_category_new .category_list');
    const catCards = root.querySelectorAll('.category_card');

    const handleCategoryClick = (tab) => {
      catTabs.forEach((t) => t.classList.remove('acitve_category'));
      tab.classList.add('acitve_category');

      const catName = tab.textContent.trim().toLowerCase();

      catCards.forEach((card) => {
        if (catName === 'all') {
          card.style.display = card.classList.contains('causes') ? 'block' : 'none';
        } else if (card.classList.contains(catName)) {
          card.style.display = 'block';
        } else {
          // Keyword matching fallback for comprehensive filtering
          const title = card.querySelector('.title')?.textContent.trim().toLowerCase() || '';
          let match = false;
          if (catName === 'food') {
            match = title.includes('biryani') || title.includes('food') || title.includes('meals') || title.includes('thirst') || title.includes('water') || title.includes('grocery') || title.includes('banana') || title.includes('egg') || title.includes('homeless');
          } else if (catName === 'birthday') {
            match = title.includes('cake') || title.includes('celebration');
          } else if (catName === 'environment' || catName === 'nature') {
            match = title.includes('tree') || title.includes('plant') || title.includes('water bowl') || title.includes('bird house');
          } else if (catName === 'animals') {
            match = title.includes('dog') || title.includes('cow') || title.includes('bird') || title.includes('stray');
          } else if (catName === 'education') {
            match = title.includes('school') || title.includes('educate') || title.includes('child') || title.includes('slippers') || title.includes('bag') || title.includes('bicycle');
          } else if (catName === 'healthcare') {
            match = title.includes('hearing') || title.includes('wheelchair') || title.includes('mother') || title.includes('hygiene') || title.includes('napkin') || title.includes('mosquito') || title.includes('care');
          } else if (catName === 'orphanage') {
            match = title.includes('child') || title.includes('gift') || title.includes('slippers') || title.includes('school') || title.includes('grocery');
          } else if (catName === 'livelihood') {
            match = title.includes('tailoring') || title.includes('bicycle') || title.includes('wheelchair') || title.includes('stove');
          }

          card.style.display = match ? 'block' : 'none';
        }
      });
    };

    catTabs.forEach((tab) => {
      tab.addEventListener('click', () => handleCategoryClick(tab));
    });

    // 3. Mobile Category Filter & Search
    const mobCatTabs = root.querySelectorAll('.all_categories .all_categories_data');
    const causeContainer = root.querySelector('#causeContainer');
    const extraCauses = root.querySelector('#extraCauses');

    mobCatTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        mobCatTabs.forEach((t) => t.classList.remove('categories_active'));
        tab.classList.add('categories_active');

        const catName = tab.querySelector('h6')?.textContent.trim().toLowerCase() || 'all';

        if (causeContainer) {
          if (catName === 'all') {
            causeContainer.style.display = 'grid';
            if (extraCauses) extraCauses.style.display = 'none';
          } else {
            if (extraCauses) {
              causeContainer.style.display = 'none';
              extraCauses.style.display = 'grid';
              const cards = extraCauses.querySelectorAll('.cause-card');
              cards.forEach((card) => {
                card.style.display = card.classList.contains(catName) ? 'block' : 'none';
              });
            }
          }
        }
      });
    });

    const searchInput = root.querySelector('#searchInput');
    if (searchInput && causeContainer) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        const baseCards = causeContainer.querySelectorAll('.base-cause');
        baseCards.forEach((card) => {
          const title = card.querySelector('h6')?.textContent.toLowerCase() || '';
          const desc = card.querySelector('span')?.textContent.toLowerCase() || '';
          if (title.includes(query) || desc.includes(query)) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    }

    // 4. Mobile sidebar toggle
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
      if (menuIcon) menuIcon.removeEventListener('click', openSidebar);
      if (closeMenu) closeMenu.removeEventListener('click', closeSidebar);
      document.removeEventListener('click', outsideClick);
      if (searchIcon) searchIcon.removeEventListener('click', openSearch);
      if (searchClose) searchClose.removeEventListener('click', closeSearch);
      if (eduTab) eduTab.removeEventListener('click', onEduClick);
      if (healthTab) healthTab.removeEventListener('click', onHealthClick);
    };
  }, [navigate]);

  return <div ref={containerRef} dangerouslySetInnerHTML={{ __html: causesHtml }} />;
}
