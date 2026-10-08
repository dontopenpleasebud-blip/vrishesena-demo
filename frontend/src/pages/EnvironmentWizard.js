// Environment Donation Wizard Logic
export function setupEnvironmentWizard(navigate) {

  let currentWizardStep = 1;
  const totalWizardSteps = 3;
  let pricePerCount = 30;
  let activeCause = { slug: '', name: '', amount: 0 };

  // Accent colour for the wizard's JS-driven elements (Next button). Turns green
  // when the wizard is opened from one of the 6 "Our Environment Packages" tiles,
  // and stays blue for the cause-card flow. See applyEnvPackageTheme() below.
  let wizardThemeColor = '#009dff';

  // When the wizard is opened from an env-package tile, recolour the header green
  // and show the package name + its combo contents in place of the generic copy.
  // `card` is the matching .env-pkg-card (may be null). Passing null reverts to
  // the default blue header and generic title/tagline (cause-card flow).
  function applyEnvPackageTheme(card) {
    const overlay = document.getElementById('donation-wizard-overlay');
    if (!overlay) return;
    const header = overlay.querySelector('#dw-header-block');
    const titleEl = header && header.querySelector('.dw-title-area h3');
    const taglineEl = header && header.querySelector('.dw-tagline');

    if (card) {
      overlay.classList.add('dw-theme-green');
      wizardThemeColor = '#16a34a';
      const pkgName = card.dataset.packageName || '';
      let comboText = '';
      try {
        const combos = JSON.parse(card.dataset.combos || '[]');
        comboText = combos.map(function (c) { return c.label; }).filter(Boolean).join(' + ');
      } catch (_) { /* fall back to the visible combo text below */ }
      if (!comboText) {
        const comboEl = card.querySelector('.dw-pkg-combo');
        comboText = comboEl ? comboEl.textContent.replace(/,\s*/g, ' + ') : '';
      }
      if (titleEl) titleEl.textContent = pkgName || 'Make a Difference Today';
      if (taglineEl) taglineEl.textContent = comboText || 'Your generosity changes lives. Every rupee counts.';
    } else {
      overlay.classList.remove('dw-theme-green');
      wizardThemeColor = '#009dff';
      if (titleEl) titleEl.textContent = 'Make a Difference Today';
      if (taglineEl) taglineEl.textContent = 'Your generosity changes lives. Every rupee counts.';
    }

    // updateWizardUI() (run from resetWizard before this) sets the Next button's
    // inline colour, so re-apply it here to keep it in sync with the new theme.
    const nextBtn = overlay.querySelector('#dw-next-btn');
    if (nextBtn) nextBtn.style.background = wizardThemeColor;
  }

  // Server-provided donor info for prefill after sign-in.
  // Values are emitted via {% json_script %} below the wizard to keep this JS free of Django tags.
  const donorAuthenticated = (function () {
    const el = document.getElementById('env-donor-authenticated');
    if (!el) return false;
    try { return JSON.parse(el.textContent || 'false') === true; }
    catch (_) { return false; }
  })();
  const donorData = (function () {
    const el = document.getElementById('env-donor-data');
    if (!el) return null;
    try { return JSON.parse(el.textContent || 'null'); }
    catch (_) { return null; }
  })();

  function prefillDonorFields() {
    if (!donorAuthenticated || !donorData) return;
    const nameEl = document.getElementById('dw-name');
    const emailEl = document.getElementById('dw-email');
    const phoneEl = document.getElementById('dw-phone');
    const instaEl = document.getElementById('dw-insta');

    if (nameEl && donorData.name && !nameEl.value) nameEl.value = donorData.name;
    if (emailEl && donorData.email && !emailEl.value) emailEl.value = donorData.email;
    if (phoneEl && donorData.phone && !phoneEl.value) {
      // Strip +91 / 91 country-code prefix so the UI shows the 10-digit local number.
      const raw = String(donorData.phone).replace(/\D/g, '');
      let local = (raw.length === 12 && raw.startsWith('91')) ? raw.slice(2) : raw;
      if (local.startsWith('0')) local = local.slice(1);
      phoneEl.value = local || donorData.phone;
    }
    if (instaEl && donorData.insta_id && !instaEl.value) instaEl.value = donorData.insta_id;
  }

  // Stash the active cause before the page navigates away for sign-in so the
  // wizard can be re-opened with the same context after the OAuth/OTP round-trip.
  function rememberCauseBeforeSignIn() {
    try {
      sessionStorage.setItem('env_wizard_cause', JSON.stringify(activeCause));
    } catch (_) { /* storage may be disabled — fail silent */ }
  }

  // After a sign-in round-trip the user lands on /environment/?open_modal=1.
  // Restore the cause from sessionStorage and re-open the wizard.
  document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    if (params.get('open_modal') !== '1') return;
    // Clean the URL so a refresh doesn't keep reopening the wizard.
    window.history.replaceState({}, document.title, window.location.pathname);
    let saved = null;
    try { saved = JSON.parse(sessionStorage.getItem('env_wizard_cause') || 'null'); }
    catch (_) { saved = null; }
    sessionStorage.removeItem('env_wizard_cause');
    if (saved && saved.slug) {
      openWizard(null, saved.slug, saved.name, saved.amount);
    } else {
      openWizard(null);
    }
  });

  function openWizard(event, slug, name, amount) {
    if(event) event.preventDefault();

    // If invoked from a cause card, prefer its data attributes.
    // currentTarget may be `document` (delegated listener) which has no .closest.
    const ct = event && event.currentTarget;
    let pkgNameFromTile = '';
    if (ct && typeof ct.closest === 'function') {
      const card = ct.closest('[data-category-slug]');
      if (card) {
        slug = slug || card.dataset.categorySlug;
        name = name || card.dataset.causeName;
        amount = amount || parseInt(card.dataset.causeAmount, 10);
      }
      // Environment-page package tiles carry data-pkg-name pointing at a Step 3
      // env-pkg-card. Capture it so we can auto-select that package below.
      const pkgTile = ct.closest('[data-pkg-name]');
      if (pkgTile) {
        pkgNameFromTile = pkgTile.dataset.pkgName || '';
      }
    }

    activeCause = {
      slug: slug || '',
      name: name || '',
      amount: parseInt(amount, 10) || 0,
    };
    if (activeCause.amount > 0) {
      pricePerCount = activeCause.amount;
    }

    document.getElementById('donation-wizard-overlay').classList.add('show');
    document.body.style.overflow = 'hidden';

    // Service date: today if before 1 pm, otherwise tomorrow (matches donation modal)
    (function () {
      var now = new Date();
      var target = new Date(now);
      if (now.getHours() >= 13) target.setDate(now.getDate() + 1);
      var dateStr = target.getFullYear() + '-' +
        String(target.getMonth() + 1).padStart(2, '0') + '-' +
        String(target.getDate()).padStart(2, '0');
      document.querySelectorAll('[id="dw-date"]').forEach(function (el) {
        el.min = dateStr;
        el.value = dateStr;
      });
    })();
    // Step 3 packages are hardcoded for the environment page (6 env packages).
    resetWizard();
    prefillDonorFields();

    const envContainer = document.getElementById('dw-packages-scroll');
    const causeContainer = document.getElementById('dw-cause-packages-scroll');
    const packagesSection = document.getElementById('dw-packages-section');

    if (pkgNameFromTile) {
      // Opened from one of the 6 env package tiles → hide the full Packages
      // section + the 6 cards list. The matching env-pkg-card is still selected 
      // internally for pricePerCount / submit data.
      if (packagesSection) packagesSection.style.display = 'none';
      if (envContainer) envContainer.style.display = 'none';
      if (causeContainer) causeContainer.style.display = 'none';

      const safeName = pkgNameFromTile.replace(/"/g, '\\"');
      const target = document.querySelector(
        '.env-pkg-card[data-package-name="' + safeName + '"]'
      );
      if (target && !target.classList.contains('selected')) {
        selectEnvPackage(target);
      }

      // Green header + show this package's name and combo contents.
      applyEnvPackageTheme(target);

      calculateGrandTotal();
    } else {
      // Opened from a cause card (Water Bowl / Bird House / Plant a Tree) →
      // show heading + dynamic cause packages, hide the env tiles.
      if (packagesSection) packagesSection.style.display = '';
      if (envContainer) envContainer.style.display = 'none';
      if (causeContainer) causeContainer.style.display = '';
      // Clear any prior env-package selection so the cause-card flow starts clean.
      document.querySelectorAll('.env-pkg-card.selected').forEach(function (c) {
        c.classList.remove('selected');
      });
      // Revert to the default blue header + generic title/tagline.
      applyEnvPackageTheme(null);
      renderPackagesForCause(activeCause.slug);
    }
  }

  // Click handler for the "Image on Parcel" big card (env-package flow).
  // Toggles .selected (which calculateGrandTotal adds via packagesTotal),
  // shows/hides the photo upload field, and recalculates the grand total.
  // Single-select handler for the 6 environment packages (clears others, then toggles).
  // When a package is selected, the per-count price becomes the package price
  // (e.g. ₹600 × 20 count = ₹12,000). Deselecting reverts to the cause's amount.
  function selectEnvPackage(cardElement) {
    const wasSelected = cardElement.classList.contains('selected');
    document.querySelectorAll('.env-pkg-card').forEach(function (c) {
      c.classList.remove('selected');
    });
    if (!wasSelected) {
      cardElement.classList.add('selected');
      const pkgPrice = parseInt(cardElement.dataset.price, 10) || 0;
      if (pkgPrice > 0) pricePerCount = pkgPrice;

      // When the wizard is opened straight from an env-package tile, activeCause
      // has no slug. Pull the primary category from the first combo item so the
      // POST to /payment/ has a non-empty category_name (Easebuzz needs productinfo).
      if (!activeCause.slug) {
        try {
          const combos = JSON.parse(cardElement.dataset.combos || '[]');
          if (Array.isArray(combos) && combos.length && combos[0].category) {
            activeCause.slug = combos[0].category;
            activeCause.name = cardElement.dataset.packageName || activeCause.name;
            if (!activeCause.amount) activeCause.amount = pkgPrice;
          }
        } catch (_) { /* malformed JSON — ignore, fall through */ }
      }
    } else {
      // Revert to original cause amount when the package is deselected.
      pricePerCount = activeCause.amount > 0 ? activeCause.amount : 30;
    }
    calculateGrandTotal();
  }

  // Image-on-Parcel and other static packages removed
  const STATIC_PACKAGES = [];

  function renderPackagesForCause(slug) {
    // Cause-card flow renders into its own container so it doesn't collide
    // with the 6 hardcoded env-pkg-card cards.
    const container = document.getElementById('dw-cause-packages-scroll');
    const dataEl = document.getElementById('env-cause-packages');
    if (!container) return;
    container.innerHTML = '';

    let data = {};
    if (dataEl) {
      try { data = JSON.parse(dataEl.textContent || '{}'); }
      catch (_) { data = {}; }
    }

    const dbPkgs = (slug && data[slug]) || [];
    const pkgs = dbPkgs.concat(STATIC_PACKAGES);

    pkgs.forEach(function (p) {
      const price = Math.round(Number(p.price) || 0);
      const packageId = (p.name || '').replace(/\s+/g, '-').toLowerCase();

      const packContainer = document.createElement('div');
      packContainer.className = 'dw-pkg-card-wrapper';

      const card = document.createElement('div');
      card.className = 'dw-pkg-card';
      card.dataset.price = String(price);
      card.dataset.packageName = p.name || '';
      card.dataset.packageId = packageId;

      // Checkbox for package selection
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'dw-pkg-checkbox';
      checkbox.id = 'pkg-checkbox-' + packageId;
      checkbox.dataset.price = String(price);
      checkbox.onchange = function () { togglePackageDetails(packageId); };
      card.appendChild(checkbox);

      // Label with image
      const label = document.createElement('label');
      label.htmlFor = 'pkg-checkbox-' + packageId;
      label.className = 'dw-pkg-label';
      
      if (p.image) {
        const img = document.createElement('img');
        img.className = 'dw-pkg-bg';
        img.src = p.image;
        img.alt = p.name || '';
        img.loading = 'lazy';
        label.appendChild(img);
      }
      card.appendChild(label);

      // Price text
      const priceDiv = document.createElement('div');
      priceDiv.className = 'dw-pkg-price-text';
      priceDiv.textContent = '₹' + price + '/-';
      card.appendChild(priceDiv);

      packContainer.appendChild(card);

      // Package details section (shown on selection)
      if ((p.fields && Object.keys(p.fields).length > 0) || (p.what_you_get && p.what_you_get.length > 0)) {
        const detailsDiv = document.createElement('div');
        detailsDiv.id = 'pkg-details-' + packageId;
        detailsDiv.className = 'dw-pkg-details';
        detailsDiv.style.display = 'none';

        // Fields section
        if (p.fields && Object.keys(p.fields).length > 0) {
          const fieldsDiv = document.createElement('div');
          fieldsDiv.className = 'dw-pkg-fields';
          
          Object.entries(p.fields).forEach(([key, field]) => {
            const fieldItem = document.createElement('div');
            fieldItem.className = 'dw-pkg-field-item';
            
            const label = document.createElement('label');
            label.textContent = field.label || key;
            fieldItem.appendChild(label);
            
            const input = document.createElement('input');
            input.type = field.type || 'text';
            input.name = key;
            input.placeholder = field.placeholder || '';
            fieldItem.appendChild(input);
            
            fieldsDiv.appendChild(fieldItem);
          });
          detailsDiv.appendChild(fieldsDiv);
        }

        // What you get section
        if (p.what_you_get && p.what_you_get.length > 0) {
          const whatDiv = document.createElement('div');
          whatDiv.className = 'dw-pkg-what-you-get';

          p.what_you_get.forEach(function (item) {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'dw-what-item';
            
            if (item.type === 'image' && item.src) {
              const img = document.createElement('img');
              img.src = item.src;
              img.alt = item.title || '';
              img.style.maxWidth = '100%';
              img.loading = 'lazy';
              itemDiv.appendChild(img);
            } else if (item.type === 'video' && item.src) {
              const video = document.createElement('video');
              video.src = item.src;
              video.controls = true;
              video.style.maxWidth = '100%';
              itemDiv.appendChild(video);
            }
            
            if (item.title) {
              const titleEl = document.createElement('p');
              titleEl.textContent = item.title;
              itemDiv.appendChild(titleEl);
            }
            
            whatDiv.appendChild(itemDiv);
          });
          detailsDiv.appendChild(whatDiv);
        }

        packContainer.appendChild(detailsDiv);
      }

      container.appendChild(packContainer);
    });
  }

  function togglePackageDetails(packageId) {
    const checkbox = document.getElementById('pkg-checkbox-' + packageId);
    const detailsDiv = document.getElementById('pkg-details-' + packageId);
    
    if (!checkbox) return;
    
    // Uncheck other packages
    document.querySelectorAll('.dw-pkg-checkbox').forEach(function (cb) {
      if (cb.id !== 'pkg-checkbox-' + packageId) {
        cb.checked = false;
        const otherId = cb.id.replace('pkg-checkbox-', '');
        const otherDetails = document.getElementById('pkg-details-' + otherId);
        if (otherDetails) otherDetails.style.display = 'none';
      }
    });
    
    // Toggle current package details
    if (detailsDiv) {
      detailsDiv.style.display = checkbox.checked ? 'block' : 'none';
    }
    
    calculateGrandTotal();
  }

  // Delegated handler — every .cause-donate-link inherits cause data from its card.
  document.addEventListener('click', function (e) {
    const link = e.target.closest('.cause-donate-link');
    if (!link) return;
    e.preventDefault();
    const card = link.closest('[data-category-slug]');
    if (card) {
      openWizard(
        e,
        card.dataset.categorySlug,
        card.dataset.causeName,
        parseInt(card.dataset.causeAmount, 10)
      );
    } else {
      openWizard(e);
    }
  });

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
      nextBtn.style.background = wizardThemeColor;
      nextBtn.style.boxShadow = '0 6px 15px rgba(0,0,0,0.2)';
    } else {
      nextBtn.textContent = 'Next';
      nextBtn.style.background = wizardThemeColor;
      nextBtn.style.boxShadow = 'none';
    }
    
    document.querySelector('.dw-body').scrollTop = 0;
  }

  function getCsrfToken() {
    const m = document.cookie.match(/(?:^|; )csrftoken=([^;]*)/);
    return m ? decodeURIComponent(m[1]) : '';
  }

  function submitDonationToPayment() {
    // Safety net: never submit without the parcel photo when the add-on is on.
    if (!validateParcelPhoto()) return;
    // Build a hidden form and POST to /payment/ so the user lands on the
    // Easebuzz-hosted payment page (server-side redirect inside order_payment).
    const selectedPkg = document.querySelector('.env-pkg-card.selected');
    let envPackageName = '';
    let envCombosJson = '';
    if (selectedPkg) {
      envPackageName = selectedPkg.dataset.packageName || '';
      // Scale each combo item's amount (and qty) by the current count so the
      // stored split matches the actual transaction (e.g. ₹600 pkg × 20 count
      // → each combo item amount multiplied by 20).
      const count = parseInt(document.getElementById('dw-count').value, 10) || 1;
      try {
        const combos = JSON.parse(selectedPkg.dataset.combos || '[]');
        if (Array.isArray(combos)) {
          combos.forEach(function (item) {
            if (item && typeof item === 'object') {
              const unitAmt = parseInt(item.amount, 10) || 0;
              const unitQty = parseInt(item.qty, 10) || 0;
              item.amount = unitAmt * count;
              item.qty = unitQty * count;
              // Rebuild label from scaled qty (e.g. "20 Bird House") if we can
              // recover the category name from the original label.
              if (typeof item.label === 'string') {
                const m = item.label.match(/^\s*\d+\s+(.+)$/);
                const noun = m ? m[1] : item.label;
                item.label = item.qty + ' ' + noun;
              }
            }
          });
          envCombosJson = JSON.stringify(combos);
        }
      } catch (_) {
        envCombosJson = selectedPkg.dataset.combos || '';
      }
    }

    const fields = {
      csrfmiddlewaretoken: getCsrfToken(),
      donor_name: document.getElementById('dw-name').value.trim(),
      donor_mail: document.getElementById('dw-email').value.trim(),
      donor_no: document.getElementById('dw-phone').value.trim(),
      country_code: '+91',
      service_date: document.getElementById('dw-date').value,
      insta_id: document.getElementById('dw-insta').value.trim(),
      category_name: activeCause.slug,
      // Donor's typed parcel name — shown as-is in the donor portal.
      Name_of_parcel: document.getElementById('dw-parcel').value.trim(),
      food_count: document.getElementById('dw-count').value,
      total_amount: document.getElementById('dw-amount').value,
      net_amount: document.getElementById('dw-total-contribution').value,
      source: 'website',
      // Leave `occation` empty for env donations — it's a user-facing field
      // (donor portal, birthday matching) and we no longer park the package
      // name there. payment_success re-identifies the package from the stored
      // amount + food_count instead (see views.resolve_env_donation), so the
      // selected package name does not need to ride along on the request.
      occation: '',
    };

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = '/payment/';
    form.style.display = 'none';
    // If the donor opted into "Image on Parcel" and selected a file, switch the
    // form to multipart and re-parent the file input (browsers don't allow
    // copying a file input's value any other way).
    const photoInput = document.getElementById('dw-parcel-photo');
    const hasPhoto = photoInput && photoInput.files && photoInput.files.length > 0;
    if (hasPhoto) {
      form.enctype = 'multipart/form-data';
      photoInput.name = 'photo-upload';
      form.appendChild(photoInput);
    }
    Object.entries(fields).forEach(([k, v]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = k;
      input.value = v == null ? '' : String(v);
      form.appendChild(input);
    });
    document.body.appendChild(form);
    form.submit();
  }

  // ---- Field validation (mirrors /causes-detail/<slug>/ wizard) ----
  function _cleanInput(id, val) {
    switch (id) {
      case 'dw-name':   return val.replace(/[^a-zA-Z\s]/g, '');
      case 'dw-phone':  return val.replace(/[^\d]/g, '').slice(0, 15);
      case 'dw-email':  return val.trim();
      case 'dw-parcel': return val.replace(/[^a-zA-Z0-9\s\-_.,()]/g, '').slice(0, 100);
      default:          return val;
    }
  }

  function validateWizardInput(input) {
    if (!input) return true;
    const id = input.id;
    const cleaned = _cleanInput(id, input.value);
    input.value = cleaned;
    input.classList.remove('dw-error');

    let valid = true, msg = '';
    if (!cleaned || !cleaned.trim()) {
      // Whitespace-only counts as empty (WhatsApp-style): " " is not valid input.
      valid = false; msg = 'This field is required *';
    } else if (id === 'dw-phone') {
      // Phone box is +91-only in this wizard.
      if (!/^\d{10}$/.test(cleaned))            { valid = false; msg = 'Phone number must be 10 digits *'; }
      else if (!/^[6-9]/.test(cleaned))         { valid = false; msg = 'Indian mobile must start with 6-9 *'; }
      else if (/^(\d)\1{9}$/.test(cleaned))     { valid = false; msg = 'Enter a valid phone number *'; }
      else if (/^9876543210$|^1234567890$|^0987654321$/.test(cleaned)) { valid = false; msg = 'Sequential numbers not allowed *'; }
      else if (/(\d)\1{5,}/.test(cleaned))      { valid = false; msg = 'Too many repeated digits *'; }
    } else if (id === 'dw-email') {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleaned)) { valid = false; msg = 'Please enter a valid email *'; }
    } else if (id === 'dw-date') {
      // Past date typed manually bypasses the picker's `min` — block it here.
      if (input.min && cleaned < input.min) { valid = false; msg = 'Service date cannot be in the past *'; }
    }

    // Errors render under the wrapper (.dw-input-box / .dw-form-group) so the
    // message sits below the field instead of inside the input.
    const host = input.closest('.dw-input-box, .dw-form-group') || input.parentNode;
    let errorEl = host.querySelector(':scope > .dw-error-msg');
    if (!errorEl) {
      errorEl = document.createElement('div');
      errorEl.className = 'dw-error-msg';
      errorEl.style.cssText = 'color:#dc2626;font-size:12px;margin-top:6px;';
      host.appendChild(errorEl);
    }
    if (!valid) {
      input.classList.add('dw-error');
      errorEl.textContent = msg;
      errorEl.style.display = 'block';
    } else {
      errorEl.style.display = 'none';
    }
    return valid;
  }

  function validateCurrentStep() {
    const idsByStep = {
      1: ['dw-name', 'dw-email', 'dw-phone'],
      2: ['dw-parcel', 'dw-date'],
    };
    const ids = idsByStep[currentWizardStep] || [];
    let ok = true;
    ids.forEach(function (id) {
      if (!validateWizardInput(document.getElementById(id))) ok = false;
    });
    if (!ok) {
      const firstErr = document.querySelector('#dw-step-' + currentWizardStep + ' .dw-error');
      if (firstErr) firstErr.focus();
    }
    return ok;
  }

  // Validate on blur so users get feedback as they go.
  document.addEventListener('DOMContentLoaded', function () {
    ['dw-name', 'dw-email', 'dw-phone', 'dw-parcel', 'dw-date'].forEach(function (id) {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener('blur', function () { validateWizardInput(el); });
      el.addEventListener('input', function () {
        // Clean on input so disallowed chars never appear; hide error once valid.
        const cleaned = _cleanInput(id, el.value);
        if (cleaned !== el.value) el.value = cleaned;
      });
    });

    // Clear the "photo required" error as soon as the donor picks a file.
    const parcelPhoto = document.getElementById('dw-parcel-photo');
    if (parcelPhoto) {
      parcelPhoto.addEventListener('change', function () {
        if (parcelPhoto.files && parcelPhoto.files.length > 0) validateParcelPhoto();
      });
    }
  });

  function nextWizardStep() {
    if (!validateCurrentStep()) return;

    if (currentWizardStep < totalWizardSteps) {
      currentWizardStep++;
      updateWizardUI();
      return;
    }

    const amount = document.getElementById('dw-total-contribution').value;
    if (!amount || parseInt(amount, 10) <= 0) {
      alert('Donation amount must be greater than zero.');
      return;
    }

    // Image-on-Parcel add-on requires an uploaded photo before paying.
    if (!validateParcelPhoto()) return;

    const nextBtn = document.getElementById('dw-next-btn');
    nextBtn.disabled = true;
    nextBtn.textContent = 'Redirecting...';
    submitDonationToPayment();
  }

  function prevWizardStep() {
    if (currentWizardStep > 1) {
      currentWizardStep--;
      updateWizardUI();
    }
  }

  function setCount(val, btnElement) {
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

  function togglePackage(cardElement) {
    cardElement.classList.toggle('selected');
    calculateGrandTotal();
  }

  // Re-trigger a short blink on the parcel-photo card + upload box. Removing the
  // class and forcing a reflow lets the animation replay on every failed attempt.
  function blinkParcelPhoto() {
    ['dw-parcel-photo-card', 'dw-parcel-photo-container'].forEach(function (id) {
      const el = document.getElementById(id);
      if (!el) return;
      el.classList.remove('dw-error-blink');
      void el.offsetWidth;            // force reflow so the animation restarts
      el.classList.add('dw-error-blink');
      el.addEventListener('animationend', function handler() {
        el.classList.remove('dw-error-blink');
        el.removeEventListener('animationend', handler);
      });
    });
  }

  // When the "Image on Parcel" add-on is selected, uploading a photo is
  // mandatory (same rule as the food/causes donation forms). Returns true when
  // the add-on isn't selected OR a file is chosen; otherwise shows an inline
  // error under the upload field and returns false.
  function validateParcelPhoto() {
    const card = document.getElementById('dw-parcel-photo-card');
    const input = document.getElementById('dw-parcel-photo');
    const container = document.getElementById('dw-parcel-photo-container');
    if (!card || !card.classList.contains('selected')) return true;

    const host = container || (input ? input.parentNode : null);
    let errorEl = host ? host.querySelector(':scope > .dw-error-msg') : null;
    if (host && !errorEl) {
      errorEl = document.createElement('div');
      errorEl.className = 'dw-error-msg';
      errorEl.style.cssText = 'color:#dc2626;font-size:12px;margin-top:6px;';
      host.appendChild(errorEl);
    }

    const hasFile = input && input.files && input.files.length > 0;
    if (!hasFile) {
      if (container) container.style.display = '';  // make sure it's visible
      if (input) input.classList.add('dw-error');
      if (errorEl) {
        errorEl.textContent = 'Please upload your photo for the Image on Parcel add-on *';
        errorEl.style.display = 'block';
      }
      // Blink the upload section + card so the error is hard to miss.
      blinkParcelPhoto();
      if (input && typeof input.focus === 'function') input.focus();
      return false;
    }
    if (input) input.classList.remove('dw-error');
    if (errorEl) errorEl.style.display = 'none';
    return true;
  }

  // "Image on Parcel" photo add-on. Toggling the card reveals/hides the file
  // input and recalculates the total (the ₹5 data-price is summed by
  // calculateGrandTotal since this is a plain .dw-pkg-card, not an env-pkg-card).
  function toggleParcelPhoto(cardElement) {
    cardElement.classList.toggle('selected');
    const container = document.getElementById('dw-parcel-photo-container');
    const input = document.getElementById('dw-parcel-photo');
    if (cardElement.classList.contains('selected')) {
      if (container) container.style.display = '';
    } else {
      if (container) container.style.display = 'none';
      if (input) {
        input.value = '';  // clear so a stray file isn't submitted
        input.classList.remove('dw-error');
        const err = container && container.querySelector(':scope > .dw-error-msg');
        if (err) err.style.display = 'none';  // clear the "photo required" error
      }
    }
    calculateGrandTotal();
  }

  // Total number of items bundled in the currently-selected env package, read
  // from its data-combos (e.g. 5 Trees + 1 Water Bowl + 1 Bird House → 7). Used
  // to price the Image-on-Parcel add-on in the "Our Environment Packages" flow.
  function getEnvPackageItemCount() {
    const selected = document.querySelector('.env-pkg-card.selected');
    if (!selected) return 0;
    try {
      const combos = JSON.parse(selected.getAttribute('data-combos') || '[]');
      return combos.reduce((sum, c) => sum + (parseInt(c.qty, 10) || 0), 0);
    } catch (_) {
      return 0;
    }
  }

  function calculateGrandTotal() {
    const count = parseInt(document.getElementById('dw-count').value) || 0;
    const baseTotal = count * pricePerCount;
    document.getElementById('dw-amount').value = baseTotal;

    // For env packages: pricePerCount already equals the package price, so
    // baseTotal = count × pkgPrice. Skip env-pkg-card from packagesTotal to
    // avoid double-counting. Non-env packages (legacy) still add a flat price.
    // "Our Environment Packages" flow is active when one of the 6 env-pkg-cards
    // is selected. The Image-on-Parcel add-on is priced ₹5 × count in that flow,
    // but stays a flat ₹5 in the cause-card flow.
    const envPackageFlow = !!document.querySelector('.env-pkg-card.selected');

    let packagesTotal = 0;
    document.querySelectorAll('.dw-pkg-card.selected').forEach(card => {
      if (card.classList.contains('env-pkg-card')) return;
      const unitPrice = parseInt(card.getAttribute('data-price')) || 0;
      if (card.id === 'dw-parcel-photo-card') {
        // In the env-package flow the parcel scales with BOTH the bundle's item
        // count (Σ combo qty — e.g. 5 Trees + 1 Water Bowl + 1 Bird House = 7)
        // AND the donation count, so parcel = (7 × count) × ₹5. At count 2 that's
        // 2 bundles = 14 items → ₹70. The cause-card flow stays a flat ₹5.
        const parcelCount = envPackageFlow ? getEnvPackageItemCount() * count : count;
        const parcelTotal = unitPrice * parcelCount;
        const priceLabel = document.getElementById('dw-parcel-photo-price');
        if (priceLabel) priceLabel.textContent = '₹' + parcelTotal + '/-';
        packagesTotal += parcelTotal;
        return;
      }
      packagesTotal += unitPrice;
    });

    // When the parcel card is not selected, reset its label to the unit price so
    // it doesn't show a stale count-based amount on the next open.
    if (!document.getElementById('dw-parcel-photo-card').classList.contains('selected')) {
      const priceLabel = document.getElementById('dw-parcel-photo-price');
      const card = document.getElementById('dw-parcel-photo-card');
      if (priceLabel && card) priceLabel.textContent = '₹' + (parseInt(card.getAttribute('data-price')) || 0) + '/-';
    }

    // Also add prices from dynamically rendered package checkboxes
    document.querySelectorAll('.dw-pkg-checkbox:checked').forEach(checkbox => {
      packagesTotal += parseInt(checkbox.getAttribute('data-price')) || 0;
    });

    const grandTotal = baseTotal + packagesTotal;
    document.getElementById('dw-total-contribution').value = grandTotal;
  }

  function resetWizard() {
    currentWizardStep = 1;
    
    document.getElementById('dw-name').value = '';
    document.getElementById('dw-phone').value = '';
    document.getElementById('dw-email').value = '';
    document.getElementById('dw-parcel').value = '';
    document.getElementById('dw-parcel').classList.remove('dw-filled');
    
    // Default count = 1 but no pill is auto-active (pills remain 20/60/100/Custom).
    document.querySelectorAll('.dw-pill').forEach(function (p) { p.classList.remove('active'); });
    const dwCountInput = document.getElementById('dw-count');
    if (dwCountInput) dwCountInput.value = 1;
    calculateGrandTotal();

    document.querySelectorAll('.dw-pkg-card').forEach(card => card.classList.remove('selected'));

    // Reset the "Image on Parcel" photo add-on (hide + clear any picked file).
    const parcelPhotoContainer = document.getElementById('dw-parcel-photo-container');
    if (parcelPhotoContainer) parcelPhotoContainer.style.display = 'none';
    const parcelPhotoInput = document.getElementById('dw-parcel-photo');
    if (parcelPhotoInput) parcelPhotoInput.value = '';

    // Reset dynamic package checkboxes and details
    document.querySelectorAll('.dw-pkg-checkbox').forEach(cb => cb.checked = false);
    document.querySelectorAll('.dw-pkg-details').forEach(detail => detail.style.display = 'none');
    
    calculateGrandTotal();
    updateWizardUI();
  }


  // Attach key functions to window for inline onclick handlers
  window.openWizard = openWizard;
  window.closeWizard = closeWizard;
  window.nextWizardStep = nextWizardStep;
  window.prevWizardStep = prevWizardStep;
  window.setCount = setCount;
  window.selectEnvPackage = selectEnvPackage;
  window.togglePackage = togglePackage;
  window.toggleParcelPhoto = toggleParcelPhoto;
  window.togglePackageDetails = togglePackageDetails;
  window.rememberCauseBeforeSignIn = rememberCauseBeforeSignIn;

  return function cleanup() {
    delete window.openWizard;
    delete window.closeWizard;
    delete window.nextWizardStep;
    delete window.prevWizardStep;
    delete window.setCount;
    delete window.selectEnvPackage;
    delete window.togglePackage;
    delete window.toggleParcelPhoto;
    delete window.togglePackageDetails;
    delete window.rememberCauseBeforeSignIn;
  };
}
