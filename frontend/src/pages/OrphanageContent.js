// Orphanage page raw template
export const orphanageHtml = `
<header>
<!-- Main Nav -->
<nav class="navbar_cstm desk_version">
    <div class="first_nav">
      <div class="logo_cstm">
        <a href="/packages_form.html"><img src="/static/website/assets/images/logo/logo.webp" alt="Vrishasena_logo" /></a>
      </div>

      <div class="mobile_nav">
        <div class="dark_logo">
          <a href="/packages_form.html"><img src="/static/website/assets/images/logo/logo.webp" alt="logo"></a>
        </div>
        <ul class="nav_links">
          <li class="nav_li"><a href="/packages_form.html">Home</a></li>
          <li class="nav_li"><a href="/about">About Us</a></li>
          <li class="causes_list nav_li"><p class="causes_list_special"><a href="/causes">Causes</a> <span class="causes_arrow">></span></p></li>
            <div class="mega_menu">
                <ul class="mega_menu_links">
                    
                    <li>
                        <a href="/food" class="menu-title">Food</a>
                        <ul>
                            
                            <li>
                                <a class="special_links" href="/causes-detail/water_bottle">Fight Thirst. Share Water</a>
                            </li>
                            
                            <li>
                                <a class="special_links" href="/homeless">Feed a Homeless Person</a>
                            </li>
                            
                            <li>
                                <a class="special_links" href="/causes-detail/chicken_briyani">Chicken Biryani</a>
                            </li>
                            
                            <li>
                                <a class="special_links" href="/causes-detail/stray_dog">Feed a Stray Dog</a>
                            </li>
                            
                            <li>
                                <a class="special_links" href="/causes-detail/egg_briyani">Egg Biryani</a>
                            </li>
                            
                            <li>
                                <a class="special_links" href="/causes-detail/veg_briyani">Veg Biryani</a>
                            </li>
                            
                            <li>
                                <a class="special_links" href="/causes-detail/thaali">Thaali Meals</a>
                            </li>
                            
                            <li>
                                <a class="special_links" href="/causes-detail/cow_feeding">Cow Feeding</a>
                            </li>
                            
                            
                            
                            
                        </ul>
                    </li>
                    
                    <li>
                        <a href="index.html#" class="menu-title">Child</a>
                        <ul>
                            
                            <li>
                                <a class="special_links" href="/egg_milk">Egg &amp; Milk</a>
                            </li>
                            
                            <li>
                                <a class="special_links" href="/causes-detail/hygiene_kit">Hygiene Kit</a>
                            </li>
                            
                            <li>
                                <a class="special_links" href="/causes-detail/childcare_kit">Child Care Kit</a>
                            </li>
                            
                            <li>
                                <a class="special_links" href="/causes-detail/child_gift">Gift for Children</a>
                            </li>
                            
                            <li>
                                <a class="special_links" href="/causes-detail/slipper">A Pair of Slippers</a>
                            </li>
                            
                            <li>
                                <a class="special_links" href="/causes-detail/mother_kit">Mother Care Kit</a>
                            </li>
                            
                            <li>
                                <a class="special_links" href="/causes-detail/bicycle">Bicycle</a>
                            </li>
                            
                            <li>
                                <a class="special_links" href="/causes-detail/banana_milk">Banana &amp; Milk</a>
                            </li>
                            
                            <li>
                                <a class="special_links" href="/causes-detail/mosquito_net">Mosquito Net</a>
                            </li>
                            
                            
                            
                            
                        </ul>
                    </li>
                    
                    <li>
                        <a href="index.html#" class="menu-title">Education</a>
                        <ul>
                            
                            <li>
                                <a class="special_links" href="/causes-detail/school_bag">School Bag</a>
                            </li>
                            
                            <li>
                                <a class="special_links" href="/causes-detail/child_education">Educate a Child</a>
                            </li>
                            
                            
                            
                            
                            <li>
                                <a class="special_links" href="/CrowdFundEducation/Educationindex">Stop Child Labour</a>
                            </li>
                            
                        </ul>
                    </li>
                    
                    <li>
                        <a href="index.html#" class="menu-title">Special Events</a>
                        <ul>
                            
                            <li>
                                <a class="special_links" href="/causes-detail/birthday_cake">Birthday Cake</a>
                            </li>
                            
                            <li>
                                <a class="special_links" href="/causes-detail/virtual_birthday_cake">Virtual Cake Cutting Celebration</a>
                            </li>
                            
                            <li>
                                <a class="special_links" href="/causes-detail/water_bowl">Water Bowl For Birds</a>
                            </li>
                            
                            <li>
                                <a class="special_links" href="/causes-detail/bird_house">Bird House</a>
                            </li>
                            
                            <li>
                                <a class="special_links" href="/causes-detail/transgender_kit">Transgender Kit</a>
                            </li>
                            
                            
                            

<!--                            <li>-->
<!--                                <a class="special_links" href="/iftar_box/">Donate For Ramadan</a>-->
<!--                            </li>-->
                            <li>
                                <a class="special_links" href="/celebration">Birthday Celebration</a>
                            </li>
<!--                            <li>-->
<!--                                <a class="special_links" href="/holi/">Donate for Holi Celebration</a>-->
<!--                            </li>-->
<!--                            <li>-->
<!--                                <a class="special_links" href="/medavakkam_lake/">Vadakkupattu Lake</a>-->
<!--                            </li>-->
                            <li>
                                <a class="special_links" href="/CrowdFundHealthcare">Save Lives Through Kindness</a>
                            </li>

                            <li>
                                <a class="special_links" href="/livelihood" aria-label="healthcare">Empower Dreams Through Livelihood</a>
                            </li>
<!--                            <li>-->
<!--                                <a class="special_links" href="/toilet">Girl Friendly Toilet</a>-->
<!--                            </li>-->
                            
                            
                        </ul>
                    </li>
                    
                    <li>
                        <a href="index.html#" class="menu-title">Others</a>
                        <ul>
                            
                            <li>
                                <a class="special_links" href="/causes-detail/Nepal">Nepal Kit</a>
                            </li>
                            
                            <li>
                                <a class="special_links" href="/causes-detail/bihar_kit">Bihar Kit</a>
                            </li>
                            
                            <li>
                                <a class="special_links" href="/causes-detail/Induction_Stove">Nepal Flood Relief Induction Stove</a>
                            </li>
                            
                            <li>
                                <a class="special_links" href="/causes-detail/nepal_house">Nepal Flood Relief House</a>
                            </li>
                            
                            <li>
                                <a class="special_links" href="/causes-detail/grocery_kit">Grocery Kit</a>
                            </li>
                            
                            <li>
                                <a class="special_links" href="/causes-detail/blanket">Blanket</a>
                            </li>
                            
                            <li>
                                <a class="special_links" href="/causes-detail/plant_tree">Plant a Tree</a>
                            </li>
                            
                            <li>
                                <a class="special_links" href="/causes-detail/wheel_chair">Wheelchair</a>
                            </li>
                            
                            <li>
                                <a class="special_links" href="/causes-detail/napkin">Give a Napkin</a>
                            </li>
                            
                            <li>
                                <a class="special_links" href="/causes-detail/tailoring_machine">Tailoring Machine</a>
                            </li>
                            
                            <li>
                                <a class="special_links" href="/causes-detail/hearing_aid">Hearing Aid</a>
                            </li>
                            
                            <li>
                                <a class="special_links" href="/causes-detail/dog_collar">Dog Collar</a>
                            </li>
                            
                            
                            
                            
                        </ul>
                    </li>
                    
                    <li>
                        <a href="index.html#" class="menu-title">Support An Orphanage</a>
                        <ul>
                            
                            
                            <li>
                                <a class="special_links" href="/orphanage">Our Orphanage</a>
                            </li>
                            
                            
                            
                        </ul>
                    </li>
                    
                </ul>
            </div>
          <li class="nav_li"><a href="/new-blog">Blog</a></li>
          <li class="nav_li"><a href="/blog">CSR</a></li>
          <li class="nav_li"><a href="/gallery">Gallery</a></li>
          <li class="nav_li"><a href="/contact">Contact</a></li>
        </ul>

        <ul class="social_icons">
          <li>
            <a href="https://www.facebook.com/people/Vrishasena-Foundation-NGO/100077294806563/"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                class="bi bi-facebook" viewBox="0 0 16 16">
                <path
                  d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
              </svg></a>
          </li>

          <li>
            <a href="https://twitter.com/vrishasenango"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                class="bi bi-twitter" viewBox="0 0 16 16">
                <path
                  d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334q.002-.211-.006-.422A6.7 6.7 0 0 0 16 3.542a6.7 6.7 0 0 1-1.889.518 3.3 3.3 0 0 0 1.447-1.817 6.5 6.5 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.32 9.32 0 0 1-6.767-3.429 3.29 3.29 0 0 0 1.018 4.382A3.3 3.3 0 0 1 .64 6.575v.045a3.29 3.29 0 0 0 2.632 3.218 3.2 3.2 0 0 1-.865.115 3 3 0 0 1-.614-.057 3.28 3.28 0 0 0 3.067 2.277A6.6 6.6 0 0 1 .78 13.58a6 6 0 0 1-.78-.045A9.34 9.34 0 0 0 5.026 15" />
              </svg></a>
          </li>


          <li>
            <a href="index.html#"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                class="bi bi-linkedin" viewBox="0 0 16 16">
                <path
                  d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
              </svg></a>
          </li>


          <li>
            <a href="https://www.instagram.com/vrishasenafoundation/"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                class="bi bi-instagram" viewBox="0 0 16 16">
                <path
                  d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
              </svg></a>
          </li>

        </ul>
      </div>
    </div>

 <div class="extra-nav">


      <div class="menubar">
        <span class="top_menu_line menu_line"></span>
        <span class="middle_menu_line menu_line"></span>
        <span class="bottom_menu_line menu_line"></span>

      </div>

    </div>

    <!-- All  Search div-->

  </nav>

  <div class="mob_nav main-nav">
  <nav class="mob_navbar_cstm">
      <div class="logo_cstm">
        <a href="/packages_form.html" aria-label="logo"><img class="logo_img" src="/static/website/assets/images/logo/logo.webp" alt="Vrishasena_logo" /></a>
      </div>
      <div class="menubar">
        <i class="ri-menu-4-line menu_icon"></i>
         <i class="ri-close-large-line close-menu"></i>
      </div>

      <div class="mobile_nav_version">
        <div class="dark_logo">
          <a href="/packages_form.html" aria-label="logo"><img class="mob-logo" src="/static/website/assets/images/logo/logo.webp" alt="logo"></a>
         
        </div>
        <ul class="nav_links">
          <li class="only-mob">
            <span class="sub_text">ABOUT VRISHASENA</span>
            <ul class="sub_links">
              <li class="sub_link"><a href="/our_mission"><i class="ri-heart-line sidenav_icon ri_heart"></i> Our Mission</a></li>
              <li class="sub_link"><a href="/our-team"><i class="ri-team-line sidenav_icon ri_team"></i> Our Team</a></li>
              <li class="sub_link"><a href="/volunteer/volunteer_logout"><i class="ri-hand-heart-line sidenav_icon ri_hand"></i> Volunteer</a></li>
              <li class="sub_link"><a href="/new-blog"><i class="ri-article-line sidenav_icon ri_mail"></i> Blog</a></li>
              <li class="sub_link"><a href="/blog"><i class="ri-building-line sidenav_icon ri_team"></i> CSR Activities</a></li>
            </ul>
          </li>

            <li class="only-mob">
           <span class="sub_text">PROGRAMS</span>
            <ul class="sub_links">
              <li class="sub_link"><a href="/food"><i class="ri-bowl-line sidenav_icon ri_hand"></i> Fight Hunger Together </a></li>
              <li class="sub_link"><a href="/CrowdFundEducation/Educationindex"><i class="ri-book-open-line sidenav_icon ri_team"></i> Education</a></li>
              <li class="sub_link"><a href="/celebration"><i class="ri-cake-2-line sidenav_icon ri_heart"></i> Birthday Celebration</a></li>
              <li class="sub_link"><a href="/CrowdFundHealthcare"><i class="ri-hospital-line sidenav_icon ri_hospital"></i> Healthcare</a></li>
              <li class="sub_link"><a href="/orphanage"><i class="ri-team-line sidenav_icon ri_hand"></i> Orphanage</a></li>
              <li class="sub_link"><a href="/livelihood"><i class="ri-seedling-line sidenav_icon ri_hand"></i> Livelihood</a></li>
              <li class="sub_link"><a href="/environment"><i class="ri-earth-line sidenav_icon ri_heart"></i> Environment Welfare</a></li>
            </ul>
          </li>

                      <li class="only-mob">
            <span class="sub_text">CONTACT</span>
            <ul class="sub_links">
              <li class="sub_link"><a href="https://wa.me/+919951672673"><i class="ri-whatsapp-line sidenav_icon ri_hospital"></i> WhatsApp</a></li>
              <li class="sub_link"><a href="tel:+919951672673"><i class="ri-phone-line sidenav_icon ri_team"></i> Call Us</a></li>
              <li class="sub_link"><a href="mailto:vrishasenafoundation@gmail.com"><i class="ri-mail-line sidenav_icon ri_mail"></i> Email</a></li>
            </ul>
          </li>


<li class="only-mob" style="margin-bottom: 50px;">
  <span class="sub_text">Profile</span>
  <ul class="sub_links">
    
      <li class="login_btn">
        <a href="/profile"><i class="ri-login-box-line"></i> Login</a>
      </li>
    
  </ul>
</li>




        </ul>
      </div>
  </nav>



          <nav class="bottom-nav">
            <div class="nav-container">
    <a href="/packages_form.html" class="nav-item " data-nav="home">
        <i class="ri-home-5-fill"></i>
        <span>Home</span>
    </a>

    <a href="/causes" class="nav-item " data-nav="explore">
        <i class="ri-gift-fill"></i>
        <span>Campaigns</span>
    </a>

    <div class="heart_container">
        <a href="/packages_form.html" class="nav-item heart-btn " data-nav="volunteer">
            <i class="ri-heart-3-fill heart_icon_bottom"></i>
        </a>
    </div>

    <a href="/volunteer/volunteer_logout" class="nav-item " data-nav="donate">
        <i class="ri-hand-heart-fill"></i>
        <span>Volunteer</span>
    </a>

    <a href="/profile" class="nav-item " data-nav="profile">
        <i class="ri-user-3-fill"></i>
        <span>Profile</span>
    </a>
</div>


        </nav>
</div>
</header>











<style>
  @media (max-width: 768px) {
  .orph-page {
    display: none !important;
  }
}

.full-container {
  display: none;
}

@media (max-width: 768px) {
  .full-container {
    display: block;
  }
}
</style>

<style>
  /* ============================================================
     1. GLOBAL THEME & VARIABLES
     ============================================================ */
  .orph-page {
    --orph-red: #009dff;
    --orph-red-dark: #0081d6;
    --orph-warm: #fffaf3;
    --orph-warm-2: #fff4e3;
    --orph-text: #1A1A1A;
    --orph-muted: #6B6B6B;
    --orph-line: #f0e6d3;
    --orph-gold: #f59e0b;

    background: var(--orph-warm);
    color: var(--orph-text);
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    padding-bottom: 120px;
  }

  .orph-page * { box-sizing: border-box; }
  .orph-page a { text-decoration: none; color: inherit; }
  .orph-page h1, .orph-page h2, .orph-page h3, .orph-page h4 { margin: 0; color: var(--orph-text); }
  .orph-page p { margin: 0; }
  .orph-page button { font-family: inherit; }

  /* ============================================================
     2. ANIMATIONS
     ============================================================ */
  @keyframes orph-heart-pulse {
    0%,100% { transform: scale(1); }
    25%     { transform: scale(1.18); }
    50%     { transform: scale(0.95); }
    75%     { transform: scale(1.1); }
  }
  @keyframes orph-float {
    0%,100% { transform: translateY(0); }
    50%     { transform: translateY(-6px); }
  }
  @keyframes orph-fade-up {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes orph-shine {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes orph-bob {
    0%,100% { transform: translateY(0) rotate(0deg); }
    50%     { transform: translateY(-4px) rotate(3deg); }
  }
  @keyframes orph-ripple {
    0%   { box-shadow: 0 0 0 0 rgba(36, 147, 238, 0.45); }
    100% { box-shadow: 0 0 0 14px rgba(238,46,36,0); }
  }

  .orph-reveal {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity .6s ease, transform .6s ease;
  }
  .orph-reveal.in {
    opacity: 1;
    transform: translateY(0);
  }

  /* ============================================================
     3. SECTION: HERO (Blue Background & Search)
     ============================================================ */
  .orph-hero {
    background:
      radial-gradient(circle at 85% 15%, rgba(255,255,255,0.18) 0%, transparent 45%),
      radial-gradient(circle at 10% 90%, rgba(0,0,0,0.10) 0%, transparent 45%),
      linear-gradient(135deg, #009dff 0%, #0081d6 100%);
    color: #fff;
    padding: 18px 0 32px;
    position: relative;
    overflow: hidden;
  }
  .orph-hero::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image: radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1.5px);
    background-size: 22px 22px;
    opacity: 0.45;
    pointer-events: none;
  }

  .orph-hero .float-heart {
    position: absolute;
    color: rgba(255,255,255,0.18);
    font-size: 18px;
    pointer-events: none;
    animation: orph-float 4s ease-in-out infinite;
  }
  .orph-hero .float-heart.h1 { top: 8%;   right: 8%;  animation-delay: 0s; font-size: 22px; }
  .orph-hero .float-heart.h2 { display: none; }
  .orph-hero .float-heart.h3 { display: none; }

  .orph-hero-inner {
    position: relative;
    z-index: 2;
    display: grid;
    grid-template-columns: 1fr;
    gap: 14px;
    align-items: center;
  }
  .orph-hero-text { position: relative; }

  .orph-breadcrumb {
    display: none;
    font-size: 12px;
    margin-bottom: 10px;
    color: rgba(255,255,255,0.85);
    align-items: center;
    gap: 6px;
  }
  .orph-breadcrumb a { color: #fff; }
  .orph-breadcrumb a:hover { text-decoration: underline; }

  .orph-hero-tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(255,255,255,0.20);
    color: #fff;
    padding: 5px 11px;
    border-radius: 999px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: .6px;
    text-transform: uppercase;
    margin-bottom: 10px;
    border: 1px solid rgba(255,255,255,0.25);
  }
  .orph-hero-tag i { animation: orph-heart-pulse 1.6s ease-in-out infinite; color: #ffd1cf; font-size: 11px; }

  .orph-hero h1 {
    color: #fff;
    font-size: 22px;
    font-weight: 800;
    margin-bottom: 8px;
    letter-spacing: -.3px;
    line-height: 1.25;
  }
  .orph-hero h1 .accent {
    background: linear-gradient(180deg, transparent 70%, rgba(255,210,80,0.55) 70%);
    padding: 0 2px;
  }
  .orph-hero h1 .em { color: #fff; }

  .orph-hero-sub {
    color: rgba(255,255,255,0.92);
    font-size: 12.5px;
    line-height: 1.5;
    margin-bottom: 14px;
    max-width: 520px;
  }

  .orph-social-proof { display: none; }
  .orph-avatars { display: flex; }
  .orph-avatars span {
    width: 26px; height: 26px;
    border-radius: 50%;
    border: 2px solid #fff;
    margin-left: -8px;
    background: #ffd1cf;
    color: var(--orph-red);
    display: flex; align-items: center; justify-content: center;
    font-size: 11px;
    font-weight: 800;
  }
  .orph-avatars span:first-child { margin-left: 0; }
  .orph-avatars span:nth-child(1) { background: #ffe1cd; }
  .orph-avatars span:nth-child(2) { background: #ffd1cf; }
  .orph-avatars span:nth-child(3) { background: #ffd86b; color: #6b4500; }
  .orph-social-proof small { font-size: 11px; color: #fff; font-weight: 600; line-height: 1.2; }
  .orph-social-proof small b { font-size: 12px; }
  .orph-social-proof i { color: #ffd86b; font-size: 11px; }

  .orph-search {
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 10px 24px rgba(0,0,0,0.18);
    display: flex;
    align-items: center;
    padding: 5px 5px 5px 12px;
    gap: 6px;
  }
  .orph-search i { color: var(--orph-red); font-size: 18px; flex-shrink: 0; }
  .orph-search input {
    flex: 1; border: none; outline: none; background: transparent; color: #1A1A1A; font-size: 13.5px; padding: 11px 2px; min-width: 0;
  }
  .orph-search input::placeholder { color: #aaa; }
  .orph-search-btn {
    background: var(--orph-red); color: #fff; border: none; border-radius: 9px; padding: 10px 14px; font-weight: 700; font-size: 13px; cursor: pointer; transition: background .2s, transform .2s; flex-shrink: 0; display: inline-flex; align-items: center; gap: 4px;
  }
  .orph-search-btn:hover { background: var(--orph-red-dark); }
  .orph-search-btn .label { display: none; }
  .orph-search-btn i { font-size: 16px; }

  .orph-quick {
    display: flex; gap: 8px; margin-top: 22px; overflow-x: auto; -webkit-overflow-scrolling: touch; scrollbar-width: none; padding: 2px 0;
  }
  .orph-quick::-webkit-scrollbar { display: none; }
  .orph-quick .pill {
    flex: 0 0 auto; display: inline-flex; align-items: center; gap: 6px; background: rgba(255,255,255,0.18); border: 1px solid rgba(255,255,255,0.32); color: #fff; padding: 7px 12px; border-radius: 999px; font-size: 12px; font-weight: 600; text-decoration: none; transition: background .2s, transform .2s; cursor: pointer; line-height: 1;
  }
  .orph-quick .pill:hover, .orph-quick .pill:active { background: #fff; color: var(--orph-red); }
  .orph-quick .pill i { font-size: 14px; }
  .orph-quick .pill .amt { display: none; background: rgba(255,255,255,0.25); padding: 2px 7px; border-radius: 999px; font-size: 11px; font-weight: 800; }
  .orph-quick .pill:hover .amt { background: var(--orph-red); color: #fff; }

  .orph-microtrust {
    display: flex; gap: 14px; margin-top: 12px; color: rgba(255,255,255,0.92); font-size: 11px; font-weight: 600; overflow-x: auto; scrollbar-width: none; padding: 2px 0;
  }
  .orph-microtrust::-webkit-scrollbar { display: none; }
  .orph-microtrust span { display: inline-flex; align-items: center; gap: 5px; flex: 0 0 auto; white-space: nowrap; }
  .orph-microtrust i { color: #4ade80; font-size: 13px; }

 /* Update Existing or Add New */
.orph-hero-illus {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  perspective: 1000px; /* For 3D feel */
}

/* The "Box Design" container */
.orph-photo-box {
  position: relative;
  width: 440px;
  height: 440px;
  z-index: 5;
}

/* The yellow/orange accent block behind the photo */
.orph-photo-accent {
  position: absolute;
  top: 20px;
  left: 20px;
  right: -20px;
  bottom: -20px;
  background: #ffd86b;
  border-radius: 20px;
  z-index: 1;
}

/* The Slider Area */
.orph-slider {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  overflow: hidden;
  border: 6px solid #fff;
  box-shadow: 0 20px 40px rgba(0,0,0,0.25);
  z-index: 2;
  background: #eee;
}

/* Individual Slides */
.orph-slide {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transform: scale(1.1) translateX(50px); /* Start state for animation */
  transition: opacity 0.8s ease-in-out, transform 1s ease-out;
}

.orph-slide.active {
  opacity: 1;
  transform: scale(1) translateX(0); /* End state */
}

/* Floating Badge inside the box */
.orph-photo-badge {
  position: absolute;
  bottom: 20px;
  right: -10px;
  background: #fff;
  padding: 8px 16px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.15);
  z-index: 3;
  animation: orph-float 3s ease-in-out infinite;
}

.orph-photo-badge i { color: #009dff; font-size: 18px; }
.orph-photo-badge span { color: #333; font-weight: 700; font-size: 12px; }

/* Responsive adjustments */
@media (max-width: 768px) {
  .orph-hero-illus { display: none !important; }
}

  /* ============================================================
     4. SECTION: STATS & TRUST BADGES
     ============================================================ */
  .orph-stats { margin-top: -18px; position: relative; z-index: 5; }
  .orph-stats-card {
    background: #fff; border-radius: 16px; padding: 14px 8px; box-shadow: 0 8px 22px rgba(0,0,0,0.10); display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; border: 1px solid #fff1de;
  }
  .orph-stat { text-align: center; padding: 4px; position: relative; }
  .orph-stat:not(:last-child)::after {
    content: ""; position: absolute; right: 0; top: 12%; bottom: 12%; width: 1px; background: var(--orph-line);
  }
  .orph-stat-icon {
    width: 38px; height: 38px; margin: 0 auto 6px; border-radius: 50%; background: #ffece9; display: flex; align-items: center; justify-content: center; color: var(--orph-red); font-size: 18px; animation: orph-bob 3s ease-in-out infinite;
  }
  .orph-stat-num { font-size: 18px; font-weight: 800; color: var(--orph-text); line-height: 1; }
  .orph-stat-num small { font-size: 11px; color: var(--orph-red); font-weight: 700; }
  .orph-stat-label { font-size: 10px; color: var(--orph-muted); margin-top: 4px; line-height: 1.2; text-transform: uppercase; letter-spacing: .3px; }

  .orph-trust {
    display: flex; gap: 5px; margin: 24px 0 6px; overflow-x: auto; padding: 4px 0 6px; scrollbar-width: none; justify-content: center;
  }
  .orph-trust::-webkit-scrollbar { display: none; }
  .orph-trust-item {
    flex: 0 0 auto; display: inline-flex; align-items: center; gap: 6px; background: #fff; border: 1px solid var(--orph-line); border-radius: 999px; padding: 8px 13px;
    font-size: 12px; font-weight: 600; color: #444; box-shadow: 0 2px 6px rgba(0,0,0,0.03);
  }
  .orph-trust-item i { color: #16a34a; font-size: 14px; }
  .orph-trust-item.gold i { color: var(--orph-gold); }
  .orph-trust-item.red  i { color: var(--orph-red);  }


@media (max-width: 768px) {
  .orph-trust-item {
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: #fff;
    border: 1px solid var(--orph-line);
    border-radius: 999px;
    padding: 5px 7px !important;
    font-size: 9px !important;
    font-weight: 600;
    color: #444;
    box-shadow: 0 2px 6px rgba(0,0,0,0.03);
  }
}



  /* ============================================================
     5. SECTION: FILTER CHIPS
     ============================================================ */
  .orph-filters-wrap { margin-top: 18px; position: relative; z-index: 4; }
  .orph-filters {
    display: flex; gap: 10px; overflow-x: auto; scrollbar-width: none; padding: 4px 0 6px; justify-content: center;
  }
  .orph-filters::-webkit-scrollbar { display: none; }

  .orph-chip {
    flex: 0 0 auto; display: inline-flex; align-items: center; gap: 5px; padding: 8px 13px; border-radius: 999px; background: #fff; color: #333; font-size: 14px; font-weight: 600; cursor: pointer; border: 1.5px solid var(--orph-line); transition: all .2s; white-space: nowrap; user-select: none; line-height: 1; box-shadow: 0 1px 3px rgba(0,0,0,0.03);
  }
  .orph-chip img { width: 18px; height: 18px; object-fit: contain; }
  .orph-chip:hover { background: #fff5f4; color: var(--orph-red); border-color: #ffd1cf; }
  .orph-chip.active {
    background: var(--orph-red); color: #fff; border-color: var(--orph-red); box-shadow: 0 4px 12px rgba(33, 120, 250, 0.3); transform: translateY(-1px);
  }
  .orph-chip.active img { filter: brightness(0) invert(1); }



@media (max-width: 768px) {
  .orph-chip {
    flex: 0 0 auto; display: inline-flex; align-items: center; gap: 5px; padding: 5px 8px; border-radius: 999px; background: #fff; color: #333; font-size: 11px; font-weight: 600; cursor: pointer; border: 1.5px solid var(--orph-line); transition: all .2s; white-space: nowrap; user-select: none; line-height: 1; box-shadow: 0 1px 3px rgba(0,0,0,0.03);
  }
}



  /* ============================================================
     6. SECTION: LISTINGS GRID & CARDS
     ============================================================ */
  .orph-section-head { display: flex; justify-content: space-between; align-items: flex-end; margin: 22px 0 14px; }
  .orph-section-head h2 { font-size: 20px; font-weight: 700; display: flex; align-items: center; gap: 8px; }
  .orph-section-head h2 .h-icon { color: var(--orph-red); animation: orph-heart-pulse 1.8s ease-in-out infinite; }
  .orph-section-head .sub { color: var(--orph-muted); font-size: 12px; }

  .orph-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }

  .orph-card {
    position: relative; background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 14px rgba(0,0,0,0.06); transition: transform .25s ease, box-shadow .25s ease; display: flex; flex-direction: column; border: 1px solid #fff1de;
  }
  .orph-card:hover, .orph-card:active { transform: translateY(-3px); box-shadow: 0 14px 28px rgba(0,0,0,0.12); }
  .orph-card-link { position: absolute; inset: 0; z-index: 1; }

  .orph-card-img { position: relative; width: 100%; height: 0; padding-bottom: 70%; overflow: hidden; background: #f0e6d3; }
  .orph-card-img img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: transform .5s ease; }
  .orph-card:hover .orph-card-img img { transform: scale(1.06); }
  .orph-card-img::after {
    content: ""; position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 50%); pointer-events: none;
  }

  .orph-tag {
    position: absolute; top: 8px; left: 8px; background: var(--orph-red); color: #fff; font-size: 9px; font-weight: 700; letter-spacing: .3px; text-transform: uppercase; padding: 4px 8px; border-radius: 4px; z-index: 2; line-height: 1.2;
  }
  .orph-members {
    position: absolute; bottom: 8px; left: 8px; color: #fff; font-size: 11px; font-weight: 700; z-index: 2; display: inline-flex; align-items: center; gap: 5px; line-height: 1.2; text-shadow: 0 1px 3px rgba(0,0,0,0.5);
  }
  .orph-members i { font-size: 13px; }

  .orph-wishlist {
    position: absolute; top: 6px; right: 6px; background: #fff; width: 30px; height: 30px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; color: #999; font-size: 13px; box-shadow: 0 2px 8px rgba(0,0,0,0.18); z-index: 3; cursor: pointer; transition: color .2s, transform .2s; border: none; padding: 0;
  }
  .orph-wishlist:hover { color: var(--orph-red); }
  .orph-wishlist.active { color: var(--orph-red); animation: orph-heart-pulse .7s ease; }

  .orph-card-body { padding: 10px 12px 12px; flex: 1; display: flex; flex-direction: column; position: relative; z-index: 2; pointer-events: none; }
  .orph-card-body > * { pointer-events: none; }

  .orph-card-title { font-size: 13px; font-weight: 700; margin-bottom: 4px; line-height: 1.3; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .orph-card-loc { color: var(--orph-muted); font-size: 11px; display: flex; align-items: center; gap: 4px; margin-bottom: 8px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .orph-card-loc i { color: var(--orph-red); font-size: 12px; flex-shrink: 0; }

  .orph-rating-row { display: flex; align-items: center; gap: 6px; margin-bottom: 8px; }
  .orph-rating { display: inline-flex; align-items: center; gap: 3px; background: #16a34a; color: #fff; padding: 2px 6px; border-radius: 4px; font-size: 11px; font-weight: 700; line-height: 1.2; }
  .orph-rating-text { color: var(--orph-muted); font-size: 10px; display: inline-flex; align-items: center; gap: 3px; }

  .orph-card-foot { display: flex; justify-content: space-between; align-items: center; margin-top: auto; padding-top: 8px; border-top: 1px dashed var(--orph-line); gap: 8px; }
  .orph-impact { font-size: 10px; color: var(--orph-muted); line-height: 1.2; display: flex; align-items: center; gap: 4px; }
  .orph-impact i { color: var(--orph-red); animation: orph-heart-pulse 1.6s ease-in-out infinite; }

  .orph-donate-btn {
    background: var(--orph-red); color: #fff; border: none; border-radius: 8px; padding: 7px 12px; font-size: 12px; font-weight: 700; transition: background .2s, transform .2s; display: inline-flex; align-items: center; gap: 4px; line-height: 1.2; white-space: nowrap; background-image: linear-gradient(110deg, #009dff 30%, #0081d6 50%, #009dff 70%); background-size: 200% auto; animation: orph-shine 3s linear infinite;
  }

  .orph-empty { background: #fff; border-radius: 14px; padding: 40px 20px; text-align: center; color: var(--orph-muted); grid-column: 1 / -1; border: 1px solid var(--orph-line); }
  .orph-empty i { font-size: 40px; color: var(--orph-red); margin-bottom: 8px; display: block; animation: orph-heart-pulse 1.8s ease-in-out infinite; }


  
  /* ============================================================
     7. SECTION: "WHY DONATE" CONTENT
     ============================================================ */
  .orph-why { margin: 26px 0 6px; background: linear-gradient(135deg, #fff4e3 0%, #fff 100%); border: 1px solid #ffe0c2; border-radius: 16px; padding: 16px 14px; }
  .orph-why h3 { font-size: 15px; font-weight: 800; margin-bottom: 12px; display: flex; align-items: center; gap: 6px; }
  .orph-why h3 i { color: var(--orph-red); animation: orph-heart-pulse 1.6s ease-in-out infinite; }
  .orph-why-list { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
  .orph-why-item { text-align: center; background: #fff; border-radius: 12px; padding: 10px 6px; border: 1px solid #fff1de; }
  .orph-why-item .icon { width: 36px; height: 36px; margin: 0 auto 6px; border-radius: 50%; background: #fff1de; display: flex; align-items: center; justify-content: center; color: var(--orph-red); font-size: 16px; animation: orph-bob 3.5s ease-in-out infinite; }
  .orph-why-item p { font-size: 10px; font-weight: 600; color: #333; line-height: 1.3; }

  /* ============================================================
     8. SECTION: FLOATING STICKY CTA (Mobile)
     ============================================================ */
  .orph-sticky-cta {
    position: fixed; left: 12px; right: 12px; bottom: 78px; z-index: 999; background: linear-gradient(135deg, #009dff 0%, #0081d6 100%); color: #fff; border-radius: 14px; padding: 12px 16px; display: flex; align-items: center; justify-content: space-between; gap: 10px; box-shadow: 0 10px 28px rgba(238,46,36,0.35); animation: orph-fade-up .5s ease both; text-decoration: none;
  }
  .orph-sticky-cta .icon-circle { width: 36px; height: 36px; border-radius: 50%; background: rgba(255,255,255,0.18); display: flex; align-items: center; justify-content: center; flex-shrink: 0; animation: orph-ripple 1.6s ease-out infinite; }
  .orph-sticky-cta .txt strong { block; font-size: 13px; font-weight: 800; color: #fff; }
  .orph-sticky-cta .arrow { background: #fff; color: var(--orph-red); border-radius: 8px; padding: 6px 12px; font-size: 12px; font-weight: 800; display: inline-flex; align-items: center; gap: 4px; }

  /* ============================================================
     9. RESPONSIVE QUERIES
     ============================================================ */
  @media (min-width: 600px) {
    .orph-grid { grid-template-columns: repeat(3, 1fr); gap: 16px; }
    .orph-card-title { font-size: 14px; }
    .orph-card-loc { font-size: 12px; }
  }

  @media (min-width: 769px) {
    .orph-page { padding-bottom: 60px; }
    .orph-hero { height: 75vh; display: flex; }
    .orph-hero-inner { grid-template-columns: 1.25fr 1fr; gap: 32px; }
    .orph-hero-illus { display: flex; }
    .orph-breadcrumb { display: flex; }
    .orph-social-proof { display: inline-flex; margin-bottom: 24px; }
    .orph-search-btn .label { display: inline; }
    .orph-quick .pill .amt { display: inline-flex; }
    .orph-hero .float-heart.h2, .orph-hero .float-heart.h3 { display: block; }
    .orph-hero-tag { font-size: 11px; padding: 6px 12px; margin-bottom: 12px; }
    .orph-hero h1 { font-size: 36px; margin-bottom: 44px; }
    .orph-hero h1 .em { color: #ffd86b; }
    .orph-hero-sub { font-size: 14px; max-width: 540px; margin-bottom: 22px !important; }
    .orph-search { max-width: 600px; padding: 8px 8px 8px 18px; border-radius: 14px; }
    .orph-search input { font-size: 15px; padding: 13px 4px; }
    .orph-search-btn { padding: 12px 22px; font-size: 14px; }
    .orph-microtrust { font-size: 12px; gap: 14px 18px; flex-wrap: wrap; }
    .orph-quick .pill { font-size: 13px; padding: 8px 14px; }
    .orph-stats { margin-top: -42px; }
    .orph-stats-card { padding: 22px 16px; gap: 4px; }
    .orph-stat-icon { width: 46px; height: 46px; font-size: 22px; }
    .orph-stat-num { font-size: 24px; }
    .orph-stat-label { font-size: 12px; }
    .orph-grid { grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 22px; }
    .orph-card-img { padding-bottom: 65%; }
    .orph-card-body { padding: 14px 16px 16px; }
    .orph-card-title { font-size: 16px; }
    .orph-card-loc { font-size: 13px; }
    .orph-tag { font-size: 11px; padding: 5px 10px; top: 12px; left: 12px; }
    .orph-wishlist { width: 36px; height: 36px; font-size: 16px; top: 10px; right: 10px; }
    .orph-donate-btn { padding: 9px 16px; font-size: 13px; }
    .orph-why h3 { font-size: 18px; justify-content: center; margin: 20px; }
    .orph-why-item p { font-size: 12px; }
    .orph-why-item .icon { width: 44px; height: 44px; font-size: 20px; }
    .orph-sticky-cta { display: none; }
  }

  @media (max-width: 768px) {
    .orph-hero { padding: 12px 0 28px; background: radial-gradient(circle at 90% 50%, rgba(255,255,255,0.16) 0%, transparent 50%), linear-gradient(135deg, #009dff 0%, #0081d6 100%); }
    .orph-hero::before { display: none; }
    .orph-hero .float-heart, .orph-breadcrumb, .orph-hero-tag, .orph-hero h1, .orph-hero-sub, .orph-social-proof, .orph-quick, .orph-microtrust, .orph-hero-illus { display: none !important; }
    .orph-hero-inner { display: block; gap: 0; }
    .orph-search { margin: 0; padding: 4px 4px 4px 12px; border-radius: 12px; box-shadow: 0 6px 20px rgba(0,0,0,0.18); }
    .orph-search-btn { padding: 9px 12px; border-radius: 8px; }
    .orph-stats { margin-top: -22px; padding: 0 4px; }
    .orph-stats-card { padding: 14px 8px; border-radius: 16px; box-shadow: 0 10px 28px rgba(0,0,0,0.14); border: 1px solid #fff1de; }
    .orph-stat-icon { width: 36px; height: 36px; font-size: 16px; margin-bottom: 4px; }
    .orph-stat-num { font-size: 16px; }
    .orph-stat-label { font-size: 9px; letter-spacing: .25px; }
  }
</style>

<div class="orph-page">
  <!-- ============== Hero ============== -->
  <section class="orph-hero">
    <span class="float-heart h1"><i class="ri-heart-fill"></i></span>
    <span class="float-heart h2"><i class="ri-heart-fill"></i></span>
    <span class="float-heart h3"><i class="ri-heart-fill"></i></span>

    <div class="container orph-hero-inner">
      <div class="orph-hero-text">
        <nav class="orph-breadcrumb">
          <a href="/packages_form.html"><i class="ri-home-4-line"></i> Home</a>
          <span>›</span>
          <span>Orphanage</span>
        </nav>

        <span class="orph-hero-tag"><i class="ri-heart-fill"></i> Give with love</span>

        <h1>
          Be the reason a child <span class="accent">smiles today</span> &mdash;
          <span class="em">your kindness</span> reaches them.
        </h1>

        <p class="orph-hero-sub">
          Discover trusted children's homes, old-age homes and women's shelters.
          Sponsor a meal, gift a grocery kit, or celebrate a special day &mdash; in just a few taps.
        </p>

        <div class="orph-social-proof" aria-label="Trusted by donors">
          <div class="orph-avatars">
            <span>A</span><span>R</span><span>S</span>
          </div>
          <small>
            <b>4.8</b> <i class="ri-star-fill"></i> &middot; Loved by 8,500+ donors
          </small>
        </div>

        <form method="GET" class="orph-search" role="search">
          <i class="ri-search-2-line"></i>
          <input type="text"
                 id="searchInput"
                 name="search_query"
                 value=""
                 placeholder="Search orphanage by name, area or city...">
          <button type="submit" class="orph-search-btn">
            <i class="ri-search-line"></i> <span class="label">Search</span>
          </button>
        </form>

        <div class="orph-quick" aria-label="Quick donation options">
          <a href="index.html#orphGrid" class="pill">
            <i class="ri-restaurant-2-fill"></i> Sponsor a Meal <span class="amt">₹30</span>
          </a>
          <a href="index.html#orphGrid" class="pill">
            <i class="ri-shopping-basket-2-fill"></i> Grocery Kit <span class="amt">₹500</span>
          </a>
          <a href="index.html#orphGrid" class="pill">
            <i class="ri-cake-3-fill"></i> Birthday Celebration
          </a>
          <a href="index.html#orphGrid" class="pill">
            <i class="ri-gift-2-fill"></i> Festival Gift
          </a>
        </div>

        <div class="orph-microtrust">
          <span><i class="ri-checkbox-circle-fill"></i> 80G Tax Benefit</span>
          <span><i class="ri-checkbox-circle-fill"></i> Bank-Verified Homes</span>
          <span><i class="ri-checkbox-circle-fill"></i> 100% Reaches Home</span>
        </div>
      </div>

   <div class="orph-hero-illus" aria-hidden="true">
  <div class="orph-photo-box">
    <!-- The Frame/Accent behind the image -->
    <div class="orph-photo-accent"></div>

    <!-- Image Slider Container -->
    <div class="orph-slider">
        
            
              <img src="https://media.thaagam.org/media/institutions/Aruvi.jpeg" class="orph-slide active" alt="Aruvi Old Age Home" loading="lazy">
            
        
            
              <img src="https://media.thaagam.org/media/institutions/kirubai_1.jpeg" class="orph-slide" alt="KIRUBAI OLD AGE HOME" loading="lazy">
            
        
            
              <img src="https://media.thaagam.org/media/institutions/Chemmancherry.jpeg" class="orph-slide" alt="Montfort Community Development Society - Chemmanchery" loading="lazy">
            
        
            
              <img src="https://media.thaagam.org/media/institutions/kannakinagar.jpeg" class="orph-slide" alt="Montfort Community Development Society- Kannaki Nagar" loading="lazy">
            
        
            
              <img src="https://media.thaagam.org/media/institutions/_MG_0653.jfif" class="orph-slide" alt="Montfort community development society- Perumbakam" loading="lazy">
            
        
            
              <img src="https://media.thaagam.org/media/institutions/WhatsApp_Image_2026-04-22_at_10.23.09_AM.jpeg" class="orph-slide" alt="New Hope and New Life Children Home" loading="lazy">
            
        
            
              <img src="https://media.thaagam.org/media/institutions/vetri__new.jpg" class="orph-slide" alt="New Vetri Old Age Home" loading="lazy">
            
        
            
              <img src="https://media.thaagam.org/media/institutions/old_vetri.jpeg" class="orph-slide" alt="Old Vetri old age home" loading="lazy">
            
        
            
              <img src="https://media.thaagam.org/media/institutions/samy_old_age_home.webp" class="orph-slide" alt="Sami old age home" loading="lazy">
            
        
            
              <img src="https://media.thaagam.org/media/institutions/Scope_India_old_age.webp" class="orph-slide" alt="Scope India Old Age Home" loading="lazy">
            
        
            
              <img src="https://media.thaagam.org/media/institutions/Scope_Old_AGe_NULM.webp" class="orph-slide" alt="Scope India Old Age Home NULM" loading="lazy">
            
        
            
              <img src="https://media.thaagam.org/media/institutions/WhatsApp_Image_2026-05-26_at_11.47.19_AM.jpeg" class="orph-slide" alt="Trichy Mentally Ill Home" loading="lazy">
            
        
            
              <img src="https://media.thaagam.org/media/institutions/WhatsApp_Image_2026-04-27_at_9.44.11_PM.jpeg" class="orph-slide" alt="AGA MAGIZH TRUST" loading="lazy">
            
        
            
              <img src="https://media.thaagam.org/media/institutions/WhatsApp_Image_2026-04-16_at_1.11.27_PM.jpeg" class="orph-slide" alt="Mary Mentally Retired home" loading="lazy">
            
        
            
              <img src="https://media.thaagam.org/media/institutions/WhatsApp_Image_2026-07-17_at_2.56.10_PM.jpeg" class="orph-slide" alt="Uthavum Uillangal Old Age Home" loading="lazy">
            
        
    </div>

    <!-- Floating Badge on the image -->
    <div class="orph-photo-badge">
      <i class="ri-heart-3-fill"></i>
      <span>Spread Love</span>
    </div>
  </div>
</div>

    </div>
  </section>

  <!-- ============== Stats strip ============== -->
  <div class="container orph-stats">
    <div class="orph-stats-card orph-reveal">
      <div class="orph-stat">
        <div class="orph-stat-icon"><i class="ri-restaurant-2-fill"></i></div>
        <div class="orph-stat-num"><span class="orph-counter" data-target="125000">0</span><small>+</small></div>
        <div class="orph-stat-label">Meals Served</div>
      </div>
      <div class="orph-stat">
        <div class="orph-stat-icon"><i class="ri-home-heart-fill"></i></div>
        <div class="orph-stat-num"><span class="orph-counter" data-target="15">0</span><small>+</small></div>
        <div class="orph-stat-label">Verified Homes</div>
      </div>
      <div class="orph-stat">
        <div class="orph-stat-icon"><i class="ri-emotion-happy-fill"></i></div>
        <div class="orph-stat-num"><span class="orph-counter" data-target="8500">0</span><small>+</small></div>
        <div class="orph-stat-label">Lives Touched</div>
      </div>
    </div>

    <!-- <div class="orph-trust">
      <span class="orph-trust-item"><i class="ri-shield-check-fill"></i> Verified Homes</span>
      <span class="orph-trust-item gold"><i class="ri-bill-fill"></i> 80G Tax Benefit</span>
      <span class="orph-trust-item"><i class="ri-eye-fill"></i> 100% Transparent</span>
      <span class="orph-trust-item red"><i class="ri-secure-payment-fill"></i> Secure Donation</span>
    </div> -->
  </div>

  <!-- ============== Filters ============== -->
  <div class="container orph-filters-wrap">
    <!-- Category Filters -->
    <div class="orph-filters" id="orphFilters">
      <span class="orph-chip active" data-type="all">
        <img src="/static/website/assets/images/categories/home.png" alt="">
        All Homes
      </span>
      
        <span class="orph-chip " data-type="children">
          
            <img src="/static/website/assets/images/orph_categories/people.png" alt="">
          
          Children
        </span>
      
        <span class="orph-chip " data-type="illness">
          
            <img src="/static/website/assets/images/categories/orphanage.jpeg" alt="">
          
          Illness
        </span>
      
        <span class="orph-chip " data-type="mental-health">
          
            <img src="/static/website/assets/images/categories/orphanage.jpeg" alt="">
          
          Mental Health
        </span>
      
        <span class="orph-chip " data-type="old-age-homes">
          
            <img src="/static/website/assets/images/orph_categories/nursing-home.png" alt="">
          
          Old Age Homes
        </span>
      
        <span class="orph-chip " data-type="women">
          
            <img src="/static/website/assets/images/orph_categories/woman.png" alt="">
          
          Women
        </span>
      
    </div>

    <!-- Location Filters -->
    <div style="margin-top: 16px; padding-top: 14px; border-top: 1px solid var(--orph-line);">
      <h3 style="font-size: 13px; font-weight: 700; color: var(--orph-text); margin-bottom: 10px; display: flex; align-items: center; gap: 6px;">
        <i class="ri-map-pin-line" style="color: var(--orph-red);"></i> Filter by Location
      </h3>
      <div class="orph-filters" id="orphLocationFilters">
        <a href="/orphanage" class="orph-chip active" style="text-decoration: none;">
          <i class="ri-map-pin-2-line"></i>
          All Locations
        </a>
        
        <a href="index.html%3Flocation=Chennai.html" class="orph-chip " style="text-decoration: none;">
          <i class="ri-map-pin-line"></i> Chennai
        </a>
        
        <a href="index.html%3Flocation=Cuddalore.html" class="orph-chip " style="text-decoration: none;">
          <i class="ri-map-pin-line"></i> Cuddalore
        </a>
        
        <a href="index.html%3Flocation=Trichy.html" class="orph-chip " style="text-decoration: none;">
          <i class="ri-map-pin-line"></i> Trichy
        </a>
        
        <a href="index.html%3Flocation=Madurai.html" class="orph-chip " style="text-decoration: none;">
          <i class="ri-map-pin-line"></i> Madurai
        </a>
        
        <a href="index.html%3Flocation=Vellore.html" class="orph-chip " style="text-decoration: none;">
          <i class="ri-map-pin-line"></i> Vellore
        </a>
        
        <a href="index.html%3Flocation=Chengalpet.html" class="orph-chip " style="text-decoration: none;">
          <i class="ri-map-pin-line"></i> Chengalpet
        </a>
        
      </div>
    </div>
  </div>

  <!-- ============== Listings ============== -->
  <div class="container">
    <div class="orph-section-head">
      <h2><i class="ri-home-heart-fill h-icon"></i> Our Orphanages</h2>
      <span class="sub" id="orphCount">
        15 homes available
      </span>
    </div>

    <div class="orph-grid" id="orphGrid">
      
        
        
        
        <div class="orph-card orph-reveal"
             data-type="old-age-homes"
             data-name="aruvi old age home"
             data-search="aruvi old age home ayanavaram chennai old age homes">

          <a href="/fieldv2/institution/INS-00016"
             class="orph-card-link"
             aria-label="View Aruvi Old Age Home"></a>

          <div class="orph-card-img">
            
              <img src="https://media.thaagam.org/media/institutions/Aruvi.jpeg"
                   alt="Aruvi Old Age Home - Old Age Homes home in Ayanavaram, Chennai"
                   loading="lazy">
            

            <span class="orph-tag">Old Age Homes</span>

            
            <span class="orph-members">
              <i class="ri-group-fill"></i> 30 Members
            </span>
            

            <button type="button"
                    class="orph-wishlist"
                    onclick="this.classList.toggle('active'); this.querySelector('i').className = this.classList.contains('active') ? 'ri-heart-3-fill' : 'ri-heart-3-line';"
                    aria-label="Save to wishlist">
              <i class="ri-heart-3-line"></i>
            </button>
          </div>

          <div class="orph-card-body">
            <h3 class="orph-card-title">Aruvi Old Age Home</h3>

            <div class="orph-card-loc">
              <i class="ri-map-pin-line"></i>
              <span>
              
                Ayanavaram, Chennai
              
              </span>
            </div>

            <div class="orph-rating-row">
              <span class="orph-rating">
                <i class="ri-star-fill"></i> 4.5
              </span>
              <span class="orph-rating-text"><i class="ri-shield-check-fill"></i> Verified</span>
            </div>

            <div class="orph-card-foot">
              <div class="orph-impact">
                <i class="ri-heart-fill"></i> Help today
              </div>
              <span class="orph-donate-btn">
                Donate <i class="ri-arrow-right-line"></i>
              </span>
            </div>
          </div>
        </div>
        
        
        
        <div class="orph-card orph-reveal"
             data-type="old-age-homes"
             data-name="kirubai old age home"
             data-search="kirubai old age home perumbakkam chennai old age homes">

          <a href="/fieldv2/institution/INS-00013"
             class="orph-card-link"
             aria-label="View KIRUBAI OLD AGE HOME"></a>

          <div class="orph-card-img">
            
              <img src="https://media.thaagam.org/media/institutions/kirubai_1.jpeg"
                   alt="KIRUBAI OLD AGE HOME - Old Age Homes home in Perumbakkam, Chennai"
                   loading="lazy">
            

            <span class="orph-tag">Old Age Homes</span>

            
            <span class="orph-members">
              <i class="ri-group-fill"></i> 20 Members
            </span>
            

            <button type="button"
                    class="orph-wishlist"
                    onclick="this.classList.toggle('active'); this.querySelector('i').className = this.classList.contains('active') ? 'ri-heart-3-fill' : 'ri-heart-3-line';"
                    aria-label="Save to wishlist">
              <i class="ri-heart-3-line"></i>
            </button>
          </div>

          <div class="orph-card-body">
            <h3 class="orph-card-title">KIRUBAI OLD AGE HOME</h3>

            <div class="orph-card-loc">
              <i class="ri-map-pin-line"></i>
              <span>
              
                Perumbakkam, Chennai
              
              </span>
            </div>

            <div class="orph-rating-row">
              <span class="orph-rating">
                <i class="ri-star-fill"></i> 4.5
              </span>
              <span class="orph-rating-text"><i class="ri-shield-check-fill"></i> Verified</span>
            </div>

            <div class="orph-card-foot">
              <div class="orph-impact">
                <i class="ri-heart-fill"></i> Help today
              </div>
              <span class="orph-donate-btn">
                Donate <i class="ri-arrow-right-line"></i>
              </span>
            </div>
          </div>
        </div>
        
        
        
        <div class="orph-card orph-reveal"
             data-type="mental-health"
             data-name="montfort community development society - chemmanchery"
             data-search="montfort community development society - chemmanchery chemmancherry chennai mental health">

          <a href="/fieldv2/institution/INS-00011"
             class="orph-card-link"
             aria-label="View Montfort Community Development Society - Chemmanchery"></a>

          <div class="orph-card-img">
            
              <img src="https://media.thaagam.org/media/institutions/Chemmancherry.jpeg"
                   alt="Montfort Community Development Society - Chemmanchery - Mental Health home in Chemmancherry, Chennai"
                   loading="lazy">
            

            <span class="orph-tag">Mental Health</span>

            
            <span class="orph-members">
              <i class="ri-group-fill"></i> 30 Members
            </span>
            

            <button type="button"
                    class="orph-wishlist"
                    onclick="this.classList.toggle('active'); this.querySelector('i').className = this.classList.contains('active') ? 'ri-heart-3-fill' : 'ri-heart-3-line';"
                    aria-label="Save to wishlist">
              <i class="ri-heart-3-line"></i>
            </button>
          </div>

          <div class="orph-card-body">
            <h3 class="orph-card-title">Montfort Community Development Society - Chemmanchery</h3>

            <div class="orph-card-loc">
              <i class="ri-map-pin-line"></i>
              <span>
              
                Chemmancherry, Chennai
              
              </span>
            </div>

            <div class="orph-rating-row">
              <span class="orph-rating">
                <i class="ri-star-fill"></i> 4.5
              </span>
              <span class="orph-rating-text"><i class="ri-shield-check-fill"></i> Verified</span>
            </div>

            <div class="orph-card-foot">
              <div class="orph-impact">
                <i class="ri-heart-fill"></i> Help today
              </div>
              <span class="orph-donate-btn">
                Donate <i class="ri-arrow-right-line"></i>
              </span>
            </div>
          </div>
        </div>
        
        
        
        <div class="orph-card orph-reveal"
             data-type="mental-health"
             data-name="montfort community development society- kannaki nagar"
             data-search="montfort community development society- kannaki nagar kannaki nagar chennai mental health">

          <a href="/fieldv2/institution/INS-00010"
             class="orph-card-link"
             aria-label="View Montfort Community Development Society- Kannaki Nagar"></a>

          <div class="orph-card-img">
            
              <img src="https://media.thaagam.org/media/institutions/kannakinagar.jpeg"
                   alt="Montfort Community Development Society- Kannaki Nagar - Mental Health home in Kannaki Nagar, Chennai"
                   loading="lazy">
            

            <span class="orph-tag">Mental Health</span>

            
            <span class="orph-members">
              <i class="ri-group-fill"></i> 25 Members
            </span>
            

            <button type="button"
                    class="orph-wishlist"
                    onclick="this.classList.toggle('active'); this.querySelector('i').className = this.classList.contains('active') ? 'ri-heart-3-fill' : 'ri-heart-3-line';"
                    aria-label="Save to wishlist">
              <i class="ri-heart-3-line"></i>
            </button>
          </div>

          <div class="orph-card-body">
            <h3 class="orph-card-title">Montfort Community Development Society- Kannaki Nagar</h3>

            <div class="orph-card-loc">
              <i class="ri-map-pin-line"></i>
              <span>
              
                Kannaki Nagar, Chennai
              
              </span>
            </div>

            <div class="orph-rating-row">
              <span class="orph-rating">
                <i class="ri-star-fill"></i> 4.5
              </span>
              <span class="orph-rating-text"><i class="ri-shield-check-fill"></i> Verified</span>
            </div>

            <div class="orph-card-foot">
              <div class="orph-impact">
                <i class="ri-heart-fill"></i> Help today
              </div>
              <span class="orph-donate-btn">
                Donate <i class="ri-arrow-right-line"></i>
              </span>
            </div>
          </div>
        </div>
        
        
        
        <div class="orph-card orph-reveal"
             data-type="mental-health"
             data-name="montfort community development society- perumbakam"
             data-search="montfort community development society- perumbakam perumbakkam chennai mental health">

          <a href="/fieldv2/institution/INS-00008"
             class="orph-card-link"
             aria-label="View Montfort community development society- Perumbakam"></a>

          <div class="orph-card-img">
            
              <img src="https://media.thaagam.org/media/institutions/_MG_0653.jfif"
                   alt="Montfort community development society- Perumbakam - Mental Health home in Perumbakkam, Chennai"
                   loading="lazy">
            

            <span class="orph-tag">Mental Health</span>

            
            <span class="orph-members">
              <i class="ri-group-fill"></i> 18 Members
            </span>
            

            <button type="button"
                    class="orph-wishlist"
                    onclick="this.classList.toggle('active'); this.querySelector('i').className = this.classList.contains('active') ? 'ri-heart-3-fill' : 'ri-heart-3-line';"
                    aria-label="Save to wishlist">
              <i class="ri-heart-3-line"></i>
            </button>
          </div>

          <div class="orph-card-body">
            <h3 class="orph-card-title">Montfort community development society- Perumbakam</h3>

            <div class="orph-card-loc">
              <i class="ri-map-pin-line"></i>
              <span>
              
                Perumbakkam, Chennai
              
              </span>
            </div>

            <div class="orph-rating-row">
              <span class="orph-rating">
                <i class="ri-star-fill"></i> 4.5
              </span>
              <span class="orph-rating-text"><i class="ri-shield-check-fill"></i> Verified</span>
            </div>

            <div class="orph-card-foot">
              <div class="orph-impact">
                <i class="ri-heart-fill"></i> Help today
              </div>
              <span class="orph-donate-btn">
                Donate <i class="ri-arrow-right-line"></i>
              </span>
            </div>
          </div>
        </div>
        
        
        
        <div class="orph-card orph-reveal"
             data-type="children"
             data-name="new hope and new life children home"
             data-search="new hope and new life children home perumbakkam chennai children">

          <a href="/fieldv2/institution/INS-00007"
             class="orph-card-link"
             aria-label="View New Hope and New Life Children Home"></a>

          <div class="orph-card-img">
            
              <img src="https://media.thaagam.org/media/institutions/WhatsApp_Image_2026-04-22_at_10.23.09_AM.jpeg"
                   alt="New Hope and New Life Children Home - Children home in Perumbakkam, Chennai"
                   loading="lazy">
            

            <span class="orph-tag">Children</span>

            
            <span class="orph-members">
              <i class="ri-group-fill"></i> 60 Members
            </span>
            

            <button type="button"
                    class="orph-wishlist"
                    onclick="this.classList.toggle('active'); this.querySelector('i').className = this.classList.contains('active') ? 'ri-heart-3-fill' : 'ri-heart-3-line';"
                    aria-label="Save to wishlist">
              <i class="ri-heart-3-line"></i>
            </button>
          </div>

          <div class="orph-card-body">
            <h3 class="orph-card-title">New Hope and New Life Children Home</h3>

            <div class="orph-card-loc">
              <i class="ri-map-pin-line"></i>
              <span>
              
                Perumbakkam, Chennai
              
              </span>
            </div>

            <div class="orph-rating-row">
              <span class="orph-rating">
                <i class="ri-star-fill"></i> 4.5
              </span>
              <span class="orph-rating-text"><i class="ri-shield-check-fill"></i> Verified</span>
            </div>

            <div class="orph-card-foot">
              <div class="orph-impact">
                <i class="ri-heart-fill"></i> Help today
              </div>
              <span class="orph-donate-btn">
                Donate <i class="ri-arrow-right-line"></i>
              </span>
            </div>
          </div>
        </div>
        
        
        
        <div class="orph-card orph-reveal"
             data-type="old-age-homes"
             data-name="new vetri old age home"
             data-search="new vetri old age home selaiyur chennai old age homes">

          <a href="/fieldv2/institution/INS-00014"
             class="orph-card-link"
             aria-label="View New Vetri Old Age Home"></a>

          <div class="orph-card-img">
            
              <img src="https://media.thaagam.org/media/institutions/vetri__new.jpg"
                   alt="New Vetri Old Age Home - Old Age Homes home in Selaiyur, Chennai"
                   loading="lazy">
            

            <span class="orph-tag">Old Age Homes</span>

            
            <span class="orph-members">
              <i class="ri-group-fill"></i> 22 Members
            </span>
            

            <button type="button"
                    class="orph-wishlist"
                    onclick="this.classList.toggle('active'); this.querySelector('i').className = this.classList.contains('active') ? 'ri-heart-3-fill' : 'ri-heart-3-line';"
                    aria-label="Save to wishlist">
              <i class="ri-heart-3-line"></i>
            </button>
          </div>

          <div class="orph-card-body">
            <h3 class="orph-card-title">New Vetri Old Age Home</h3>

            <div class="orph-card-loc">
              <i class="ri-map-pin-line"></i>
              <span>
              
                Selaiyur, Chennai
              
              </span>
            </div>

            <div class="orph-rating-row">
              <span class="orph-rating">
                <i class="ri-star-fill"></i> 4.5
              </span>
              <span class="orph-rating-text"><i class="ri-shield-check-fill"></i> Verified</span>
            </div>

            <div class="orph-card-foot">
              <div class="orph-impact">
                <i class="ri-heart-fill"></i> Help today
              </div>
              <span class="orph-donate-btn">
                Donate <i class="ri-arrow-right-line"></i>
              </span>
            </div>
          </div>
        </div>
        
        
        
        <div class="orph-card orph-reveal"
             data-type="old-age-homes"
             data-name="old vetri old age home"
             data-search="old vetri old age home chithalapakkam chennai old age homes">

          <a href="/fieldv2/institution/INS-00015"
             class="orph-card-link"
             aria-label="View Old Vetri old age home"></a>

          <div class="orph-card-img">
            
              <img src="https://media.thaagam.org/media/institutions/old_vetri.jpeg"
                   alt="Old Vetri old age home - Old Age Homes home in Chithalapakkam, Chennai"
                   loading="lazy">
            

            <span class="orph-tag">Old Age Homes</span>

            
            <span class="orph-members">
              <i class="ri-group-fill"></i> 15 Members
            </span>
            

            <button type="button"
                    class="orph-wishlist"
                    onclick="this.classList.toggle('active'); this.querySelector('i').className = this.classList.contains('active') ? 'ri-heart-3-fill' : 'ri-heart-3-line';"
                    aria-label="Save to wishlist">
              <i class="ri-heart-3-line"></i>
            </button>
          </div>

          <div class="orph-card-body">
            <h3 class="orph-card-title">Old Vetri old age home</h3>

            <div class="orph-card-loc">
              <i class="ri-map-pin-line"></i>
              <span>
              
                Chithalapakkam, Chennai
              
              </span>
            </div>

            <div class="orph-rating-row">
              <span class="orph-rating">
                <i class="ri-star-fill"></i> 4.5
              </span>
              <span class="orph-rating-text"><i class="ri-shield-check-fill"></i> Verified</span>
            </div>

            <div class="orph-card-foot">
              <div class="orph-impact">
                <i class="ri-heart-fill"></i> Help today
              </div>
              <span class="orph-donate-btn">
                Donate <i class="ri-arrow-right-line"></i>
              </span>
            </div>
          </div>
        </div>
        
        
        
        <div class="orph-card orph-reveal"
             data-type="old-age-homes"
             data-name="sami old age home"
             data-search="sami old age home chithalapakkam chennai old age homes">

          <a href="/fieldv2/institution/INS-00012"
             class="orph-card-link"
             aria-label="View Sami old age home"></a>

          <div class="orph-card-img">
            
              <img src="https://media.thaagam.org/media/institutions/samy_old_age_home.webp"
                   alt="Sami old age home - Old Age Homes home in Chithalapakkam, Chennai"
                   loading="lazy">
            

            <span class="orph-tag">Old Age Homes</span>

            
            <span class="orph-members">
              <i class="ri-group-fill"></i> 25 Members
            </span>
            

            <button type="button"
                    class="orph-wishlist"
                    onclick="this.classList.toggle('active'); this.querySelector('i').className = this.classList.contains('active') ? 'ri-heart-3-fill' : 'ri-heart-3-line';"
                    aria-label="Save to wishlist">
              <i class="ri-heart-3-line"></i>
            </button>
          </div>

          <div class="orph-card-body">
            <h3 class="orph-card-title">Sami old age home</h3>

            <div class="orph-card-loc">
              <i class="ri-map-pin-line"></i>
              <span>
              
                Chithalapakkam, Chennai
              
              </span>
            </div>

            <div class="orph-rating-row">
              <span class="orph-rating">
                <i class="ri-star-fill"></i> 4.5
              </span>
              <span class="orph-rating-text"><i class="ri-shield-check-fill"></i> Verified</span>
            </div>

            <div class="orph-card-foot">
              <div class="orph-impact">
                <i class="ri-heart-fill"></i> Help today
              </div>
              <span class="orph-donate-btn">
                Donate <i class="ri-arrow-right-line"></i>
              </span>
            </div>
          </div>
        </div>
        
        
        
        <div class="orph-card orph-reveal"
             data-type="old-age-homes"
             data-name="scope india old age home"
             data-search="scope india old age home thirupapuliyur cuddalore old age homes">

          <a href="/fieldv2/institution/INS-00002"
             class="orph-card-link"
             aria-label="View Scope India Old Age Home"></a>

          <div class="orph-card-img">
            
              <img src="https://media.thaagam.org/media/institutions/Scope_India_old_age.webp"
                   alt="Scope India Old Age Home - Old Age Homes home in Thirupapuliyur, Cuddalore"
                   loading="lazy">
            

            <span class="orph-tag">Old Age Homes</span>

            
            <span class="orph-members">
              <i class="ri-group-fill"></i> 40 Members
            </span>
            

            <button type="button"
                    class="orph-wishlist"
                    onclick="this.classList.toggle('active'); this.querySelector('i').className = this.classList.contains('active') ? 'ri-heart-3-fill' : 'ri-heart-3-line';"
                    aria-label="Save to wishlist">
              <i class="ri-heart-3-line"></i>
            </button>
          </div>

          <div class="orph-card-body">
            <h3 class="orph-card-title">Scope India Old Age Home</h3>

            <div class="orph-card-loc">
              <i class="ri-map-pin-line"></i>
              <span>
              
                Thirupapuliyur, Cuddalore
              
              </span>
            </div>

            <div class="orph-rating-row">
              <span class="orph-rating">
                <i class="ri-star-fill"></i> 4.5
              </span>
              <span class="orph-rating-text"><i class="ri-shield-check-fill"></i> Verified</span>
            </div>

            <div class="orph-card-foot">
              <div class="orph-impact">
                <i class="ri-heart-fill"></i> Help today
              </div>
              <span class="orph-donate-btn">
                Donate <i class="ri-arrow-right-line"></i>
              </span>
            </div>
          </div>
        </div>
        
        
        
        <div class="orph-card orph-reveal"
             data-type="old-age-homes"
             data-name="scope india old age home nulm"
             data-search="scope india old age home nulm kammiyampettai cuddalore old age homes">

          <a href="/fieldv2/institution/INS-00003"
             class="orph-card-link"
             aria-label="View Scope India Old Age Home NULM"></a>

          <div class="orph-card-img">
            
              <img src="https://media.thaagam.org/media/institutions/Scope_Old_AGe_NULM.webp"
                   alt="Scope India Old Age Home NULM - Old Age Homes home in Kammiyampettai, Cuddalore"
                   loading="lazy">
            

            <span class="orph-tag">Old Age Homes</span>

            
            <span class="orph-members">
              <i class="ri-group-fill"></i> 40 Members
            </span>
            

            <button type="button"
                    class="orph-wishlist"
                    onclick="this.classList.toggle('active'); this.querySelector('i').className = this.classList.contains('active') ? 'ri-heart-3-fill' : 'ri-heart-3-line';"
                    aria-label="Save to wishlist">
              <i class="ri-heart-3-line"></i>
            </button>
          </div>

          <div class="orph-card-body">
            <h3 class="orph-card-title">Scope India Old Age Home NULM</h3>

            <div class="orph-card-loc">
              <i class="ri-map-pin-line"></i>
              <span>
              
                Kammiyampettai, Cuddalore
              
              </span>
            </div>

            <div class="orph-rating-row">
              <span class="orph-rating">
                <i class="ri-star-fill"></i> 4.5
              </span>
              <span class="orph-rating-text"><i class="ri-shield-check-fill"></i> Verified</span>
            </div>

            <div class="orph-card-foot">
              <div class="orph-impact">
                <i class="ri-heart-fill"></i> Help today
              </div>
              <span class="orph-donate-btn">
                Donate <i class="ri-arrow-right-line"></i>
              </span>
            </div>
          </div>
        </div>
        
        
        
        <div class="orph-card orph-reveal"
             data-type="illness"
             data-name="trichy mentally ill home"
             data-search="trichy mentally ill home samayapuram trichy illness">

          <a href="/fieldv2/institution/INS-00004"
             class="orph-card-link"
             aria-label="View Trichy Mentally Ill Home"></a>

          <div class="orph-card-img">
            
              <img src="https://media.thaagam.org/media/institutions/WhatsApp_Image_2026-05-26_at_11.47.19_AM.jpeg"
                   alt="Trichy Mentally Ill Home - Illness home in Samayapuram, Trichy"
                   loading="lazy">
            

            <span class="orph-tag">Illness</span>

            
            <span class="orph-members">
              <i class="ri-group-fill"></i> 60 Members
            </span>
            

            <button type="button"
                    class="orph-wishlist"
                    onclick="this.classList.toggle('active'); this.querySelector('i').className = this.classList.contains('active') ? 'ri-heart-3-fill' : 'ri-heart-3-line';"
                    aria-label="Save to wishlist">
              <i class="ri-heart-3-line"></i>
            </button>
          </div>

          <div class="orph-card-body">
            <h3 class="orph-card-title">Trichy Mentally Ill Home</h3>

            <div class="orph-card-loc">
              <i class="ri-map-pin-line"></i>
              <span>
              
                Samayapuram, Trichy
              
              </span>
            </div>

            <div class="orph-rating-row">
              <span class="orph-rating">
                <i class="ri-star-fill"></i> 4.5
              </span>
              <span class="orph-rating-text"><i class="ri-shield-check-fill"></i> Verified</span>
            </div>

            <div class="orph-card-foot">
              <div class="orph-impact">
                <i class="ri-heart-fill"></i> Help today
              </div>
              <span class="orph-donate-btn">
                Donate <i class="ri-arrow-right-line"></i>
              </span>
            </div>
          </div>
        </div>
        
        
        
        <div class="orph-card orph-reveal"
             data-type="old-age-homes"
             data-name="aga magizh trust"
             data-search="aga magizh trust tirupplai madurai old age homes">

          <a href="/fieldv2/institution/INS-00005"
             class="orph-card-link"
             aria-label="View AGA MAGIZH TRUST"></a>

          <div class="orph-card-img">
            
              <img src="https://media.thaagam.org/media/institutions/WhatsApp_Image_2026-04-27_at_9.44.11_PM.jpeg"
                   alt="AGA MAGIZH TRUST - Old Age Homes home in Tirupplai, Madurai"
                   loading="lazy">
            

            <span class="orph-tag">Old Age Homes</span>

            
            <span class="orph-members">
              <i class="ri-group-fill"></i> 20 Members
            </span>
            

            <button type="button"
                    class="orph-wishlist"
                    onclick="this.classList.toggle('active'); this.querySelector('i').className = this.classList.contains('active') ? 'ri-heart-3-fill' : 'ri-heart-3-line';"
                    aria-label="Save to wishlist">
              <i class="ri-heart-3-line"></i>
            </button>
          </div>

          <div class="orph-card-body">
            <h3 class="orph-card-title">AGA MAGIZH TRUST</h3>

            <div class="orph-card-loc">
              <i class="ri-map-pin-line"></i>
              <span>
              
                Tirupplai, Madurai
              
              </span>
            </div>

            <div class="orph-rating-row">
              <span class="orph-rating">
                <i class="ri-star-fill"></i> 4.5
              </span>
              <span class="orph-rating-text"><i class="ri-shield-check-fill"></i> Verified</span>
            </div>

            <div class="orph-card-foot">
              <div class="orph-impact">
                <i class="ri-heart-fill"></i> Help today
              </div>
              <span class="orph-donate-btn">
                Donate <i class="ri-arrow-right-line"></i>
              </span>
            </div>
          </div>
        </div>
        
        
        
        <div class="orph-card orph-reveal"
             data-type="illness"
             data-name="mary mentally retired home"
             data-search="mary mentally retired home pagayam vellore illness">

          <a href="/fieldv2/institution/INS-00006"
             class="orph-card-link"
             aria-label="View Mary Mentally Retired home"></a>

          <div class="orph-card-img">
            
              <img src="https://media.thaagam.org/media/institutions/WhatsApp_Image_2026-04-16_at_1.11.27_PM.jpeg"
                   alt="Mary Mentally Retired home - Illness home in Pagayam, Vellore"
                   loading="lazy">
            

            <span class="orph-tag">Illness</span>

            
            <span class="orph-members">
              <i class="ri-group-fill"></i> 25 Members
            </span>
            

            <button type="button"
                    class="orph-wishlist"
                    onclick="this.classList.toggle('active'); this.querySelector('i').className = this.classList.contains('active') ? 'ri-heart-3-fill' : 'ri-heart-3-line';"
                    aria-label="Save to wishlist">
              <i class="ri-heart-3-line"></i>
            </button>
          </div>

          <div class="orph-card-body">
            <h3 class="orph-card-title">Mary Mentally Retired home</h3>

            <div class="orph-card-loc">
              <i class="ri-map-pin-line"></i>
              <span>
              
                Pagayam, Vellore
              
              </span>
            </div>

            <div class="orph-rating-row">
              <span class="orph-rating">
                <i class="ri-star-fill"></i> 4.5
              </span>
              <span class="orph-rating-text"><i class="ri-shield-check-fill"></i> Verified</span>
            </div>

            <div class="orph-card-foot">
              <div class="orph-impact">
                <i class="ri-heart-fill"></i> Help today
              </div>
              <span class="orph-donate-btn">
                Donate <i class="ri-arrow-right-line"></i>
              </span>
            </div>
          </div>
        </div>
        
        
        
        <div class="orph-card orph-reveal"
             data-type="women"
             data-name="uthavum uillangal old age home"
             data-search="uthavum uillangal old age home maraimalainagar chengalpet women">

          <a href="/fieldv2/institution/INS-00001"
             class="orph-card-link"
             aria-label="View Uthavum Uillangal Old Age Home"></a>

          <div class="orph-card-img">
            
              <img src="https://media.thaagam.org/media/institutions/WhatsApp_Image_2026-07-17_at_2.56.10_PM.jpeg"
                   alt="Uthavum Uillangal Old Age Home - Women home in Maraimalainagar, Chengalpet"
                   loading="lazy">
            

            <span class="orph-tag">Women</span>

            
            <span class="orph-members">
              <i class="ri-group-fill"></i> 40 Members
            </span>
            

            <button type="button"
                    class="orph-wishlist"
                    onclick="this.classList.toggle('active'); this.querySelector('i').className = this.classList.contains('active') ? 'ri-heart-3-fill' : 'ri-heart-3-line';"
                    aria-label="Save to wishlist">
              <i class="ri-heart-3-line"></i>
            </button>
          </div>

          <div class="orph-card-body">
            <h3 class="orph-card-title">Uthavum Uillangal Old Age Home</h3>

            <div class="orph-card-loc">
              <i class="ri-map-pin-line"></i>
              <span>
              
                Maraimalainagar, Chengalpet
              
              </span>
            </div>

            <div class="orph-rating-row">
              <span class="orph-rating">
                <i class="ri-star-fill"></i> 4.5
              </span>
              <span class="orph-rating-text"><i class="ri-shield-check-fill"></i> Verified</span>
            </div>

            <div class="orph-card-foot">
              <div class="orph-impact">
                <i class="ri-heart-fill"></i> Help today
              </div>
              <span class="orph-donate-btn">
                Donate <i class="ri-arrow-right-line"></i>
              </span>
            </div>
          </div>
        </div>
        
      
    </div>

    <div class="orph-empty" id="orphNoMatch" style="display:none; margin-top: 16px;">
      <i class="ri-search-line"></i>
      <h4>No matches</h4>
      <p>Try a different category or search term.</p>
    </div>

    <!-- ============== Why Donate ============== -->
    <div class="orph-why orph-reveal">
      <h3><i class="ri-heart-pulse-fill"></i> Why your help matters</h3>
      <div class="orph-why-list">
        <div class="orph-why-item">
          <div class="icon"><i class="ri-restaurant-fill"></i></div>
          <p>One meal can light up a child's day</p>
        </div>
        <div class="orph-why-item">
          <div class="icon"><i class="ri-shake-hands-fill"></i></div>
          <p>100% of donations reach the home</p>
        </div>
        <div class="orph-why-item">
          <div class="icon"><i class="ri-medal-2-fill"></i></div>
          <p>Save up to 50% tax under 80G</p>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Scripts -->


<!-----------Desktop home banner image  script-------------->






 <!-- =-=-=-=-=-=-=-=-=-=-=  Mobile resposne =-=-=-=-=-==-=-=-= -->








<style>
    /* RESET */
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        background: #f8f9fa;
        overflow-x: hidden;
    }

    /* ✅ CENTER without flex */
    .full-container {
        width: 100%;
        max-width: 450px;
        padding: 10px;

        margin: 0 auto;
        /* 🔥 center fix */
    }

    /* ================= HOTEL SEARCH ================= */
    .hotel-search-widget {
        margin-top: 80px;
    }


    .hotel-search-widget h2 {
        font-size: 26px;
        font-weight: 700;
        margin-bottom: 16px;
        color: #212529;
    }

    .search-form-container {
        background: #fff;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        overflow: hidden;
    }

    .form-group {
        padding: 10px 15px;
        margin-bottom: 0px;
    }

    .form-group label {
        font-size: 13px;
        color: #6c757d;
        display: block;
        margin-bottom: 4px;
    }

    .form-group .value,
    .form-group .input-placeholder {
        font-size: 16px;
        color: #343a40;
    }

    .destination-group {
        border-bottom: 1px solid #e0e0e0;
    }

    .form-row {
        display: flex;
    }

    .destination-group input.input-placeholder {
        width: 100%;
        border: none;
        outline: none;
        background: transparent;
        padding: 0;
    }

    .destination-group input.input-placeholder::placeholder {
        color: #6c757d;
    }

    .date-group {
        flex: 1;
        border-right: 1px solid #e0e0e0;
    }

    .guests-group {
        flex: 1;
    }

    .search-button {
        width: 100%;
        padding: 15px;
        margin-top: 20px;
        border: none;
        border-radius: 8px;
        background: #009dff;
        color: #fff;
        font-size: 18px;
        font-weight: bold;
        cursor: pointer;
    }

    .search-button:hover {
        background: #009dff;
    }

    /* ================= DESTINATIONS ================= */
    .explore-destinations {
        margin-top: 40px;
    }

    .explore-destinations h2 {
        font-size: 24px;
        font-weight: 700;
        margin-bottom: 16px;
        color: #212529;
    }

    .destinations-list {
        display: flex;
        gap: 20px;
        overflow-x: auto;
        padding-bottom: 10px;
        justify-content: space-evenly;

        /* Hides the scrollbar for a cleaner look */
        -ms-overflow-style: none;
        scrollbar-width: none;
    }

    .destinations-list::-webkit-scrollbar {
        display: none;
    }

    .destination-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-shrink: 0;
        cursor: pointer;
    }

    .destination-icon {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        object-fit: cover;
        margin-bottom: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
    }

    .near-me-icon {
        background: #29abe2;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .near-me-icon svg {
        stroke: #fff;
        width: 30px;
        height: 30px;
    }

    .destination-item span {
        font-size: 15px;
        color: #495057;
    }

    .card-link {
    text-decoration: none;
    color: inherit;
    display: block;
}
</style>


<div class="full-container">

    <!-- HOTEL SEARCH -->
    <section class="hotel-search-widget">
        <h2>Vrishasena Orphanage</h2>

        <form method="GET" action="index.html">
            <div class="search-form-container">

                <div class="form-group destination-group">
                    <label>Search</label>
                    <input class="input-placeholder" type="text" name="search_query" value="" placeholder="Search for Orphanage" aria-label="Search orphanage">
                </div>

                <div class="form-row">
                    <div class="form-group date-group">
                        <label>Date</label>
                        <div class="value"><span id="today-date"></span> - <span id="tomorrow-date"></span></div>
                    </div>

                    <div class="form-group guests-group">
                        <label>Category</label>
                        <div class="value">Orphanage</div>
                    </div>
                </div>

            </div>

            <button class="search-button">Search</button>
        </form>
        
    </section>

    <!-- DESTINATIONS -->
    <section class="explore-destinations">
        <h2>Explore our Orphanage </h2>

        <div class="destinations-list">
            
            <div class="destination-item">
                <div class="destination-icon near-me-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke-width="2">
                        <path d="M22 2 11 13 2 9l9 2-2 9 4-7 7 4-2-11z" />
                    </svg>
                </div>
                <span>Near me</span>
            </div>

          
              
              
              <a href="/fieldv2/institution/INS-00016" class="destination-item" style="text-decoration:none; color:inherit;">

                  
                      <img class="destination-icon"
                          src="https://media.thaagam.org/media/institutions/Aruvi.jpeg"
                          alt="Ayanavaram">
                  

                  <span>
                      Ayanavaram
                  </span>

              </a>
          
              
              
              <a href="/fieldv2/institution/INS-00013" class="destination-item" style="text-decoration:none; color:inherit;">

                  
                      <img class="destination-icon"
                          src="https://media.thaagam.org/media/institutions/kirubai_1.jpeg"
                          alt="Perumbakkam">
                  

                  <span>
                      Perumbakkam
                  </span>

              </a>
          
              
              
              <a href="/fieldv2/institution/INS-00011" class="destination-item" style="text-decoration:none; color:inherit;">

                  
                      <img class="destination-icon"
                          src="https://media.thaagam.org/media/institutions/Chemmancherry.jpeg"
                          alt="Chemmancherry">
                  

                  <span>
                      Chemmancherry
                  </span>

              </a>
          
              
              
              <a href="/fieldv2/institution/INS-00010" class="destination-item" style="text-decoration:none; color:inherit;">

                  
                      <img class="destination-icon"
                          src="https://media.thaagam.org/media/institutions/kannakinagar.jpeg"
                          alt="Kannaki Nagar">
                  

                  <span>
                      Kannaki Nagar
                  </span>

              </a>
          
              
              
              <a href="/fieldv2/institution/INS-00008" class="destination-item" style="text-decoration:none; color:inherit;">

                  
                      <img class="destination-icon"
                          src="https://media.thaagam.org/media/institutions/_MG_0653.jfif"
                          alt="Perumbakkam">
                  

                  <span>
                      Perumbakkam
                  </span>

              </a>
          
              
              
              <a href="/fieldv2/institution/INS-00007" class="destination-item" style="text-decoration:none; color:inherit;">

                  
                      <img class="destination-icon"
                          src="https://media.thaagam.org/media/institutions/WhatsApp_Image_2026-04-22_at_10.23.09_AM.jpeg"
                          alt="Perumbakkam">
                  

                  <span>
                      Perumbakkam
                  </span>

              </a>
          
              
              
              <a href="/fieldv2/institution/INS-00014" class="destination-item" style="text-decoration:none; color:inherit;">

                  
                      <img class="destination-icon"
                          src="https://media.thaagam.org/media/institutions/vetri__new.jpg"
                          alt="Selaiyur">
                  

                  <span>
                      Selaiyur
                  </span>

              </a>
          
              
              
              <a href="/fieldv2/institution/INS-00015" class="destination-item" style="text-decoration:none; color:inherit;">

                  
                      <img class="destination-icon"
                          src="https://media.thaagam.org/media/institutions/old_vetri.jpeg"
                          alt="Chithalapakkam">
                  

                  <span>
                      Chithalapakkam
                  </span>

              </a>
          
              
              
              <a href="/fieldv2/institution/INS-00012" class="destination-item" style="text-decoration:none; color:inherit;">

                  
                      <img class="destination-icon"
                          src="https://media.thaagam.org/media/institutions/samy_old_age_home.webp"
                          alt="Chithalapakkam">
                  

                  <span>
                      Chithalapakkam
                  </span>

              </a>
          
              
              
              <a href="/fieldv2/institution/INS-00002" class="destination-item" style="text-decoration:none; color:inherit;">

                  
                      <img class="destination-icon"
                          src="https://media.thaagam.org/media/institutions/Scope_India_old_age.webp"
                          alt="Thirupapuliyur">
                  

                  <span>
                      Thirupapuliyur
                  </span>

              </a>
          
              
              
              <a href="/fieldv2/institution/INS-00003" class="destination-item" style="text-decoration:none; color:inherit;">

                  
                      <img class="destination-icon"
                          src="https://media.thaagam.org/media/institutions/Scope_Old_AGe_NULM.webp"
                          alt="Kammiyampettai">
                  

                  <span>
                      Kammiyampettai
                  </span>

              </a>
          
              
              
              <a href="/fieldv2/institution/INS-00004" class="destination-item" style="text-decoration:none; color:inherit;">

                  
                      <img class="destination-icon"
                          src="https://media.thaagam.org/media/institutions/WhatsApp_Image_2026-05-26_at_11.47.19_AM.jpeg"
                          alt="Samayapuram">
                  

                  <span>
                      Samayapuram
                  </span>

              </a>
          
              
              
              <a href="/fieldv2/institution/INS-00005" class="destination-item" style="text-decoration:none; color:inherit;">

                  
                      <img class="destination-icon"
                          src="https://media.thaagam.org/media/institutions/WhatsApp_Image_2026-04-27_at_9.44.11_PM.jpeg"
                          alt="Tirupplai">
                  

                  <span>
                      Tirupplai
                  </span>

              </a>
          
              
              
              <a href="/fieldv2/institution/INS-00006" class="destination-item" style="text-decoration:none; color:inherit;">

                  
                      <img class="destination-icon"
                          src="https://media.thaagam.org/media/institutions/WhatsApp_Image_2026-04-16_at_1.11.27_PM.jpeg"
                          alt="Pagayam">
                  

                  <span>
                      Pagayam
                  </span>

              </a>
          
              
              
              <a href="/fieldv2/institution/INS-00001" class="destination-item" style="text-decoration:none; color:inherit;">

                  
                      <img class="destination-icon"
                          src="https://media.thaagam.org/media/institutions/WhatsApp_Image_2026-07-17_at_2.56.10_PM.jpeg"
                          alt="Maraimalainagar">
                  

                  <span>
                      Maraimalainagar
                  </span>

              </a>
          
        </div>
    </section>

     <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />

    <section class="recommendations">
        <h2>Our Orphanages</h2>

        <div class="swiper mySwiper">
            <div class="swiper-wrapper">
                
                    
                    
                    
                    <div class="swiper-slide">
                        <a class="card-link" href="/fieldv2/institution/INS-00016">
                            <div class="recommendation-card">
                                <div class="card-image-wrapper">
                                    <div class="spot-on-tag">Old Age Homes</div>
                                    
                                        <img class="card-image" src="https://media.thaagam.org/media/institutions/Aruvi.jpeg" alt="Aruvi Old Age Home">
                                    
                                </div>
                                <div class="card-title">Aruvi Old Age Home</div>
                                <div class="card-location">
                                    
                                        Ayanavaram, Chennai
                                    
                                </div>
                            </div>
                        </a>
                    </div>
                    
                    
                    
                    <div class="swiper-slide">
                        <a class="card-link" href="/fieldv2/institution/INS-00013">
                            <div class="recommendation-card">
                                <div class="card-image-wrapper">
                                    <div class="spot-on-tag">Old Age Homes</div>
                                    
                                        <img class="card-image" src="https://media.thaagam.org/media/institutions/kirubai_1.jpeg" alt="KIRUBAI OLD AGE HOME">
                                    
                                </div>
                                <div class="card-title">KIRUBAI OLD AGE HOME</div>
                                <div class="card-location">
                                    
                                        Perumbakkam, Chennai
                                    
                                </div>
                            </div>
                        </a>
                    </div>
                    
                    
                    
                    <div class="swiper-slide">
                        <a class="card-link" href="/fieldv2/institution/INS-00011">
                            <div class="recommendation-card">
                                <div class="card-image-wrapper">
                                    <div class="spot-on-tag">Mental Health</div>
                                    
                                        <img class="card-image" src="https://media.thaagam.org/media/institutions/Chemmancherry.jpeg" alt="Montfort Community Development Society - Chemmanchery">
                                    
                                </div>
                                <div class="card-title">Montfort Community Development Society - Chemmanchery</div>
                                <div class="card-location">
                                    
                                        Chemmancherry, Chennai
                                    
                                </div>
                            </div>
                        </a>
                    </div>
                    
                    
                    
                    <div class="swiper-slide">
                        <a class="card-link" href="/fieldv2/institution/INS-00010">
                            <div class="recommendation-card">
                                <div class="card-image-wrapper">
                                    <div class="spot-on-tag">Mental Health</div>
                                    
                                        <img class="card-image" src="https://media.thaagam.org/media/institutions/kannakinagar.jpeg" alt="Montfort Community Development Society- Kannaki Nagar">
                                    
                                </div>
                                <div class="card-title">Montfort Community Development Society- Kannaki Nagar</div>
                                <div class="card-location">
                                    
                                        Kannaki Nagar, Chennai
                                    
                                </div>
                            </div>
                        </a>
                    </div>
                    
                    
                    
                    <div class="swiper-slide">
                        <a class="card-link" href="/fieldv2/institution/INS-00008">
                            <div class="recommendation-card">
                                <div class="card-image-wrapper">
                                    <div class="spot-on-tag">Mental Health</div>
                                    
                                        <img class="card-image" src="https://media.thaagam.org/media/institutions/_MG_0653.jfif" alt="Montfort community development society- Perumbakam">
                                    
                                </div>
                                <div class="card-title">Montfort community development society- Perumbakam</div>
                                <div class="card-location">
                                    
                                        Perumbakkam, Chennai
                                    
                                </div>
                            </div>
                        </a>
                    </div>
                    
                    
                    
                    <div class="swiper-slide">
                        <a class="card-link" href="/fieldv2/institution/INS-00007">
                            <div class="recommendation-card">
                                <div class="card-image-wrapper">
                                    <div class="spot-on-tag">Children</div>
                                    
                                        <img class="card-image" src="https://media.thaagam.org/media/institutions/WhatsApp_Image_2026-04-22_at_10.23.09_AM.jpeg" alt="New Hope and New Life Children Home">
                                    
                                </div>
                                <div class="card-title">New Hope and New Life Children Home</div>
                                <div class="card-location">
                                    
                                        Perumbakkam, Chennai
                                    
                                </div>
                            </div>
                        </a>
                    </div>
                    
                    
                    
                    <div class="swiper-slide">
                        <a class="card-link" href="/fieldv2/institution/INS-00014">
                            <div class="recommendation-card">
                                <div class="card-image-wrapper">
                                    <div class="spot-on-tag">Old Age Homes</div>
                                    
                                        <img class="card-image" src="https://media.thaagam.org/media/institutions/vetri__new.jpg" alt="New Vetri Old Age Home">
                                    
                                </div>
                                <div class="card-title">New Vetri Old Age Home</div>
                                <div class="card-location">
                                    
                                        Selaiyur, Chennai
                                    
                                </div>
                            </div>
                        </a>
                    </div>
                    
                    
                    
                    <div class="swiper-slide">
                        <a class="card-link" href="/fieldv2/institution/INS-00015">
                            <div class="recommendation-card">
                                <div class="card-image-wrapper">
                                    <div class="spot-on-tag">Old Age Homes</div>
                                    
                                        <img class="card-image" src="https://media.thaagam.org/media/institutions/old_vetri.jpeg" alt="Old Vetri old age home">
                                    
                                </div>
                                <div class="card-title">Old Vetri old age home</div>
                                <div class="card-location">
                                    
                                        Chithalapakkam, Chennai
                                    
                                </div>
                            </div>
                        </a>
                    </div>
                    
                    
                    
                    <div class="swiper-slide">
                        <a class="card-link" href="/fieldv2/institution/INS-00012">
                            <div class="recommendation-card">
                                <div class="card-image-wrapper">
                                    <div class="spot-on-tag">Old Age Homes</div>
                                    
                                        <img class="card-image" src="https://media.thaagam.org/media/institutions/samy_old_age_home.webp" alt="Sami old age home">
                                    
                                </div>
                                <div class="card-title">Sami old age home</div>
                                <div class="card-location">
                                    
                                        Chithalapakkam, Chennai
                                    
                                </div>
                            </div>
                        </a>
                    </div>
                    
                    
                    
                    <div class="swiper-slide">
                        <a class="card-link" href="/fieldv2/institution/INS-00002">
                            <div class="recommendation-card">
                                <div class="card-image-wrapper">
                                    <div class="spot-on-tag">Old Age Homes</div>
                                    
                                        <img class="card-image" src="https://media.thaagam.org/media/institutions/Scope_India_old_age.webp" alt="Scope India Old Age Home">
                                    
                                </div>
                                <div class="card-title">Scope India Old Age Home</div>
                                <div class="card-location">
                                    
                                        Thirupapuliyur, Cuddalore
                                    
                                </div>
                            </div>
                        </a>
                    </div>
                    
                    
                    
                    <div class="swiper-slide">
                        <a class="card-link" href="/fieldv2/institution/INS-00003">
                            <div class="recommendation-card">
                                <div class="card-image-wrapper">
                                    <div class="spot-on-tag">Old Age Homes</div>
                                    
                                        <img class="card-image" src="https://media.thaagam.org/media/institutions/Scope_Old_AGe_NULM.webp" alt="Scope India Old Age Home NULM">
                                    
                                </div>
                                <div class="card-title">Scope India Old Age Home NULM</div>
                                <div class="card-location">
                                    
                                        Kammiyampettai, Cuddalore
                                    
                                </div>
                            </div>
                        </a>
                    </div>
                    
                    
                    
                    <div class="swiper-slide">
                        <a class="card-link" href="/fieldv2/institution/INS-00004">
                            <div class="recommendation-card">
                                <div class="card-image-wrapper">
                                    <div class="spot-on-tag">Illness</div>
                                    
                                        <img class="card-image" src="https://media.thaagam.org/media/institutions/WhatsApp_Image_2026-05-26_at_11.47.19_AM.jpeg" alt="Trichy Mentally Ill Home">
                                    
                                </div>
                                <div class="card-title">Trichy Mentally Ill Home</div>
                                <div class="card-location">
                                    
                                        Samayapuram, Trichy
                                    
                                </div>
                            </div>
                        </a>
                    </div>
                    
                    
                    
                    <div class="swiper-slide">
                        <a class="card-link" href="/fieldv2/institution/INS-00005">
                            <div class="recommendation-card">
                                <div class="card-image-wrapper">
                                    <div class="spot-on-tag">Old Age Homes</div>
                                    
                                        <img class="card-image" src="https://media.thaagam.org/media/institutions/WhatsApp_Image_2026-04-27_at_9.44.11_PM.jpeg" alt="AGA MAGIZH TRUST">
                                    
                                </div>
                                <div class="card-title">AGA MAGIZH TRUST</div>
                                <div class="card-location">
                                    
                                        Tirupplai, Madurai
                                    
                                </div>
                            </div>
                        </a>
                    </div>
                    
                    
                    
                    <div class="swiper-slide">
                        <a class="card-link" href="/fieldv2/institution/INS-00006">
                            <div class="recommendation-card">
                                <div class="card-image-wrapper">
                                    <div class="spot-on-tag">Illness</div>
                                    
                                        <img class="card-image" src="https://media.thaagam.org/media/institutions/WhatsApp_Image_2026-04-16_at_1.11.27_PM.jpeg" alt="Mary Mentally Retired home">
                                    
                                </div>
                                <div class="card-title">Mary Mentally Retired home</div>
                                <div class="card-location">
                                    
                                        Pagayam, Vellore
                                    
                                </div>
                            </div>
                        </a>
                    </div>
                    
                    
                    
                    <div class="swiper-slide">
                        <a class="card-link" href="/fieldv2/institution/INS-00001">
                            <div class="recommendation-card">
                                <div class="card-image-wrapper">
                                    <div class="spot-on-tag">Women</div>
                                    
                                        <img class="card-image" src="https://media.thaagam.org/media/institutions/WhatsApp_Image_2026-07-17_at_2.56.10_PM.jpeg" alt="Uthavum Uillangal Old Age Home">
                                    
                                </div>
                                <div class="card-title">Uthavum Uillangal Old Age Home</div>
                                <div class="card-location">
                                    
                                        Maraimalainagar, Chengalpet
                                    
                                </div>
                            </div>
                        </a>
                    </div>
                    
                

            </div>
        </div>
    </section>






    <!-- 2. Styling -->
    <style>
        .recommendations {
            padding: 20px 0;
            width: 100%;
        }

        .recommendations h2 {
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 15px;
            padding-left: 15px;
            color: #212529;
        }

        .swiper {
            width: 100%;
            padding: 0 15px 0px 15px;
        }

        /* Cards are now fluid to fit 2 in a row */
        .recommendation-card {
            width: 100%;
            cursor: pointer;
        }

        .card-image-wrapper {
            position: relative;
            width: 100%;
            height: 130px;
            /* Reduced height for 2-column layout */
            margin-bottom: 8px;
        }

        .card-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 8px;
        }

        /* Badges */

        .spot-on-tag {
            position: absolute;
            top: 6px;
            left: 6px;
            background: #fff;
            padding: 2px 4px;
            font-size: 9px;
            font-weight: 900;
            border-radius: 3px;
            color: #212529;
        }

        .overlay-text {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.4);
            border-radius: 8px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
            font-size: 16px;
            font-weight: 700;
        }

        /* Typography */
        .card-title {
            font-size: 14px;
            font-weight: 700;
            color: #212529;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .card-location {
            font-size: 12px;
            color: #717171;
            margin-bottom: 4px;
        }

        .price-row {
            display: flex;
            align-items: center;
            gap: 5px;
        }

        .current-price {
            font-size: 15px;
            font-weight: 800;
            color: #212529;
        }

        .discount {
            font-size: 12px;
            color: #1ab64f;
            font-weight: 700;
        }

        .taxes {
            font-size: 11px;
            color: #999;
        }

        .badge-top {
            position: absolute;
            top: 8px;
            right: 8px;
            background: #009dff;
            color: #fff;
            font-size: 10px;
            font-weight: 700;
            padding: 6px 8px;
            border-radius: 6px;
            z-index: 2;
        }
    </style>

    <!-- 3. Initialization Script -->
    
    












    <style>
        .hotel-results {
            width: 100%;
            max-width: 500px;

            display: flex;
            flex-direction: column;
            gap: 20px;


        }

        .hotel-vertical-card {
            background: #fff;
            border: 1px solid #e0e0e0;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        /* MEDIA HEADER */
        .card-media {
            position: relative;
            height: 160px;
        }

        .image-split {
            display: flex;
            height: 100%;
            gap: 2px;
        }

        .image-split img {
            width: 50%;
            height: 100%;
            object-fit: cover;
        }









        /* CARD CONTENT */
        .card-body {
            padding: 10px 15px 10px 15px;
        }

        .hotel-name {
            font-size: 17px;
            font-weight: 700;
            color: #212529;
            margin: 0 0 5px 0;
            line-height: 1.3;
        }

        .hotel-address {
            font-size: 13px;
            color: #717171;
            margin: 0 0 12px 0;
        }



        .price-section {
            display: flex;
            align-items: baseline;
            gap: 8px;
            margin-bottom: 2px;
        }

        /* .final-price {
    font-size: 19px;
    font-weight: 800;
    color: #212529;
} */



        .discount-label {
            font-size: 14px;
            color: #1ab64f;
            font-weight: 700;
        }



        /* FOOTER ROW */


        .price-for {
            font-size: 14px;
            color: #888;
        }

        .category-link {
            font-size: 15px;
            color: #0084ff;
            font-weight: 600;
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 4px;
        }
    </style>

    <section class="hotel-results">
        <h2>Vrishasena Orphanage</h2>

        
            
                
                
                <a class="card-link" href="/fieldv2/institution/INS-00016">
                    <article class="hotel-vertical-card">
                        <div class="card-media">
                            
                                <div class="badge-top">30 members</div>
                            
                            <div class="image-split">
                                
                                    <img src="https://media.thaagam.org/media/institutions/Aruvi.jpeg" alt="Aruvi Old Age Home">
                                    <img src="https://media.thaagam.org/media/institutions/Aruvi.jpeg" alt="Aruvi Old Age Home">
                                
                            </div>
                        </div>

                        <div class="card-body">
                            <h3 class="hotel-name">Aruvi Old Age Home</h3>
                            <p class="hotel-address">
                                
                                    Ayanavaram, Chennai
                                
                            </p>

                            <div class="price-section">
                                <p class="approx-text">Category</p>
                                <span class="final-price">Old Age Homes</span>
                            </div>
                        </div>
                    </article>
                </a>
            
                
                
                <a class="card-link" href="/fieldv2/institution/INS-00013">
                    <article class="hotel-vertical-card">
                        <div class="card-media">
                            
                                <div class="badge-top">20 members</div>
                            
                            <div class="image-split">
                                
                                    <img src="https://media.thaagam.org/media/institutions/kirubai_1.jpeg" alt="KIRUBAI OLD AGE HOME">
                                    <img src="https://media.thaagam.org/media/institutions/kirubai_1.jpeg" alt="KIRUBAI OLD AGE HOME">
                                
                            </div>
                        </div>

                        <div class="card-body">
                            <h3 class="hotel-name">KIRUBAI OLD AGE HOME</h3>
                            <p class="hotel-address">
                                
                                    Perumbakkam, Chennai
                                
                            </p>

                            <div class="price-section">
                                <p class="approx-text">Category</p>
                                <span class="final-price">Old Age Homes</span>
                            </div>
                        </div>
                    </article>
                </a>
            
                
                
                <a class="card-link" href="/fieldv2/institution/INS-00011">
                    <article class="hotel-vertical-card">
                        <div class="card-media">
                            
                                <div class="badge-top">30 members</div>
                            
                            <div class="image-split">
                                
                                    <img src="https://media.thaagam.org/media/institutions/Chemmancherry.jpeg" alt="Montfort Community Development Society - Chemmanchery">
                                    <img src="https://media.thaagam.org/media/institutions/Chemmancherry.jpeg" alt="Montfort Community Development Society - Chemmanchery">
                                
                            </div>
                        </div>

                        <div class="card-body">
                            <h3 class="hotel-name">Montfort Community Development Society - Chemmanchery</h3>
                            <p class="hotel-address">
                                
                                    Chemmancherry, Chennai
                                
                            </p>

                            <div class="price-section">
                                <p class="approx-text">Category</p>
                                <span class="final-price">Mental Health</span>
                            </div>
                        </div>
                    </article>
                </a>
            
                
                
                <a class="card-link" href="/fieldv2/institution/INS-00010">
                    <article class="hotel-vertical-card">
                        <div class="card-media">
                            
                                <div class="badge-top">25 members</div>
                            
                            <div class="image-split">
                                
                                    <img src="https://media.thaagam.org/media/institutions/kannakinagar.jpeg" alt="Montfort Community Development Society- Kannaki Nagar">
                                    <img src="https://media.thaagam.org/media/institutions/kannakinagar.jpeg" alt="Montfort Community Development Society- Kannaki Nagar">
                                
                            </div>
                        </div>

                        <div class="card-body">
                            <h3 class="hotel-name">Montfort Community Development Society- Kannaki Nagar</h3>
                            <p class="hotel-address">
                                
                                    Kannaki Nagar, Chennai
                                
                            </p>

                            <div class="price-section">
                                <p class="approx-text">Category</p>
                                <span class="final-price">Mental Health</span>
                            </div>
                        </div>
                    </article>
                </a>
            
                
                
                <a class="card-link" href="/fieldv2/institution/INS-00008">
                    <article class="hotel-vertical-card">
                        <div class="card-media">
                            
                                <div class="badge-top">18 members</div>
                            
                            <div class="image-split">
                                
                                    <img src="https://media.thaagam.org/media/institutions/_MG_0653.jfif" alt="Montfort community development society- Perumbakam">
                                    <img src="https://media.thaagam.org/media/institutions/_MG_0653.jfif" alt="Montfort community development society- Perumbakam">
                                
                            </div>
                        </div>

                        <div class="card-body">
                            <h3 class="hotel-name">Montfort community development society- Perumbakam</h3>
                            <p class="hotel-address">
                                
                                    Perumbakkam, Chennai
                                
                            </p>

                            <div class="price-section">
                                <p class="approx-text">Category</p>
                                <span class="final-price">Mental Health</span>
                            </div>
                        </div>
                    </article>
                </a>
            
                
                
                <a class="card-link" href="/fieldv2/institution/INS-00007">
                    <article class="hotel-vertical-card">
                        <div class="card-media">
                            
                                <div class="badge-top">60 members</div>
                            
                            <div class="image-split">
                                
                                    <img src="https://media.thaagam.org/media/institutions/WhatsApp_Image_2026-04-22_at_10.23.09_AM.jpeg" alt="New Hope and New Life Children Home">
                                    <img src="https://media.thaagam.org/media/institutions/WhatsApp_Image_2026-04-22_at_10.23.09_AM.jpeg" alt="New Hope and New Life Children Home">
                                
                            </div>
                        </div>

                        <div class="card-body">
                            <h3 class="hotel-name">New Hope and New Life Children Home</h3>
                            <p class="hotel-address">
                                
                                    Perumbakkam, Chennai
                                
                            </p>

                            <div class="price-section">
                                <p class="approx-text">Category</p>
                                <span class="final-price">Children</span>
                            </div>
                        </div>
                    </article>
                </a>
            
                
                
                <a class="card-link" href="/fieldv2/institution/INS-00014">
                    <article class="hotel-vertical-card">
                        <div class="card-media">
                            
                                <div class="badge-top">22 members</div>
                            
                            <div class="image-split">
                                
                                    <img src="https://media.thaagam.org/media/institutions/vetri__new.jpg" alt="New Vetri Old Age Home">
                                    <img src="https://media.thaagam.org/media/institutions/vetri__new.jpg" alt="New Vetri Old Age Home">
                                
                            </div>
                        </div>

                        <div class="card-body">
                            <h3 class="hotel-name">New Vetri Old Age Home</h3>
                            <p class="hotel-address">
                                
                                    Selaiyur, Chennai
                                
                            </p>

                            <div class="price-section">
                                <p class="approx-text">Category</p>
                                <span class="final-price">Old Age Homes</span>
                            </div>
                        </div>
                    </article>
                </a>
            
                
                
                <a class="card-link" href="/fieldv2/institution/INS-00015">
                    <article class="hotel-vertical-card">
                        <div class="card-media">
                            
                                <div class="badge-top">15 members</div>
                            
                            <div class="image-split">
                                
                                    <img src="https://media.thaagam.org/media/institutions/old_vetri.jpeg" alt="Old Vetri old age home">
                                    <img src="https://media.thaagam.org/media/institutions/old_vetri.jpeg" alt="Old Vetri old age home">
                                
                            </div>
                        </div>

                        <div class="card-body">
                            <h3 class="hotel-name">Old Vetri old age home</h3>
                            <p class="hotel-address">
                                
                                    Chithalapakkam, Chennai
                                
                            </p>

                            <div class="price-section">
                                <p class="approx-text">Category</p>
                                <span class="final-price">Old Age Homes</span>
                            </div>
                        </div>
                    </article>
                </a>
            
                
                
                <a class="card-link" href="/fieldv2/institution/INS-00012">
                    <article class="hotel-vertical-card">
                        <div class="card-media">
                            
                                <div class="badge-top">25 members</div>
                            
                            <div class="image-split">
                                
                                    <img src="https://media.thaagam.org/media/institutions/samy_old_age_home.webp" alt="Sami old age home">
                                    <img src="https://media.thaagam.org/media/institutions/samy_old_age_home.webp" alt="Sami old age home">
                                
                            </div>
                        </div>

                        <div class="card-body">
                            <h3 class="hotel-name">Sami old age home</h3>
                            <p class="hotel-address">
                                
                                    Chithalapakkam, Chennai
                                
                            </p>

                            <div class="price-section">
                                <p class="approx-text">Category</p>
                                <span class="final-price">Old Age Homes</span>
                            </div>
                        </div>
                    </article>
                </a>
            
                
                
                <a class="card-link" href="/fieldv2/institution/INS-00002">
                    <article class="hotel-vertical-card">
                        <div class="card-media">
                            
                                <div class="badge-top">40 members</div>
                            
                            <div class="image-split">
                                
                                    <img src="https://media.thaagam.org/media/institutions/Scope_India_old_age.webp" alt="Scope India Old Age Home">
                                    <img src="https://media.thaagam.org/media/institutions/Scope_India_old_age.webp" alt="Scope India Old Age Home">
                                
                            </div>
                        </div>

                        <div class="card-body">
                            <h3 class="hotel-name">Scope India Old Age Home</h3>
                            <p class="hotel-address">
                                
                                    Thirupapuliyur, Cuddalore
                                
                            </p>

                            <div class="price-section">
                                <p class="approx-text">Category</p>
                                <span class="final-price">Old Age Homes</span>
                            </div>
                        </div>
                    </article>
                </a>
            
                
                
                <a class="card-link" href="/fieldv2/institution/INS-00003">
                    <article class="hotel-vertical-card">
                        <div class="card-media">
                            
                                <div class="badge-top">40 members</div>
                            
                            <div class="image-split">
                                
                                    <img src="https://media.thaagam.org/media/institutions/Scope_Old_AGe_NULM.webp" alt="Scope India Old Age Home NULM">
                                    <img src="https://media.thaagam.org/media/institutions/Scope_Old_AGe_NULM.webp" alt="Scope India Old Age Home NULM">
                                
                            </div>
                        </div>

                        <div class="card-body">
                            <h3 class="hotel-name">Scope India Old Age Home NULM</h3>
                            <p class="hotel-address">
                                
                                    Kammiyampettai, Cuddalore
                                
                            </p>

                            <div class="price-section">
                                <p class="approx-text">Category</p>
                                <span class="final-price">Old Age Homes</span>
                            </div>
                        </div>
                    </article>
                </a>
            
                
                
                <a class="card-link" href="/fieldv2/institution/INS-00004">
                    <article class="hotel-vertical-card">
                        <div class="card-media">
                            
                                <div class="badge-top">60 members</div>
                            
                            <div class="image-split">
                                
                                    <img src="https://media.thaagam.org/media/institutions/WhatsApp_Image_2026-05-26_at_11.47.19_AM.jpeg" alt="Trichy Mentally Ill Home">
                                    <img src="https://media.thaagam.org/media/institutions/WhatsApp_Image_2026-05-26_at_11.47.19_AM.jpeg" alt="Trichy Mentally Ill Home">
                                
                            </div>
                        </div>

                        <div class="card-body">
                            <h3 class="hotel-name">Trichy Mentally Ill Home</h3>
                            <p class="hotel-address">
                                
                                    Samayapuram, Trichy
                                
                            </p>

                            <div class="price-section">
                                <p class="approx-text">Category</p>
                                <span class="final-price">Illness</span>
                            </div>
                        </div>
                    </article>
                </a>
            
                
                
                <a class="card-link" href="/fieldv2/institution/INS-00005">
                    <article class="hotel-vertical-card">
                        <div class="card-media">
                            
                                <div class="badge-top">20 members</div>
                            
                            <div class="image-split">
                                
                                    <img src="https://media.thaagam.org/media/institutions/WhatsApp_Image_2026-04-27_at_9.44.11_PM.jpeg" alt="AGA MAGIZH TRUST">
                                    <img src="https://media.thaagam.org/media/institutions/WhatsApp_Image_2026-04-27_at_9.44.11_PM.jpeg" alt="AGA MAGIZH TRUST">
                                
                            </div>
                        </div>

                        <div class="card-body">
                            <h3 class="hotel-name">AGA MAGIZH TRUST</h3>
                            <p class="hotel-address">
                                
                                    Tirupplai, Madurai
                                
                            </p>

                            <div class="price-section">
                                <p class="approx-text">Category</p>
                                <span class="final-price">Old Age Homes</span>
                            </div>
                        </div>
                    </article>
                </a>
            
                
                
                <a class="card-link" href="/fieldv2/institution/INS-00006">
                    <article class="hotel-vertical-card">
                        <div class="card-media">
                            
                                <div class="badge-top">25 members</div>
                            
                            <div class="image-split">
                                
                                    <img src="https://media.thaagam.org/media/institutions/WhatsApp_Image_2026-04-16_at_1.11.27_PM.jpeg" alt="Mary Mentally Retired home">
                                    <img src="https://media.thaagam.org/media/institutions/WhatsApp_Image_2026-04-16_at_1.11.27_PM.jpeg" alt="Mary Mentally Retired home">
                                
                            </div>
                        </div>

                        <div class="card-body">
                            <h3 class="hotel-name">Mary Mentally Retired home</h3>
                            <p class="hotel-address">
                                
                                    Pagayam, Vellore
                                
                            </p>

                            <div class="price-section">
                                <p class="approx-text">Category</p>
                                <span class="final-price">Illness</span>
                            </div>
                        </div>
                    </article>
                </a>
            
                
                
                <a class="card-link" href="/fieldv2/institution/INS-00001">
                    <article class="hotel-vertical-card">
                        <div class="card-media">
                            
                                <div class="badge-top">40 members</div>
                            
                            <div class="image-split">
                                
                                    <img src="https://media.thaagam.org/media/institutions/WhatsApp_Image_2026-07-17_at_2.56.10_PM.jpeg" alt="Uthavum Uillangal Old Age Home">
                                    <img src="https://media.thaagam.org/media/institutions/WhatsApp_Image_2026-07-17_at_2.56.10_PM.jpeg" alt="Uthavum Uillangal Old Age Home">
                                
                            </div>
                        </div>

                        <div class="card-body">
                            <h3 class="hotel-name">Uthavum Uillangal Old Age Home</h3>
                            <p class="hotel-address">
                                
                                    Maraimalainagar, Chengalpet
                                
                            </p>

                            <div class="price-section">
                                <p class="approx-text">Category</p>
                                <span class="final-price">Women</span>
                            </div>
                        </div>
                    </article>
                </a>
            
        
        <div style="margin-bottom: 70px;"></div>
    </section>
    

</div>

<style>
    /* =========================================================
   ✅ ADDED FOR TABLET RESPONSIVENESS AND DESKTOP HIDING ✅
   ========================================================= */

    /* 1. Make it fluid and responsive for Tablets (screens up to 768px) */
    @media screen and (max-width: 768px) {
        .full-container {
            max-width: 100% !important;
            padding: 20px !important;
        }

        .hotel-results {
            max-width: 100% !important;
        }
    }

    /* 2. Hide the ENTIRE design when screen width hits 769px or above */
    @media screen and (min-width: 769px) {
        .full-container {
            display: none !important;
        }
    }
</style>



















<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-P4DSCX4G"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>






<!--  -->
<!--  -->
<!--  -->




<!-- End Google Tag Manager (noscript) -->
<footer>
    

<footer>
    <div class="footer_top">
      <div class="container footer_cont">
        <div class="row">
          <div class="col-xl-3 col-md-4 col-12 mb-5">
            <div class="footer_container">
              <div class="footer-head hide">
                <a href="/packages_form.html" aria-label="logo"><img src="/static/website/assets/images/logo/logo.webp" alt="logo"></a>
              </div>
              <ul class="footer_address hide">
                <li>
                  <p><span>Address : </span><a href="https://maps.app.goo.gl/r8k4eQWY9zNC6Fwa6" aria-label="address">1-42, Lankala Gannavaram, P.Gannavaram (M), Dr. B.R. Ambedkar Konaseema (D), Andhra Pradesh - 533240</a></p>
                </li>

                <li>
                  <p><span>E-mail : </span><a href="mailto:vrishasenafoundation@gmail.com" aria-label="mail">vrishasenafoundation@gmail.com</a></p>
                </li>

                <li>
                  <p><span>Phone : </span><a href="tel:+919951672673" aria-label="mobile-number">+91 9951 672 673</a></p>
                </li>
              </ul>
            </div>
          </div>

          <div class="col-xl-3 col-md-4 col-6">
            <div class="footer_container">
              <div class="footer-head">
                <h5>Our Support</h5>
              </div>
              <ul class="footer_address">
                <li><a href="https://support.m7corporation.com/raise/thaagam-foundation/" aria-label="help-desk">Support </a> </li>
                <li><a href="/privacy_policy" aria-label="privacy-policy">Privacy Policy</a></li>
                <li><a href="/Refund_Policy" aria-label="refund-policy">Refund Policy</a></li>
                <li><a href="/terms_conditions" aria-label="terms-conditions">Terms & Conditions</a></li>
                <li><a href="/Report_bugs" aria-label="report-bugs">Report bugs</a></li>
                <li><a href="/contact" aria-label="contact">Contact Us</a></li>


              </ul>
            </div>
          </div>


          <div class="col-xl-3 col-md-4 col-6">
            <div class="footer_container">
              <div class="footer-head">
                <h5>Quick Links</h5>
              </div>
              <ul class="footer_address">
                <li><a href="/food" aria-label="about-us"> Fight Hunger Together</a></li>
                <li><a href="/environment" aria-label="about-us">Creating a Better Environment</a></li>
                <li><a href="/about" aria-label="about-us">About Us</a></li>
                <li><a href="/homeless" aria-label="homeless-food">Feed a Homeless Person</a></li>
                <li><a href="/egg_milk" aria-label="egg_milk">Give Egg & Milk</a></li>
                <li><a href="/causes" aria-label="causes">All Causes</a></li>
                <li><a href="https://hrms.m7corporation.com/register/D6KF0W/" aria-label="hr-portal">Careers</a></li>
                <li><a href="/volunteer/volunteer_logout" aria-label="volunteer">Volunteer</a></li>
              </ul>
            </div>
          </div>

          <div class="col-xl-3 col-md-4 col-6">
            <div class="footer_container">
              <div class="footer-head">
                <h5>Connect With us</h5>
              </div>
              <div class="d-flex align-items-center gap-2 gap-md-5">
                <a href="https://www.facebook.com/people/Vrishasena-Foundation-NGO/100077294806563/" aria-label="facebook"><i class="footer-icons facebook ri-facebook-circle-fill"></i></a>
                <a href="https://www.instagram.com/vrishasenafoundation/" aria-label="instagram"><i class="footer-icons ri-instagram-fill"></i></a>
                <a href="https://twitter.com/vrishasenango" aria-label="twitter"><i class="footer-icons twitter ri-twitter-x-fill"></i></a>
                <a href="https://www.linkedin.com/company/vrishasenafoundation/" aria-label="linked-in"><i class="footer-icons linkedin ri-linkedin-box-fill"></i></a>
                <a href="https://www.youtube.com/@vrishasenafoundation9777" aria-label="youtube"><i class="footer-icons youtube ri-youtube-fill"></i></a>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    <div class="footer_bottom">
      <div class="container">
        <div class="row">
          <div class="col-12 footer_bottom_container text-center" >
            <p>© 2025 <a href="/packages_form.html" aria-label="Go to Vrishasena Foundation Homepage">Vrishasena Foundation</a> All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </div>

  </footer>
</footer>



  <!-- Load CounterUp plugin -->


  
<!--  -->

`;
