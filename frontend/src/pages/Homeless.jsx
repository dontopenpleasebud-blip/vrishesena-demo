import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Splide from '@splidejs/splide';
import '@splidejs/splide/css';
import './CausesDetail.css';
import { homelessHtml } from './HomelessContent.js';

export default function Homeless() {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Vrishasena Foundation || Vrishasena Foundation | Feed the Homeless, End Hunger & Donate Food to Save Lives';
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
        href === '/homeless' ||
        href === '/homeless/index.html' ||
        href === '/causes-detail/homeless' ||
        href === '/causes-detail/homeless/index.html'
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
        console.warn('Splide mount error:', err);
      }
    }

    // ── 6. Quick Donation Form Calculator & Validation ──
    const form = root.querySelector('#quick-donation-form');
    if (form) {
      const q = (sel) => form.querySelector(sel);
      const nameEl = q('#donorname');
      const mobEl = q('#donorMob');
      const countEl = q('#foodcount');
      const parcelEl = q('#donorParcel');
      const dateEl = q('#service_date');
      const unitEl = q('#allfood');
      const totalEl = q('#totalamount');
      const netEl = q('#netamount');
      const totalTextEl = q('#qfTotalText');
      const errEl = q('#qfError');
      const phoneErrEl = q('#qfPhoneError');
      const btn = q('#qfDonateBtn');
      const chips = form.querySelectorAll('.dk-qf-chip');
      const photoToggle = q('#qfPhotoToggle');
      const photoBody = q('#qfPhotoBody');
      const addonEls = Array.from(form.querySelectorAll('.dk-qf-addon-check'));
      const pkgToggle = q('#qfPkgsToggle');
      const pkgBody = q('#qfPkgsBody');
      const pkgCountBadge = q('#qfPkgsCount');
      const pkgEls = Array.from(form.querySelectorAll('.dk-qf-pkg-check'));
      const pkgFieldBlocks = Array.from(form.querySelectorAll('.dk-qf-pkg-fields'));

      const UNIT = parseFloat(unitEl?.value) || 30.0;
      const SIMPLE_PKGS = ['child only', 'woman only'];
      const SIMPLE_RATE = 5;

      // Earliest service date
      if (dateEl) {
        const parts = (dateEl.dataset.cutoff || '15:00').split(':');
        const ch = parseInt(parts[0], 10) || 15;
        const cm = parseInt(parts[1], 10) || 0;
        const now = new Date();
        const d = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        if (now.getHours() > ch || (now.getHours() === ch && now.getMinutes() >= cm)) {
          d.setDate(d.getDate() + 1);
        }
        const pad = (n) => String(n).padStart(2, '0');
        const dateStr = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
        dateEl.min = dateStr;
        if (!dateEl.value) dateEl.value = dateStr;
      }

      // Initial count default
      if (countEl && !countEl.value) {
        countEl.value = '30';
      }

      // Packages accordion toggle
      if (pkgToggle && pkgBody) {
        pkgToggle.addEventListener('click', (e) => {
          e.preventDefault();
          const expanded = pkgToggle.getAttribute('aria-expanded') === 'true';
          pkgToggle.setAttribute('aria-expanded', String(!expanded));
          pkgBody.hidden = expanded;
        });
      }

      // Optional parcel photo toggle
      if (photoToggle && photoBody) {
        photoToggle.addEventListener('change', () => {
          photoBody.hidden = !photoToggle.checked;
          recalculate();
        });
      }

      // Package budget calculator
      const pkgBudget = (name, price) => {
        if (name === 'Wish Video & Cake') return { food: 2000, cake: 1000 };
        if (name === 'Distribution Video') return { food: 3000, cake: 0 };
        if (name === 'Banner') return { food: 1500, cake: 1500 };
        if (name === 'Wish Video') return { food: 3000, cake: 0 };
        if (name === 'cake with image') return { food: 600, cake: 1100 };
        return { food: price, cake: 0 };
      };

      const pkgQuote = (cb) => {
        const b = pkgBudget(cb.value, parseFloat(cb.dataset.price) || 0);
        const parcels = UNIT > 0 ? Math.ceil(b.food / UNIT) : 0;
        return { parcels, amount: parcels * UNIT + b.cake };
      };

      const isSimple = (cb) => SIMPLE_PKGS.includes(cb.value.toLowerCase());

      const syncPkgFields = () => {
        const names = pkgEls.filter((cb) => cb.checked).map((cb) => cb.value);
        const taken = {};
        pkgFieldBlocks.forEach((block) => {
          const on = names.includes(block.dataset.pkgFields);
          let anyShown = false;
          block.querySelectorAll('[name]').forEach((inp) => {
            const enable = on && !taken[inp.name];
            if (enable) {
              taken[inp.name] = true;
              anyShown = true;
            }
            inp.disabled = !enable;
            if (!enable) {
              inp.classList.remove('error');
              if (inp.type === 'file') inp.value = '';
            }
            const row = inp.closest('.dk-qf-pf');
            if (row) row.hidden = !enable;
          });
          block.hidden = !(on && anyShown);
        });
      };

      // Set prices on package cards
      pkgEls.forEach((cb) => {
        const row = cb.closest('.dk-qf-pkg');
        const tag = row?.querySelector('.dk-qf-pkg-price');
        const meta = row?.querySelector('.dk-qf-pkg-meta');
        const quote = pkgQuote(cb);
        if (tag) {
          tag.textContent = isSimple(cb)
            ? `+₹${SIMPLE_RATE}/parcel`
            : `₹${quote.amount.toLocaleString('en-IN')}`;
        }
        if (meta && !isSimple(cb)) {
          meta.textContent = `${quote.parcels} parcels`;
        }
      });

      // Recalculate totals
      const recalculate = () => {
        const sel = pkgEls.filter((cb) => cb.checked);
        const budgeted = sel.filter((cb) => !isSimple(cb));
        let count = 0;
        let baseTotal = 0;

        if (budgeted.length > 0) {
          budgeted.forEach((cb) => {
            const quote = pkgQuote(cb);
            count += quote.parcels;
            baseTotal += quote.amount;
          });
          if (countEl) countEl.value = String(count);
          countEl?.closest('.dk-qf-field')?.classList.add('dk-qf-count-locked');
        } else {
          count = parseInt(countEl?.value, 10) || 0;
          baseTotal = count * UNIT;
          countEl?.closest('.dk-qf-field')?.classList.remove('dk-qf-count-locked');
        }

        // Addons total
        let addonPerParcel = 0;
        addonEls.forEach((cb) => {
          if (cb.checked) addonPerParcel += parseFloat(cb.dataset.price) || 0;
        });

        // Simple packages (₹5/parcel)
        let simplePerParcel = 0;
        sel.filter(isSimple).forEach(() => {
          simplePerParcel += SIMPLE_RATE;
        });

        // Photo addon (₹5/parcel)
        let photoRate = 0;
        if (photoToggle && photoToggle.checked) {
          photoRate = 5;
        }

        const extrasTotal = count * (addonPerParcel + simplePerParcel + photoRate);
        const finalTotal = baseTotal + extrasTotal;

        if (totalEl) totalEl.value = String(finalTotal);
        if (netEl) netEl.value = String(finalTotal);
        if (totalTextEl) totalTextEl.textContent = `₹${finalTotal.toLocaleString('en-IN')}`;

        if (pkgCountBadge) {
          pkgCountBadge.textContent = sel.length ? `(${sel.length} selected)` : '';
        }

        syncPkgFields();
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

      addonEls.forEach((cb) => {
        cb.addEventListener('change', recalculate);
      });

      pkgEls.forEach((cb) => {
        cb.addEventListener('change', recalculate);
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
            alert('Thank you for supporting Feed a Homeless Person! Form submitted successfully.');
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

  return <div ref={containerRef} dangerouslySetInnerHTML={{ __html: homelessHtml }} />;
}
