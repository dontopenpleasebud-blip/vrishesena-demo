// ==========================================================================
// Animal Welfare Page Wizard & Interaction Logic
// ==========================================================================

export function setupAnimalWizard(root, navigate) {
  if (!root) return () => {};

  const cleanups = [];

  let currentWizardStep = 1;
  const totalWizardSteps = 3;
  let pricePerCount = 30;

  // Selected cause carried into the wizard (set from the clicked card).
  window.currentCauseSlug = '';
  window.currentCauseName = '';

  window.animalCausesData = {
    cow_feeding: {
      slug: "cow_feeding",
      name: "Cow Feeding",
      amount: 101,
      description: "Nutritious cow feed and clean water were offered to ensure the cows’ health and wellbeing, spreading kindness through every meal served with care and devotion.",
      image: "/static/website/assets/images/animal/cow_feeding.png"
    },
    stray_dog: {
      slug: "stray_dog",
      name: "Feed a Stray Dog",
      amount: 35,
      description: "Our NGO actively provides food and care to stray dogs facing hunger.",
      image: "/static/website/assets/images/animal/stary_dog.png"
    },
    dog_collar: {
      slug: "dog_collar",
      name: "Dog Collar",
      amount: 300,
      description: "Reflective dog collars are provided to increase the visibility of stray dogs at night, helping prevent road accidents and protect their lives.",
      image: "/static/website/assets/images/animal/dog_collar.png"
    }
  };

  // Populate each mobile card's "What is given?" text + image from its cause.
  root.querySelectorAll('.card-wrapper').forEach(function (wrapper) {
    const cause = (window.animalCausesData || {})[wrapper.dataset.slug || ''];
    if (!cause) return;
    const descEl = wrapper.querySelector('.desc-text p');
    if (descEl && cause.description) descEl.textContent = cause.description;
    const imgEl = wrapper.querySelector('.desc-collage img');
    if (imgEl && cause.image) {
      imgEl.src = cause.image;
      imgEl.alt = cause.name;
    }
  });

  // Inject validation styling if needed
  if (!document.getElementById('dw-validation-style')) {
    const style = document.createElement('style');
    style.id = 'dw-validation-style';
    style.textContent = `
      .dw-body .error,
      .dw-body .dw-phone-box.error,
      .dw-body .dw-input-box.error,
      .dw-body input.error { border-color:#ff0000 !important; box-shadow:0 0 10px rgba(255,0,0,0.5) !important; }
      .dw-body .dw-phone-box.error input,
      .dw-body .dw-input-box.error input { background:transparent !important; border:none !important; }
      @keyframes shocking-shake { 0%,100%{transform:translateX(0);} 10%,30%,50%,70%,90%{transform:translateX(-5px);} 20%,40%,60%,80%{transform:translateX(5px);} }
      @keyframes shocking-flash { 0%,100%{background-color:rgba(255,99,71,0.1);} 50%{background-color:rgba(255,0,0,0.3);} }
      .error-shake { animation:shocking-shake 0.6s cubic-bezier(0.36,0.07,0.19,0.97) both; border-color:#ff0000 !important; box-shadow:0 0 10px rgba(255,0,0,0.5) !important; }
      .error-flash { animation:shocking-flash 0.6s ease-in-out infinite; }
      .dw-body .error-message { color:#ff0000; font-size:12px; margin-top:5px; animation:shocking-shake 0.6s ease-in-out; }
      .dw-body .dw-phone-box { position:relative; }
      .dw-body .dw-phone-box .error-message { position:absolute; top:100%; left:0; width:100%; margin-top:4px; z-index:2; }
    `;
    document.head.appendChild(style);
  }

  function resolveErrorTarget(input) {
    if (!input) return null;
    const phoneBox = input.closest('.dw-phone-box');
    return phoneBox || input;
  }

  function showFieldError(inputId, message) {
    const input = root.querySelector('#' + inputId);
    if (!input) return;
    const target = resolveErrorTarget(input);
    target.classList.remove('error-shake', 'error-flash');
    void target.offsetWidth;
    target.classList.add('error', 'error-shake', 'error-flash');
    let err = root.querySelector('#' + inputId + '_error');
    if (!err) {
      err = document.createElement('div');
      err.id = inputId + '_error';
      err.className = 'error-message';
      if (target.classList && target.classList.contains('dw-phone-box')) {
        target.appendChild(err);
      } else if (target.parentElement) {
        target.parentElement.insertBefore(err, target.nextSibling);
      } else {
        target.appendChild(err);
      }
    }
    err.textContent = message;
    err.style.display = 'block';
  }

  function clearFieldError(inputId) {
    const input = root.querySelector('#' + inputId);
    if (input) resolveErrorTarget(input).classList.remove('error', 'error-shake', 'error-flash');
    const err = root.querySelector('#' + inputId + '_error');
    if (err) {
      err.textContent = '';
      err.style.display = 'none';
    }
  }

  function validateDonorName(value) {
    const name = (value || '').trim();
    if (!name) return 'This field is required *';
    if (name.length < 2) return 'Name must be at least 2 characters *';
    if (name.length > 60) return 'Name is too long (max 60) *';
    if (!/^[A-Za-z\s.\-']+$/.test(name)) return 'Name contains invalid characters *';
    return null;
  }

  function validateEmail(value) {
    const email = (value || '').trim();
    if (!email) return 'This field is required *';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return 'Please enter a valid email address *';
    return null;
  }

  function validateWhatsApp(value) {
    const raw = (value || '').trim();
    if (!raw) return 'This field is required *';
    const digits = raw.replace(/\D/g, '');
    if (!/^\d{10}$/.test(digits)) return 'Phone number must be 10 digits *';
    if (!/^[6-9]/.test(digits)) return 'Indian mobile must start with 6-9 *';
    if (/^(\d)\1{9}$/.test(digits)) return 'Enter a valid phone number *';
    if (/(\d)\1{5,}/.test(digits)) return 'Too many repeated digits *';
    return null;
  }

  function validateParcelName(value) {
    const parcel = (value || '').trim();
    if (!parcel) return 'This field is required *';
    if (parcel.length < 2) return 'Parcel name must be at least 2 characters *';
    if (parcel.length > 50) return 'Parcel name is too long (max 50) *';
    if (!/^[A-Za-z0-9\s.\-_,()]+$/.test(parcel)) return 'Use letters, numbers, spaces, dot, hyphen only *';
    if (!/[A-Za-z]/.test(parcel)) return 'Parcel name must contain at least one letter *';
    return null;
  }

  function validateCount(value) {
    const n = parseInt(value, 10);
    if (!n || isNaN(n) || n < 1) return 'Enter a count of at least 1 *';
    if (n > 10000) return 'Count is too large *';
    return null;
  }

  function validateServiceDate(value) {
    const v = (value || '').trim();
    const el = root.querySelector('#dw-date');
    const min = el ? el.min : '';
    if (!v) return 'Please select a service date *';
    if (min && v < min) return 'Service date cannot be in the past *';
    return null;
  }

  function validateStep1() {
    let firstBadId = null;
    const checks = [
      ['dw-name', validateDonorName],
      ['dw-email', validateEmail],
      ['dw-phone', validateWhatsApp]
    ];
    for (const [id, fn] of checks) {
      const el = root.querySelector('#' + id);
      const msg = fn(el ? el.value : '');
      if (msg) {
        showFieldError(id, msg);
        if (!firstBadId) firstBadId = id;
      } else {
        clearFieldError(id);
      }
    }
    if (firstBadId) {
      const el = root.querySelector('#' + firstBadId);
      el && el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el && el.focus();
    }
    return !firstBadId;
  }

  function validateStep2() {
    let firstBadId = null;
    const countEl = root.querySelector('#dw-count');
    const countMsg = validateCount(countEl ? countEl.value : '');
    if (countMsg) {
      showFieldError('dw-count', countMsg);
      firstBadId = firstBadId || 'dw-count';
    } else {
      clearFieldError('dw-count');
    }
    const parcelEl = root.querySelector('#dw-parcel');
    const parcelMsg = validateParcelName(parcelEl ? parcelEl.value : '');
    if (parcelMsg) {
      showFieldError('dw-parcel', parcelMsg);
      firstBadId = firstBadId || 'dw-parcel';
    } else {
      clearFieldError('dw-parcel');
    }
    const dateEl = root.querySelector('#dw-date');
    const dateMsg = validateServiceDate(dateEl ? dateEl.value : '');
    if (dateMsg) {
      showFieldError('dw-date', dateMsg);
      firstBadId = firstBadId || 'dw-date';
    } else {
      clearFieldError('dw-date');
    }
    if (firstBadId) {
      const el = root.querySelector('#' + firstBadId);
      el && el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el && el.focus();
    }
    return !firstBadId;
  }

  function openWizard(event, btn) {
    if (event) event.preventDefault();

    if (btn) {
      window.currentCauseSlug = (btn.dataset && btn.dataset.slug) || '';
      window.currentCauseName = (btn.dataset && btn.dataset.name) || '';
      const amt = parseFloat(btn.dataset && btn.dataset.amount);
      if (!isNaN(amt) && amt > 0) pricePerCount = amt;

      try {
        localStorage.setItem('animalWizardCause', JSON.stringify({
          slug: window.currentCauseSlug,
          name: window.currentCauseName,
          amount: pricePerCount
        }));
      } catch (e) {}
    }

    const overlay = root.querySelector('#donation-wizard-overlay');
    if (overlay) overlay.classList.add('show');
    document.body.style.overflow = 'hidden';

    // Service date: today if before 1 pm, otherwise tomorrow
    const now = new Date();
    const target = new Date(now);
    if (now.getHours() >= 13) target.setDate(now.getDate() + 1);
    const dateStr =
      target.getFullYear() +
      '-' +
      String(target.getMonth() + 1).padStart(2, '0') +
      '-' +
      String(target.getDate()).padStart(2, '0');

    root.querySelectorAll('[id="dw-date"]').forEach(function (el) {
      el.min = dateStr;
      el.value = dateStr;
    });

    resetWizard();
  }

  function openWizardMobile(event, btn) {
    let slug = '';
    const wrapper = btn && btn.closest ? btn.closest('.card-wrapper') : null;
    if (wrapper) slug = wrapper.dataset.slug || '';
    const cause = (window.animalCausesData || {})[slug];
    if (cause) {
      const syntheticBtn = {
        dataset: { slug: cause.slug, name: cause.name, amount: String(cause.amount) }
      };
      openWizard(event, syntheticBtn);
    } else {
      openWizard(event);
    }
  }

  function closeWizard() {
    const overlay = root.querySelector('#donation-wizard-overlay');
    if (overlay) overlay.classList.remove('show');
    document.body.style.overflow = '';
    resetWizard();
  }

  function updateWizardUI() {
    for (let i = 1; i <= totalWizardSteps; i++) {
      const stepEl = root.querySelector(`#dw-step-${i}`);
      if (stepEl) stepEl.classList.remove('active');
    }
    const curStepEl = root.querySelector(`#dw-step-${currentWizardStep}`);
    if (curStepEl) curStepEl.classList.add('active');

    const backBtn = root.querySelector('#dw-back-btn');
    const nextBtn = root.querySelector('#dw-next-btn');

    if (backBtn) {
      if (currentWizardStep === 1) {
        backBtn.classList.add('hidden');
      } else {
        backBtn.classList.remove('hidden');
      }
    }

    if (nextBtn) {
      if (currentWizardStep === totalWizardSteps) {
        nextBtn.textContent = 'Donate Now';
        nextBtn.style.background = '#009dff';
        nextBtn.style.boxShadow = '0 6px 15px rgba(0,0,0,0.2)';
      } else {
        nextBtn.textContent = 'Next';
        nextBtn.style.background = '#009dff';
        nextBtn.style.boxShadow = 'none';
      }
    }

    const dwBody = root.querySelector('.dw-body');
    if (dwBody) dwBody.scrollTop = 0;
  }

  function nextWizardStep() {
    if (currentWizardStep === 1 && !validateStep1()) return;
    if (currentWizardStep === 2 && !validateStep2()) return;
    if (currentWizardStep < totalWizardSteps) {
      currentWizardStep++;
      updateWizardUI();
    } else {
      submitAnimalDonation();
    }
  }

  function prevWizardStep() {
    if (currentWizardStep > 1) {
      currentWizardStep--;
      updateWizardUI();
    }
  }

  function getCookie(name) {
    if (!document.cookie) return null;
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const c = cookies[i].trim();
      if (c.substring(0, name.length + 1) === name + '=') {
        return decodeURIComponent(c.substring(name.length + 1));
      }
    }
    return null;
  }

  function submitAnimalDonation() {
    const val = (id) => {
      const el = root.querySelector('#' + id);
      return el ? (el.value || '').trim() : '';
    };

    const name = val('dw-name');
    const email = val('dw-email');
    const phone = val('dw-phone').replace(/\s+/g, '');
    const insta = val('dw-insta');
    const parcel = val('dw-parcel');
    const count = val('dw-count');
    const dateVal = val('dw-date');
    const amount = val('dw-amount');
    const grandTotal = val('dw-total-contribution');

    if (!name) {
      alert('Please enter your name');
      currentWizardStep = 1;
      updateWizardUI();
      return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('Please enter a valid email address');
      currentWizardStep = 1;
      updateWizardUI();
      return;
    }
    if (phone.replace(/\D/g, '').length < 10) {
      alert('Please enter a valid WhatsApp number (at least 10 digits)');
      currentWizardStep = 1;
      updateWizardUI();
      return;
    }
    if (!grandTotal || parseFloat(grandTotal) <= 0) {
      alert('Please enter a valid donation amount');
      return;
    }
    if (!window.currentCauseSlug) {
      // Default to stray_dog if none explicitly chosen
      window.currentCauseSlug = 'stray_dog';
    }

    const selectedPackages = [];
    root.querySelectorAll('.dw-pkg-card.selected').forEach((card) => {
      const pkgId = card.getAttribute('data-package-id');
      if (pkgId) selectedPackages.push(pkgId);
    });

    const selectedAddons = [];
    root.querySelectorAll('.dw-addon-checkbox:checked').forEach((cb) => {
      const addonName = cb.getAttribute('data-addon-name') || cb.value;
      if (addonName) selectedAddons.push(addonName);
    });

    const fields = {
      csrfmiddlewaretoken: getCookie('csrftoken') || '',
      donor_name: name,
      donor_mail: email,
      donor_no: phone,
      country_code: '',
      insta_id: insta,
      category_name: window.currentCauseSlug,
      Name_of_parcel: parcel,
      food_count: count,
      service_date: dateVal,
      total_amount: amount,
      net_amount: grandTotal,
      source: 'website',
      city: '',
      ip_address: ''
    };

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = '/payment/';
    form.enctype = 'multipart/form-data';
    form.acceptCharset = 'UTF-8';

    for (const [n, v] of Object.entries(fields)) {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = n;
      input.value = v == null ? '' : v;
      form.appendChild(input);
    }
    selectedPackages.forEach((pkg) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = 'special_request_packages';
      input.value = pkg;
      form.appendChild(input);
    });
    selectedAddons.forEach((addon) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = 'special_request';
      input.value = addon;
      form.appendChild(input);
    });

    const photoUploadInput = root.querySelector('#dw-photo-upload');
    if (photoUploadInput && photoUploadInput.files && photoUploadInput.files.length > 0) {
      const photoClone = document.createElement('input');
      photoClone.type = 'file';
      photoClone.name = 'photo-upload';
      photoClone.style.display = 'none';
      const dt = new DataTransfer();
      dt.items.add(photoUploadInput.files[0]);
      photoClone.files = dt.files;
      form.appendChild(photoClone);
    }

    document.body.appendChild(form);
    form.submit();
  }

  function setCount(val, btnElement) {
    const pills = root.querySelectorAll('.dw-pill');
    pills.forEach((p) => p.classList.remove('active'));
    if (btnElement) btnElement.classList.add('active');

    const countInput = root.querySelector('#dw-count');
    if (countInput) {
      if (val === 'custom') {
        countInput.value = '';
        countInput.focus();
      } else {
        countInput.value = val;
      }
    }
    calculateGrandTotal();
  }

  function toggleFilledClass(input) {
    if (!input) return;
    if (input.value.trim().length > 0) input.classList.add('dw-filled');
    else input.classList.remove('dw-filled');
  }

  function togglePackage(cardElement) {
    if (!cardElement) return;
    cardElement.classList.toggle('selected');
    calculateGrandTotal();
  }

  function toggleDwPhoto() {
    const card = root.querySelector('#dw-photo-parcel-card');
    const cont = root.querySelector('#dw-photo-input-container');
    if (!card || !cont) return;
    card.classList.toggle('selected');
    const on = card.classList.contains('selected');
    cont.style.display = on ? 'block' : 'none';
    if (!on) {
      const f = root.querySelector('#dw-photo-upload');
      if (f) f.value = '';
    }
    updateDwPhotoBlink();
    calculateGrandTotal();
  }

  function updateDwPhotoBlink() {
    const card = root.querySelector('#dw-photo-parcel-card');
    const cont = root.querySelector('#dw-photo-input-container');
    const file = root.querySelector('#dw-photo-upload');
    if (!cont) return;
    const needsImage =
      card &&
      card.classList.contains('selected') &&
      (!file || !file.files || file.files.length === 0);
    cont.classList.toggle('dw-photo-need', needsImage);
  }

  function calculateGrandTotal() {
    const countEl = root.querySelector('#dw-count');
    const count = parseInt(countEl ? countEl.value : 0, 10) || 0;
    const baseTotal = count * pricePerCount;
    const amountEl = root.querySelector('#dw-amount');
    if (amountEl) amountEl.value = baseTotal;

    let packagesTotal = 0;
    root.querySelectorAll('.dw-pkg-card.selected').forEach((card) => {
      packagesTotal += (parseInt(card.getAttribute('data-price'), 10) || 0) * count;
    });

    let addonsTotal = 0;
    root.querySelectorAll('.dw-addon-checkbox:checked').forEach((checkbox) => {
      addonsTotal += (parseInt(checkbox.getAttribute('data-price'), 10) || 0) * count;
    });

    const grandTotal = baseTotal + packagesTotal + addonsTotal;
    const totalEl = root.querySelector('#dw-total-contribution');
    if (totalEl) totalEl.value = grandTotal;
  }

  function resetWizard() {
    currentWizardStep = 1;

    const idsToClear = ['dw-name', 'dw-phone', 'dw-email', 'dw-parcel'];
    idsToClear.forEach((id) => {
      const el = root.querySelector('#' + id);
      if (el) {
        el.value = '';
        el.classList.remove('dw-filled');
      }
    });

    const pills = root.querySelectorAll('.dw-pill');
    pills.forEach((p) => p.classList.remove('active'));
    const countEl = root.querySelector('#dw-count');
    if (countEl) countEl.value = 1;

    root.querySelectorAll('.dw-pkg-card').forEach((card) => card.classList.remove('selected'));
    root.querySelectorAll('.dw-addon-checkbox').forEach((cb) => (cb.checked = false));

    const photoCont = root.querySelector('#dw-photo-input-container');
    if (photoCont) {
      photoCont.style.display = 'none';
      photoCont.classList.remove('dw-photo-need');
    }
    const photoFile = root.querySelector('#dw-photo-upload');
    if (photoFile) photoFile.value = '';

    const pBox = root.querySelector('#preview-box');
    if (pBox) pBox.style.display = 'none';
    const pCardName = root.querySelector('#parcel-card-name');
    if (pCardName) pCardName.textContent = 'YOUR NAME HERE';
    const pName = root.querySelector('#parcel-preview');
    if (pName) pName.textContent = '—';

    calculateGrandTotal();
    updateWizardUI();
  }

  // Real-time listeners for field validation
  const fieldValidators = {
    'dw-name': validateDonorName,
    'dw-email': validateEmail,
    'dw-phone': validateWhatsApp,
    'dw-parcel': validateParcelName,
    'dw-count': validateCount,
    'dw-date': validateServiceDate
  };

  Object.keys(fieldValidators).forEach(function (id) {
    const el = root.querySelector('#' + id);
    if (!el) return;
    const onInput = function () {
      clearFieldError(id);
      if (id === 'dw-count') calculateGrandTotal();
    };
    const onBlur = function () {
      const msg = fieldValidators[id](el.value);
      if (msg) showFieldError(id, msg);
      else clearFieldError(id);
    };
    el.addEventListener('input', onInput);
    el.addEventListener('blur', onBlur);
    cleanups.push(() => {
      el.removeEventListener('input', onInput);
      el.removeEventListener('blur', onBlur);
    });
  });

  // Parcel Name preview update
  const parcelInput = root.querySelector('#dw-parcel');
  const previewBox = root.querySelector('#preview-box');
  const parcelPreview = root.querySelector('#parcel-preview');
  const cardName = root.querySelector('#parcel-card-name');

  if (parcelInput) {
    const onParcelInput = function () {
      const value = this.value.trim();
      toggleFilledClass(this);
      if (value === '') {
        if (previewBox) previewBox.style.display = 'none';
        if (cardName) cardName.textContent = 'YOUR NAME HERE';
        if (parcelPreview) parcelPreview.textContent = '—';
      } else {
        if (previewBox) previewBox.style.display = 'flex';
        if (parcelPreview) parcelPreview.textContent = value;
        if (cardName) cardName.textContent = value;
      }
    };
    parcelInput.addEventListener('input', onParcelInput);
    cleanups.push(() => parcelInput.removeEventListener('input', onParcelInput));
  }

  // Backdrop overlay click
  const overlay = root.querySelector('#donation-wizard-overlay');
  if (overlay) {
    const onOverlayClick = (e) => {
      if (e.target === overlay) closeWizard();
    };
    overlay.addEventListener('click', onOverlayClick);
    cleanups.push(() => overlay.removeEventListener('click', onOverlayClick));
  }

  // Check URL params for ?open_modal=1
  const params = new URLSearchParams(window.location.search);
  if (params.get('open_modal') === '1') {
    window.history.replaceState({}, document.title, window.location.pathname);
    try {
      const saved = JSON.parse(localStorage.getItem('animalWizardCause') || 'null');
      if (saved && saved.slug) {
        window.currentCauseSlug = saved.slug;
        window.currentCauseName = saved.name || '';
        if (typeof saved.amount === 'number' && saved.amount > 0) {
          pricePerCount = saved.amount;
        }
      }
    } catch (e) {}
    openWizard(null, null);
  }

  // Expose to window for inline onclick attributes
  window.openWizard = openWizard;
  window.openWizardMobile = openWizardMobile;
  window.closeWizard = closeWizard;
  window.nextWizardStep = nextWizardStep;
  window.prevWizardStep = prevWizardStep;
  window.setCount = setCount;
  window.togglePackage = togglePackage;
  window.toggleDwPhoto = toggleDwPhoto;
  window.calculateGrandTotal = calculateGrandTotal;

  return () => {
    cleanups.forEach((c) => c());
    delete window.openWizard;
    delete window.openWizardMobile;
    delete window.closeWizard;
    delete window.nextWizardStep;
    delete window.prevWizardStep;
    delete window.setCount;
    delete window.togglePackage;
    delete window.toggleDwPhoto;
    delete window.calculateGrandTotal;
  };
}
