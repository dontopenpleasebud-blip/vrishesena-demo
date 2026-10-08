import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { blogHtml } from './BlogContent.js';

export default function Blog() {
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
      if (href === '/blog' || href === '/blog/index.html') {
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

    // 3. Arc Wheel Infinite Rotating Carousel
    const wheel = root.querySelector('#arc-wheel');
    let animFrameId = null;

    if (wheel) {
      const numImages = 24;
      const imageUrls = [
        '/static/website/assets/images/csr/img1.png',
        '/static/website/assets/images/csr/img2.png',
        '/static/website/assets/images/csr/img3.png',
        '/static/website/assets/images/csr/img4.png',
        '/static/website/assets/images/csr/img19.JPG',
        '/static/website/assets/images/csr/img11.JPG',
        '/static/website/assets/images/csr/img12.JPG',
        '/static/website/assets/images/csr/img13.JPG',
        '/static/website/assets/images/csr/img10.png',
        '/static/website/assets/images/csr/img15.JPG',
        '/static/website/assets/images/csr/img16.JPG',
        '/static/website/assets/images/csr/img17.JPG',
        '/static/website/assets/images/csr/img18.JPG',
        '/static/website/assets/images/csr/img7.png'
      ];

      wheel.innerHTML = '';
      let isWheelHovering = false;

      for (let i = 0; i < numImages; i++) {
        const spoke = document.createElement('div');
        spoke.className = 'spoke';
        const angle = (360 / numImages) * i;
        spoke.style.transform = `rotate(${angle}deg)`;

        const img = document.createElement('img');
        img.src = imageUrls[i % imageUrls.length];
        img.alt = `CSR Image ${i + 1}`;

        img.addEventListener('mouseenter', () => (isWheelHovering = true));
        img.addEventListener('mouseleave', () => (isWheelHovering = false));

        spoke.appendChild(img);
        wheel.appendChild(spoke);
      }

      let currentRotation = 0;
      const animateCarousel = () => {
        if (!isWheelHovering) {
          currentRotation -= 0.06;
          wheel.style.transform = `rotate(${currentRotation}deg)`;
        }
        animFrameId = requestAnimationFrame(animateCarousel);
      };

      animateCarousel();
    }

    // 4. Mobile Member Stack Auto-Scroll
    let memberAutoScrollTimer = null;
    const isMobile = window.matchMedia('(max-width: 991.98px)').matches;
    const memberStack = root.querySelector('#mobileMemberStack');

    const handleMemberTouchStart = () => {
      if (memberAutoScrollTimer) {
        clearInterval(memberAutoScrollTimer);
        memberAutoScrollTimer = null;
      }
    };

    let startMemberAutoScroll = () => {};

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

        startMemberAutoScroll = () => {
          if (memberAutoScrollTimer) return;
          memberAutoScrollTimer = setInterval(() => {
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

        startMemberAutoScroll();
        memberStack.addEventListener('touchstart', handleMemberTouchStart, { passive: true });
        memberStack.addEventListener('touchend', startMemberAutoScroll);
      }
    }

    // 5. Fashion Gallery Mobile Carousel
    const gallery = root.querySelector('.fashion-gallery');
    const nextBtn = root.querySelector('.next-btn');
    const prevBtn = root.querySelector('.prev-btn');
    let galleryAutoScrollTimer = null;

    if (gallery) {
      let isCloned = false;
      const originalCols = Array.from(gallery.children);

      const setupInfiniteCarousel = () => {
        if (window.innerWidth <= 768 && !isCloned) {
          originalCols.forEach((col) => {
            gallery.appendChild(col.cloneNode(true));
          });
          originalCols.forEach((col) => {
            gallery.insertBefore(col.cloneNode(true), gallery.firstChild);
          });
          isCloned = true;
          requestAnimationFrame(() => {
            gallery.style.scrollBehavior = 'auto';
            gallery.scrollLeft = getJumpDistance();
            gallery.style.scrollBehavior = 'smooth';
          });
        }
      };

      const getJumpDistance = () => {
        let singleSetWidth = 0;
        const gap = parseInt(window.getComputedStyle(gallery).gap) || 12;
        originalCols.forEach((col) => {
          singleSetWidth += col.offsetWidth + gap;
        });
        return singleSetWidth;
      };

      const getScrollStep = () => {
        const img = gallery.querySelector('.img-wrapper');
        if (!img) return gallery.offsetWidth / 2;
        const gap = parseInt(window.getComputedStyle(gallery).gap) || 12;
        return img.offsetWidth + gap;
      };

      const handleGalleryScroll = () => {
        if (window.innerWidth > 768 || !isCloned) return;
        const jumpDist = getJumpDistance();
        if (jumpDist === 0) return;

        if (gallery.scrollLeft >= jumpDist * 2 - 5) {
          gallery.style.scrollBehavior = 'auto';
          gallery.scrollLeft -= jumpDist;
          gallery.style.scrollBehavior = 'smooth';
        } else if (gallery.scrollLeft <= 5) {
          gallery.style.scrollBehavior = 'auto';
          gallery.scrollLeft += jumpDist;
          gallery.style.scrollBehavior = 'smooth';
        }
      };

      const scrollNext = () => {
        if (window.innerWidth > 768) return;
        gallery.style.scrollBehavior = 'smooth';
        gallery.scrollLeft += getScrollStep();
      };

      const scrollPrev = () => {
        if (window.innerWidth > 768) return;
        gallery.style.scrollBehavior = 'smooth';
        gallery.scrollLeft -= getScrollStep();
      };

      const startGalleryAutoScroll = () => {
        galleryAutoScrollTimer = setInterval(() => {
          if (window.innerWidth <= 768) {
            scrollNext();
          }
        }, 3000);
      };

      const resetGalleryAutoScroll = () => {
        clearInterval(galleryAutoScrollTimer);
        startGalleryAutoScroll();
      };

      gallery.addEventListener('scroll', handleGalleryScroll);
      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          resetGalleryAutoScroll();
          scrollNext();
        });
      }
      if (prevBtn) {
        prevBtn.addEventListener('click', () => {
          resetGalleryAutoScroll();
          scrollPrev();
        });
      }

      setupInfiniteCarousel();
      startGalleryAutoScroll();

      gallery.addEventListener('touchstart', () => clearInterval(galleryAutoScrollTimer), { passive: true });
      gallery.addEventListener('touchend', resetGalleryAutoScroll, { passive: true });
    }

    // 6. CSR Mobile Enquiry Modal & Demo Quick Fill
    const enquiryTrigger = root.querySelector('#csrMobileEnquiryTrigger');
    const enquiryModal = root.querySelector('#csrEnquiryModal');
    const enquiryClose = root.querySelector('#csrMobileEnquiryClose');
    const csrForm = enquiryModal ? enquiryModal.querySelector('form') : null;

    if (csrForm) {
      let csrDemoBanner = csrForm.querySelector('#csrDemoBanner');
      if (!csrDemoBanner) {
        csrDemoBanner = document.createElement('div');
        csrDemoBanner.id = 'csrDemoBanner';
        csrDemoBanner.style.cssText = `
          background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
          border: 1.5px dashed #d97706;
          border-radius: 12px;
          padding: 12px 16px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
        `;
        csrDemoBanner.innerHTML = `
          <div>
            <div style="font-size: 13px; font-weight: 700; color: #b45309; display: flex; align-items: center; gap: 6px;">
              <span style="font-size: 15px;">⚡</span> Demo Mode: CSR Partnership
            </div>
            <div style="font-size: 12px; color: #92400e;">Pre-fills corporate partner enquiry</div>
          </div>
          <button type="button" id="btnFillCsrDemo" style="
            background: #d97706;
            color: #ffffff;
            border: none;
            padding: 6px 14px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
          ">
            ⚡ Fill Sample CSR Details
          </button>
        `;
        csrForm.insertBefore(csrDemoBanner, csrForm.firstChild);

        const btnFill = csrDemoBanner.querySelector('#btnFillCsrDemo');
        if (btnFill) {
          btnFill.addEventListener('click', () => {
            const comp = csrForm.querySelector('input[name="company_name"]');
            const contact = csrForm.querySelector('input[name="contact_person"]');
            const mobile = csrForm.querySelector('input[name="mobile"]');
            const email = csrForm.querySelector('input[name="email"]');

            if (comp) comp.value = 'Tata Consultancy Services (CSR Division)';
            if (contact) contact.value = 'Priya Sundaram';
            if (mobile) mobile.value = '9951672673';
            if (email) email.value = 'csr.partnerships@tcs.com';
          });
        }
      }

      csrForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you! Your CSR partnership inquiry has been received by Vrishasena Foundation.');
        csrForm.reset();
        closeEnquiry();
      });
    }

    const openEnquiry = () => {
      if (enquiryModal) {
        enquiryModal.classList.add('is-open');
        document.body.classList.add('csr-modal-open');
      }
    };

    const closeEnquiry = () => {
      if (enquiryModal) {
        enquiryModal.classList.remove('is-open');
        document.body.classList.remove('csr-modal-open');
      }
    };

    const onModalBackdrop = (e) => {
      if (e.target === enquiryModal) closeEnquiry();
    };

    const onEscKey = (e) => {
      if (e.key === 'Escape' && enquiryModal && enquiryModal.classList.contains('is-open')) {
        closeEnquiry();
      }
    };

    if (enquiryTrigger) enquiryTrigger.addEventListener('click', openEnquiry);
    if (enquiryClose) enquiryClose.addEventListener('click', closeEnquiry);
    if (enquiryModal) enquiryModal.addEventListener('click', onModalBackdrop);
    document.addEventListener('keydown', onEscKey);

    // 7. Mobile Navigation Menu Toggle
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

    // 8. Search bar toggle
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

    // 9. Donate monthly modal tab pills
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
      if (animFrameId) cancelAnimationFrame(animFrameId);
      if (memberAutoScrollTimer) clearInterval(memberAutoScrollTimer);
      if (memberStack) {
        memberStack.removeEventListener('touchstart', handleMemberTouchStart);
        memberStack.removeEventListener('touchend', startMemberAutoScroll);
      }
      if (galleryAutoScrollTimer) clearInterval(galleryAutoScrollTimer);
      if (enquiryTrigger) enquiryTrigger.removeEventListener('click', openEnquiry);
      if (enquiryClose) enquiryClose.removeEventListener('click', closeEnquiry);
      if (enquiryModal) enquiryModal.removeEventListener('click', onModalBackdrop);
      document.removeEventListener('keydown', onEscKey);
      if (menuIcon) menuIcon.removeEventListener('click', openSidebar);
      if (closeMenu) closeMenu.removeEventListener('click', closeSidebar);
      document.removeEventListener('click', outsideClick);
      if (searchIcon) searchIcon.removeEventListener('click', openSearch);
      if (searchClose) searchClose.removeEventListener('click', closeSearch);
      if (eduTab) eduTab.removeEventListener('click', onEduClick);
      if (healthTab) healthTab.removeEventListener('click', onHealthClick);
    };
  }, [navigate]);

  return <div ref={containerRef} dangerouslySetInnerHTML={{ __html: blogHtml }} />;
}
