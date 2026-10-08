// Food Donation Wizard Logic
export function setupFoodWizard(navigate) {

  let currentWizardStep = 1;
  const totalWizardSteps = 3;
  let pricePerCount = 30;

  function openWizard(event, btn) {
    if(event) event.preventDefault();

    // Per-cause context from the clicked Donate button's data-* attributes.
    // Also persisted to localStorage so the wizard can reopen with the same
    // cause after a Google sign-in round-trip (which reloads the page).
    if (btn && btn.dataset) {
      window.currentFoodCauseSlug = btn.dataset.slug || '';
      window.currentFoodCauseName = btn.dataset.name || '';
      const amt = parseFloat(btn.dataset.amount);
      pricePerCount = (!isNaN(amt) && amt > 0) ? amt : 30;
      try {
        localStorage.setItem('foodWizardCause', JSON.stringify({
          slug: window.currentFoodCauseSlug,
          name: window.currentFoodCauseName,
          amount: pricePerCount,
        }));
      } catch (e) {}
    }

    document.getElementById('donation-wizard-overlay').classList.add('show');
    document.body.style.overflow = 'hidden';

    // Set service date based on current time
    // If before 1pm (13:00), set to today, otherwise set to tomorrow
    const now = new Date();
    const currentHour = now.getHours();
    const serviceDate = new Date();
    
    if (currentHour >= 13) {
      // After 1pm, set to tomorrow
      serviceDate.setDate(serviceDate.getDate() + 1);
    }
    // Otherwise keep today's date
    
    const sdStr = serviceDate.getFullYear() + '-' +
      String(serviceDate.getMonth() + 1).padStart(2, '0') + '-' +
      String(serviceDate.getDate()).padStart(2, '0');
    document.querySelectorAll('[id="dw-date"]').forEach(function (el) {
      el.min = sdStr;
      el.value = sdStr;
    });

    // Set default count based on price per meal, matching causes_category.js logic
    const defaultCount = pricePerCount < 35 ? 30
                       : pricePerCount < 50  ? 20
                       : pricePerCount < 100 ? 15
                       : pricePerCount < 150 ? 5
                       : pricePerCount < 220 ? 3
                       : pricePerCount < 300 ? 2 : 1;
    const countInput = document.getElementById('dw-count');
    if (countInput) countInput.value = defaultCount;
    // Activate the matching pill, or Custom if no pill matches
    document.querySelectorAll('.dw-pill').forEach(p => {
      p.classList.remove('active');
      const match = (p.getAttribute('onclick') || '').match(/setCount\((\d+)/);
      if (match && parseInt(match[1]) === defaultCount) p.classList.add('active');
    });
    if (!document.querySelector('.dw-pill.active')) {
      const customPill = Array.from(document.querySelectorAll('.dw-pill'))
        .find(p => (p.getAttribute('onclick') || '').includes("'custom'"));
      if (customPill) customPill.classList.add('active');
    }

    // Filter packages based on selected category
    filterPackagesByCategory();
    
    resetWizard();
  }

  // Filter packages based on selected food cause
  function filterPackagesByCategory() {
    const currentSlug = window.currentFoodCauseSlug || '';
    const excludedCategories = ['chicken_briyani', 'egg_briyani', 'egg_milk'];
    
    // Check if current category should exclude "cake with image"
    const shouldHideCake = excludedCategories.includes(currentSlug);
    
    // Find all package cards with "cake with image" in their data
    document.querySelectorAll('.dw-pkg-card').forEach(card => {
      const packageId = card.getAttribute('data-package-id') || '';
      
      // Hide "cake with image" package for excluded categories
      if (packageId.toLowerCase() === 'cake with image' && shouldHideCake) {
        card.style.display = 'none';
        // Also deselect if it was selected
        card.classList.remove('selected');
      } else {
        card.style.display = ''; // Show the package
      }
    });
    
    // Also hide the package details if cake was selected
    if (shouldHideCake) {
      const cakeDetails = document.getElementById('pkg-details-cake-with-image') || 
                         document.getElementById('pkg-details-modal-cake-with-image');
      if (cakeDetails) {
        cakeDetails.style.display = 'none';
      }
    }
  }

  function closeWizard() {
    document.getElementById('donation-wizard-overlay').classList.remove('show');
    document.body.style.overflow = ''; 
  }

  document.getElementById('donation-wizard-overlay').addEventListener('click', function(e) {
    if (e.target === this) closeWizard();
  });

  function updateWizardUI() {
    for(let i = 1; i <= totalWizardSteps; i++) {
      document.getElementById(`dw-step-${i}`).classList.remove('active');
    }
    document.getElementById(`dw-step-${currentWizardStep}`).classList.add('active');

    const backBtn = document.getElementById('dw-back-btn');
    const nextBtn = document.getElementById('dw-next-btn');

    // On Step 1, Back is hidden, so Next button stretches to 100%
    if(currentWizardStep === 1) {
      backBtn.classList.add('hidden'); 
    } else {
      backBtn.classList.remove('hidden');
    }

    if(currentWizardStep === totalWizardSteps) {
      nextBtn.textContent = 'Donate Now';
      nextBtn.style.background = '#009dff'; 
      nextBtn.style.boxShadow = '0 6px 15px rgba(0,0,0,0.2)';
    } else {
      nextBtn.textContent = 'Next';
      nextBtn.style.background = '#009dff'; 
      nextBtn.style.boxShadow = 'none';
    }
    
    document.querySelector('.dw-body').scrollTop = 0;
  }

  // ── Inline field validation ─────────────────────────────────────────────
  // Mirrors the exact pattern used on /causes-detail/<slug>/ (see
  // causes_category_desktop.html:1186-1261): same `error` / `error-shake` /
  // `error-flash` classes on the input, an `<div id="<id>_error" class="error-message">`
  // sibling for the message, and the same "* required" / phone / email rules.

  // Inject the validation CSS once. Mirrors the visual on /causes-detail/<slug>/:
  // persistent pink fill + red border on the input, red "* required" message
  // below it, and a continuous gentle blink/pulse so the user can't miss it.
  (function injectFoodWizardErrorCSS () {
    if (document.getElementById('dw-validation-style')) return;
    const style = document.createElement('style');
    style.id = 'dw-validation-style';
    style.textContent = `
      /* Persistent error state — red border + red glow, same as causes-detail */
      .dw-body .error,
      .dw-body .dw-phone-box.error,
      .dw-body .dw-input-box.error,
      .dw-body input.error {
        border-color: #ff0000 !important;
        box-shadow: 0 0 10px rgba(255, 0, 0, 0.5) !important;
      }
      /* The inner input of a wrapped box stays transparent so the wrapper's
         flashing background shows through cleanly. */
      .dw-body .dw-phone-box.error input,
      .dw-body .dw-input-box.error input {
        background: transparent !important;
        border: none !important;
      }

      /* Exact copy of the causes-detail animations
         (see main/templates/main/causes_category.html:2293-2316) */
      @keyframes shocking-shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
      }
      @keyframes shocking-flash {
        0%, 100% { background-color: rgba(255, 99, 71, 0.1); }
        50%      { background-color: rgba(255, 0, 0, 0.3); }
      }
      .error-shake {
        animation: shocking-shake 0.6s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
        border-color: #ff0000 !important;
        box-shadow: 0 0 10px rgba(255, 0, 0, 0.5) !important;
      }
      .error-flash {
        animation: shocking-flash 0.6s ease-in-out infinite;
      }

      /* Inline error message — red, 12px, with the same shake on entry */
      .dw-body .error-message {
        color: #ff0000;
        font-size: 12px;
        margin-top: 5px;
        animation: shocking-shake 0.6s ease-in-out;
      }

      /* The WhatsApp field's border lives on .dw-phone-box, so the error
         message gets injected INSIDE that wrapper. The wrapper is a fixed-
         height flex row, and the desktop step-1 layout is a 2-column grid —
         so we position the error absolutely below the box rather than letting
         it (a) compress the flex children or (b) land in the next grid cell. */
      .dw-body .dw-phone-box { position: relative; }
      .dw-body .dw-phone-box .error-message {
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        margin-top: 4px;
        z-index: 2;
      }

      /* Brief, subtle blink to draw attention to the Photo Parcel upload
         section when a photo is required but missing. A few pulses, then stops. */
      @keyframes dw-error-blink {
        0%, 100% { background-color: transparent; }
        50%      { background-color: rgba(255, 0, 0, 0.14); }
      }
      .dw-error-blink {
        animation: dw-error-blink 0.45s ease-in-out 3;
        border-radius: 12px;
      }
    `;
    document.head.appendChild(style);
  })();

  // Resolve which element actually carries the visible border. For the
  // WhatsApp field the border is on the .dw-phone-box wrapper, not the
  // inner <input>, so adding `.error` to the input alone wouldn't show.
  function resolveErrorTarget(input) {
    if (!input) return null;
    const phoneBox = input.closest('.dw-phone-box');
    return phoneBox || input;
  }

  function showFieldError(inputId, message) {
    const input = document.getElementById(inputId);
    if (!input) return;
    const target = resolveErrorTarget(input);
    target.classList.remove('error-shake', 'error-flash');
    void target.offsetWidth;  // force reflow so the shake re-fires
    target.classList.add('error', 'error-shake', 'error-flash');

    let err = document.getElementById(inputId + '_error');
    if (!err) {
      err = document.createElement('div');
      err.id = inputId + '_error';
      err.className = 'error-message';
      // Where the error message goes depends on what `target` is:
      //  • .dw-phone-box (the WhatsApp wrapper): append INSIDE it.
      //    The CSS above positions it absolutely just below the box,
      //    so it doesn't collide with the desktop 2-column grid layout
      //    or compress the wrapper's fixed-height flex row.
      //  • A plain <input> (Name / Email / Instagram / Parcel / Count):
      //    insert as the next sibling so it stacks naturally inside the
      //    .dw-input-box / .dw-form-group wrapper.
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
    const input = document.getElementById(inputId);
    if (input) resolveErrorTarget(input).classList.remove('error', 'error-shake', 'error-flash');
    const err = document.getElementById(inputId + '_error');
    if (err) { err.textContent = ''; err.style.display = 'none'; }
  }

  // Same validation rules as causes_category_desktop.html:1192-1208
  function validateDonorName(value) {
    const name = (value || '').trim();
    if (!name)             return 'This field is required *';
    if (name.length < 2)   return 'Name must be at least 2 characters *';
    if (name.length > 100) return 'Name is too long (max 100) *';
    if (!/^[A-Za-z][A-Za-z\s.\-']{1,99}$/.test(name))
      return 'Use letters, spaces, dot, hyphen, apostrophe only *';
    return null;
  }

  function validateEmail(value) {
    const email = (value || '').trim();
    if (!email)             return 'This field is required *';
    if (email.length > 254) return 'Email is too long *';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return 'Please enter a valid email *';
    return null;
  }

  function validateWhatsApp(value) {
    const raw = (value || '').trim();
    if (!raw)                       return 'This field is required *';
    const digits = raw.replace(/\D/g, '');
    // Same Indian-mobile rules as causes_category_desktop.html:1195-1205
    if (!/^\d{10}$/.test(digits))   return 'Phone number must be 10 digits *';
    if (!/^[6-9]/.test(digits))     return 'Indian mobile must start with 6-9 *';
    if (/^(\d)\1{9}$/.test(digits)) return 'Enter a valid phone number *';
    if (/^9876543210$|^1234567890$|^0987654321$/.test(digits))
                                    return 'Sequential numbers not allowed *';
    if (/(\d)\1{5,}/.test(digits))  return 'Too many repeated digits *';
    return null;
  }

  function validateParcelName(value) {
    const parcel = (value || '').trim();
    if (!parcel)            return 'This field is required *';
    if (parcel.length < 2)  return 'Parcel name must be at least 2 characters *';
    if (parcel.length > 50) return 'Parcel name is too long (max 50) *';
    // Letters, digits, spaces, and a small set of punctuation. Same charset
    // the causes-detail page uses to sanitize donorParcel (cleanInput case
    // 'donorParcel' in causes_category_desktop.html:1181).
    if (!/^[A-Za-z0-9\s.\-_,()]+$/.test(parcel))
      return 'Use letters, numbers, spaces, dot, hyphen only *';
    // Must contain at least one letter — block all-digits / all-punctuation
    if (!/[A-Za-z]/.test(parcel))
      return 'Parcel name must contain at least one letter *';
    return null;
  }

  function validateCount(value) {
    const n = parseInt(value, 10);
    if (!n || isNaN(n) || n < 1) return 'Enter a count of at least 1 *';
    if (n > 10000)               return 'Count is too large *';
    return null;
  }

  // Service date must not be empty or before its allowed minimum (set on #dw-date
  // as `min` = today/tomorrow). Catches past dates typed manually that bypass the
  // picker's min attribute — mirrors the causes-detail donation form.
  function validateServiceDate(value) {
    const v = (value || '').trim();
    const el = document.getElementById('dw-date');
    const min = el ? el.min : '';
    if (!v)             return 'Please select a service date *';
    if (min && v < min) return 'Service date cannot be in the past *';
    return null;
  }

  function validateStep1() {
    let firstBadId = null;
    const checks = [
      ['dw-name',  validateDonorName],
      ['dw-email', validateEmail],
      ['dw-phone', validateWhatsApp],
    ];
    for (const [id, fn] of checks) {
      const el = document.getElementById(id);
      const msg = fn(el ? el.value : '');
      if (msg) { showFieldError(id, msg); if (!firstBadId) firstBadId = id; }
      else     { clearFieldError(id); }
    }
    if (firstBadId) {
      // Same scroll-to-first-error behaviour as causes_category_desktop.html:1229
      const el = document.getElementById(firstBadId);
      el && el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el && el.focus();
    }
    return !firstBadId;
  }

  function validateStep2() {
    let firstBadId = null;
    const countMsg  = validateCount(document.getElementById('dw-count')?.value);
    if (countMsg)  { showFieldError('dw-count',  countMsg);  firstBadId = firstBadId || 'dw-count'; } else { clearFieldError('dw-count'); }
    const parcelMsg = validateParcelName(document.getElementById('dw-parcel')?.value);
    if (parcelMsg) { showFieldError('dw-parcel', parcelMsg); firstBadId = firstBadId || 'dw-parcel'; } else { clearFieldError('dw-parcel'); }
    const dateMsg = validateServiceDate(document.getElementById('dw-date')?.value);
    if (dateMsg) { showFieldError('dw-date', dateMsg); firstBadId = firstBadId || 'dw-date'; } else { clearFieldError('dw-date'); }
    if (firstBadId) {
      const el = document.getElementById(firstBadId);
      el && el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el && el.focus();
    }
    return !firstBadId;
  }

  // When the "Photo Parcel" add-on is checked, uploading a photo is mandatory
  // (same rule as the environment / causes donation forms). Covers both the
  // main and modal copies of the wizard; an unchecked add-on is skipped, so
  // ordinary donations are unaffected. Returns true when nothing is missing.
  // Re-trigger a short blink on an upload section. Removing the class and forcing
  // a reflow lets the animation replay on every failed attempt.
  function blinkPhotoSection(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.classList.remove('dw-error-blink');
    void el.offsetWidth;             // force reflow so the animation restarts
    el.classList.add('dw-error-blink');
    el.addEventListener('animationend', function handler() {
      el.classList.remove('dw-error-blink');
      el.removeEventListener('animationend', handler);
    });
  }

  function validatePhotoParcel() {
    const pairs = [
      { cb: '.dw-photo-parcel-checkbox',       file: 'dw-photo-upload',       box: 'dw-photo-input-container' },
      { cb: '.dw-photo-parcel-checkbox-modal', file: 'dw-photo-upload-modal', box: 'dw-photo-input-container-modal' },
    ];
    let firstBadId = null;
    pairs.forEach(function (p) {
      const cb = document.querySelector(p.cb);
      const file = document.getElementById(p.file);
      if (!cb || !cb.checked) { clearFieldError(p.file); return; }
      const hasFile = file && file.files && file.files.length > 0;
      if (!hasFile) {
        showFieldError(p.file, 'Please upload your photo for the Photo Parcel add-on *');
        blinkPhotoSection(p.box);  // blink the section so the error is hard to miss
        if (!firstBadId) firstBadId = p.file;
      } else {
        clearFieldError(p.file);
      }
    });
    if (firstBadId) {
      const el = document.getElementById(firstBadId);
      el && el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return !firstBadId;
  }

  // Real-time: re-validate on blur, clear error as soon as user types
  // (matches causes_category_desktop.html:1250-1261)
  document.addEventListener('DOMContentLoaded', function () {
    const fieldValidators = {
      'dw-name':   validateDonorName,
      'dw-email':  validateEmail,
      'dw-phone':  validateWhatsApp,
      'dw-parcel': validateParcelName,
      'dw-count':  validateCount,
      'dw-date':   validateServiceDate,
    };
    Object.keys(fieldValidators).forEach(function (id) {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener('input', function () { clearFieldError(id); });
      el.addEventListener('blur', function () {
        const msg = fieldValidators[id](el.value);
        if (msg) showFieldError(id, msg); else clearFieldError(id);
      });
    });
  });

  function nextWizardStep() {
    if (currentWizardStep === 1 && !validateStep1()) return;
    if (currentWizardStep === 2 && !validateStep2()) return;
    // Photo Parcel add-on (on the final step) requires an uploaded photo.
    if (currentWizardStep === totalWizardSteps && !validatePhotoParcel()) return;

    if (currentWizardStep < totalWizardSteps) {
      currentWizardStep++;
      updateWizardUI();
    } else {
      submitFoodDonation();
    }
  }

  function getCookie(name) {
    if (!document.cookie) return null;
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const c = cookies[i].trim();
      if (c.substring(0, name.length + 1) === (name + '=')) {
        return decodeURIComponent(c.substring(name.length + 1));
      }
    }
    return null;
  }

  function submitFoodDonation() {
    const val = (id) => {
      const el = document.getElementById(id);
      return el ? (el.value || '').trim() : '';
    };

    const name        = val('dw-name');
    const email       = val('dw-email');
    const phone       = val('dw-phone').replace(/\s+/g, '');
    const insta       = val('dw-insta');
    const parcel      = val('dw-parcel');
    const count       = val('dw-count');
    const dateVal     = val('dw-date');
    const amount      = val('dw-amount');
    const grandTotal  = val('dw-total-contribution');

    if (!name)  { alert('Please enter your name');  currentWizardStep = 1; updateWizardUI(); return; }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('Please enter a valid email address'); currentWizardStep = 1; updateWizardUI(); return;
    }
    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      alert('Please enter a valid WhatsApp number (at least 10 digits)');
      currentWizardStep = 1; updateWizardUI(); return;
    }
    if (!grandTotal || parseFloat(grandTotal) <= 0) {
      alert('Please enter a valid donation amount'); return;
    }
    if (!window.currentFoodCauseSlug) {
      alert('Please select a food cause from the list first.'); return;
    }
    // Safety net: never submit without the photo when Photo Parcel is selected.
    if (!validatePhotoParcel()) return;

    // Collect selected packages (special_request_packages)
    const selectedPackages = [];
    document.querySelectorAll('.dw-pkg-card.selected').forEach(card => {
      const packageId = card.getAttribute('data-package-id');
      if (packageId) {
        selectedPackages.push(packageId);
      }
    });

    // Collect selected add-ons (special_request)
    const selectedAddons = [];
    document.querySelectorAll('.dw-addon-checkbox:checked').forEach(cb => {
      const addonName = cb.getAttribute('data-addon-name') || cb.value;
      if (addonName) {
        selectedAddons.push(addonName);
      }
    });

    // Collect package fields from merged details section
    const packageFields = {};
    const packageFiles = {};
    
    const mergedFields = document.getElementById('merged-fields') || 
                        document.getElementById('merged-fields-modal');
    if (mergedFields) {
      // Collect all input fields
      mergedFields.querySelectorAll('input[type="text"], input[type="time"], select, textarea').forEach(field => {
        if (field.name && field.value) {
          // Extract the base field name (remove pkg_ prefix)
          const fieldName = field.name.replace(/^pkg_[^_]+_/, '');
          packageFields[fieldName] = field.value;
        }
      });

      // Collect radio button selections
      mergedFields.querySelectorAll('input[type="radio"]:checked').forEach(field => {
        if (field.name && field.value) {
          const fieldName = field.name.replace(/^pkg_[^_]+_/, '');
          packageFields[fieldName] = field.value;
        }
      });

      // Collect file inputs
      mergedFields.querySelectorAll('input[type="file"]').forEach(field => {
        if (field.name && field.files && field.files.length > 0) {
          const fieldName = field.name.replace(/^pkg_[^_]+_/, '');
          packageFiles[fieldName] = field.files[0];
        }
      });
    }

    // Build the POST body exactly the way the canonical _causes_donation_modal.html
    // form does (same field names, same values for hidden inputs). This matches the
    // pattern every other cause page uses to call easebuzz.order_payment.
    const fields = {
      csrfmiddlewaretoken: getCookie('csrftoken') || '',
      donor_name:     name,
      donor_mail:     email,
      donor_no:       phone,
      country_code:   '',
      insta_id:       insta,
      category_name:  window.currentFoodCauseSlug,
      Name_of_parcel: parcel,
      food_count:     count,
      service_date:   dateVal,
      total_amount:   amount,
      net_amount:     grandTotal,
      source:         'website',
      city:           '',
      ip_address:     '',
      ...packageFields  // Add all package fields
    };

    // Hardcoded path: two URL patterns share the name "payment"
    // (main: /payment/, referrallink: /referral/payments/). /referral/payments/
    // resolves to the referrallink one, which is wrong for donations.
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

    // Add file inputs
    for (const [fieldName, file] of Object.entries(packageFiles)) {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.name = fieldName;
      fileInput.style.display = 'none';
      
      // Create a DataTransfer object to set the file
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      fileInput.files = dataTransfer.files;
      
      form.appendChild(fileInput);
    }

    // Add photo parcel file input directly (can't clone file inputs)
    const photoUploadInput = document.getElementById('dw-photo-upload') || 
                            document.getElementById('dw-photo-upload-modal');
    if (photoUploadInput && photoUploadInput.files && photoUploadInput.files.length > 0) {
      // Clone the input and add it to the form
      const photoClone = document.createElement('input');
      photoClone.type = 'file';
      photoClone.name = 'photo-upload';
      photoClone.style.display = 'none';
      
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(photoUploadInput.files[0]);
      photoClone.files = dataTransfer.files;
      
      form.appendChild(photoClone);
    }

    // Add selected packages as multiple inputs with same name (special_request_packages)
    selectedPackages.forEach(pkg => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = 'special_request_packages';
      input.value = pkg;
      form.appendChild(input);
    });

    // Add selected add-ons as multiple inputs with same name (special_request)
    selectedAddons.forEach(addon => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = 'special_request';
      input.value = addon;
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  }

  function prevWizardStep() {
    if (currentWizardStep > 1) {
      currentWizardStep--;
      updateWizardUI();
    }
  }

  function setCount(val, btnElement) {
    // Check if any packages are selected - if so, don't allow count changes
    const selectedPackages = document.querySelectorAll('.dw-pkg-card.selected');
    if (selectedPackages.length > 0) {
      return; // Exit early if packages are selected
    }
    
    const pills = document.querySelectorAll('.dw-pill');
    pills.forEach(p => p.classList.remove('active'));
    btnElement.classList.add('active');

    const countInput = document.getElementById('dw-count');
    if(val === 'custom') {
      countInput.value = '';
      countInput.focus();
    } else {
      countInput.value = val;
    }
    calculateGrandTotal();
  }

  function toggleFilledClass(input) {
    if(input.value.trim().length > 0) input.classList.add('dw-filled');
    else input.classList.remove('dw-filled');
  }

  // Accordion toggle function
  function togglePackageAccordion() {
    const accordionContent = document.getElementById('package-accordion-content');
    const chevron = document.getElementById('accordion-chevron');
    
    if (accordionContent && chevron) {
      if (accordionContent.style.display === 'none' || accordionContent.style.display === '') {
        accordionContent.style.display = 'block';
        chevron.style.transform = 'rotate(180deg)';
      } else {
        accordionContent.style.display = 'none';
        chevron.style.transform = 'rotate(0deg)';
      }
    }
  }

  function toggleFoodPackage(cardElement, packageSlug) {
    // Toggle selection state (allow multiple selections)
    cardElement.classList.toggle('selected');

    // Mirror causes_category.js handleDistributionVideoSelection:
    // selecting Distribution Video force-selects Wish Video and locks it;
    // deselecting Distribution Video unlocks and deselects Wish Video.
    const _clickedName = cardElement.getAttribute('data-package-id') || '';
    if (_clickedName === 'Distribution Video') {
      const _wishCard = Array.from(document.querySelectorAll('.dw-pkg-card'))
        .find(function(c) { return (c.getAttribute('data-package-id') || '').indexOf('Wish Video') !== -1; });
      if (_wishCard) {
        if (cardElement.classList.contains('selected')) {
          _wishCard.classList.add('selected');
          _wishCard.style.pointerEvents = 'none';
          _wishCard.style.opacity = '0.75';
        } else {
          _wishCard.classList.remove('selected');
          _wishCard.style.pointerEvents = '';
          _wishCard.style.opacity = '';
        }
      }
    }

    // Get all selected packages
    const selectedPackages = Array.from(document.querySelectorAll('.dw-pkg-card.selected'));
    
    // Get count input and pill buttons
    const countInput = document.getElementById('dw-count');
    const pillButtons = document.querySelectorAll('.dw-pill');
    
    if (selectedPackages.length === 0) {
      // No packages selected - hide details and reset to default
      const detailsSection = document.getElementById('food-package-details-section') || 
                            document.getElementById('food-package-details-section-modal');
      if (detailsSection) {
        detailsSection.style.display = 'none';
      }
      
      // Hide all package details
      document.querySelectorAll('.food-pkg-details-container').forEach(detail => {
        detail.style.display = 'none';
      });

      // Clear merged containers
      const mergedFoodCount = document.getElementById('merged-food-count') || 
                             document.getElementById('merged-food-count-modal');
      const mergedFields = document.getElementById('merged-fields') || 
                          document.getElementById('merged-fields-modal');
      const mergedWhatYouGet = document.getElementById('merged-what-you-get') || 
                              document.getElementById('merged-what-you-get-modal');
      if (mergedFoodCount) mergedFoodCount.innerHTML = '';
      if (mergedFields) mergedFields.innerHTML = '';
      if (mergedWhatYouGet) mergedWhatYouGet.innerHTML = '';

      // Reset to default count
      if (countInput) {
        countInput.value = 20;
        countInput.disabled = false; // Re-enable count input
        countInput.style.opacity = '1';
        countInput.style.cursor = 'text';
      }

      // Re-enable pill buttons
      pillButtons.forEach(pill => {
        pill.disabled = false;
        pill.style.opacity = '1';
        pill.style.cursor = 'pointer';
      });

      // Hide helper text
      const helperText = document.getElementById('count-helper-text');
      const helperTextModal = document.getElementById('count-helper-text-modal');
      if (helperText) helperText.style.display = 'none';
      if (helperTextModal) helperTextModal.style.display = 'none';

      // Reactivate the first pill button
      const firstPill = document.querySelector('.dw-pill');
      if (firstPill) {
        firstPill.classList.add('active');
      }
      
      calculateGrandTotal();
      return;
    }
    
    // Packages are selected - disable count input and pill buttons
    if (countInput) {
      countInput.disabled = true;
      countInput.style.opacity = '0.6';
      countInput.style.cursor = 'not-allowed';
    }
    
    // Disable pill buttons
    pillButtons.forEach(pill => {
      pill.disabled = true;
      pill.style.opacity = '0.6';
      pill.style.cursor = 'not-allowed';
      pill.classList.remove('active');
    });
    
    // Show helper text
    const helperText = document.getElementById('count-helper-text');
    const helperTextModal = document.getElementById('count-helper-text-modal');
    if (helperText) helperText.style.display = 'block';
    if (helperTextModal) helperTextModal.style.display = 'block';

    // Auto-scroll to package details section when package is selected
    setTimeout(() => {
      const detailsSection = document.getElementById('food-package-details-section') || 
                            document.getElementById('food-package-details-section-modal');
      if (detailsSection && detailsSection.style.display !== 'none') {
        const scrollContainer = detailsSection.closest('.dw-body') || detailsSection.closest('.dw-modal') || window;
        
        // Get positions
        const containerTop = scrollContainer === window ? 0 : scrollContainer.scrollTop;
        const targetPosition = detailsSection.offsetTop - 80; // 80px offset from top
        const startPosition = containerTop;
        const distance = targetPosition - startPosition;
        const duration = 800; // 800ms for ultra smooth scroll
        let startTime = null;

        // Easing function for smooth animation (easeInOutCubic)
        function easeInOutCubic(t) {
          return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }

        // Animation function
        function smoothScroll(currentTime) {
          if (startTime === null) startTime = currentTime;
          const timeElapsed = currentTime - startTime;
          const progress = Math.min(timeElapsed / duration, 1);
          const ease = easeInOutCubic(progress);
          
          const newPosition = startPosition + (distance * ease);
          
          if (scrollContainer === window) {
            window.scrollTo(0, newPosition);
          } else {
            scrollContainer.scrollTop = newPosition;
          }

          if (timeElapsed < duration) {
            requestAnimationFrame(smoothScroll);
          }
        }

        requestAnimationFrame(smoothScroll);
      }
    }, 500);
    
    // Get selected package names
    const selectedPackageNames = selectedPackages.map(card => 
      (card.getAttribute('data-package-id') || '').toLowerCase()
    );

    // Check if only "child only" or "woman only" packages are selected
    const simplePackages = ["child only", "woman only"];
    const onlySimplePackages = selectedPackageNames.length > 0 &&
      selectedPackageNames.every(name => simplePackages.includes(name));

    // Show the details section
    const detailsSection = document.getElementById('food-package-details-section') || 
                          document.getElementById('food-package-details-section-modal');
    if (detailsSection) {
      detailsSection.style.display = 'block';
    }

    // Hide individual package details
    document.querySelectorAll('.food-pkg-details-container').forEach(detail => {
      detail.style.display = 'none';
    });

    // Get the merged details containers
    const mergedFoodCount = document.getElementById('merged-food-count') || 
                           document.getElementById('merged-food-count-modal');
    const mergedFields = document.getElementById('merged-fields') || 
                        document.getElementById('merged-fields-modal');
    const mergedWhatYouGet = document.getElementById('merged-what-you-get') || 
                            document.getElementById('merged-what-you-get-modal');

    if (onlySimplePackages) {
      // For simple packages, don't change the count, just merge and show details
      
      if (mergedFoodCount) {
        const foodVal = parseInt(document.getElementById('dw-count').value) || 0;
        mergedFoodCount.innerHTML = `<h4 class="dw-detail-title">Food Count</h4><p class="dw-detail-text">${foodVal} counts</p>`;
      }

      // Use Maps to deduplicate fields
      const fieldMap = new Map();
      const whatYouGetMap = new Map();

      selectedPackages.forEach(card => {
        const slug = card.getAttribute('data-package-id').toLowerCase().replace(/ /g, '-');
        const pkgDetails = document.getElementById('pkg-details-' + slug) || 
                          document.getElementById('pkg-details-modal-' + slug);
        if (pkgDetails) {
          // Collect fields - deduplicate by normalized label text (remove * and trim)
          const fieldItems = pkgDetails.querySelectorAll('.dw-field-item');
          fieldItems.forEach(fieldItem => {
            const label = fieldItem.querySelector('.dw-field-label');
            if (label) {
              const labelText = label.textContent.trim();
              // Normalize: remove asterisk and extra spaces for comparison
              const normalizedLabel = labelText.replace(/\s*\*\s*/g, '').trim().toUpperCase();
              if (normalizedLabel && !fieldMap.has(normalizedLabel)) {
                fieldMap.set(normalizedLabel, fieldItem.cloneNode(true).outerHTML);
              }
            }
          });

          // Collect "What You Get" items
          const wygItems = pkgDetails.querySelectorAll('.dw-wyg-item');
          wygItems.forEach(item => {
            const title = item.querySelector('.dw-wyg-title')?.textContent || '';
            if (title && !whatYouGetMap.has(title)) {
              whatYouGetMap.set(title, item.cloneNode(true).outerHTML);
            }
          });
        }
      });

      // Populate merged fields
      if (mergedFields) {
        const fieldsHTML = Array.from(fieldMap.values()).join('');
        if (fieldsHTML) {
          mergedFields.innerHTML = `
            <div class="dw-detail-box">
              <h4 class="dw-detail-title">Required Information</h4>
              <div class="dw-fields-grid">
                ${fieldsHTML}
              </div>
            </div>
          `;
        } else {
          mergedFields.innerHTML = '';
        }
      }

      // Populate merged "What You Get"
      if (mergedWhatYouGet) {
        const wygHTML = Array.from(whatYouGetMap.values()).join('');
        if (wygHTML) {
          mergedWhatYouGet.innerHTML = `
            <div class="dw-detail-box">
              <h4 class="dw-detail-title">What You Get</h4>
              <div class="dw-what-you-get-grid">
                ${wygHTML}
              </div>
            </div>
          `;
        } else {
          mergedWhatYouGet.innerHTML = '';
        }
      }

      calculateGrandTotal();
      return;
    }

    // Calculate combined food count for multiple packages
    const currentSlug = window.currentFoodCauseSlug || '';
    const perFoodPrice = pricePerCount;
    
    let totalFoodCount = 0;
    let totalPackagePrice = 0;

    // Use Maps to deduplicate fields and "What You Get" items
    const fieldMap = new Map();
    const whatYouGetMap = new Map();

    selectedPackages.forEach(card => {
      const packageName = card.getAttribute('data-package-id') || '';
      const packagePrice = parseFloat(card.getAttribute('data-price')) || 0;
      
      let foodBudget = packagePrice;
      let cakeBudget = 0;

      // Special logic for different packages (matching causes_category.js)
      if (packageName === "Wish Video & Cake") {
        foodBudget = 2000;
        cakeBudget = 1000;
      } else if (packageName === "Distribution Video") {
        foodBudget = 3000;
        cakeBudget = 0;
      } else if (packageName === "Banner") {
        foodBudget = 1500;
        cakeBudget = 1500;
      } else if (packageName === "cake with image") {
        if (currentSlug === "birthday_cake") {
          foodBudget = 1600;
          cakeBudget = 100;
        } else if (currentSlug === "virtual_birthday_cake") {
          foodBudget = 4000;
          cakeBudget = 100;
        } else if (currentSlug === "homeless") {
          foodBudget = 600;
          cakeBudget = 1100;
        } else {
          foodBudget = 1200;
          cakeBudget = 1100;
        }
      } else if (packageName === "cake") {
        foodBudget = 1500;
        cakeBudget = 1000;
      }

      // Calculate dynamic food count based on budget
      let dynamicFoodCount = Math.floor(foodBudget / perFoodPrice);
      let calculatedAmount = dynamicFoodCount * perFoodPrice;
      
      // Increase count until we meet or exceed the budget
      while (calculatedAmount < foodBudget) {
        dynamicFoodCount += 1;
        calculatedAmount = dynamicFoodCount * perFoodPrice;
      }

      // Accumulate totals
      totalFoodCount += dynamicFoodCount;
      totalPackagePrice += calculatedAmount + cakeBudget;

      // Collect fields from this package (deduplicate by normalized label)
      const slug = packageName.toLowerCase().replace(/ /g, '-');
      const pkgDetails = document.getElementById('pkg-details-' + slug) || 
                        document.getElementById('pkg-details-modal-' + slug);
      if (pkgDetails) {
        const fieldItems = pkgDetails.querySelectorAll('.dw-field-item');
        fieldItems.forEach(fieldItem => {
          const label = fieldItem.querySelector('.dw-field-label');
          if (label) {
            const labelText = label.textContent.trim();
            // Normalize: remove asterisk and extra spaces for comparison
            const normalizedLabel = labelText.replace(/\s*\*\s*/g, '').trim().toUpperCase();
            if (normalizedLabel && !fieldMap.has(normalizedLabel)) {
              // Clone the node to avoid reference issues
              fieldMap.set(normalizedLabel, fieldItem.cloneNode(true).outerHTML);
            }
          }
        });

        // Collect "What You Get" items (deduplicate by title)
        const wygItems = pkgDetails.querySelectorAll('.dw-wyg-item');
        wygItems.forEach(item => {
          const title = item.querySelector('.dw-wyg-title')?.textContent || '';
          if (title && !whatYouGetMap.has(title)) {
            // Clone the node to avoid reference issues
            whatYouGetMap.set(title, item.cloneNode(true).outerHTML);
          }
        });
      }
    });

    // Update the count input field with combined count
    if (countInput) {
      countInput.value = totalFoodCount;
    }

    // Update the pill buttons to show none selected
    document.querySelectorAll('.dw-pill').forEach(pill => {
      pill.classList.remove('active');
    });

    // Populate merged food count
    if (mergedFoodCount) {
      mergedFoodCount.innerHTML = `<h4 class="dw-detail-title">Food Count</h4><p class="dw-detail-text">${totalFoodCount} counts</p>`;
    }

    // Populate merged fields (deduplicated)
    if (mergedFields) {
      const fieldsHTML = Array.from(fieldMap.values()).join('');
      if (fieldsHTML) {
        mergedFields.innerHTML = `
          <div class="dw-detail-box">
            <h4 class="dw-detail-title">Required Information</h4>
            <div class="dw-fields-grid">
              ${fieldsHTML}
            </div>
          </div>
        `;
      } else {
        mergedFields.innerHTML = '';
      }
    }

    // Populate merged "What You Get" (deduplicated)
    if (mergedWhatYouGet) {
      const wygHTML = Array.from(whatYouGetMap.values()).join('');
      if (wygHTML) {
        mergedWhatYouGet.innerHTML = `
          <div class="dw-detail-box">
            <h4 class="dw-detail-title">What You Get</h4>
            <div class="dw-what-you-get-grid">
              ${wygHTML}
            </div>
          </div>
        `;
      } else {
        mergedWhatYouGet.innerHTML = '';
      }
    }
    
    calculateGrandTotal();
  }

  function togglePackage(cardElement) {
    cardElement.classList.toggle('selected');
    calculateGrandTotal();
  }

  function togglePhotoPackage(cardElement) {
    // Toggle selection
    cardElement.classList.toggle('selected');
    
    // Show/hide photo upload input
    const container = document.getElementById('dw-photo-input-container');
    const fileInput = document.getElementById('dw-photo-upload');
    
    if (cardElement.classList.contains('selected')) {
      if (container) container.style.display = 'block';
      // Scroll to the upload box
      setTimeout(() => {
        if (container) {
          container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 100);
    } else {
      if (container) container.style.display = 'none';
      if (fileInput) fileInput.value = '';
      removePhoto();
    }
    
    calculateGrandTotal();
  }

  function togglePhotoPackageModal(cardElement) {
    // Toggle selection
    cardElement.classList.toggle('selected');
    
    // Show/hide photo upload input
    const container = document.getElementById('dw-photo-input-container-modal');
    const fileInput = document.getElementById('dw-photo-upload-modal');
    
    if (cardElement.classList.contains('selected')) {
      if (container) container.style.display = 'block';
      setTimeout(() => {
        if (container) {
          container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 100);
    } else {
      if (container) container.style.display = 'none';
      if (fileInput) fileInput.value = '';
      removePhotoModal();
    }
    
    calculateGrandTotal();
  }

  // New functions for Photo Parcel as addon
  function togglePhotoInputAddon(checkbox) {
    const container = document.getElementById('dw-photo-input-container');
    const fileInput = document.getElementById('dw-photo-upload');
    
    if (checkbox.checked) {
      if (container) container.style.display = 'block';
      setTimeout(() => {
        if (container) {
          container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 100);
    } else {
      if (container) container.style.display = 'none';
      if (fileInput) fileInput.value = '';
      clearFieldError('dw-photo-upload');  // add-on deselected → drop the error
      removePhoto();
    }
  }

  function togglePhotoInputAddonModal(checkbox) {
    const container = document.getElementById('dw-photo-input-container-modal');
    const fileInput = document.getElementById('dw-photo-upload-modal');
    
    if (checkbox.checked) {
      if (container) container.style.display = 'block';
      setTimeout(() => {
        if (container) {
          container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 100);
    } else {
      if (container) container.style.display = 'none';
      if (fileInput) fileInput.value = '';
      clearFieldError('dw-photo-upload-modal');  // add-on deselected → drop the error
      removePhotoModal();
    }
  }

  function calculateGrandTotal() {
    const count = parseInt(document.getElementById('dw-count').value) || 0;
    const baseTotal = count * pricePerCount;
    document.getElementById('dw-amount').value = baseTotal;

    // Get selected packages
    const selectedPackages = Array.from(document.querySelectorAll('.dw-pkg-card.selected'));
    const selectedPackageNames = selectedPackages.map(card => 
      (card.getAttribute('data-package-id') || '').toLowerCase()
    );

    // Check if only "child only" or "woman only" packages are selected
    const simplePackages = ["child only", "woman only"];
    const onlySimplePackages = selectedPackageNames.length > 0 &&
      selectedPackageNames.every(name => simplePackages.includes(name));

    let packagesTotal = 0;
    let totalAmount = baseTotal;
    let netAmount = baseTotal;

    if (onlySimplePackages) {
      // For "child only" and "woman only", add ₹5 per count for each
      selectedPackageNames.forEach(name => {
        if (name === "child only" || name === "woman only") {
          packagesTotal += count * 5;
        }
      });
    } else if (selectedPackages.length > 0) {
      // For other packages, compute the same foodBudget+cakeBudget logic
      // used in toggleFoodPackage so cake packages are priced correctly.
      selectedPackages.forEach(card => {
        const packageName = card.getAttribute('data-package-id') || '';
        const packagePrice = parseFloat(card.getAttribute('data-price')) || 0;
        let foodBudget = packagePrice;
        let cakeBudget = 0;
        const slug = window.currentFoodCauseSlug || '';
        if (packageName === 'Wish Video & Cake')      { foodBudget = 2000; cakeBudget = 1000; }
        else if (packageName === 'Distribution Video') { foodBudget = 3000; cakeBudget = 0; }
        else if (packageName === 'Banner')             { foodBudget = 1500; cakeBudget = 1500; }
        else if (packageName === 'cake with image') {
          if (slug === 'birthday_cake')         { foodBudget = 1600; cakeBudget = 100; }
          else if (slug === 'virtual_birthday_cake') { foodBudget = 4000; cakeBudget = 100; }
          else if (slug === 'homeless')         { foodBudget = 600;  cakeBudget = 1100; }
          else                                  { foodBudget = 1200; cakeBudget = 1100; }
        } else if (packageName === 'cake')             { foodBudget = 1500; cakeBudget = 1000; }
        let dynCount = Math.floor(foodBudget / pricePerCount);
        let calcAmt  = dynCount * pricePerCount;
        while (calcAmt < foodBudget) { dynCount++; calcAmt = dynCount * pricePerCount; }
        packagesTotal += calcAmt + cakeBudget;
      });
      totalAmount = packagesTotal;
    }

    // Calculate add-ons total (multiply by count)
    let addonsTotal = 0;
    document.querySelectorAll('.dw-addon-checkbox:checked').forEach(cb => {
      const addonPrice = parseFloat(cb.dataset.price) || 0;
      addonsTotal += count * addonPrice;
    });

    // Photo parcel — ₹5 per count if selected
    let photoTotal = 0;
    const photoPackageCard = document.querySelector('.dw-pkg-card[data-package-id="Photo Parcel"]');
    if (photoPackageCard && photoPackageCard.classList.contains('selected')) {
      photoTotal = count * 5;
    }

    // Calculate net amount based on package selection
    if (onlySimplePackages) {
      // For simple packages: base + packages + add-ons + photo
      netAmount = baseTotal + packagesTotal + addonsTotal + photoTotal;
    } else if (selectedPackages.length > 0) {
      // For other packages: package total + add-ons + photo
      netAmount = packagesTotal + addonsTotal + photoTotal;
    } else {
      // No packages: base + add-ons + photo
      netAmount = baseTotal + addonsTotal + photoTotal;
    }

    document.getElementById('dw-total-contribution').value = netAmount;
  }

  // Photo Parcel Functions
  function togglePhotoInput(checkbox) {
    const container = document.getElementById('dw-photo-input-container');
    const fileInput = document.getElementById('dw-photo-upload');
    
    if (checkbox.checked) {
      if (container) container.style.display = 'block';
      // Scroll to the upload box
      setTimeout(() => {
        if (container) {
          container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 100);
    } else {
      if (container) container.style.display = 'none';
      if (fileInput) fileInput.value = '';
      removePhoto();
    }
    
    calculateGrandTotal();
  }

  function togglePhotoInputModal(checkbox) {
    const container = document.getElementById('dw-photo-input-container-modal');
    const fileInput = document.getElementById('dw-photo-upload-modal');
    
    if (checkbox.checked) {
      if (container) container.style.display = 'block';
      setTimeout(() => {
        if (container) {
          container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 100);
    } else {
      if (container) container.style.display = 'none';
      if (fileInput) fileInput.value = '';
      removePhotoModal();
    }
    
    calculateGrandTotal();
  }

  function handlePhotoSelected(input) {
    if (input.files && input.files[0]) {
      const file = input.files[0];

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        input.value = '';
        return;
      }
      clearFieldError('dw-photo-upload');  // valid file chosen → drop the error

      // Show preview
      const reader = new FileReader();
      reader.onload = function(e) {
        const preview = document.getElementById('dw-photo-preview');
        const img = document.getElementById('dw-photo-preview-img');
        if (preview && img) {
          img.src = e.target.result;
          preview.style.display = 'block';
        }
      };
      reader.readAsDataURL(file);
    }
  }

  function handlePhotoSelectedModal(input) {
    if (input.files && input.files[0]) {
      const file = input.files[0];

      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        input.value = '';
        return;
      }
      clearFieldError('dw-photo-upload-modal');  // valid file chosen → drop the error

      const reader = new FileReader();
      reader.onload = function(e) {
        const preview = document.getElementById('dw-photo-preview-modal');
        const img = document.getElementById('dw-photo-preview-img-modal');
        if (preview && img) {
          img.src = e.target.result;
          preview.style.display = 'block';
        }
      };
      reader.readAsDataURL(file);
    }
  }

  function removePhoto() {
    const preview = document.getElementById('dw-photo-preview');
    const img = document.getElementById('dw-photo-preview-img');
    const input = document.getElementById('dw-photo-upload');
    
    if (preview) preview.style.display = 'none';
    if (img) img.src = '';
    if (input) input.value = '';
  }

  function removePhotoModal() {
    const preview = document.getElementById('dw-photo-preview-modal');
    const img = document.getElementById('dw-photo-preview-img-modal');
    const input = document.getElementById('dw-photo-upload-modal');
    
    if (preview) preview.style.display = 'none';
    if (img) img.src = '';
    if (input) input.value = '';
  }

  function resetWizard() {
    currentWizardStep = 1;

    // Keep authenticated donor's prefilled name/email/phone; clear them otherwise.
    
    document.getElementById('dw-name').value  = '';
    document.getElementById('dw-email').value = '';
    document.getElementById('dw-phone').value = '';
    document.getElementById('dw-parcel').value = '';
    
    document.getElementById('dw-parcel').classList.remove('dw-filled');
    document.getElementById('dw-parcel').dispatchEvent(new Event('input', { bubbles: true }));

    // Clear any inline validation errors left over from a previous attempt.
    // Goes through the same resolveErrorTarget logic so the phone-box wrapper
    // (which carries the border) also loses the error classes.
    ['dw-name', 'dw-email', 'dw-phone', 'dw-parcel', 'dw-count'].forEach(function (id) {
      const err = document.getElementById(id + '_error');
      if (err) { err.textContent = ''; err.style.display = 'none'; }
      const inp = document.getElementById(id);
      if (inp) {
        const box = inp.closest('.dw-phone-box');
        (box || inp).classList.remove('error', 'error-shake', 'error-flash');
      }
    });
    
    const pills = document.querySelectorAll('.dw-pill');
    const _defaultCount = pricePerCount < 35 ? 30
                        : pricePerCount < 50  ? 20
                        : pricePerCount < 100 ? 15
                        : pricePerCount < 150 ? 5
                        : pricePerCount < 220 ? 3
                        : pricePerCount < 300 ? 2 : 1;
    pills.forEach(p => {
      p.classList.remove('active');
      const m = (p.getAttribute('onclick') || '').match(/setCount\((\d+)/);
      if (m && parseInt(m[1]) === _defaultCount) p.classList.add('active');
    });
    if (!document.querySelector('.dw-pill.active')) {
      const cp = Array.from(pills).find(p => (p.getAttribute('onclick') || '').includes("'custom'"));
      if (cp) cp.classList.add('active');
    }
    const _ci = document.getElementById('dw-count');
    if (_ci) _ci.value = _defaultCount;

    document.querySelectorAll('.dw-pkg-card').forEach(card => card.classList.remove('selected'));
    document.querySelectorAll('.dw-addon-checkbox').forEach(cb => cb.checked = false);
    
    calculateGrandTotal();
    updateWizardUI();
  }

  // After a Google sign-in round-trip the page returns with ?open_modal=1
  // (set by donor_google_login_modal in the session and forwarded by the
  // OAuth callback). Replicates the pattern in causes_category_desktop.html:1005
  // and causes_category_mobile.html:809 — clean the URL and reopen the wizard.
  document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    if (params.get('open_modal') !== '1') return;

    // Strip the query param so a refresh doesn't reopen the wizard.
    window.history.replaceState({}, document.title, window.location.pathname);

    // Restore the cause the user was donating to before Google sign-in.
    try {
      const saved = JSON.parse(localStorage.getItem('foodWizardCause') || 'null');
      if (saved && saved.slug) {
        window.currentFoodCauseSlug = saved.slug;
        window.currentFoodCauseName = saved.name || '';
        pricePerCount = (typeof saved.amount === 'number' && saved.amount > 0) ? saved.amount : 30;
      }
    } catch (e) {}

    // openWizard(null, null) keeps any per-cause state we just restored,
    // shows the overlay, calls resetWizard() (which now respects the
    // authenticated donor's prefilled name/email).
    openWizard(null, null);
  });



  function setupParcelPreview() {
    const input = document.getElementById("dw-parcel");
    const preview = document.getElementById("parcel-preview");
    const box = document.getElementById("preview-box");
    const onImage = document.getElementById("dw-parcel-on-image");
    if (input) {
      input.addEventListener("input", function () {
        const value = this.value.trim();
        if (value.length > 0) {
          if (box) box.style.display = "flex";
          if (preview) preview.textContent = value;
          if (onImage) onImage.textContent = value;
        } else {
          if (box) box.style.display = "none";
          if (preview) preview.textContent = "";
          if (onImage) onImage.textContent = "";
        }
      });
    }
  }

  function updateParcelPreviewModal(el) {
    if (!el) return;
    const value = (el.value || "").trim();
    const box = document.getElementById("preview-box-modal");
    const preview = document.getElementById("parcel-preview-modal");
    const onImage = document.getElementById("dw-parcel-on-image-modal");
    if (value.length > 0) {
      if (box) box.style.display = "flex";
      if (preview) preview.textContent = value;
      if (onImage) onImage.textContent = value;
    } else {
      if (box) box.style.display = "none";
      if (preview) preview.textContent = "";
      if (onImage) onImage.textContent = "";
    }
  }


  setupParcelPreview();

  // Attach key functions to window for inline onclick handlers in HTML
  window.openWizard = openWizard;
  window.closeWizard = closeWizard;
  window.nextWizardStep = nextWizardStep;
  window.prevWizardStep = prevWizardStep;
  window.setCount = setCount;
  window.toggleFoodPackage = toggleFoodPackage;
  window.togglePackageAccordion = togglePackageAccordion;
  window.togglePackage = togglePackage;
  window.togglePhotoPackage = togglePhotoPackage;
  window.togglePhotoPackageModal = togglePhotoPackageModal;
  window.togglePhotoInputAddon = togglePhotoInputAddon;
  window.togglePhotoInputAddonModal = togglePhotoInputAddonModal;
  window.calculateGrandTotal = calculateGrandTotal;
  window.togglePhotoInput = togglePhotoInput;
  window.togglePhotoInputModal = togglePhotoInputModal;
  window.handlePhotoSelected = handlePhotoSelected;
  window.handlePhotoSelectedModal = handlePhotoSelectedModal;
  window.removePhoto = removePhoto;
  window.removePhotoModal = removePhotoModal;
  window.updateParcelPreviewModal = updateParcelPreviewModal;

  return function cleanup() {
    delete window.openWizard;
    delete window.closeWizard;
    delete window.nextWizardStep;
    delete window.prevWizardStep;
    delete window.setCount;
    delete window.toggleFoodPackage;
    delete window.togglePackageAccordion;
    delete window.togglePackage;
    delete window.togglePhotoPackage;
    delete window.togglePhotoPackageModal;
    delete window.togglePhotoInputAddon;
    delete window.togglePhotoInputAddonModal;
    delete window.calculateGrandTotal;
    delete window.togglePhotoInput;
    delete window.togglePhotoInputModal;
    delete window.handlePhotoSelected;
    delete window.handlePhotoSelectedModal;
    delete window.removePhoto;
    delete window.removePhotoModal;
    delete window.updateParcelPreviewModal;
  };
}
