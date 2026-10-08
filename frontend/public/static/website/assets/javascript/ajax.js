document.addEventListener('DOMContentLoaded', function () {
    const educationContainer = document.getElementById('education-causes-container');
    const healthcareContainer = document.getElementById('healthcare-causes-container');
    const orphanageContainer = document.getElementById('orphanage-causes-container');

    function hideAllContainers() {
        educationContainer.style.display = 'none';
        healthcareContainer.style.display = 'none';
        orphanageContainer.style.display = 'none';
    }

    function setActiveTab(categoryText) {
        document.querySelectorAll('.category_list').forEach(tab => {
            const tabText = tab.textContent.trim().toLowerCase();
            if (tabText === categoryText) {
                tab.classList.add('active_category');
            } else {
                tab.classList.remove('active_category');
            }
        });
    }

    function loadEducationCauses() {
        educationContainer.innerHTML = '';
        fetch(window.urls.education, {
          headers: { "X-Requested-With": "XMLHttpRequest" }
        })
        .then(response => response.json())
        .then(data => {
            if (data.html) {
                educationContainer.innerHTML = data.html;
                educationContainer.style.display = 'flex';
            }
        });
    }

    function loadHealthcareCauses() {
        healthcareContainer.innerHTML = '';
        fetch(window.urls.healthcare, {
          headers: { "X-Requested-With": "XMLHttpRequest" }
        })
        .then(response => response.json())
        .then(data => {
            if (data.html) {
                healthcareContainer.innerHTML = data.html;
                healthcareContainer.style.display = 'flex';
            }
        });
    }

    function loadOrphanageCauses() {
        orphanageContainer.innerHTML = '';
        fetch(window.urls.orphanage, {
          headers: { "X-Requested-With": "XMLHttpRequest" }
        })
        .then(response => response.json())
        .then(data => {
            if (data.html) {
                orphanageContainer.innerHTML = data.html;
                orphanageContainer.style.display = 'flex';
            }
        });
    }

    function showStaticCards(categoryText) {
        document.querySelectorAll('.category_card').forEach(card => {
            if (categoryText === 'all') {
                if (card.classList.contains('causes')) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            } else {
                if (card.classList.contains(categoryText)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            }
        });
    }

    function handleCategorySelection(categoryText) {
        setActiveTab(categoryText);
        hideAllContainers();

        if (categoryText === 'education') {
            loadEducationCauses();
        } else if (categoryText === 'healthcare') {
            loadHealthcareCauses();
        } else if (categoryText === 'orphanage') {
            loadOrphanageCauses();
        } else {
            showStaticCards(categoryText);
        }
    }

    // When clicking the category tabs
    document.querySelectorAll('.category_list').forEach(tab => {
        tab.addEventListener('click', function () {
            const categoryText = this.textContent.trim().toLowerCase();
            handleCategorySelection(categoryText);
        });
    });

    // When clicking Donate Now buttons inside static cards
    document.querySelectorAll('.donate_now').forEach(button => {
        button.addEventListener('click', function () {
            const category = this.getAttribute('data-category');
            handleCategorySelection(category);
        });
    });
});


    document.addEventListener("DOMContentLoaded", function () {
        const form = document.getElementById("contactForm");
        const submitBtn = document.getElementById("submitBtn");

        form.addEventListener("submit", function (e) {
            submitBtn.disabled = true;
            submitBtn.textContent = "Submitting...";

            // Optional: handle reCAPTCHA async delay (if form doesn’t reload)
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = "Submit Now";
            }, 5000);
        });
    });