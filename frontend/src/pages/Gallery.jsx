import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { galleryHtml } from './GalleryContent.js';

export default function Gallery() {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  // Lightbox Modal state
  const [lightbox, setLightbox] = useState({
    isOpen: false,
    src: '',
    alt: '',
    title: '',
    badge: '',
    index: 0,
    items: [],
  });

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

      // If it's a gallery image click, handle lightbox preview
      if (a.classList.contains('gallery_img')) {
        e.preventDefault();
        e.stopPropagation();

        const img = a.querySelector('img');
        const card = a.closest('.gallery_container_page');
        const content = card?.querySelector('.gallery_content');
        const badge = content?.querySelector('span')?.textContent.trim() || '';
        const title = content?.querySelector('h4')?.textContent.trim() || '';

        // Gather currently visible gallery items for next/prev navigation
        const visibleLinks = Array.from(
          root.querySelectorAll('.gallery_row > div')
        )
          .filter((col) => col.style.display !== 'none')
          .map((col) => {
            const linkEl = col.querySelector('a.gallery_img');
            const imgEl = linkEl?.querySelector('img');
            const contEl = col.querySelector('.gallery_content');
            return {
              src: linkEl?.getAttribute('href') || imgEl?.getAttribute('src') || '',
              alt: imgEl?.getAttribute('alt') || 'Gallery Image',
              badge: contEl?.querySelector('span')?.textContent.trim() || '',
              title: contEl?.querySelector('h4')?.textContent.trim() || '',
            };
          });

        const clickedSrc = a.getAttribute('href') || img?.getAttribute('src') || '';
        const curIdx = visibleLinks.findIndex((item) => item.src === clickedSrc);

        setLightbox({
          isOpen: true,
          src: clickedSrc,
          alt: img?.getAttribute('alt') || 'Gallery Image',
          title: title,
          badge: badge,
          index: curIdx >= 0 ? curIdx : 0,
          items: visibleLinks,
        });
        return;
      }

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
      if (href === '/gallery' || href === '/gallery/index.html') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate(href);
      }
    };

    root.addEventListener('click', handleLinkClick);

    // 2. Category Filter Chips
    const categoryChips = root.querySelectorAll('.gallery_category_list');
    const galleryCols = root.querySelectorAll('.gallery_row > div');

    const handleCategoryClick = (chip) => {
      categoryChips.forEach((c) => c.classList.remove('gallery_category_list_active'));
      chip.classList.add('gallery_category_list_active');

      const filterKey = chip.textContent.trim().toLowerCase().replace(/ /g, '_');

      galleryCols.forEach((col) => {
        if (filterKey === 'all_images' || col.classList.contains(filterKey)) {
          col.style.display = 'block';
        } else {
          col.style.display = 'none';
        }
      });
    };

    categoryChips.forEach((chip) => {
      chip.addEventListener('click', () => handleCategoryClick(chip));
    });

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
      if (menuIcon) menuIcon.removeEventListener('click', openSidebar);
      if (closeMenu) closeMenu.removeEventListener('click', closeSidebar);
      document.removeEventListener('click', outsideClick);
      if (searchIcon) searchIcon.removeEventListener('click', openSearch);
      if (searchClose) searchClose.removeEventListener('click', closeSearch);
      if (eduTab) eduTab.removeEventListener('click', onEduClick);
      if (healthTab) healthTab.removeEventListener('click', onHealthClick);
    };
  }, [navigate]);

  // Lightbox keyboard controls (ESC, ArrowLeft, ArrowRight)
  useEffect(() => {
    if (!lightbox.isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setLightbox((prev) => ({ ...prev, isOpen: false }));
      } else if (e.key === 'ArrowRight' && lightbox.items.length > 1) {
        const nextIdx = (lightbox.index + 1) % lightbox.items.length;
        const nextItem = lightbox.items[nextIdx];
        setLightbox((prev) => ({
          ...prev,
          index: nextIdx,
          src: nextItem.src,
          alt: nextItem.alt,
          title: nextItem.title,
          badge: nextItem.badge,
        }));
      } else if (e.key === 'ArrowLeft' && lightbox.items.length > 1) {
        const prevIdx = (lightbox.index - 1 + lightbox.items.length) % lightbox.items.length;
        const prevItem = lightbox.items[prevIdx];
        setLightbox((prev) => ({
          ...prev,
          index: prevIdx,
          src: prevItem.src,
          alt: prevItem.alt,
          title: prevItem.title,
          badge: prevItem.badge,
        }));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightbox]);

  const showNext = (e) => {
    e.stopPropagation();
    if (!lightbox.items.length) return;
    const nextIdx = (lightbox.index + 1) % lightbox.items.length;
    const item = lightbox.items[nextIdx];
    setLightbox((prev) => ({
      ...prev,
      index: nextIdx,
      src: item.src,
      alt: item.alt,
      title: item.title,
      badge: item.badge,
    }));
  };

  const showPrev = (e) => {
    e.stopPropagation();
    if (!lightbox.items.length) return;
    const prevIdx = (lightbox.index - 1 + lightbox.items.length) % lightbox.items.length;
    const item = lightbox.items[prevIdx];
    setLightbox((prev) => ({
      ...prev,
      index: prevIdx,
      src: item.src,
      alt: item.alt,
      title: item.title,
      badge: item.badge,
    }));
  };

  return (
    <>
      <div ref={containerRef} dangerouslySetInnerHTML={{ __html: galleryHtml }} />

      {/* Lightbox Preview Modal */}
      {lightbox.isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setLightbox((prev) => ({ ...prev, isOpen: false }))}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            backgroundColor: 'rgba(0, 0, 0, 0.88)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            cursor: 'zoom-out',
            backdropFilter: 'blur(5px)',
          }}
        >
          {/* Close Button */}
          <button
            aria-label="Close Preview"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((prev) => ({ ...prev, isOpen: false }));
            }}
            style={{
              position: 'absolute',
              top: '20px',
              right: '25px',
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              color: '#ffffff',
              fontSize: '28px',
              width: '45px',
              height: '45px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 100000,
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.35)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)')}
          >
            &times;
          </button>

          {/* Prev Arrow */}
          {lightbox.items.length > 1 && (
            <button
              aria-label="Previous Image"
              onClick={showPrev}
              style={{
                position: 'absolute',
                left: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                color: '#ffffff',
                fontSize: '28px',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 100000,
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.35)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)')}
            >
              &#10094;
            </button>
          )}

          {/* Next Arrow */}
          {lightbox.items.length > 1 && (
            <button
              aria-label="Next Image"
              onClick={showNext}
              style={{
                position: 'absolute',
                right: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                color: '#ffffff',
                fontSize: '28px',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 100000,
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.35)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)')}
            >
              &#10095;
            </button>
          )}

          {/* Modal Content Box */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '90vw',
              maxHeight: '85vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'default',
            }}
          >
            <img
              src={lightbox.src}
              alt={lightbox.alt}
              style={{
                maxWidth: '100%',
                maxHeight: '75vh',
                objectFit: 'contain',
                borderRadius: '8px',
                boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
              }}
            />
            {(lightbox.title || lightbox.badge) && (
              <div
                style={{
                  marginTop: '12px',
                  color: '#ffffff',
                  textAlign: 'center',
                }}
              >
                {lightbox.badge && (
                  <span
                    style={{
                      backgroundColor: '#009dff',
                      color: '#ffffff',
                      fontSize: '12px',
                      padding: '3px 10px',
                      borderRadius: '12px',
                      marginRight: '8px',
                      display: 'inline-block',
                      fontWeight: 600,
                    }}
                  >
                    {lightbox.badge}
                  </span>
                )}
                {lightbox.title && (
                  <span style={{ fontSize: '15px', fontWeight: 500, color: '#f0f0f0' }}>
                    {lightbox.title}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
