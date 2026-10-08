import Splide from '@splidejs/splide';

export function setupNepalFloodWizard(root) {
  if (!root) return () => {};

  let splideInstance = null;
  let swiperInstance = null;
  let cleanups = [];

  // ── 1. Double Slider (Splide) ──
  const sliderEl = root.querySelector('#double-slider');
  if (sliderEl) {
    try {
      splideInstance = new Splide(sliderEl, {
        type: 'loop',
        perPage: 1,
        perMove: 1,
        gap: 0,
        arrows: true,
        pagination: true,
        autoplay: true,
        interval: 3000,
        cover: true,
        drag: true,
        pauseOnHover: false,
        pauseOnFocus: false,
      }).mount();
    } catch (err) {
      console.warn('Splide mount error:', err);
    }
  }

  // ── 2. Gallery Slider (Swiper) ──
  const galleryEl = root.querySelector('#gallery-slider');
  const initSwiper = () => {
    if (!galleryEl || !window.Swiper) return;
    try {
      swiperInstance = new window.Swiper(galleryEl, {
        slidesPerView: 2.5,
        spaceBetween: 16,
        loop: true,
        grabCursor: true,
        autoplay: { delay: 3500, disableOnInteraction: false },
        pagination: { el: '.dk-gallery-wrap .swiper-pagination', clickable: true },
        breakpoints: {
          0: { slidesPerView: 2.2, spaceBetween: 12 },
          560: { slidesPerView: 2.2, spaceBetween: 16 },
        },
      });
    } catch (err) {
      console.warn('Swiper mount error:', err);
    }
  };

  if (window.Swiper) {
    initSwiper();
  } else {
    const swiperScript = document.createElement('script');
    swiperScript.src = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js';
    swiperScript.async = true;
    swiperScript.onload = initSwiper;
    document.body.appendChild(swiperScript);
  }

  // ── 3. Phone Field (intl-tel-input) ──
  const mobEl = root.querySelector('#donorMob');
  const donationForm = root.querySelector('#donation-form');
  const ccEl = donationForm && donationForm.querySelector('input[name="country_code"]');

  window.dkDialCode = function () {
    return (ccEl && ccEl.value) || '91';
  };

  function syncDialCode() {
    if (!window._donorIti || !ccEl) return;
    try {
      ccEl.value = String(window._donorIti.getSelectedCountryData().dialCode || '91');
    } catch (e) {
      /* keep the 91 default */
    }
  }

  function nationalDigits(raw) {
    const dial = window.dkDialCode();
    const digits = String(raw == null ? '' : raw).replace(/\D/g, '');
    if (digits.length > 10 && digits.indexOf(dial) === 0) {
      return digits.slice(dial.length).slice(0, dial === '91' ? 10 : 15);
    }
    return digits.slice(0, dial === '91' ? 10 : 15);
  }
  window.dkNationalDigits = nationalDigits;

  function initIti() {
    if (!window.intlTelInput || !mobEl || mobEl.dataset.itiDone) return;
    mobEl.dataset.itiDone = 'true';
    window._donorIti = window.intlTelInput(mobEl, {
      initialCountry: 'in',
      separateDialCode: true,
      preferredCountries: ['in', 'np', 'us', 'gb', 'ae', 'sg', 'au', 'ca'],
      utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.13/js/utils.js',
    });

    const onCountryChange = () => {
      syncDialCode();
      mobEl.dispatchEvent(new Event('input'));
    };
    mobEl.addEventListener('countrychange', onCountryChange);
    cleanups.push(() => mobEl.removeEventListener('countrychange', onCountryChange));

    syncDialCode();
  }

  if (window.intlTelInput) {
    initIti();
  } else {
    const itiScript = document.createElement('script');
    itiScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.13/js/intlTelInput.min.js';
    itiScript.async = true;
    itiScript.onload = initIti;
    document.body.appendChild(itiScript);
  }

  if (mobEl) {
    const normaliseMob = () => {
      const cleaned = nationalDigits(mobEl.value);
      if (cleaned !== mobEl.value) mobEl.value = cleaned;
    };
    mobEl.addEventListener('input', normaliseMob);
    cleanups.push(() => mobEl.removeEventListener('input', normaliseMob));
    normaliseMob();
  }

  // ── 4. Quick-Donate Form & Pack Management ──
  const form = root.querySelector('#donation-form');
  const btn = root.querySelector('#donatebtn');
  const amount = root.querySelector('#netamount');
  const errorNode = root.querySelector('#qfError');
  const totalText = root.querySelector('#qfTotalText');

  const fields = [
    { el: 'donorname', msg: 'Donor name is required' },
    { el: 'donorMob', msg: 'Phone number is required' },
    { el: 'donorParcel', msg: 'Name on parcel is required' },
    { el: 'serviceDate', msg: 'Pick a service date' },
  ];

  function setError(message, field) {
    const fieldError = field ? root.querySelector('#' + field.id + 'Error') : null;
    if (fieldError) {
      fieldError.textContent = message || '';
      fieldError.classList.toggle('show', !!message);
    } else if (errorNode) {
      errorNode.textContent = message || '';
      errorNode.classList.toggle('show', !!message);
    }
    if (field) field.classList.add('error');
  }

  function clearErrors() {
    if (errorNode) {
      errorNode.textContent = '';
      errorNode.classList.remove('show');
    }
    if (form) {
      form.querySelectorAll('.dk-qf-field-error').forEach((el) => {
        el.textContent = '';
        el.classList.remove('show');
      });
      form.querySelectorAll('.dk-qf-input.error').forEach((el) => {
        el.classList.remove('error');
      });
    }
  }

  if (form) {
    form.querySelectorAll('.dk-qf-input').forEach((input) => {
      input.addEventListener('input', clearErrors);
    });
  }

  const packs = Array.prototype.slice.call(root.querySelectorAll('#reliefPacks .dk-pack'));
  const countChips = Array.prototype.slice.call(root.querySelectorAll('#countChips .dk-qf-inchip'));
  const askCards = Array.prototype.slice.call(root.querySelectorAll('.dk-ask-grid .dk-ask'));
  const infoPanel = root.querySelector('.dk-info');
  const packName = root.querySelector('#packName');
  const countEl = root.querySelector('#nepalcount');
  const countBlock = root.querySelector('#countBlock');
  const amountBlock = root.querySelector('#amountBlock');
  const totalCalc = root.querySelector('#qfTotalCalc');
  const crowdBlock = root.querySelector('#crowdBlock');
  const crowdFill = root.querySelector('#crowdFill');
  const crowdText = root.querySelector('#crowdText');
  const categoryEl = root.querySelector('#category_name');
  const fallbackCategory = categoryEl ? categoryEl.value : '';

  let selectedPack = packs[0] || null;

  function currentCount() {
    if (!countEl) return 1;
    const n = parseInt(countEl.value, 10);
    return isNaN(n) || n < 1 ? 1 : n;
  }

  function isFreeAmount() {
    return !!(selectedPack && selectedPack.dataset.freeAmount);
  }

  function packMinimum() {
    if (!selectedPack || isFreeAmount()) return 0;
    return parseInt(selectedPack.dataset.amount, 10) * currentCount();
  }

  function syncAmountMode() {
    const free = isFreeAmount();
    if (countBlock) countBlock.hidden = free;
    if (amountBlock) amountBlock.hidden = !free;
    if (free && countEl) countEl.value = 1;
  }

  function syncPacks() {
    packs.forEach((pack) => {
      const active = pack === selectedPack;
      pack.classList.toggle('is-active', active);
      pack.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    askCards.forEach((card) => {
      const active = !!selectedPack && card.dataset.pack === selectedPack.dataset.pack;
      card.classList.toggle('is-active', active);
      card.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    if (packName) packName.value = selectedPack ? selectedPack.dataset.title : '';
    if (categoryEl) {
      categoryEl.value = selectedPack ? selectedPack.dataset.slug : fallbackCategory;
    }
  }

  function syncCountChips() {
    if (!countEl) return;
    const current = countEl.value.trim();
    let matched = false;
    countChips.forEach((chip) => {
      const isCustom = chip.dataset.count === 'custom';
      const active = !matched && (chip.dataset.count === current || (isCustom && current === ''));
      chip.classList.toggle('is-active', active);
      chip.setAttribute('aria-pressed', active ? 'true' : 'false');
      if (active) matched = true;
    });
  }

  function inr(value) {
    return value.toLocaleString('en-IN');
  }

  function syncCrowd() {
    if (!crowdBlock) return;
    const free = isFreeAmount();
    crowdBlock.hidden = !free;
    if (!free) return;

    const goal = parseInt(selectedPack.dataset.amount, 10) || 0;
    const raised = parseInt(selectedPack.dataset.towardsNextValue, 10) || 0;
    if (crowdFill) crowdFill.style.width = (goal ? (raised * 100) / goal : 0) + '%';
    if (crowdText) crowdText.textContent = '₹' + inr(raised) + ' raised of ₹' + inr(goal);
  }

  function syncAmount() {
    if (!amount) return;
    const value = parseFloat(amount.value.trim());
    if (totalText) {
      totalText.textContent = isNaN(value) || value < 0 ? '0' : inr(value);
    }
    syncCrowd();

    if (totalCalc) {
      if (!selectedPack) {
        totalCalc.textContent = '';
      } else if (isFreeAmount()) {
        totalCalc.textContent = 'Towards ' + selectedPack.dataset.title;
      } else {
        totalCalc.textContent =
          selectedPack.dataset.title +
          ' ₹' +
          inr(parseInt(selectedPack.dataset.amount, 10)) +
          ' × ' +
          currentCount();
      }
    }
  }

  function applyPack(seed) {
    if (!selectedPack || !amount) return;
    if (isFreeAmount()) {
      if (seed) amount.value = parseInt(selectedPack.dataset.amount, 10);
      return;
    }
    amount.value = parseInt(selectedPack.dataset.amount, 10) * currentCount();
  }

  function refresh() {
    syncPacks();
    syncAmountMode();
    syncCountChips();
    syncAmount();
  }

  packs.forEach((pack) => {
    const onPackClick = () => {
      selectedPack = pack;
      applyPack(true);
      clearErrors();
      refresh();
    };
    pack.addEventListener('click', onPackClick);
    cleanups.push(() => pack.removeEventListener('click', onPackClick));
  });

  askCards.forEach((card) => {
    const onCardClick = () => {
      const match = packs.find((pack) => pack.dataset.pack === card.dataset.pack);
      if (!match) return;
      selectedPack = match;
      applyPack(true);
      clearErrors();
      refresh();

      const box = infoPanel && infoPanel.getBoundingClientRect();
      if (box && (box.top < 0 || box.top > window.innerHeight * 0.6)) {
        infoPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    card.addEventListener('click', onCardClick);
    cleanups.push(() => card.removeEventListener('click', onCardClick));
  });

  countChips.forEach((chip) => {
    const onChipClick = () => {
      if (chip.dataset.count === 'custom') {
        if (countEl) countEl.value = '';
        applyPack();
        refresh();
        if (countEl) countEl.focus();
        return;
      }
      if (countEl) countEl.value = chip.dataset.count;
      applyPack();
      clearErrors();
      refresh();
    };
    chip.addEventListener('click', onChipClick);
    cleanups.push(() => chip.removeEventListener('click', onChipClick));
  });

  if (countEl) {
    const onCountInput = () => {
      if (countEl.value.length > 7) countEl.value = countEl.value.slice(0, 7);
      if (parseInt(countEl.value, 10) === 0) countEl.value = 1;
      applyPack();
      refresh();
    };
    countEl.addEventListener('input', onCountInput);
    cleanups.push(() => countEl.removeEventListener('input', onCountInput));
  }

  const MAX_AMOUNT = (amount && parseInt(amount.getAttribute('max'), 10)) || 99999999;

  if (amount) {
    const onAmountInput = () => {
      if (amount.value === '0') amount.value = '';
      if (amount.value.length > String(MAX_AMOUNT).length) {
        amount.value = amount.value.slice(0, String(MAX_AMOUNT).length);
      }
      if (parseFloat(amount.value) > MAX_AMOUNT) amount.value = MAX_AMOUNT;
      if (!packs.length) selectedPack = null;
      refresh();
    };
    amount.addEventListener('input', onAmountInput);
    cleanups.push(() => amount.removeEventListener('input', onAmountInput));
  }

  // Set default service date to tomorrow
  const serviceDateInput = root.querySelector('#serviceDate');
  if (serviceDateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];
    serviceDateInput.min = tomorrowStr;
    if (!serviceDateInput.value || serviceDateInput.value < tomorrowStr) {
      serviceDateInput.value = tomorrowStr;
    }
  }

  applyPack(true);
  refresh();

  // Form submit handler
  if (form) {
    const onSubmit = (e) => {
      clearErrors();

      for (let i = 0; i < fields.length; i++) {
        const input = root.querySelector('#' + fields[i].el);
        if (!input || !input.value.trim()) {
          e.preventDefault();
          setError(fields[i].msg, input);
          if (input) input.focus();
          return;
        }
      }

      if (serviceDateInput && serviceDateInput.value < serviceDateInput.min) {
        e.preventDefault();
        setError('Choose tomorrow or a later date', serviceDateInput);
        serviceDateInput.focus();
        return;
      }

      const phoneInput = root.querySelector('#donorMob');
      const dial = window.dkDialCode ? window.dkDialCode() : '91';
      const phone = window.dkNationalDigits
        ? window.dkNationalDigits(phoneInput.value)
        : phoneInput.value.replace(/\D/g, '');
      if (phoneInput) phoneInput.value = phone;

      let phoneError = '';
      if (dial === '91') {
        if (!/^\d{10}$/.test(phone)) phoneError = 'Phone number must be 10 digits';
        else if (!/^[6-9]/.test(phone)) phoneError = 'Indian mobile must start with 6-9';
      } else if (phone.length < 6 || phone.length > 15) {
        phoneError = 'Enter a valid phone number';
      }

      if (phoneError) {
        e.preventDefault();
        setError(phoneError, phoneInput);
        if (phoneInput) phoneInput.focus();
        return;
      }

      const value = amount ? parseFloat(amount.value) : 0;
      if (!amount || !amount.value.trim() || isNaN(value) || value < 1) {
        e.preventDefault();
        setError('Enter an amount of ₹1 or more', amount);
        if (amount) amount.focus();
        return;
      }

      const minimum = packMinimum();
      if (minimum && value < minimum) {
        e.preventDefault();
        setError(
          selectedPack.dataset.title +
            ' is ₹' +
            inr(parseInt(selectedPack.dataset.amount, 10)) +
            ' × ' +
            currentCount() +
            ' = ₹' +
            inr(minimum) +
            '. Enter that amount or more.',
          amount
        );
        if (amount) amount.focus();
        return;
      }

      if (countEl) countEl.value = currentCount();
      const totalAmountInput = root.querySelector('#totalamount');
      if (totalAmountInput && amount) totalAmountInput.value = amount.value;

      if (btn) {
        btn.classList.add('is-submitting');
        setTimeout(() => {
          btn.disabled = true;
        }, 0);
      }
    };

    form.addEventListener('submit', onSubmit);
    cleanups.push(() => form.removeEventListener('submit', onSubmit));
  }

  return () => {
    if (splideInstance) {
      try {
        splideInstance.destroy();
      } catch (e) {}
    }
    if (swiperInstance) {
      try {
        swiperInstance.destroy();
      } catch (e) {}
    }
    cleanups.forEach((fn) => fn());
    delete window.dkDialCode;
    delete window.dkNationalDigits;
  };
}
