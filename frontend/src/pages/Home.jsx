import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { homeHtml } from './HomeContent.js';
import { fetchCauses, fetchPackages } from '../services/api';

export default function Home() {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, 4500);
  };

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    // 1. Link Interceptor
    // Intercept clicks on links so unbuilt pages navigate to UnderConstruction
    const handleLinkClick = (e) => {
      const a = e.target.closest('a');
      if (!a) return;
      const href = a.getAttribute('href');
      if (!href) return;

      // Ignore external or anchor/hash links
      if (
        href.startsWith('http://') ||
        href.startsWith('https://') ||
        href.startsWith('tel:') ||
        href.startsWith('mailto:') ||
        href.startsWith('javascript:')
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
      if (href === '/' || href === '') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate(href);
      }
    };

    root.addEventListener('click', handleLinkClick);

    // 2. Hero Slider
    let sliderTimer = null;
    const frame = root.querySelector('#video_background');
    const dotsBox = root.querySelector('#heroDots');
    if (frame) {
      const slides = Array.from(frame.querySelectorAll('.hero_slide'));
      if (slides.length > 1 && dotsBox) {
        dotsBox.innerHTML = '';
        const INTERVAL = 2500;
        let index = 0;

        const dots = slides.map((slide, i) => {
          const dot = document.createElement('button');
          dot.type = 'button';
          dot.setAttribute('role', 'tab');
          dot.setAttribute('aria-label', `Slide ${i + 1}`);
          dot.addEventListener('click', () => {
            show(i);
            restart();
          });
          dotsBox.appendChild(dot);
          return dot;
        });

        function show(next) {
          index = (next + slides.length) % slides.length;
          slides.forEach((slide, i) => {
            slide.classList.toggle('is-active', i === index);
          });
          dots.forEach((dot, i) => {
            dot.classList.toggle('is-active', i === index);
            dot.setAttribute('aria-selected', i === index ? 'true' : 'false');
          });
        }

        function restart() {
          if (sliderTimer) clearInterval(sliderTimer);
          sliderTimer = setInterval(() => {
            show(index + 1);
          }, INTERVAL);
        }

        show(0);
        restart();
      }
    }

    // 3. FAQ Accordion animation
    const faqItems = Array.from(root.querySelectorAll('.faq_section .faq_item'));
    const faqCleanups = [];

    faqItems.forEach((item) => {
      const summary = item.querySelector('summary');
      const ans = item.querySelector('.faq_answer');
      if (!summary || !ans) return;

      const toggle = (e) => {
        e.preventDefault();
        const isOpen = item.hasAttribute('open');

        if (isOpen) {
          // Collapse
          ans.style.overflow = 'hidden';
          ans.style.height = `${ans.offsetHeight}px`;
          ans.style.opacity = '1';
          void ans.offsetHeight;
          ans.style.transition = 'height 0.3s ease, padding 0.3s ease, opacity 0.3s ease';
          ans.style.height = '0px';
          ans.style.paddingTop = '0px';
          ans.style.paddingBottom = '0px';
          ans.style.opacity = '0';

          const onEnd = (ev) => {
            if (ev.propertyName !== 'height') return;
            item.removeAttribute('open');
            ans.style.transition = '';
            ans.style.height = '';
            ans.style.paddingTop = '';
            ans.style.paddingBottom = '';
            ans.style.opacity = '';
            ans.style.overflow = '';
            ans.removeEventListener('transitionend', onEnd);
          };
          ans.addEventListener('transitionend', onEnd);
        } else {
          // Close others
          faqItems.forEach((other) => {
            if (other !== item && other.hasAttribute('open')) {
              other.removeAttribute('open');
            }
          });

          // Expand
          item.setAttribute('open', '');
          ans.style.transition = 'none';
          ans.style.height = 'auto';
          ans.style.overflow = 'hidden';
          const full = ans.offsetHeight;
          ans.style.height = '0px';
          ans.style.paddingTop = '0px';
          ans.style.paddingBottom = '0px';
          ans.style.opacity = '0';
          void ans.offsetHeight;
          ans.style.transition = 'height 0.35s ease, padding 0.35s ease, opacity 0.35s ease';
          ans.style.height = `${full}px`;
          ans.style.paddingTop = '';
          ans.style.paddingBottom = '';
          ans.style.opacity = '1';

          const onEnd = (ev) => {
            if (ev.propertyName !== 'height') return;
            ans.style.transition = '';
            ans.style.height = 'auto';
            ans.style.overflow = '';
            ans.removeEventListener('transitionend', onEnd);
          };
          ans.addEventListener('transitionend', onEnd);
        }
      };

      summary.addEventListener('click', toggle);
      faqCleanups.push(() => summary.removeEventListener('click', toggle));
    });

    // 4. Video overlays
    const setupVideo = (vId, overlayId, btnId) => {
      const v = root.querySelector(`#${vId}`);
      const o = root.querySelector(`#${overlayId}`);
      const b = root.querySelector(`#${btnId}`);
      if (!v || !o || !b) return;

      let loaded = false;
      const onBtnClick = () => {
        if (!loaded) {
          const src = v.getAttribute('data-src');
          if (src) v.src = src;
          v.load();
          loaded = true;
        }
        o.classList.add('hidden');
        v.play().catch(() => {});
      };

      const onVideoClick = () => {
        if (v.paused) {
          v.play();
          o.classList.add('hidden');
        } else {
          v.pause();
          o.classList.remove('hidden');
        }
      };

      b.addEventListener('click', onBtnClick);
      v.addEventListener('click', onVideoClick);

      return () => {
        b.removeEventListener('click', onBtnClick);
        v.removeEventListener('click', onVideoClick);
      };
    };

    const cleanV2 = setupVideo('video_2', 'video_overlay_2', 'play_button_2');
    const cleanV3 = setupVideo('video_3', 'video_overlay_3', 'play_button_3');

    // 5. Dynamic Backend Causes & Packages Integration
    const causesContainer = root.querySelector('#desktop-causes-container');
    const packagesContainer = root.querySelector('#packages-container');
    const categoryLists = root.querySelectorAll('.category_list');
    const searchInput = root.querySelector('#causes_search');
    let loadedCauses = [];
    let currentCategory = 'all';
    let currentSearch = '';

    const renderCauses = () => {
      if (!causesContainer) return;

      if (currentCategory === 'packages') {
        if (packagesContainer) packagesContainer.style.display = 'grid';
        causesContainer.style.display = 'none';
        return;
      }

      if (packagesContainer) packagesContainer.style.display = 'none';
      causesContainer.style.display = 'flex';

      const filtered = loadedCauses.filter((cause) => {
        const matchesCategory =
          currentCategory === 'all' ||
          (cause.categories && cause.categories.includes(currentCategory.toLowerCase()));

        const matchesSearch =
          !currentSearch ||
          (cause.title && cause.title.toLowerCase().includes(currentSearch.toLowerCase())) ||
          (cause.tagline && cause.tagline.toLowerCase().includes(currentSearch.toLowerCase())) ||
          (cause.description && cause.description.toLowerCase().includes(currentSearch.toLowerCase()));

        return matchesCategory && matchesSearch;
      });

      if (filtered.length === 0) {
        causesContainer.innerHTML = `
          <div class="col-12 text-center py-5">
            <p style="color: #64748b; font-size: 16px; margin-bottom: 8px;">No causes found in this category.</p>
            <span style="font-size: 13px; color: #94a3b8;">Try selecting "All" or a different search term.</span>
          </div>
        `;
        return;
      }

      causesContainer.innerHTML = filtered.map((cause) => {
        const targetSlug = cause.slug;
        const targetUrl = targetSlug === 'stray_dog' ? '/stray_dog' :
                          targetSlug === 'cow_feeding' ? '/cow_feeding' :
                          targetSlug === 'dog_collar' ? '/dog_collar' :
                          targetSlug === 'egg_milk' ? '/egg_milk' :
                          targetSlug === 'homeless' ? '/homeless' :
                          targetSlug === 'Nepal' || targetSlug === 'nepal' ? '/nepal_flood' :
                          targetSlug === 'food' ? '/food' :
                          targetSlug === 'environment' ? '/environment' :
                          `/causes-detail/${targetSlug}`;

        const waText = encodeURIComponent(
          `${cause.title}  ${cause.tagline || ''}  https://vrishasenafoundation.org${targetUrl}`
        );

        return `
          <div class="col-6 col-md-4 col-lg-3 category_card all causes category_card1 mb-4" style="display: block;">
            <div class="category_content">
              <a href="https://wa.me/?text=${waText}" class="whatsapp_container" aria-label="send this content on whatsapp" target="_blank" rel="noopener noreferrer">
                <svg class="whatsapp_icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 448 512">
                  <path fill="#35e97a" d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path>
                </svg>
              </a>
              <a class="category_image" href="${targetUrl}" aria-label="category image">
                <img loading="lazy" src="${cause.image}" width="200" height="267" alt="${cause.title}">
              </a>
              <div class="card_content">
                <h5 class="title"><a class="causes_name" href="${targetUrl}" aria-label="name of the cause">${cause.title}</a></h5>
                <span>₹ ${cause.unitPrice} / ${cause.unitLabel}</span>
                <a href="${targetUrl}" class="donate_btn" aria-label="donate button">Donate Now</a>
              </div>
            </div>
          </div>
        `;
      }).join('');
    };

    // Load from backend API
    const loadCausesAndPackages = async () => {
      try {
        const [apiCauses, apiPackages] = await Promise.all([
          fetchCauses(),
          fetchPackages(),
        ]);

        if (apiCauses && apiCauses.length > 0) {
          loadedCauses = apiCauses;
          renderCauses();
        }

        if (packagesContainer && apiPackages && apiPackages.length > 0) {
          packagesContainer.innerHTML = apiPackages.map((pkg) => `
            <a href="${pkg.link || '/packages_form?id=' + pkg.packageId}" class="desk_package_card" aria-label="Donate ${pkg.title}">
              <img loading="lazy" decoding="async" src="${pkg.image}" alt="${pkg.title}" width="200" height="233" class="package_img">
              <div class="package_info">
                <span class="package_donate_btn">Donate Now</span>
              </div>
            </a>
          `).join('');
        }
      } catch (err) {
        console.warn('API sync warning:', err);
      }
    };

    loadCausesAndPackages();

    // Category click handlers
    const categoryHandlers = [];
    categoryLists.forEach((cat) => {
      const filter = cat.getAttribute('data-filter') || 'all';
      const onCatClick = () => {
        categoryLists.forEach((c) => c.classList.remove('acitve_category'));
        cat.classList.add('acitve_category');
        currentCategory = filter;
        renderCauses();
      };
      cat.addEventListener('click', onCatClick);
      categoryHandlers.push(() => cat.removeEventListener('click', onCatClick));
    });

    // Search input handler
    let searchHandler = null;
    if (searchInput) {
      searchHandler = (e) => {
        currentSearch = e.target.value.trim();
        renderCauses();
      };
      searchInput.addEventListener('input', searchHandler);
    }

    // Contact Form Interceptor & Demo Mode
    const contactForm = root.querySelector('#contactForm');
    let contactCleanup = null;
    if (contactForm) {
      let homeDemoBanner = root.querySelector('#homeContactDemoBanner');
      if (!homeDemoBanner) {
        homeDemoBanner = document.createElement('div');
        homeDemoBanner.id = 'homeContactDemoBanner';
        homeDemoBanner.style.cssText = `
          background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
          border: 1.5px dashed #0284c7;
          border-radius: 12px;
          padding: 12px 18px;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          box-shadow: 0 4px 14px rgba(2, 132, 199, 0.08);
        `;
        homeDemoBanner.innerHTML = `
          <div>
            <div style="font-size: 14px; font-weight: 700; color: #0369a1; display: flex; align-items: center; gap: 6px;">
              <span style="font-size: 16px;">⚡</span> Demo Mode: Quick Inquiry Fill
            </div>
            <div style="font-size: 12px; color: #0284c7; margin-top: 2px;">
              Pre-fills sample contact message & enables instant simulation
            </div>
          </div>
          <button type="button" id="btnFillHomeContactDemo" style="
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
            <span>⚡ Fill Sample Inquiry</span>
          </button>
        `;
        contactForm.parentNode.insertBefore(homeDemoBanner, contactForm);

        const fillBtn = homeDemoBanner.querySelector('#btnFillHomeContactDemo');
        if (fillBtn) {
          fillBtn.addEventListener('click', () => {
            const nameInp = contactForm.querySelector('#name');
            const emailInp = contactForm.querySelector('#email');
            const phoneInp = contactForm.querySelector('#phone');
            const addressInp = contactForm.querySelector('#address');
            const noteInp = contactForm.querySelector('#note');

            if (nameInp) nameInp.value = 'Venkatesh Rao';
            if (emailInp) emailInp.value = 'venkatesh.rao@example.com';
            if (phoneInp) phoneInp.value = '9951672673';
            if (addressInp) addressInp.value = 'Vijayawada, Andhra Pradesh';
            if (noteInp) noteInp.value = 'I would like to support your fight hunger initiative and volunteer for upcoming food distribution drives.';

            showToast('⚡ Sample inquiry details filled! Click "Submit Now" to test submission.', 'success');
          });
        }
      }

      const onFormSubmit = (e) => {
        e.preventDefault();
        showToast('✅ Thank you! Your demo message has been received by Vrishasena Foundation.', 'success');
        contactForm.reset();
      };

      contactForm.addEventListener('submit', onFormSubmit);
      contactCleanup = () => contactForm.removeEventListener('submit', onFormSubmit);
    }

    return () => {
      root.removeEventListener('click', handleLinkClick);
      if (sliderTimer) clearInterval(sliderTimer);
      faqCleanups.forEach((c) => c());
      if (cleanV2) cleanV2();
      if (cleanV3) cleanV3();
      categoryHandlers.forEach((c) => c());
      if (searchInput && searchHandler) {
        searchInput.removeEventListener('input', searchHandler);
      }
      if (contactCleanup) contactCleanup();
    };
  }, [navigate]);

  return (
    <>
      <div ref={containerRef} dangerouslySetInnerHTML={{ __html: homeHtml }} />

      {/* Floating Status Notification Toast */}
      {toast.show && (
        <div
          role="alert"
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            zIndex: 99999,
            backgroundColor: toast.type === 'success' ? '#28a745' : '#0284c7',
            color: '#ffffff',
            padding: '16px 24px',
            borderRadius: '10px',
            boxShadow: '0 8px 25px rgba(0,0,0,0.25)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '15px',
            fontWeight: 500,
            maxWidth: '440px',
            animation: 'fadeIn 0.3s ease-out',
          }}
        >
          <i className="ri-checkbox-circle-fill" style={{ fontSize: '24px' }}></i>
          <span>{toast.message}</span>
          <button
            onClick={() => setToast({ show: false, message: '', type: 'success' })}
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

      {/* Floating Admin Mode Quick Access */}
      <a
        href="/admin"
        title="Vrishasena Admin Control Portal"
        style={{
          position: 'fixed',
          bottom: '22px',
          right: '22px',
          zIndex: 9999,
          backgroundColor: '#0c1427',
          color: '#009dff',
          border: '1.5px solid rgba(0, 157, 255, 0.4)',
          borderRadius: '50px',
          padding: '9px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '13px',
          fontWeight: '700',
          textDecoration: 'none',
          boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          transition: 'all 0.2s ease',
          backdropFilter: 'blur(8px)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#009dff';
          e.currentTarget.style.color = '#ffffff';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#0c1427';
          e.currentTarget.style.color = '#009dff';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        <i className="ri-shield-keyhole-line" style={{ fontSize: '16px' }}></i>
        <span>Admin Mode</span>
      </a>
    </>
  );
}
