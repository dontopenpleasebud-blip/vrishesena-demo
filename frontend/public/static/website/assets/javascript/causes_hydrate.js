/**
 * causes_hydrate.js
 * Fetches causes and recent donations from the API,
 * renders cause cards into the DOM, handles category filtering,
 * and runs the toast popup rotation.
 */
(function () {
  "use strict";

  // ── CSRF fix: populate all [name=csrfmiddlewaretoken] inputs from cookie ──
  function getCSRFToken() {
    var match = document.cookie.match(/csrftoken=([^;]+)/);
    return match ? match[1] : "";
  }

  function fixCSRFInputs() {
    var token = getCSRFToken();
    if (!token) return;
    var inputs = document.querySelectorAll(
      'input[name="csrfmiddlewaretoken"]'
    );
    inputs.forEach(function (el) {
      el.value = token;
    });
  }

  // ── WhatsApp SVG (reused for every card) ──
  var WA_SVG =
    '<svg class="whatsapp_icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 448 512">' +
    '<path fill="#35e97a" d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>' +
    "</svg>";

  // ── Cloudflare Image Resizing helper ──
  // window.CFI_ENABLED is set by the template (false in DEBUG)
  function cfi(url, width, height, quality) {
    if (!url) return url;
    if (!window.CFI_ENABLED) return url;
    quality = quality || 70;
    var params = "w=" + width + ",fit=cover,f=auto,q=" + quality;
    if (height) params = "w=" + width + ",h=" + height + "," + "fit=cover,f=auto,q=" + quality;
    if (url.startsWith("http")) {
      return "/cdn-cgi/image/" + params + "/" + url;
    }
    return "/cdn-cgi/image/" + params + url;
  }

  // ── Data store ──
  var causesData = null;

  // ── Build a desktop cause card HTML ──
  function desktopCard(cause, category) {
    return (
      '<div class="col-6 col-md-4 col-lg-3 category_card ' +
      category +
      ' category_card1 mb-4">' +
      '<div class="category_content">' +
      '<a href="' +
      cause.whatsapp_url +
      '" class="whatsapp_container" aria-label="send this content on whatsapp">' +
      WA_SVG +
      "</a>" +
      '<a class="category_image" href="' +
      cause.detail_url +
      '" aria-label="category image"><img loading="lazy" src="' +
      cfi(cause.card_image, 200) +
      '" srcset="' + cfi(cause.card_image, 400) + ' 2x" width="200" height="267" alt="' +
      escapeAttr(cause.short_description) +
      '"></a>' +
      '<div class="card_content">' +
      '<h5 class="title"><a class="causes_name" href="' +
      cause.detail_url +
      '" aria-label="name of the cause">' +
      escapeHTML(cause.name) +
      "</a></h5>" +
      "<span>" +
      escapeHTML(cause.amount_title) +
      "</span>" +
      '<a href="' +
      cause.detail_url +
      '" class="donate_btn" aria-label="donate button">Donate Now</a>' +
      "</div></div></div>"
    );
  }

  // ── Build a mobile cause card HTML ──
  function mobileCard(cause, category) {
    return (
      '<a href="' +
      cause.detail_url +
      '" class="feature-container ' +
      category +
      ' cause-card">' +
      '<div class="image-container">' +
      '<img src="' +
      cfi(cause.card_image, 200) +
      '" srcset="' + cfi(cause.card_image, 400) + ' 2x" width="200" height="230" alt="' +
      escapeAttr(cause.short_description) +
      '" loading="lazy">' +
      '<div class="content_area">' +
      "<h6>" +
      escapeHTML(cause.name) +
      "</h6>" +
      "<span>" +
      escapeHTML(cause.amount_title) +
      "</span>" +
      "</div></div></a>"
    );
  }

  // ── Build a Splide slide HTML for featured causes ──
  function splideSlide(cause) {
    return (
      '<a href="' +
      cause.detail_url +
      '" class="splide__slide">' +
      '<div class="slide-content">' +
      '<img src="' +
      cfi(cause.card_image, 200) +
      '" width="200" alt="" loading="lazy">' +
      '<div class="overlay-text">' +
      "<h5>" +
      escapeHTML(cause.name) +
      "</h5>" +
      '<p class="mb-0">' +
      escapeHTML(cause.amount_title) +
      "</p>" +
      '<span class="slide_donate_btn">Donate Now</span>' +
      "</div></div></a>"
    );
  }

  // ── Static card HTML for education/orphanage/healthcare ──
  function staticEducationCard() {
    return (
      '<div class="col-6 col-md-4 col-lg-3 category_card category_card1 causes all">' +
      '<div class="category_content category_content_1">' +
      '<a href="/CrowdFundEducation/Educationindex/" class="category_image"><img loading="lazy" src="/static/website/assets/images/crowd_fund_card.webp" alt="crowdfund-education"></a>' +
      '<div class="card_content"><h5 class="title"><a href="/CrowdFundEducation/Educationindex/" data-category="education">Help For Their Education</a></h5>' +
      '<a href="/CrowdFundEducation/Educationindex/" class="donate_btn donate_now" data-category="education" aria-label="donate button">Donate Now</a>' +
      "</div></div></div>"
    );
  }

  function staticOrphanageCard() {
    return (
      '<div class="col-6 col-md-4 col-lg-3 category_card category_card1 causes all">' +
      '<div class="category_content category_content_1">' +
      '<a href="/orphanage/" class="category_image"><img loading="lazy" src="/static/website/assets/images/orph_card.webp" alt="Orphanage-card"></a>' +
      '<div class="card_content"><h5 class="title"><a href="/orphanage/" data-category="orphanage">Donate For Orphanage</a></h5>' +
      '<a href="/orphanage/" class="donate_btn donate_now" data-category="orphanage" aria-label="donate button">Donate Now</a>' +
      "</div></div></div>"
    );
  }

  function staticHealthcareCard() {
    return (
      '<div class="col-6 col-md-4 col-lg-3 category_card category_card1 causes all">' +
      '<div class="category_content category_content_1">' +
      '<a href="/CrowdFundHealthcare/" class="category_image"><img loading="lazy" src="/static/website/assets/images/healthcr.webp" alt="Health-card"></a>' +
      '<div class="card_content"><h5 class="title"><a href="/CrowdFundHealthcare/" data-category="healthcare">Health Care</a></h5>' +
      '<a href="/CrowdFundHealthcare/" class="donate_btn donate_now" data-category="healthcare" aria-label="donate button">Donate Now</a>' +
      "</div></div></div>"
    );
  }

  // Mobile static cards
  function mobileStaticCards() {
    return (
      '<a href="/CrowdFundEducation/Educationindex/" class="feature-container education cause-card">' +
      '<div class="image-container"><img src="/static/website/assets/images/crowd_fund_card.webp" alt="crowdfund-education" loading="lazy">' +
      '<div class="content_area"><h6>Help For Their Education</h6></div></div></a>' +
      '<a href="/orphanage/" class="feature-container orphanage cause-card">' +
      '<div class="image-container"><img src="/static/website/assets/images/orph_card.webp" alt="Orphanage-card" loading="lazy">' +
      '<div class="content_area"><h6>Donate For Orphanage</h6></div></div></a>' +
      '<a href="/CrowdFundHealthcare/" class="feature-container healthcare cause-card">' +
      '<div class="image-container"><img src="/static/website/assets/images/healthcr.webp" alt="Health-card" loading="lazy">' +
      '<div class="content_area"><h6>Health Care</h6></div></div></a>'
    );
  }

  // ── Escape helpers ──
  function escapeHTML(str) {
    if (!str) return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  function escapeAttr(str) {
    return escapeHTML(str);
  }

  // ── Render desktop causes ──
  function renderDesktop(data) {
    var container = document.getElementById("desktop-causes-container");
    if (!container) return;

    var html = "";

    // All causes
    data.causes.forEach(function (c) {
      html += desktopCard(c, "all causes category_card1");
    });
    // Food
    data.food_causes.forEach(function (c) {
      html += desktopCard(c, "food");
    });
    // Animals
    data.animal_causes.forEach(function (c) {
      html += desktopCard(c, "animals");
    });
    // Birthday
    data.birthday_causes.forEach(function (c) {
      html += desktopCard(c, "birthday");
    });
    // Environment/Plant
    data.plant_causes.forEach(function (c) {
      html += desktopCard(c, "environment");
    });

    // Static campaign cards
    html += staticEducationCard();
    html += staticOrphanageCard();
    html += staticHealthcareCard();

    container.innerHTML = html;

    // Apply default "all" filter so only "all" cards are visible on initial load
    container.querySelectorAll(".category_card").forEach(function (c) {
      c.style.display = c.classList.contains("all") ? "block" : "none";
    });

    // Bind desktop category filter
    bindDesktopFilter();
    bindDesktopSearch();
  }

  // ── Render mobile causes ──
  function renderMobile(data) {
    var causeContainer = document.getElementById("causeContainer");
    var extraContainer = document.getElementById("extraCauses");
    var sliderList = document.getElementById("featured-slider-list");

    // Main cause container (all causes)
    if (causeContainer) {
      var html = "";
      data.causes.forEach(function (c) {
        html += mobileCard(c, "all base-cause");
      });
      causeContainer.innerHTML = html;
    }

    // Extra causes container (filtered categories)
    if (extraContainer) {
      var extraHtml = "";
      data.food_causes.forEach(function (c) {
        extraHtml += mobileCard(c, "food");
      });
      data.animal_causes.forEach(function (c) {
        extraHtml += mobileCard(c, "animals");
      });
      data.birthday_causes.forEach(function (c) {
        extraHtml += mobileCard(c, "birthday");
      });
      data.plant_causes.forEach(function (c) {
        extraHtml += mobileCard(c, "nature");
      });
      extraHtml += mobileStaticCards();
      extraContainer.innerHTML = extraHtml;
    }

    // Featured slider
    if (sliderList) {
      var sliderHtml = "";
      data.featured_causes.forEach(function (c) {
        sliderHtml += splideSlide(c);
      });
      sliderList.innerHTML = sliderHtml;

      // Mount Splide after content is ready
      if (typeof Splide !== "undefined") {
        mountSplide();
      } else {
        // Wait for Splide to load
        var checkSplide = setInterval(function () {
          if (typeof Splide !== "undefined") {
            clearInterval(checkSplide);
            mountSplide();
          }
        }, 200);
      }
    }

    // Bind mobile category filter
    bindMobileFilter(data);
  }

  function mountSplide() {
    var el = document.getElementById("double-slider");
    if (!el || !el.querySelector(".splide__slide")) return;
    new Splide("#double-slider", {
      type: "loop",
      gap: "1.1rem",
      arrows: false,
      pagination: false,
      autoplay: true,
      interval: 3000,
      breakpoints: {
        768: { perPage: 4 },
        575: { perPage: 3 },
        425: {
          perPage: 2,
          padding: { left: "70px", right: "100px" },
          gap: "60px",
        },
        400: {
          perPage: 2,
          padding: { left: "50px", right: "40px" },
          gap: "1.1rem",
        },
        350: {
          perPage: 2,
          padding: { left: "30px", right: "30px" },
          gap: "10px",
        },
      },
    }).mount();
  }

  // ── Desktop filter ──
  function bindDesktopFilter() {
    var buttons = document.querySelectorAll(
      ".desk_icon_categories .category_list"
    );
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        buttons.forEach(function (b) {
          b.classList.remove("acitve_category");
        });
        btn.classList.add("acitve_category");

        var filter = btn.getAttribute("data-filter");
        var container = document.getElementById("desktop-causes-container");
        var cards = container.querySelectorAll(".category_card");

        // Hide AJAX containers
        var ajaxEdu = document.getElementById("education-causes-container");
        var ajaxHealth = document.getElementById("healthcare-causes-container");
        var ajaxOrphan = document.getElementById("orphanage-causes-container");
        var ajaxLivelihood = document.getElementById("livelihood-causes-container");
        if (ajaxEdu) ajaxEdu.style.display = "none";
        if (ajaxHealth) ajaxHealth.style.display = "none";
        if (ajaxOrphan) ajaxOrphan.style.display = "none";
        if (ajaxLivelihood) ajaxLivelihood.style.display = "none";

        // Packages are server-rendered into their own grid, not cause cards, so
        // every other tab has to put them away again.
        var pkgs = document.getElementById("packages-container");
        if (pkgs) pkgs.style.display = "none";

        if (filter === "packages") {
          cards.forEach(function (c) { c.style.display = "none"; });
          if (pkgs) pkgs.style.display = "grid";
          return;
        }

        if (filter === "education" || filter === "orphanage" || filter === "healthcare" || filter === "livelihood") {
          // Hide all cause cards
          cards.forEach(function (c) { c.style.display = "none"; });
          // Load via AJAX
          var url = window.urls[filter];
          if (url) {
            fetch(url, { headers: { "x-requested-with": "XMLHttpRequest" } })
              .then(function (r) { return r.json(); })
              .then(function (data) {
                var target = document.getElementById(filter + "-causes-container");
                if (target) {
                  target.innerHTML = data.html;
                  target.style.display = "flex";
                }
              });
          }
          return;
        }

        if (filter === "all") {
          cards.forEach(function (c) {
            c.style.display = c.classList.contains("all") ? "block" : "none";
          });
        } else {
          cards.forEach(function (c) {
            c.style.display = c.classList.contains(filter) ? "block" : "none";
          });
        }
      });
    });
  }

  // ── Desktop search ──
  function bindDesktopSearch() {
    var searchInput = document.getElementById("causes_search");
    if (!searchInput) return;
    searchInput.addEventListener("input", function () {
      var query = this.value.trim().toLowerCase();
      var cards = document.querySelectorAll(
        "#desktop-causes-container .category_card1"
      );
      cards.forEach(function (card) {
        var nameEl = card.querySelector(".card_content h5 a, .card_content h5");
        var name = nameEl ? nameEl.textContent.trim().toLowerCase() : "";
        card.style.display =
          query === "" || name.includes(query) ? "block" : "none";
      });
    });
  }

  // ── Mobile filter ──
  function bindMobileFilter(data) {
    var categoryItems = document.querySelectorAll(".all_categories_data");
    categoryItems.forEach(function (item) {
      item.addEventListener("click", function () {
        var filter = item.getAttribute("data-filter");

        // Hide all groups
        var causeContainer = document.getElementById("causeContainer");
        var extraCauses = document.getElementById("extraCauses");
        var eduMob = document.getElementById("education-causes-container-mobile");
        var healthMob = document.getElementById("healthcare-causes-container-mobile");
        var orphMob = document.getElementById("orphanage-causes-container-mobile");

        var livelihoodMob = document.getElementById("livelihood-causes-container-mobile");

        if (causeContainer) causeContainer.style.display = "none";
        if (extraCauses) extraCauses.style.display = "none";
        if (eduMob) eduMob.style.display = "none";
        if (healthMob) healthMob.style.display = "none";
        if (orphMob) orphMob.style.display = "none";
        if (livelihoodMob) livelihoodMob.style.display = "none";

        if (filter === "education" || filter === "healthcare" || filter === "orphanage" || filter === "livelihood") {
          var url = window.urls[filter];
          if (url) {
            fetch(url, { headers: { "x-requested-with": "XMLHttpRequest" } })
              .then(function (r) { return r.json(); })
              .then(function (resp) {
                var target = document.getElementById(filter + "-causes-container-mobile");
                if (target) {
                  target.innerHTML = resp.html;
                  target.style.display = "grid";
                }
              });
          }
        } else if (filter === "all") {
          if (causeContainer) causeContainer.style.display = "grid";
        } else {
          if (extraCauses) {
            extraCauses.style.display = "grid";
            var cards = extraCauses.querySelectorAll(".cause-card");
            cards.forEach(function (card) {
              card.style.display = card.classList.contains(filter) ? "block" : "none";
            });
          }
        }
      });
    });
  }

  // ── Toast popup ──
  function startToast(donations) {
    if (!donations || !donations.length) return;

    var toast = document.getElementById("toast");
    var content = document.getElementById("toast_content");
    if (!toast || !content) return;

    var idx = 0;

    function showNext() {
      var d = donations[idx % donations.length];
      var cat = d.category && d.category.toLowerCase() !== "none" ? d.category : "";
      content.textContent = cat
        ? d.name + " donated \u20B9" + d.amount + " for " + cat
        : d.name + " donated \u20B9" + d.amount;

      toast.classList.add("show");

      setTimeout(function () {
        toast.classList.remove("show-msg");
        toast.classList.add("hide");
        setTimeout(function () {
          toast.classList.remove("hide");
          idx++;
          showNext();
        }, 2000);
      }, 4000);
    }

    showNext();
  }

  // ── Main ──
  document.addEventListener("DOMContentLoaded", function () {
    fixCSRFInputs();

    // Fetch causes
    fetch("/api/homepage-causes/")
      .then(function (r) {
        return r.json();
      })
      .then(function (data) {
        causesData = data;
        if (window.DEVICE === "mobile") {
          renderMobile(data);
        } else {
          renderDesktop(data);
        }
      })
      .catch(function (err) {
        console.error("Failed to load causes:", err);
      });

    // Fetch donations for toast
    fetch("/api/recent-donations/")
      .then(function (r) {
        return r.json();
      })
      .then(function (data) {
        startToast(data.donations);
      })
      .catch(function (err) {
        console.error("Failed to load donations:", err);
      });
  });
})();
