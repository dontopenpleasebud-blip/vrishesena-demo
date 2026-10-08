// ==========================================================================
// Celebration Page Wizard, Sliders & Interaction Logic
// ==========================================================================

export function setupCelebrationWizard(root) {
  if (!root) return () => {};

  const cleanups = [];

  // ── 1. Package Data ──
  const packageData = {
    1: {
      title: "Normal Package",
      price: "₹1,600/-",
      category: "birthday_cake",
      amount: 1600,
      food_count: 1,
      items: [
        "20 Food Parcels (variety rice)",
        "1KG Cake"
      ]
    },
    2: {
      title: "Standard Package",
      price: "₹3,000/-",
      category: "homeless",
      amount: 3000,
      food_count: 1,
      parcel_per_unit: 66,
      items: [
        "66 Food Parcels (variety rice)",
        "1KG Cream Cake",
        "Wish Video from Kids"
      ]
    },
    3: {
      title: "Royal Birthday Celebration",
      price: "₹4,000/-",
      category: "virtual_birthday_cake",
      amount: 4000,
      food_count: 1,
      items: [
        "1KG Cream Cake",
        "20 Special Thaali Meals",
        "20 Juice",
        "20 Chocolates",
        "Balloons, Party Caps & Poppers",
        "Snacks (e.g., Samosas)",
        "Custom Birthday Banner",
        "Photos of the Celebration",
        "Videos of the Celebration",
        "Live Video Call During the Celebration"
      ]
    },
    4: {
      title: "Grand Happiness Package",
      price: "₹6,000/-",
      category: "virtual_birthday_cake",
      amount: 6000,
      food_count: 1,
      items: [
        "1KG Cream Cake",
        "20 Special Thaali Meals",
        "20 Juice",
        "20 Chocolates",
        "Balloons, Caps & Party Poppers",
        "Snacks (e.g., Samosas)",
        "Custom Birthday Banner with Photo",
        "Your Own Customized Birthday Song",
        "Cake Cutting Video",
        "Kids Dancing Celebration Video",
        "Wish Video from the Kids",
        "Distribution Video",
        "Photos of the Celebration",
        "Live Video Call During the Celebration"
      ]
    },
    5: {
      title: "Golden Birthday Package",
      price: "₹7,000/-",
      category: "virtual_birthday_cake",
      amount: 7000,
      food_count: 1,
      items: [
        "1KG Cream Cake",
        "20 Special Thaali Meal",
        "20 Juice",
        "20 Chocolates",
        "Heart Shape Balloons, Caps & Party Poppers",
        "Snacks (e.g., Samosas) for all 20 Children",
        "1 Birthday Banner with Photo and 2 Happy Birthday Banners on the Sides",
        "Your Own Customized Birthday Song",
        "Cake Cutting Video",
        "Kids Dancing Celebration Video",
        "Wish Video from the Kids",
        "Distribution Video",
        "Photos of the Celebration",
        "Live Video Call During the Celebration"
      ]
    }
  };

  let celebCurrentStep = 1;
  let celebSelectedPackageId = null;
  let celebBasePerUnit = 0;
  let activePackageId = null;

  // ── 2. Calculation & Addon Toggle ──
  function toggleAddonFields(containerId, enable) {
    const container = root.querySelector('#' + containerId);
    if (!container) return;
    container.querySelectorAll('input, select').forEach(inp => {
      inp.disabled = !enable;
      if (!enable) {
        inp.value = '';
        inp.classList.remove('error', 'error-shake');
        const errDiv = root.querySelector('#' + inp.id + '_error');
        if (errDiv) errDiv.style.display = 'none';
      }
    });
  }

  function recalculateCelebTotal() {
    if (!celebSelectedPackageId) return;

    const countInput = root.querySelector('#celebFoodCount');
    const displayedCount = parseInt(countInput ? countInput.value : 1) || 0;
    const pkg = packageData[celebSelectedPackageId];
    const parcelsPerUnit = (pkg && pkg.parcel_per_unit) ? pkg.parcel_per_unit : 1;
    const foodCount = displayedCount * parcelsPerUnit;

    const actualFoodCountInput = root.querySelector('#celebActualFoodCount');
    if (actualFoodCountInput) actualFoodCountInput.value = foodCount;

    let baseAmount = Math.round(celebBasePerUnit * displayedCount);
    const totalAmountEl = root.querySelector('#celebTotalAmount');
    if (totalAmountEl) totalAmountEl.value = baseAmount;

    let total = baseAmount;

    // Image on Cake (+₹100 × displayed food count)
    const cakeChk = root.querySelector('#celebAddonCake');
    const cakeFile = root.querySelector('#celebCakeFile');
    const cakeHidden = root.querySelector('#celebCakeHidden');
    if (cakeChk && cakeChk.checked) {
      total += 100 * displayedCount;
      if (cakeFile) cakeFile.classList.add('show');
      if (cakeHidden) {
        cakeHidden.disabled = false;
        cakeHidden.value = "cake with image";
      }
    } else {
      if (cakeFile) cakeFile.classList.remove('show');
      if (cakeHidden) {
        cakeHidden.disabled = true;
        cakeHidden.value = "";
      }
    }

    // Banner (+₹500 flat)
    const bannerChk = root.querySelector('#celebAddonBanner');
    const bannerHidden = root.querySelector('#celebBannerHidden');
    const bannerFields = root.querySelector('#celebBannerFields');
    if (bannerChk && bannerChk.checked) {
      total += 500;
      if (bannerHidden) {
        bannerHidden.disabled = false;
        bannerHidden.value = "Banner";
      }
      if (bannerFields) bannerFields.style.display = 'block';
      toggleAddonFields('celebBannerFields', true);
    } else {
      if (bannerHidden) {
        bannerHidden.disabled = true;
        bannerHidden.value = "";
      }
      if (bannerFields) bannerFields.style.display = 'none';
      toggleAddonFields('celebBannerFields', false);
    }

    // Video Call (FREE)
    const videoCallChk = root.querySelector('#celebAddonVideoCall');
    const videoCallHidden = root.querySelector('#celebVideoCallHidden');
    const videoCallFields = root.querySelector('#celebVideoCallFields');
    if (videoCallChk && videoCallChk.checked) {
      if (videoCallHidden) {
        videoCallHidden.disabled = false;
        videoCallHidden.value = "Video Call";
      }
      if (videoCallFields) videoCallFields.style.display = 'block';
      toggleAddonFields('celebVideoCallFields', true);
    } else {
      if (videoCallHidden) {
        videoCallHidden.disabled = true;
        videoCallHidden.value = "";
      }
      if (videoCallFields) videoCallFields.style.display = 'none';
      toggleAddonFields('celebVideoCallFields', false);
    }

    // Image on Parcel
    const parcelChk = root.querySelector('#celebAddonParcel');
    const parcelFile = root.querySelector('#celebParcelFile');
    const parcelUnitPrice = (celebSelectedPackageId === 2) ? 330 : 100;
    if (parcelChk && parcelChk.checked) {
      total += parcelUnitPrice * displayedCount;
      if (parcelFile) parcelFile.classList.add('show');
    } else {
      if (parcelFile) parcelFile.classList.remove('show');
    }

    const netAmountEl = root.querySelector('#celebNetAmount');
    if (netAmountEl) netAmountEl.value = total;
    const netDisplay = root.querySelector('#celebNetDisplay');
    if (netDisplay) netDisplay.textContent = '₹' + total.toLocaleString('en-IN');
  }

  // ── 3. Date & Field Validation ──
  function celebMinServiceDate() {
    const now = new Date();
    const d = new Date(now);
    if (now.getHours() >= 13) d.setDate(d.getDate() + 1);
    return d.getFullYear() + '-' +
      String(d.getMonth() + 1).padStart(2, '0') + '-' +
      String(d.getDate()).padStart(2, '0');
  }

  function celebCleanInput(id, value) {
    switch (id) {
      case 'celebDonorName':
        return value.replace(/[^a-zA-Z\s]/g, '');
      case 'celebDonorMob':
        return value.replace(/[^\d]/g, '').slice(0, 10);
      case 'celebDonorEmail':
        return value.trim();
      default:
        return value;
    }
  }

  function celebValidateInput(input) {
    if (!input) return true;
    let val = celebCleanInput(input.id, input.value);
    input.value = val;
    const id = input.id;
    input.classList.remove('error', 'error-shake');
    let valid = true, msg = '';

    if (!val) {
      valid = false;
      msg = 'This field is required *';
    } else if (id === 'celebDonorMob') {
      if (!/^\d{10}$/.test(val)) {
        valid = false;
        msg = 'Phone number must be 10 digits *';
      }
    } else if (id === 'celebDonorEmail') {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        valid = false;
        msg = 'Please enter a valid email *';
      }
    }

    let errorDiv = root.querySelector('#' + id + '_error');
    if (!errorDiv) {
      errorDiv = document.createElement('div');
      errorDiv.id = id + '_error';
      Object.assign(errorDiv.style, { color: 'red', fontSize: '12px', marginTop: '5px' });
      input.parentNode.appendChild(errorDiv);
    }

    if (!valid) {
      input.classList.add('error', 'error-shake');
      errorDiv.textContent = msg;
      errorDiv.style.display = 'block';
    } else {
      errorDiv.style.display = 'none';
    }
    return valid;
  }

  function celebValidateStep1() {
    return ['celebDonorName', 'celebDonorMob', 'celebDonorEmail']
      .every(id => celebValidateInput(root.querySelector('#' + id)));
  }

  function celebValidateStep2() {
    let valid = true;
    const parcelInput = root.querySelector('#celebNameOfParcel');
    if (parcelInput && !parcelInput.value.trim()) {
      parcelInput.classList.add('error', 'error-shake');
      valid = false;
    } else if (parcelInput) {
      parcelInput.classList.remove('error', 'error-shake');
    }
    const dateInput = root.querySelector('#celebServiceDate');
    if (dateInput) {
      const minDate = celebMinServiceDate();
      dateInput.setAttribute('min', minDate);
      if (!dateInput.value || dateInput.value < minDate) {
        dateInput.classList.add('error', 'error-shake');
        valid = false;
      } else {
        dateInput.classList.remove('error', 'error-shake');
      }
    }
    return valid;
  }

  function celebValidateStep3() {
    let valid = true;
    const cakeFileInput = root.querySelector('input[name="image on cake"]');
    const cakeChk = root.querySelector('#celebAddonCake');
    if (cakeChk && cakeChk.checked) {
      if (!cakeFileInput || !cakeFileInput.files || cakeFileInput.files.length === 0) {
        cakeFileInput.classList.add('error', 'error-shake');
        valid = false;
      } else {
        cakeFileInput.classList.remove('error', 'error-shake');
      }
    } else if (cakeFileInput) {
      cakeFileInput.classList.remove('error', 'error-shake');
    }

    const parcelFileInput = root.querySelector('input[name="photo-upload"]');
    const parcelChk = root.querySelector('#celebAddonParcel');
    if (parcelChk && parcelChk.checked) {
      if (!parcelFileInput || !parcelFileInput.files || parcelFileInput.files.length === 0) {
        parcelFileInput.classList.add('error', 'error-shake');
        valid = false;
      } else {
        parcelFileInput.classList.remove('error', 'error-shake');
      }
    } else if (parcelFileInput) {
      parcelFileInput.classList.remove('error', 'error-shake');
    }

    const bannerChk = root.querySelector('#celebAddonBanner');
    if (bannerChk && bannerChk.checked) {
      const timeInput = root.querySelector('#celebBannerTime');
      const locInput = root.querySelector('#celebBannerLocation');
      if (timeInput && !timeInput.value) {
        timeInput.classList.add('error', 'error-shake');
        valid = false;
      } else if (timeInput) {
        timeInput.classList.remove('error', 'error-shake');
      }
      if (locInput && !locInput.value) {
        locInput.classList.add('error', 'error-shake');
        valid = false;
      } else if (locInput) {
        locInput.classList.remove('error', 'error-shake');
      }
    }

    const videoCallChk = root.querySelector('#celebAddonVideoCall');
    if (videoCallChk && videoCallChk.checked) {
      const timeInput = root.querySelector('#celebVideoCallTime');
      const contactInput = root.querySelector('#celebVideoCallContact');
      if (timeInput && !timeInput.value) {
        timeInput.classList.add('error', 'error-shake');
        valid = false;
      } else if (timeInput) {
        timeInput.classList.remove('error', 'error-shake');
      }
      if (contactInput && !contactInput.value) {
        contactInput.classList.add('error', 'error-shake');
        valid = false;
      } else if (contactInput) {
        contactInput.classList.remove('error', 'error-shake');
      }
    }
    return valid;
  }

  // ── 4. Step Navigation ──
  function showCelebStep(n) {
    const steps = root.querySelectorAll('#celebDonationModal .wizard-step');
    const totalSteps = steps.length;

    if (n > celebCurrentStep) {
      const validators = {
        1: celebValidateStep1,
        2: celebValidateStep2
      };
      if (validators[celebCurrentStep] && !validators[celebCurrentStep]()) {
        const firstErr = root.querySelector('#celebDonationModal .wizard-step.active .error');
        if (firstErr) {
          firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }
    }

    if (n < 1 || n > totalSteps) return;

    celebCurrentStep = n;

    steps.forEach(step => step.classList.remove('active'));
    if (steps[n - 1]) steps[n - 1].classList.add('active');

    const prevBtn = root.querySelector('#celebPrevBtn');
    const nextBtn = root.querySelector('#celebNextBtn');
    const donateBtn = root.querySelector('#celebDonateBtn');
    const nav = root.querySelector('#celebDonationModal .celeb-wizard-navigation');

    if (n === 1) {
      if (prevBtn) prevBtn.style.display = 'none';
      if (nav) nav.style.justifyContent = 'flex-end';
    } else {
      if (prevBtn) prevBtn.style.display = '';
      if (nav) nav.style.justifyContent = 'space-between';
    }

    if (n === totalSteps) {
      if (nextBtn) nextBtn.style.display = 'none';
      if (donateBtn) donateBtn.style.display = '';
    } else {
      if (nextBtn) nextBtn.style.display = '';
      if (donateBtn) donateBtn.style.display = 'none';
    }
  }

  // ── 5. Open Donation Modal ──
  function openDonationModal(pkgId) {
    if (!pkgId) pkgId = 1;
    const pkg = packageData[pkgId];
    if (!pkg) return;

    celebSelectedPackageId = pkgId;
    celebBasePerUnit = (pkgId === 2) ? pkg.amount : (pkg.amount / pkg.food_count);

    const catName = root.querySelector('#celebCategoryName');
    if (catName) catName.value = pkg.category;
    const modalBadge = root.querySelector('#celebModalBadge');
    if (modalBadge) modalBadge.textContent = pkg.title;

    const foodCountInput = root.querySelector('#celebFoodCount');
    if (foodCountInput) {
      foodCountInput.value = 1;
      foodCountInput.min = 1;
    }

    const parcelLabel = root.querySelector('#celebParcelPriceLabel');
    if (parcelLabel) {
      parcelLabel.textContent = (pkgId === 2) ? '+₹330/count' : '+₹100/count';
    }

    const bannerWrap = root.querySelector('#celebAddonBannerWrap');
    if (bannerWrap) {
      if (pkgId === 1) {
        bannerWrap.style.display = '';
      } else {
        bannerWrap.style.display = 'none';
        const b = root.querySelector('#celebAddonBanner');
        if (b) b.checked = false;
      }
    }

    const videoCallWrap = root.querySelector('#celebAddonVideoCallWrap');
    if (videoCallWrap) {
      if (pkgId > 1 && pkgId !== 2) {
        videoCallWrap.style.display = '';
      } else {
        videoCallWrap.style.display = 'none';
        const vc = root.querySelector('#celebAddonVideoCall');
        if (vc) vc.checked = false;
      }
    }

    const wishAlert = root.querySelector('#celebWishAlert');
    if (wishAlert) {
      wishAlert.style.display = (pkgId > 1) ? 'flex' : 'none';
    }

    const cakeChk = root.querySelector('#celebAddonCake');
    if (cakeChk) cakeChk.checked = false;
    const parcelChk = root.querySelector('#celebAddonParcel');
    if (parcelChk) parcelChk.checked = false;
    const videoCallChk = root.querySelector('#celebAddonVideoCall');
    if (videoCallChk) videoCallChk.checked = false;

    const cakeFile = root.querySelector('#celebCakeFile');
    if (cakeFile) cakeFile.classList.remove('show');
    const parcelFile = root.querySelector('#celebParcelFile');
    if (parcelFile) parcelFile.classList.remove('show');

    const cakeHidden = root.querySelector('#celebCakeHidden');
    if (cakeHidden) cakeHidden.disabled = true;
    const bannerHidden = root.querySelector('#celebBannerHidden');
    if (bannerHidden) bannerHidden.disabled = true;
    const videoCallHidden = root.querySelector('#celebVideoCallHidden');
    if (videoCallHidden) videoCallHidden.disabled = true;

    const danceHidden = root.querySelector('#celebDanceHidden');
    if (danceHidden) {
      if (pkgId === 3 || pkgId === 4) {
        danceHidden.value = "Dance";
        danceHidden.disabled = false;
      } else {
        danceHidden.value = "";
        danceHidden.disabled = true;
      }
    }

    const stdCakeHidden = root.querySelector('#celebStandardCakeHidden');
    const stdWishVideoHidden = root.querySelector('#celebStandardWishVideoHidden');
    if (pkgId === 2) {
      if (stdCakeHidden) stdCakeHidden.disabled = false;
      if (stdWishVideoHidden) stdWishVideoHidden.disabled = false;
    } else {
      if (stdCakeHidden) stdCakeHidden.disabled = true;
      if (stdWishVideoHidden) stdWishVideoHidden.disabled = true;
    }

    const bannerFields = root.querySelector('#celebBannerFields');
    if (bannerFields) bannerFields.style.display = 'none';
    const videoCallFields = root.querySelector('#celebVideoCallFields');
    if (videoCallFields) videoCallFields.style.display = 'none';
    toggleAddonFields('celebBannerFields', false);
    toggleAddonFields('celebVideoCallFields', false);

    recalculateCelebTotal();
    showCelebStep(1);

    const modalEl = root.querySelector('#celebDonationModal');
    if (modalEl && window.bootstrap) {
      let modal = window.bootstrap.Modal.getInstance(modalEl);
      if (!modal) {
        modal = new window.bootstrap.Modal(modalEl);
      }
      modal.show();
    }
  }

  // ── 6. Mobile Card Details Tab ──
  function showDetailsTab(packageId) {
    const tab = root.querySelector('#packageDetailsTab');
    const data = packageData[packageId];
    if (!tab || !data) return;

    const dTitle = root.querySelector('#detailsTitle');
    if (dTitle) dTitle.textContent = data.title;
    const dPrice = root.querySelector('#detailsPrice');
    if (dPrice) dPrice.textContent = data.price;

    const listHtml = data.items.map(item =>
      `<li><i class="fas fa-circle"></i>${item}</li>`
    ).join('');

    const dList = root.querySelector('#detailsList');
    if (dList) dList.innerHTML = listHtml;

    tab.classList.add('active');
    setTimeout(() => {
      tab.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  }

  function closeDetailsTab() {
    const tab = root.querySelector('#packageDetailsTab');
    if (tab) tab.classList.remove('active');

    root.querySelectorAll('.product-card').forEach(c => {
      c.classList.remove('active');
    });
    activePackageId = null;
  }

  function toggleCardDetails(card) {
    const packageId = parseInt(card.dataset.packageId);
    if (activePackageId === packageId) {
      closeDetailsTab();
      return;
    }
    root.querySelectorAll('.product-card').forEach(c => {
      c.classList.remove('active');
    });
    card.classList.add('active');
    activePackageId = packageId;
    showDetailsTab(packageId);
  }

  // ── 7. Mobile Video Modal ──
  const modal = root.querySelector('#videoModal');
  const videoPlayer = root.querySelector('#videoPlayer');

  function openVideoModal(element) {
    const videoUrl = element.dataset.videoSrc;
    if (!videoUrl || !videoPlayer || !modal) return;
    videoPlayer.src = videoUrl;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    videoPlayer.play().catch(() => {});
  }

  function closeVideoModal() {
    if (!modal || !videoPlayer) return;
    modal.classList.remove('active');
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
    videoPlayer.src = '';
    document.body.style.overflow = '';
  }

  if (modal) {
    const onModalClick = (e) => {
      if (e.target === modal) closeVideoModal();
    };
    modal.addEventListener('click', onModalClick);
    cleanups.push(() => modal.removeEventListener('click', onModalClick));
  }

  // ── 8. Desktop Video Modal ──
  const desktopVideoModalOverlay = root.querySelector('.desktop-video-modal-overlay');
  const desktopVideoModalClose = root.querySelector('.desktop-video-modal-close');
  const desktopVideoIframe = root.querySelector('.desktop-video-iframe');

  function openDesktopVideoModal(videoSrc) {
    if (!desktopVideoIframe || !desktopVideoModalOverlay) return;
    desktopVideoIframe.src = videoSrc;
    desktopVideoIframe.setAttribute("allow", "autoplay");
    desktopVideoModalOverlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function closeDesktopVideoModal() {
    if (!desktopVideoIframe || !desktopVideoModalOverlay) return;
    desktopVideoIframe.src = '';
    desktopVideoModalOverlay.style.display = 'none';
    document.body.style.overflow = '';
  }

  if (desktopVideoModalClose) {
    desktopVideoModalClose.addEventListener('click', closeDesktopVideoModal);
    cleanups.push(() => desktopVideoModalClose.removeEventListener('click', closeDesktopVideoModal));
  }
  if (desktopVideoModalOverlay) {
    const onOverlayClick = (e) => {
      if (e.target === desktopVideoModalOverlay) closeDesktopVideoModal();
    };
    desktopVideoModalOverlay.addEventListener('click', onOverlayClick);
    cleanups.push(() => desktopVideoModalOverlay.removeEventListener('click', onOverlayClick));
  }

  // Bind desktop video cards
  root.querySelectorAll('.desktop-birthday-card[data-video]').forEach(card => {
    const onCardClick = () => {
      const src = card.getAttribute('data-video');
      if (src) openDesktopVideoModal(src);
    };
    card.addEventListener('click', onCardClick);
    cleanups.push(() => card.removeEventListener('click', onCardClick));
  });

  // ── 9. Live Parcel Name Preview ──
  const celebNameOfParcel = root.querySelector('#celebNameOfParcel');
  const celebParcelPreview = root.querySelector('#celebParcelPreview');
  const celebParcelNamePreview = root.querySelector('#celebParcelNamePreview');

  if (celebNameOfParcel && celebParcelPreview && celebParcelNamePreview) {
    celebParcelPreview.style.display = "none";
    celebParcelNamePreview.textContent = "";

    const onParcelInput = function() {
      const value = this.value.trim();
      if (value.length > 0) {
        celebParcelNamePreview.textContent = value;
        celebParcelPreview.style.display = "flex";
      } else {
        celebParcelPreview.style.display = "none";
      }
    };
    celebNameOfParcel.addEventListener('input', onParcelInput);
    cleanups.push(() => celebNameOfParcel.removeEventListener('input', onParcelInput));
  }

  // ── 10. Service Date Cutoff Initializer ──
  const dateInput = root.querySelector('#celebServiceDate');
  if (dateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.setAttribute('min', celebMinServiceDate());
    dateInput.value = tomorrow.getFullYear() + '-' +
      String(tomorrow.getMonth() + 1).padStart(2, '0') + '-' +
      String(tomorrow.getDate()).padStart(2, '0');
  }

  // ── 11. Form Submission ──
  const celebDonationForm = root.querySelector('#celebDonationForm');
  if (celebDonationForm) {
    const onFormSubmit = function(e) {
      if (!celebValidateStep3()) {
        e.preventDefault();
        return false;
      }
      const btn = root.querySelector('#celebDonateBtn');
      if (btn) {
        btn.disabled = true;
        btn.textContent = 'Processing...';
        setTimeout(() => {
          btn.disabled = false;
          btn.textContent = 'Donate Now';
        }, 5000);
      }
    };
    celebDonationForm.addEventListener('submit', onFormSubmit);
    cleanups.push(() => celebDonationForm.removeEventListener('submit', onFormSubmit));
  }

  // ── 12. Modal Cleanup on Hide ──
  const modalEl = root.querySelector('#celebDonationModal');
  if (modalEl) {
    const onModalHidden = () => {
      document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
    modalEl.addEventListener('hidden.bs.modal', onModalHidden);
    cleanups.push(() => modalEl.removeEventListener('hidden.bs.modal', onModalHidden));
  }

  // ── 13. Mobile Bottom Action Button ──
  const mobileActionBtn = root.querySelector('#mobileActionBtn');
  if (mobileActionBtn) {
    const onMobileAction = () => {
      openDonationModal(activePackageId || 1);
    };
    mobileActionBtn.addEventListener('click', onMobileAction);
    cleanups.push(() => mobileActionBtn.removeEventListener('click', onMobileAction));
  }

  // ── 14. Other Welfare Section Animation ──
  const welfareSections = root.querySelectorAll('.other-welfare');
  if (welfareSections.length > 0) {
    const welfareObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('ow-in');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    welfareSections.forEach(s => welfareObserver.observe(s));
    cleanups.push(() => welfareObserver.disconnect());
  }

  // ── 15. Attach Global Helpers for inline handlers ──
  window.openDonationModal = openDonationModal;
  window.showCelebStep = showCelebStep;
  window.recalculateCelebTotal = recalculateCelebTotal;
  window.openVideoModal = openVideoModal;
  window.closeVideoModal = closeVideoModal;
  window.toggleCardDetails = toggleCardDetails;
  window.showDetailsTab = showDetailsTab;
  window.closeDetailsTab = closeDetailsTab;

  // ── 16. Initialize Swipers if window.Swiper exists ──
  const initSwipers = () => {
    if (!window.Swiper) return;

    try {
      if (root.querySelector('.banner-swiper')) {
        new window.Swiper(root.querySelector('.banner-swiper'), {
          loop: true,
          speed: 800,
          autoplay: { delay: 3000, disableOnInteraction: false },
          pagination: { el: '.banner-swiper .swiper-pagination', clickable: true },
        });
      }
      if (root.querySelector('.stats-swiper')) {
        new window.Swiper(root.querySelector('.stats-swiper'), {
          slidesPerView: 'auto',
          spaceBetween: 15,
          freeMode: true,
          grabCursor: true
        });
      }
      if (root.querySelector('.product-swiper')) {
        new window.Swiper(root.querySelector('.product-swiper'), {
          slidesPerView: 'auto',
          spaceBetween: 15,
          freeMode: true,
          grabCursor: true,
          loop: false
        });
      }
      if (root.querySelector('.video-swiper')) {
        new window.Swiper(root.querySelector('.video-swiper'), {
          slidesPerView: 'auto',
          spaceBetween: 15,
          freeMode: true,
          grabCursor: true
        });
      }
      if (root.querySelector('.packages-swiper')) {
        new window.Swiper(root.querySelector('.packages-swiper'), {
          slidesPerView: 1,
          spaceBetween: 30,
          loop: true,
          grabCursor: true,
          autoplay: { delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true },
          pagination: { el: '.packages-swiper .swiper-pagination', clickable: true, dynamicBullets: true },
          navigation: {
            nextEl: '.packages-swiper-button-next',
            prevEl: '.packages-swiper-button-prev',
          },
          breakpoints: {
            768: { slidesPerView: 2, spaceBetween: 30 },
            992: { slidesPerView: 3, spaceBetween: 40 }
          }
        });
      }
    } catch (err) {
      console.warn('Celebration swiper init:', err);
    }
  };

  if (window.Swiper) {
    initSwipers();
  } else {
    const swiperScript = document.createElement('script');
    swiperScript.src = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js';
    swiperScript.async = true;
    swiperScript.onload = initSwipers;
    document.body.appendChild(swiperScript);
  }

  // ── Return Cleanup Function ──
  return () => {
    cleanups.forEach(fn => fn());
    delete window.openDonationModal;
    delete window.showCelebStep;
    delete window.recalculateCelebTotal;
    delete window.openVideoModal;
    delete window.closeVideoModal;
    delete window.toggleCardDetails;
    delete window.showDetailsTab;
    delete window.closeDetailsTab;
  };
}
