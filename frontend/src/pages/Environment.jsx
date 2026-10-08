import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Environment.css';
import { environmentHtml } from './EnvironmentContent.js';
import { setupEnvironmentWizard } from './EnvironmentWizard.js';

export default function Environment() {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title =
      'Environment Welfare Donations | Plant Trees, Bird Houses & Water Bowls | Vrishasena Foundation';
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
        href === '/environment' ||
        href === '/environment/index.html' ||
        href === '/causes-detail/environment'
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

    // ── 5. Hero Nature Slider (Section 1) ──
    const slides = [
      'https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=2000&auto=format&fit=crop',
    ];
    let currentSlide = 0;
    const sliderContainer = root.querySelector('#slider');
    const dots = root.querySelectorAll('.dot');
    let autoSlideTimer = null;

    const updateSlider = () => {
      if (!sliderContainer) return;
      sliderContainer.style.setProperty('--bg', `url('${slides[currentSlide]}')`);
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
      });
    };

    const nextSlide = (isManual = false) => {
      currentSlide = (currentSlide + 1) % slides.length;
      updateSlider();
      if (isManual) resetAutoSlide();
    };

    const prevSlide = () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      updateSlider();
      resetAutoSlide();
    };

    const goToSlide = (index) => {
      currentSlide = index;
      updateSlider();
      resetAutoSlide();
    };

    const startAutoSlide = () => {
      clearInterval(autoSlideTimer);
      autoSlideTimer = setInterval(() => nextSlide(false), 5000);
    };

    const resetAutoSlide = () => {
      clearInterval(autoSlideTimer);
      startAutoSlide();
    };

    startAutoSlide();

    window.goToSlide = goToSlide;
    window.prevSlide = prevSlide;
    window.nextSlide = nextSlide;

    const arrowNext = root.querySelector('.arrow-next');
    const arrowPrev = root.querySelector('.arrow-prev');
    if (arrowNext) arrowNext.addEventListener('click', () => nextSlide(true));
    if (arrowPrev) arrowPrev.addEventListener('click', prevSlide);

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => goToSlide(index));
    });

    // ── 6. Section 3: More details toggle on menu-cards ──
    window.toggleCard = function (btn) {
      if (!btn) return;
      const card = btn.closest('.menu-card');
      if (!card) return;
      const isExpanded = card.classList.contains('expanded');
      card.classList.toggle('expanded');
      const text = btn.querySelector('.toggle-text');
      if (text) {
        text.textContent = isExpanded ? 'More details' : 'Less details';
      }
    };

    // ── 7. Section 4: Eco Packages Track Slider ──
    const sliderTrack = root.querySelector('#mainImpactTrack');
    const backControl = root.querySelector('#triggerBack');
    const forwardControl = root.querySelector('#triggerForward');
    const allTiles = sliderTrack ? sliderTrack.querySelectorAll('.impact-tile') : [];

    let activePosition = 0;

    const calculateStep = () => {
      if (!allTiles.length || !sliderTrack) return 344;
      const tileWidth = allTiles[0].offsetWidth;
      const spacing = parseInt(window.getComputedStyle(sliderTrack).gap, 10) || 24;
      return tileWidth + spacing;
    };

    const fetchLimit = () => {
      if (!sliderTrack || !sliderTrack.parentElement) return 0;
      const viewPortWidth = sliderTrack.parentElement.offsetWidth;
      const stepSize = calculateStep();
      const visibleCount = Math.floor(viewPortWidth / stepSize) || 1;
      return Math.max(0, allTiles.length - visibleCount);
    };

    const refreshSliderState = () => {
      if (!sliderTrack || !backControl || !forwardControl) return;
      const boundary = fetchLimit();
      backControl.disabled = activePosition === 0;
      forwardControl.disabled = activePosition === boundary;

      const offsetDistance = calculateStep() * activePosition;
      sliderTrack.style.transform = `translateX(-${offsetDistance}px)`;
    };

    const moveForward = () => {
      if (activePosition < fetchLimit()) {
        activePosition++;
        refreshSliderState();
      }
    };

    const moveBack = () => {
      if (activePosition > 0) {
        activePosition--;
        refreshSliderState();
      }
    };

    if (forwardControl) forwardControl.addEventListener('click', moveForward);
    if (backControl) backControl.addEventListener('click', moveBack);
    window.addEventListener('resize', refreshSliderState);
    refreshSliderState();

    // ── 8. Section 5: About Us Stats Counter Animation ──
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
              statsObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.5 }
      );
      statsObserver.observe(statsContainer);
    }

    // ── 9. Section 6: Hanging Clothesline Gallery Carousel ──
    const cards = root.querySelectorAll('.hanging-card');
    const totalCards = cards.length;
    let currentGalleryIndex = 2; // Center card
    let galleryTimer = null;

    const updateGalleryCarousel = () => {
      cards.forEach((card, index) => {
        card.className = 'hanging-card';
        const diff = (index - currentGalleryIndex + totalCards) % totalCards;

        if (diff === 0) {
          card.classList.add('active');
        } else if (diff === 1) {
          card.classList.add('next-1');
        } else if (diff === 2) {
          card.classList.add('next-2');
        } else if (diff === totalCards - 1) {
          card.classList.add('prev-1');
        } else if (diff === totalCards - 2) {
          card.classList.add('prev-2');
        } else {
          if (diff > 2 && diff <= totalCards / 2) {
            card.classList.add('hidden-right');
          } else {
            card.classList.add('hidden-left');
          }
        }
      });
    };

    const nextGallerySlide = () => {
      currentGalleryIndex = (currentGalleryIndex + 1) % totalCards;
      updateGalleryCarousel();
    };

    const startGalleryAutoScroll = () => {
      clearInterval(galleryTimer);
      galleryTimer = setInterval(nextGallerySlide, 5000);
    };

    const stopGalleryAutoScroll = () => {
      clearInterval(galleryTimer);
    };

    cards.forEach((card, index) => {
      card.addEventListener('click', () => {
        currentGalleryIndex = index;
        updateGalleryCarousel();
        stopGalleryAutoScroll();
        startGalleryAutoScroll();
      });
      card.addEventListener('mouseenter', stopGalleryAutoScroll);
      card.addEventListener('mouseleave', startGalleryAutoScroll);
    });

    if (cards.length) {
      updateGalleryCarousel();
      startGalleryAutoScroll();
    }

    // ── 10. Image Popup Modal ──
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

    const imgModal = root.querySelector('#imageModal');
    if (imgModal) {
      imgModal.addEventListener('click', (e) => {
        if (e.target === imgModal || e.target.classList.contains('close-modal')) {
          window.closeImg();
        }
      });
    }

    // ── 11. Mobile Card Accordion & Scroll Helpers ──
    let isCardAnimating = false;

    window.selectCard = function (id) {
      if (isCardAnimating) return;
      const targetWrapper = root.querySelector('#wrap-' + id);
      if (!targetWrapper) return;

      const targetPanel = targetWrapper.querySelector('.detail-panel');
      const isAlreadyOpen = targetWrapper.classList.contains('active');
      const activeWrapper = root.querySelector('.card-wrapper.active');

      if (isAlreadyOpen) {
        targetWrapper.classList.remove('active');
        if (targetPanel) targetPanel.style.maxHeight = null;
        return;
      }

      if (activeWrapper) {
        isCardAnimating = true;
        const activePanel = activeWrapper.querySelector('.detail-panel');
        activeWrapper.classList.remove('active');
        if (activePanel) activePanel.style.maxHeight = null;

        setTimeout(() => {
          if (targetWrapper && targetPanel) {
            targetWrapper.classList.add('active');
            targetPanel.style.maxHeight = targetPanel.scrollHeight + 30 + 'px';
            const top = targetWrapper.getBoundingClientRect().top + window.scrollY - 20;
            window.scrollTo({ top, behavior: 'smooth' });
          }
          isCardAnimating = false;
        }, 400);
      } else {
        targetWrapper.classList.add('active');
        if (targetPanel) {
          targetPanel.style.maxHeight = targetPanel.scrollHeight + 30 + 'px';
          const top = targetWrapper.getBoundingClientRect().top + window.scrollY - 20;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    };

    window.goToCard = function (id) {
      const section = root.querySelector('.selection-section');
      const target = root.querySelector('#card-' + id);
      if (!section || !target) return;
      section.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        target.click();
      }, 400);
    };

    window.goToCombo = function () {
      const section = root.querySelector('.enr-section');
      if (!section) return;
      section.scrollIntoView({ behavior: 'smooth' });
    };

    let isComboAnimating = false;
    window.enrComboSelect = function (id) {
      if (isComboAnimating) return;
      const targetWrap = root.querySelector('#enr-combo-wrap-' + id);
      const targetPanel = root.querySelector('#enr-combo-panel-' + id);
      if (!targetWrap || !targetPanel) return;

      const isOpen = targetWrap.classList.contains('active');
      const activeWrap = root.querySelector('.enr-combo-wrap.active');

      if (isOpen) {
        targetWrap.classList.remove('active');
        targetPanel.style.maxHeight = null;
        return;
      }

      const openTargetCombo = () => {
        targetWrap.classList.add('active');
        targetPanel.style.maxHeight = targetPanel.scrollHeight + 30 + 'px';
        setTimeout(() => {
          const top = targetWrap.getBoundingClientRect().top + window.scrollY - 20;
          window.scrollTo({ top, behavior: 'smooth' });
        }, 150);
      };

      if (activeWrap) {
        isComboAnimating = true;
        const activePanel = activeWrap.querySelector('.enr-combo-panel');
        activeWrap.classList.remove('active');
        if (activePanel) activePanel.style.maxHeight = null;
        setTimeout(() => {
          openTargetCombo();
          isComboAnimating = false;
        }, 400);
      } else {
        openTargetCombo();
      }
    };

    // ── 12. Name on Parcel Preview ──
    const dwParcel = root.querySelector('#dw-parcel');
    const parcelPreview = root.querySelector('#parcel-preview');
    const previewBox = root.querySelector('#preview-box');
    const dwParcelOnImage = root.querySelector('#dw-parcel-on-image');

    if (dwParcel) {
      dwParcel.addEventListener('input', function () {
        const val = this.value.trim();
        if (val === '') {
          if (previewBox) previewBox.style.display = 'none';
          if (parcelPreview) parcelPreview.textContent = '—';
          if (dwParcelOnImage) dwParcelOnImage.textContent = '';
        } else {
          if (previewBox) previewBox.style.display = 'flex';
          if (parcelPreview) parcelPreview.textContent = val;
          if (dwParcelOnImage) dwParcelOnImage.textContent = val;
        }
      });
    }

    // ── 13. Other-welfare reveal observer ──
    const welfareSections = root.querySelectorAll('.other-welfare');
    let welfareObserver = null;
    if (welfareSections.length && 'IntersectionObserver' in window) {
      welfareObserver = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('ow-in');
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 }
      );
      welfareSections.forEach((s) => welfareObserver.observe(s));
    }

    // ── 14. Initialize Environment Donation Wizard ──
    const cleanupWizard = setupEnvironmentWizard(navigate);

    return () => {
      root.removeEventListener('click', handleLinkClick);
      if (menuIcon) menuIcon.removeEventListener('click', openSidebar);
      if (closeMenu) closeMenu.removeEventListener('click', closeSidebar);
      document.removeEventListener('click', outsideClick);
      if (searchIcon) searchIcon.removeEventListener('click', openSearch);
      if (searchClose) searchClose.removeEventListener('click', closeSearch);
      if (eduTab) eduTab.removeEventListener('click', onEduClick);
      if (healthTab) healthTab.removeEventListener('click', onHealthClick);

      clearInterval(autoSlideTimer);
      clearInterval(galleryTimer);
      window.removeEventListener('resize', refreshSliderState);
      if (statsObserver) statsObserver.disconnect();
      if (welfareObserver) welfareObserver.disconnect();

      delete window.goToSlide;
      delete window.prevSlide;
      delete window.nextSlide;
      delete window.toggleCard;
      delete window.popImg;
      delete window.closeImg;
      delete window.selectCard;
      delete window.goToCard;
      delete window.goToCombo;
      delete window.enrComboSelect;

      cleanupWizard();
    };
  }, [navigate]);

  return <div ref={containerRef} dangerouslySetInnerHTML={{ __html: environmentHtml }} />;
}
