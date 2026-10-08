import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Animal.css';
import { animalMainContent } from './AnimalContent.js';
import { setupAnimalWizard } from './AnimalWizard.js';

export default function Animal() {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Donate for Animals | Feed a Stray Dog & Cows | Vrishasena Foundation';
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
      if (
        href === '/animal' ||
        href === '/animal/' ||
        href === '/animal/index.html'
      ) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate(href);
      }
    };

    root.addEventListener('click', handleLinkClick);

    // ── 2. Mobile Sidebar Toggle ──
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

    // ── 3. Search Bar Toggle ──
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

    // ── 4. Hero Slider Logic ──
    let tfCurrentSlide = 0;
    const tfTotalSlides = 3;
    let tfAutoPlayInterval = null;

    const tfGoToSlide = (index) => {
      const texts = root.querySelectorAll('.tf-slide-text');
      const images = root.querySelectorAll('.tf-slide-img');
      const thumbs = root.querySelectorAll('.tf-thumb-circle');

      texts.forEach((el) => el.classList.remove('tf-active'));
      images.forEach((el) => el.classList.remove('tf-active'));
      thumbs.forEach((el) => el.classList.remove('tf-thumb-active'));

      if (texts[index]) texts[index].classList.add('tf-active');
      if (images[index]) images[index].classList.add('tf-active');
      if (thumbs[index]) thumbs[index].classList.add('tf-thumb-active');

      tfCurrentSlide = index;
      tfResetAutoPlay();
    };

    const tfNextSlide = () => {
      const nextIndex = (tfCurrentSlide + 1) % tfTotalSlides;
      tfGoToSlide(nextIndex);
    };

    const tfStartAutoPlay = () => {
      clearInterval(tfAutoPlayInterval);
      tfAutoPlayInterval = setInterval(tfNextSlide, 5000);
    };

    const tfResetAutoPlay = () => {
      clearInterval(tfAutoPlayInterval);
      tfStartAutoPlay();
    };

    window.tfGoToSlide = tfGoToSlide;
    tfStartAutoPlay();

    // ── 5. Toggle Card & Image Popup Modal ──
    window.toggleCard = (btn) => {
      if (!btn) return;
      const card = btn.closest('.menu-card');
      if (!card) return;
      const textSpan = btn.querySelector('.toggle-text');
      card.classList.toggle('expanded');
      if (textSpan) {
        textSpan.textContent = card.classList.contains('expanded') ? 'Less details' : 'More details';
      }
    };

    window.popImg = (src) => {
      const modal = root.querySelector('#imageModal');
      const popupImage = root.querySelector('#popupImage');
      if (modal && popupImage) {
        modal.style.display = 'flex';
        popupImage.src = src;
        setTimeout(() => modal.classList.add('active'), 10);
      }
    };

    window.closeImg = () => {
      const modal = root.querySelector('#imageModal');
      if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
          modal.style.display = 'none';
        }, 400);
      }
    };

    // ── 6. About Us Section: Video Loop ──
    const animalVideos = [
      {
        label: 'Cow Feeding',
        desktop: '/static/website/assets/videos/CowFeedingVideo.mp4',
        medium: '/static/website/assets/videos/CowFeedingVideo.mp4',
        mobile: '/static/website/assets/videos/CowFeedingVideo.mp4'
      },
      {
        label: 'Feed a Stray Dog',
        desktop: '/static/website/assets/videos/StrayDogVideo.mp4',
        medium: '/static/website/assets/videos/StrayDogVideo.mp4',
        mobile: '/static/website/assets/videos/StrayDogVideo.mp4'
      },
      {
        label: 'Dog Collar',
        desktop: '/static/website/assets/videos/DogCollorVideo.mp4',
        medium: '/static/website/assets/videos/DogCollorVideo.mp4',
        mobile: '/static/website/assets/videos/DogCollorVideo.mp4'
      }
    ];

    const video = root.querySelector('#animal-category-video');
    const titleEl = root.querySelector('#animal-category-video-title');
    const aboutSection = root.querySelector('.about-us-section');
    const bgColors = ['#ffffff', '#fff7ed', '#f0f9ff', '#f0fdf4', '#fef2f2', '#fefce8'];
    let videoIdx = 0;

    const pickSrc = (v) => {
      const w = window.innerWidth;
      if (w <= 600) return v.mobile;
      if (w <= 1024) return v.medium;
      return v.desktop;
    };

    const loadVideo = (i) => {
      if (!video) return;
      const v = animalVideos[i];
      video.src = pickSrc(v);
      video.load();
      if (titleEl) titleEl.textContent = v.label;
      if (aboutSection) aboutSection.style.backgroundColor = bgColors[i % bgColors.length];
      const p = video.play();
      if (p && typeof p.catch === 'function') p.catch(() => {});
    };

    const onVideoEnded = () => {
      videoIdx = (videoIdx + 1) % animalVideos.length;
      loadVideo(videoIdx);
    };

    if (video) {
      video.addEventListener('ended', onVideoEnded);
      loadVideo(videoIdx);
    }

    // ── 7. Stats Counter Animation ──
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

    // ── 8. Infinite Carousel with Drag & Swipe ──
    const track = root.querySelector('#carouselTrack');
    const prevBtn = root.querySelector('#prevBtn');
    const nextBtn = root.querySelector('#nextBtn');
    let autoPlayInterval = null;
    let removeCarouselListeners = null;

    if (track && track.children.length > 2) {
      const slides = Array.from(track.children);
      const originalLength = slides.length;

      const clonesStart = [
        slides[originalLength - 2].cloneNode(true),
        slides[originalLength - 1].cloneNode(true)
      ];
      const clonesEnd = [
        slides[0].cloneNode(true),
        slides[1].cloneNode(true),
        slides[2].cloneNode(true)
      ];

      clonesStart.forEach((clone) => track.prepend(clone));
      clonesEnd.forEach((clone) => track.append(clone));

      let currentIndex = 2;
      let isDragging = false;
      let startPos = 0;
      let currentTranslate = 0;
      let prevTranslate = 0;
      let animationID;
      let slideWidth = track.children[0].offsetWidth || 300;

      const setInitialPosition = () => {
        slideWidth = track.children[0].offsetWidth || 300;
        currentTranslate = currentIndex * -slideWidth;
        prevTranslate = currentTranslate;
        track.style.transform = `translateX(${currentTranslate}px)`;
      };

      setInitialPosition();

      const updateSliderPosition = () => {
        track.style.transform = `translateX(${currentTranslate}px)`;
      };

      const goToSlide = (index) => {
        track.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
        currentIndex = index;
        currentTranslate = currentIndex * -slideWidth;
        prevTranslate = currentTranslate;
        updateSliderPosition();
      };

      const moveNext = () => goToSlide(currentIndex + 1);
      const movePrev = () => goToSlide(currentIndex - 1);

      const onTransitionEnd = () => {
        if (currentIndex <= 1) {
          track.style.transition = 'none';
          currentIndex += originalLength;
          currentTranslate = currentIndex * -slideWidth;
          prevTranslate = currentTranslate;
          updateSliderPosition();
        }
        if (currentIndex >= originalLength + 2) {
          track.style.transition = 'none';
          currentIndex -= originalLength;
          currentTranslate = currentIndex * -slideWidth;
          prevTranslate = currentTranslate;
          updateSliderPosition();
        }
      };

      track.addEventListener('transitionend', onTransitionEnd);

      const startCarouselAutoPlay = () => {
        clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(moveNext, 5000);
      };

      const onNextClick = () => {
        moveNext();
        startCarouselAutoPlay();
      };

      const onPrevClick = () => {
        movePrev();
        startCarouselAutoPlay();
      };

      if (nextBtn) nextBtn.addEventListener('click', onNextClick);
      if (prevBtn) prevBtn.addEventListener('click', onPrevClick);

      const getPositionX = (event) => {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
      };

      const animationLoop = () => {
        updateSliderPosition();
        if (isDragging) animationID = requestAnimationFrame(animationLoop);
      };

      const touchStart = (event) => {
        isDragging = true;
        startPos = getPositionX(event);
        animationID = requestAnimationFrame(animationLoop);
        track.style.transition = 'none';
        track.classList.add('dragging');
        clearInterval(autoPlayInterval);
      };

      const touchMove = (event) => {
        if (isDragging) {
          const currentPosition = getPositionX(event);
          currentTranslate = prevTranslate + currentPosition - startPos;
        }
      };

      const touchEnd = () => {
        if (!isDragging) return;
        isDragging = false;
        cancelAnimationFrame(animationID);
        track.classList.remove('dragging');

        const movedBy = currentTranslate - prevTranslate;
        if (movedBy < -slideWidth * 0.2) {
          currentIndex += 1;
        } else if (movedBy > slideWidth * 0.2) {
          currentIndex -= 1;
        }

        goToSlide(currentIndex);
        startCarouselAutoPlay();
      };

      track.addEventListener('mousedown', touchStart);
      track.addEventListener('touchstart', touchStart, { passive: true });

      window.addEventListener('mousemove', touchMove);
      window.addEventListener('touchmove', touchMove, { passive: true });
      window.addEventListener('mouseup', touchEnd);
      window.addEventListener('touchend', touchEnd);

      const onResize = () => {
        track.style.transition = 'none';
        slideWidth = track.children[0].offsetWidth || 300;
        currentTranslate = currentIndex * -slideWidth;
        prevTranslate = currentTranslate;
        updateSliderPosition();
      };

      window.addEventListener('resize', onResize);

      startCarouselAutoPlay();

      removeCarouselListeners = () => {
        clearInterval(autoPlayInterval);
        cancelAnimationFrame(animationID);
        track.removeEventListener('transitionend', onTransitionEnd);
        if (nextBtn) nextBtn.removeEventListener('click', onNextClick);
        if (prevBtn) prevBtn.removeEventListener('click', onPrevClick);
        track.removeEventListener('mousedown', touchStart);
        track.removeEventListener('touchstart', touchStart);
        window.removeEventListener('mousemove', touchMove);
        window.removeEventListener('touchmove', touchMove);
        window.removeEventListener('mouseup', touchEnd);
        window.removeEventListener('touchend', touchEnd);
        window.removeEventListener('resize', onResize);
      };
    }

    // ── 9. Other Welfare Lazy Loading ──
    let otherWelfareObserver = null;
    const welfareSections = root.querySelectorAll('.other-welfare');
    if (welfareSections.length) {
      if ('IntersectionObserver' in window) {
        otherWelfareObserver = new IntersectionObserver(
          (entries, obs) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add('ow-in');
                obs.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.1 }
        );
        welfareSections.forEach((s) => otherWelfareObserver.observe(s));
      } else {
        welfareSections.forEach((s) => s.classList.add('ow-in'));
      }
    }

    // ── 10. Animal Donation Wizard Setup ──
    const cleanupWizard = setupAnimalWizard(root, navigate);

    return () => {
      root.removeEventListener('click', handleLinkClick);
      if (menuIcon) menuIcon.removeEventListener('click', openSidebar);
      if (closeMenu) closeMenu.removeEventListener('click', closeSidebar);
      document.removeEventListener('click', outsideClick);
      if (searchIcon) searchIcon.removeEventListener('click', openSearch);
      if (searchClose) searchClose.removeEventListener('click', closeSearch);

      clearInterval(tfAutoPlayInterval);
      if (video) video.removeEventListener('ended', onVideoEnded);
      if (statsObserver) statsObserver.disconnect();
      if (otherWelfareObserver) otherWelfareObserver.disconnect();
      if (removeCarouselListeners) removeCarouselListeners();
      if (cleanupWizard) cleanupWizard();

      delete window.tfGoToSlide;
      delete window.toggleCard;
      delete window.popImg;
      delete window.closeImg;
    };
  }, [navigate]);

  return (
    <div
      ref={containerRef}
      className="animal_page_wrapper"
      dangerouslySetInnerHTML={{ __html: animalMainContent }}
    />
  );
}
