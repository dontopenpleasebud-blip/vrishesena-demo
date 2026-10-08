import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Splide from '@splidejs/splide';
import '@splidejs/splide/css';
import './CausesDetail.css';
import { loadCauseData, isCauseAvailable } from './causes-detail-data/index.js';
import UnderConstruction from './UnderConstruction.jsx';

export default function CausesDetail({ slugOverride }) {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const containerRef = useRef(null);

  // Extract slug from prop, params, or pathname (e.g. /causes-detail/water_bottle/)
  let slug = slugOverride || params.slug;
  if (!slug) {
    const parts = location.pathname.split('/').filter(Boolean);
    const detailIdx = parts.indexOf('causes-detail');
    if (detailIdx !== -1 && parts[detailIdx + 1]) {
      slug = parts[detailIdx + 1];
    } else if (parts.length > 0) {
      slug = parts[0];
    }
  }

  // Remove .html if present
  if (slug && slug.endsWith('.html')) {
    slug = slug.replace(/\.html$/, '');
  }
  if (slug && slug.endsWith('/')) {
    slug = slug.slice(0, -1);
  }

  const [causeData, setCauseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [receiptToast, setReceiptToast] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    if (!slug || !isCauseAvailable(slug)) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    setLoading(true);
    setNotFound(false);

    loadCauseData(slug)
      .then((data) => {
        if (isCancelled) return;
        if (!data) {
          setNotFound(true);
        } else {
          setCauseData(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading cause data:', err);
        if (!isCancelled) {
          setNotFound(true);
          setLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [slug]);

  useEffect(() => {
    if (!causeData) return;

    if (causeData.title) {
      document.title = causeData.title;
    }

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
      const currentCanonical = `/causes-detail/${slug}`;
      if (
        href === currentCanonical ||
        href === `${currentCanonical}/` ||
        href === `${currentCanonical}/index.html`
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
    const form = root.querySelector('#quick-donation-form') || root.querySelector('#trackDonationForm');
    if (form) {
      const nameEl = form.querySelector('#donorname') || form.querySelector('input[name="donor_name"]');
      const mobEl = form.querySelector('#donorMob') || form.querySelector('input[name="donor_phone"]');
      const countEl = form.querySelector('#foodcount') || form.querySelector('input[name="count"]') || form.querySelector('#donorParcel');
      const parcelEl = form.querySelector('#donorParcel');
      const dateEl = form.querySelector('#service_date') || form.querySelector('input[name="service_date"]');
      const unitEl = form.querySelector('#allfood') || form.querySelector('input[name="unit_price"]');
      const totalEl = form.querySelector('#totalamount');
      const netEl = form.querySelector('#netamount');
      const totalTextEl = form.querySelector('#qfTotalText');
      const errEl = form.querySelector('#qfError');
      const phoneErrEl = form.querySelector('#qfPhoneError');
      const btn = form.querySelector('#qfDonateBtn') || form.querySelector('button[type="submit"]');
      const chips = Array.from(form.querySelectorAll('.dk-qf-chip'));

      // Inject Demo Mode Auto-fill Banner
      let qfDemoBanner = form.querySelector('.cause-donate-demo-banner');
      if (!qfDemoBanner) {
        qfDemoBanner = document.createElement('div');
        qfDemoBanner.className = 'cause-donate-demo-banner';
        qfDemoBanner.style.cssText = `
          background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
          border: 1.5px dashed #16a34a;
          border-radius: 10px;
          padding: 10px 14px;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
        `;
        qfDemoBanner.innerHTML = `
          <div>
            <div style="font-size: 13px; font-weight: 700; color: #15803d; display: flex; align-items: center; gap: 6px;">
              <span>⚡</span> Demo Mode: Instant Donation
            </div>
            <div style="font-size: 11px; color: #166534;">Simulate donation with 80G receipt</div>
          </div>
          <button type="button" class="btn-fill-cause-demo" style="
            background: #16a34a;
            color: #ffffff;
            border: none;
            padding: 6px 14px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
          ">
            ⚡ Fill Demo Donor Details (9951672673)
          </button>
        `;
        form.insertBefore(qfDemoBanner, form.firstChild);

        const btnFill = qfDemoBanner.querySelector('.btn-fill-cause-demo');
        if (btnFill) {
          btnFill.addEventListener('click', () => {
            if (nameEl) nameEl.value = 'Ravi Teja';
            if (mobEl) mobEl.value = '9951672673';
            if (parcelEl) {
              parcelEl.value = 'In Memory of Loved Ones';
              parcelEl.dispatchEvent(new Event('input', { bubbles: true }));
            }
            if (chips.length > 1) {
              chips[1].click();
            } else if (countEl) {
              countEl.value = '10';
            }
            if (dateEl) {
              dateEl.value = todayStr;
            }
            recalculate();
          });
        }
      }

      const UNIT = parseFloat(unitEl?.value) || 60;

      // Date initialization: today or tomorrow
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
          photoPrice = 50;
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

        if (dateEl && !dateEl.value) fail(dateEl, 'Please select a service date *');
        if (countEl && (parseInt(countEl.value, 10) || 0) < 1) fail(countEl, 'Count must be at least 1 *');

        if (!valid) {
          firstErrEl?.focus();
          return;
        }

        const submitAction = () => {
          setReceiptToast({
            donorName: nameEl?.value?.trim() || 'Ravi Teja',
            phone: mobEl?.value?.trim() || '9951672673',
            amount: totalTextEl?.textContent?.trim() || '₹600',
            causeTitle: causeData?.title || 'Community Campaign',
            date: dateEl?.value || new Date().toISOString().split('T')[0],
            receiptId: `VF-2026-${Math.floor(1000 + Math.random() * 9000)}`,
          });
        };

        if (btn) {
          btn.disabled = true;
          const origText = btn.textContent;
          btn.textContent = 'Processing Donation...';
          setTimeout(() => {
            btn.disabled = false;
            btn.textContent = origText;
            submitAction();
          }, 600);
        } else {
          submitAction();
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
  }, [causeData, slug, navigate]);

  if (notFound) {
    return <UnderConstruction />;
  }

  if (loading || !causeData) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', color: '#666' }}>
          <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem', marginBottom: '16px' }}></div>
          <p style={{ fontSize: '18px', fontWeight: 500 }}>Loading campaign...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        ref={containerRef}
        className="cause-detail-wrapper"
        dangerouslySetInnerHTML={{ __html: causeData.html }}
      />

      {receiptToast && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 999999,
            padding: '16px',
            animation: 'fadeIn 0.25s ease-out',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setReceiptToast(null);
          }}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              maxWidth: '480px',
              width: '100%',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              overflow: 'hidden',
              border: '1px solid #e2e8f0',
              fontFamily: "'Segoe UI', Roboto, sans-serif",
            }}
          >
            {/* Header */}
            <div
              style={{
                background: 'linear-gradient(135deg, #16a34a, #15803d)',
                color: '#ffffff',
                padding: '24px 20px',
                textAlign: 'center',
                position: 'relative',
              }}
            >
              <button
                type="button"
                onClick={() => setReceiptToast(null)}
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: 'rgba(255,255,255,0.2)',
                  border: 'none',
                  color: '#fff',
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  fontSize: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                ✕
              </button>
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px auto',
                  fontSize: '28px',
                }}
              >
                ✓
              </div>
              <h3 style={{ margin: '0 0 4px 0', fontSize: '20px', fontWeight: '700', letterSpacing: '-0.3px' }}>
                Donation Received!
              </h3>
              <p style={{ margin: 0, fontSize: '13px', opacity: 0.9 }}>
                Vrishasena Foundation • 80G Tax Exemption Receipt
              </p>
            </div>

            {/* Body */}
            <div style={{ padding: '24px' }}>
              <div
                style={{
                  background: '#f8fafc',
                  border: '1px dashed #cbd5e1',
                  borderRadius: '12px',
                  padding: '16px',
                  marginBottom: '20px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
                  <span style={{ color: '#64748b' }}>Receipt Number:</span>
                  <strong style={{ color: '#0f172a' }}>{receiptToast.receiptId}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
                  <span style={{ color: '#64748b' }}>Donor Name:</span>
                  <strong style={{ color: '#0f172a' }}>{receiptToast.donorName}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
                  <span style={{ color: '#64748b' }}>WhatsApp:</span>
                  <strong style={{ color: '#0f172a' }}>+91 {receiptToast.phone}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
                  <span style={{ color: '#64748b' }}>Campaign:</span>
                  <strong style={{ color: '#0f172a', textAlign: 'right', maxWidth: '240px' }}>
                    {receiptToast.causeTitle}
                  </strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
                  <span style={{ color: '#64748b' }}>Date & Time:</span>
                  <strong style={{ color: '#0f172a' }}>{receiptToast.date}</strong>
                </div>
                <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '10px 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#0f172a' }}>Amount Donated:</span>
                  <span style={{ fontSize: '20px', fontWeight: '800', color: '#16a34a' }}>
                    {receiptToast.amount}
                  </span>
                </div>
              </div>

              {/* Tax Badge */}
              <div
                style={{
                  background: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  borderRadius: '10px',
                  padding: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '20px',
                }}
              >
                <span style={{ fontSize: '20px' }}>📜</span>
                <div style={{ fontSize: '12px', color: '#166534', lineHeight: 1.4 }}>
                  <strong>Section 80G Certified:</strong> 50% deduction applicable under Income Tax Act. A formal PDF receipt has been generated and dispatched to your WhatsApp number.
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => {
                    alert(`Tax Receipt ${receiptToast.receiptId} PDF download initiated for ${receiptToast.donorName}!`);
                  }}
                  style={{
                    flex: 1,
                    padding: '11px 16px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    background: '#ffffff',
                    color: '#0f172a',
                    fontWeight: '600',
                    fontSize: '13px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                  }}
                >
                  📥 Download PDF
                </button>
                <button
                  type="button"
                  onClick={() => setReceiptToast(null)}
                  style={{
                    flex: 1,
                    padding: '11px 16px',
                    borderRadius: '8px',
                    border: 'none',
                    background: '#ea580c',
                    color: '#ffffff',
                    fontWeight: '600',
                    fontSize: '13px',
                    cursor: 'pointer',
                  }}
                >
                  Close Receipt
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
