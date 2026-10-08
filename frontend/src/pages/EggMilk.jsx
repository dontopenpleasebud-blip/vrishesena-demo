import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Splide from '@splidejs/splide';
import '@splidejs/splide/css';
import './CausesDetail.css';
import { eggMilkHtml } from './EggMilkContent.js';

export default function EggMilk() {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Vrishasena Foundation || Give a Meal & Egg | Support Health & Wellness with Vrishasena Foundation';
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
        href === '/egg_milk' ||
        href === '/egg_milk/index.html' ||
        href === '/causes-detail/egg_milk' ||
        href === '/causes-detail/egg_milk/index.html'
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

    // ── 5. Splide Slider Mount ──
    let splideInstance = null;
    const doubleSlider = root.querySelector('#double-slider');
    if (doubleSlider) {
      try {
        splideInstance = new Splide(doubleSlider, {
          type: 'loop',
          perPage: 1,
          perMove: 1,
          gap: 0,
          arrows: true,
          pagination: true,
          autoplay: true,
          interval: 3000,
          fixedHeight: '570px',
          cover: true,
          drag: true,
        });
        splideInstance.mount();
      } catch (err) {
        console.warn('Splide init error:', err);
      }
    }

    // ── 6. Quick Donation Form Logic ──
    const form = root.querySelector('#quick-donation-form');
    if (form) {
      const nameEl = form.querySelector('#donorname');
      const mobEl = form.querySelector('#donorMob');
      const countEl = form.querySelector('#foodcount');
      const parcelEl = form.querySelector('#donorParcel');
      const dateEl = form.querySelector('#service_date');
      const unitEl = form.querySelector('#allfood');
      const totalEl = form.querySelector('#totalamount');
      const netEl = form.querySelector('#netamount');
      const totalTextEl = form.querySelector('#qfTotalText');
      const errEl = form.querySelector('#qfError');
      const phoneErrEl = form.querySelector('#qfPhoneError');
      const btn = form.querySelector('#qfDonateBtn');
      const chips = Array.from(form.querySelectorAll('.dk-qf-chip'));

      const UNIT = parseFloat(unitEl?.value) || 30;

      // Date initialization: today or tomorrow after cutoff
      const now = new Date();
      const pad = (n) => String(n).padStart(2, '0');
      const todayStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
      if (dateEl) {
        dateEl.min = todayStr;
        if (!dateEl.value) dateEl.value = todayStr;
      }

      // Packages & Addons
      const pkgChecks = Array.from(form.querySelectorAll('.dk-qf-pkg-check'));
      const pkgToggle = form.querySelector('#qfPkgToggle');
      const pkgBody = form.querySelector('#qfPkgBody');
      const pkgCountBadge = form.querySelector('#qfPkgCount');

      if (pkgToggle && pkgBody) {
        pkgToggle.addEventListener('click', () => {
          const isOpen = !pkgBody.hidden;
          pkgBody.hidden = isOpen;
          pkgToggle.setAttribute('aria-expanded', String(!isOpen));
        });
      }

      const photoToggle = form.querySelector('#qfPhotoToggle');
      const photoBody = form.querySelector('#qfPhotoBody');
      if (photoToggle && photoBody) {
        photoToggle.addEventListener('change', () => {
          photoBody.hidden = !photoToggle.checked;
          recalculate();
        });
      }

      const recalculate = () => {
        const count = parseInt(countEl?.value, 10) || 0;
        let pkgSum = 0;
        let activePkgCount = 0;

        pkgChecks.forEach((cb) => {
          if (cb.checked) {
            pkgSum += parseFloat(cb.dataset.price) || 0;
            activePkgCount++;
          }
        });

        if (pkgCountBadge) {
          pkgCountBadge.textContent = activePkgCount > 0 ? `${activePkgCount} Selected` : '';
        }

        let photoPrice = 0;
        if (photoToggle && photoToggle.checked) {
          photoPrice = 50; // standard optional photo rate
        }

        const baseTotal = count * UNIT;
        const finalTotal = baseTotal + pkgSum + photoPrice;

        if (totalEl) totalEl.value = String(finalTotal);
        if (netEl) netEl.value = String(finalTotal);
        if (totalTextEl) totalTextEl.textContent = `₹${finalTotal.toLocaleString('en-IN')}`;
      };

      const syncChips = () => {
        const val = countEl?.value?.trim() || '';
        let matched = false;
        chips.forEach((c) => {
          const on = c.dataset.count === val;
          c.classList.toggle('is-active', on);
          if (on) matched = true;
        });
        if (!matched && chips.length > 0) {
          chips[chips.length - 1].classList.add('is-active');
        }
      };

      chips.forEach((chip) => {
        chip.addEventListener('click', () => {
          if (chip.dataset.count === 'custom') {
            if (countEl) {
              countEl.value = '';
              countEl.focus();
            }
          } else {
            if (countEl) countEl.value = chip.dataset.count;
          }
          syncChips();
          recalculate();
        });
      });

      if (countEl) {
        countEl.addEventListener('input', () => {
          if (countEl.value.length > 7) countEl.value = countEl.value.slice(0, 7);
          recalculate();
          syncChips();
        });
      }

      pkgChecks.forEach((cb) => {
        cb.addEventListener('change', () => {
          recalculate();
        });
      });

      // Name on Parcel Preview
      const previewContainer = root.querySelector('.parcel-preview');
      const parcelNamePreview = root.querySelector('#parcelNamePreview');
      const parcelPreviewImg = root.querySelector('#parcelPreviewImg');

      if (parcelEl) {
        parcelEl.addEventListener('input', () => {
          const val = parcelEl.value.trim();
          if (val.length > 0) {
            if (parcelNamePreview) parcelNamePreview.textContent = val;
            if (parcelPreviewImg) parcelPreviewImg.src = '/static/website/assets/images/demo_fp.webp';
            if (previewContainer) previewContainer.style.display = 'flex';
          } else {
            if (previewContainer) previewContainer.style.display = 'none';
          }
        });
      }

      // Initial run
      syncChips();
      recalculate();

      // Form validation & submission
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        let valid = true;
        let firstErrEl = null;

        const fail = (el, msg) => {
          if (el) el.classList.add('error');
          if (errEl) {
            errEl.textContent = msg;
            errEl.classList.add('show');
          }
          if (!firstErrEl) firstErrEl = el;
          valid = false;
        };

        if (errEl) errEl.classList.remove('show');
        if (phoneErrEl) phoneErrEl.classList.remove('show');
        [nameEl, mobEl, parcelEl, dateEl, countEl].forEach((el) => el?.classList.remove('error'));

        if (!nameEl?.value?.trim()) fail(nameEl, 'Donor name is required *');

        const phoneVal = mobEl?.value?.replace(/\D/g, '') || '';
        if (!phoneVal || phoneVal.length < 10) {
          if (mobEl) mobEl.classList.add('error');
          if (phoneErrEl) {
            phoneErrEl.textContent = 'Enter a valid 10-digit WhatsApp number *';
            phoneErrEl.classList.add('show');
          }
          if (!firstErrEl) firstErrEl = mobEl;
          valid = false;
        }

        if (!parcelEl?.value?.trim()) fail(parcelEl, 'Name on parcel is required *');
        if (!dateEl?.value) fail(dateEl, 'Please select a service date *');
        if ((parseInt(countEl?.value, 10) || 0) < 1) fail(countEl, 'Count must be at least 1 *');

        if (!valid) {
          firstErrEl?.focus();
          return;
        }

        if (btn) {
          btn.disabled = true;
          btn.textContent = 'Processing Donation...';
          setTimeout(() => {
            btn.disabled = false;
            btn.textContent = 'Donate Now';
            alert('Thank you for supporting Egg & Milk distribution! Form submitted successfully.');
          }, 1200);
        }
      });
    }

    // ── 7. Image Modal Preview ──
    const imageModal = root.querySelector('#imageModal');
    const imageModalImg = root.querySelector('#imageModalImg');
    const imageModalClose = root.querySelector('#imageModalClose');
    const imageModalPrev = root.querySelector('#imageModalPrev');
    const imageModalNext = root.querySelector('#imageModalNext');
    const imageModalCounter = root.querySelector('#imageModalCounter');

    if (imageModal && imageModalImg) {
      let imageList = [];
      let currentImgIdx = 0;

      const collectImages = () => {
        imageList = [];
        root.querySelectorAll('#double-slider .splide__slide img, .ig-full .ig-ct img').forEach((img) => {
          if (img.src && !imageList.includes(img.src)) imageList.push(img.src);
        });
      };

      const showImage = (index) => {
        if (imageList.length === 0) return;
        currentImgIdx = (index + imageList.length) % imageList.length;
        imageModalImg.src = imageList[currentImgIdx];
        if (imageModalCounter) {
          imageModalCounter.textContent = `${currentImgIdx + 1} / ${imageList.length}`;
        }
      };

      const openImageModal = (src) => {
        collectImages();
        const found = imageList.indexOf(src);
        showImage(found !== -1 ? found : 0);
        imageModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
      };

      const closeImageModal = () => {
        imageModal.style.display = 'none';
        document.body.style.overflow = '';
      };

      root.querySelectorAll('#double-slider .splide__slide img, .ig-full .ig-ct img').forEach((img) => {
        img.addEventListener('click', (e) => {
          e.preventDefault();
          openImageModal(img.src);
        });
      });

      if (imageModalClose) imageModalClose.addEventListener('click', closeImageModal);
      if (imageModalPrev) imageModalPrev.addEventListener('click', () => showImage(currentImgIdx - 1));
      if (imageModalNext) imageModalNext.addEventListener('click', () => showImage(currentImgIdx + 1));
      imageModal.addEventListener('click', (e) => {
        if (e.target === imageModal) closeImageModal();
      });
    }

    // ── 8. Read More / Read Less toggles ──
    root.querySelectorAll('.read-more').forEach((btn) => {
      btn.addEventListener('click', function () {
        const id = this.dataset.id;
        const shortEl = root.querySelector('#desc-short-' + id);
        const fullEl = root.querySelector('#desc-full-' + id);
        if (shortEl) shortEl.style.display = 'none';
        if (fullEl) fullEl.style.display = 'block';
      });
    });

    root.querySelectorAll('.read-less').forEach((btn) => {
      btn.addEventListener('click', function () {
        const id = this.dataset.id;
        const shortEl = root.querySelector('#desc-short-' + id);
        const fullEl = root.querySelector('#desc-full-' + id);
        if (fullEl) fullEl.style.display = 'none';
        if (shortEl) shortEl.style.display = 'block';
      });
    });

    return () => {
      root.removeEventListener('click', handleLinkClick);
      if (menuIcon) menuIcon.removeEventListener('click', openSidebar);
      if (closeMenu) closeMenu.removeEventListener('click', closeSidebar);
      document.removeEventListener('click', outsideClick);
      if (searchIcon) searchIcon.removeEventListener('click', openSearch);
      if (searchClose) searchClose.removeEventListener('click', closeSearch);
      if (eduTab) eduTab.removeEventListener('click', onEduClick);
      if (healthTab) healthTab.removeEventListener('click', onHealthClick);
      if (splideInstance) splideInstance.destroy();
    };
  }, [navigate]);

  return <div ref={containerRef} dangerouslySetInnerHTML={{ __html: eggMilkHtml }} />;
}
