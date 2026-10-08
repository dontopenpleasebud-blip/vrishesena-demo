# 🚀 Thaagam Foundation Web Application — Backend & API Handover Guide

> **Target Audience**: Backend Developers, Full-Stack Engineers, and Frontend Integrators  
> **Repository Root**: `d:\DevSpace\not_imp\www.thaagam.org`  
> **React App Location**: `d:\DevSpace\not_imp\www.thaagam.org\thaagam-app`  
> **Frontend Stack**: React 18, Vite 8, React Router v7, Vanilla CSS, Splide.js  
> **Dev Server**: `http://localhost:5173/` | **Build Command**: `npm run build`

---

## 📌 Table of Contents
1. [Architecture & Workspace Overview](#1-architecture--workspace-overview)
2. [What is Built & Live (Current Status)](#2-what-is-built--live-current-status)
3. [Forms & Endpoints Requiring Backend Integration](#3-forms--endpoints-requiring-backend-integration)
4. [Authentication & Post-Login / Register Routes](#4-authentication--post-login--register-routes)
5. [Pages & Sub-Portals Still to be Created](#5-pages--sub-portals-still-to-be-created)
6. [Step-by-Step API Implementation Guide for Frontend](#6-step-by-step-api-implementation-guide-for-frontend)
7. [Environment Variables & Deployment Checklist](#7-environment-variables--deployment-checklist)

---

## 1. Architecture & Workspace Overview

- **Source Code**: All React source files reside in `thaagam-app/src/`.
- **Static Assets**: Images, icons, and original CSS are served from `thaagam-app/public/static/` and `https://media.thaagam.org/`.
- **Routing**: Centralized in [`src/App.jsx`](file:///d:/DevSpace/not_imp/www.thaagam.org/thaagam-app/src/App.jsx) with over 300 clean canonical and alias routes.
- **Dynamic Causes Engine**: [`src/pages/CausesDetail.jsx`](file:///d:/DevSpace/not_imp/www.thaagam.org/thaagam-app/src/pages/CausesDetail.jsx) automatically code-splits all 30 remaining campaign data files located in `src/pages/causes-detail-data/` on demand.

---

## 2. What is Built & Live (Current Status)

The following core modules are fully styled, responsive, and live on the React application:

| Page / Hub | Routes | Component | Key Features |
| :--- | :--- | :--- | :--- |
| **Home Page** | `/`, `/packages_form.html`, `/packages_form`, `/index.html` | `<Home />` | Hero, quick donation wizard, cause cards, stats counter |
| **About Us** | `/about`, `/about/index.html` | `<About />` | NGO story, vision, 80G tax benefit highlights, team |
| **Causes Hub** | `/causes`, `/causes/index.html`, `/causes-detail` | `<Causes />` | Category filtering, campaign directory, search |
| **Animal Hub** | `/animal`, `/causes-detail/stray_dog`, `/cow_feeding`, `/dog_collar` | `<Animal />` | Feeding donation wizard, photo on parcel, dog/cow tiers |
| **Egg & Milk** | `/egg_milk`, `/causes-detail/egg_milk` | `<EggMilk />` | Parcel counter, service date selector, Splide slider |
| **Homeless** | `/homeless`, `/causes-detail/homeless` | `<Homeless />` | Meal booking, parcel name preview, date picker |
| **Food Hub** | `/food`, `/causes-detail/food` | `<Food />` | Briyani, thaali, water donation cards, package selector |
| **Environment** | `/environment`, `/causes-detail/environment` | `<Environment />` | Tree plantation wizard, sapling counter, video showcase |
| **Nepal Relief** | `/nepal_flood`, `/causes-detail/Nepal` | `<NepalFlood />` | Flood relief kits, emergency donation tiers |
| **Orphanage Hub** | `/orphanage`, `/orphanage/index.html` | `<Orphanage />` | Location filtering (Chennai, Madurai, Trichy, etc.) |
| **Education Hub**| `/education`, `/CrowdFundEducation` | `<Education />` | Student categories (School, Engg, Arts), live search |
| **Healthcare Hub**| `/healthcare`, `/medical`, `/CrowdFundHealthcare`| `<Healthcare />` | Patient categories, surgery/dialysis crowdfunding |
| **Livelihood Hub**| `/livelihood`, `/livelihood/index.html` | `<Livelihood />` | Career crowdfunding, category filters, live search |
| **Celebrations** | `/celebration`, `/celebration/index.html` | `<Celebration />` | Virtual cake cutting, anniversary & birthday meal booking |
| **30 Dynamic Causes**| `/causes-detail/:slug` (30 individual campaigns) | `<CausesDetail />` | Code-split data modules, donation calculator, modal |
| **Contact Us** | `/contact`, `/contact/index.html` | `<Contact />` | Query submission form, contact info, interactive maps |
| **Blog & News** | `/blog`, `/new-blog` | `<Blog />`, `<NewBlog />` | Article reading, category badges |
| **Gallery** | `/gallery`, `/gallery/index.html` | `<Gallery />` | Filterable photos by initiative |
| **Donor Profile** | `/profile`, `/profile/index.html`, `/donor/login` | `<Profile />` | OTP login, profile viewer, receipt download |
| **Volunteer Hub** | `/volunteer`, `/volunteer/volunteer_login` | `<Volunteer />`, `<VolunteerLogin />` | Volunteer onboarding, event signups |
| **Report Bugs** | `/report_bugs`, `/report-bugs` | `<ReportBugs />` | Bug reporting form, screenshot upload |
| **Legal Pages** | `/privacy_policy`, `/refund_policy`, `/terms_conditions` | Dedicated Components | Full legal compliance documents |

---

## 3. Forms & Endpoints Requiring Backend Integration

Below are the exact forms currently in the frontend that require API connection:

### A. One-Time Donation Gateway (`/payment/` or Razorpay/Cashfree Order)
- **Pages**: All 36 cause pages, Home page donation wizard, Orphanage, Healthcare, Education.
- **Form IDs**: `#quick-donation-form`, `#trackDonationForm`, `#donation-form`.
- **Payload Required**:
  ```json
  {
    "donor_name": "Ravi Kumar",
    "donor_phone": "+919876543210",
    "donor_email": "ravi@example.com",
    "service_date": "2026-10-15",
    "count": 50,
    "unit_price": 30,
    "packages": ["special_sweet", "curd_rice"],
    "photo_addon": true,
    "parcel_name": "In Memory of Late Smt. Lakshmi",
    "total_amount": 1550,
    "campaign_slug": "egg_milk",
    "pan_number": "ABCDE1234F"
  }
  ```
- **Backend Flow**:
  1. Frontend calls `POST /api/donations/create-order/`.
  2. Backend initializes payment gateway order (e.g. Razorpay `order_id` or Cashfree `payment_session_id`) and returns keys.
  3. Frontend triggers checkout popup.
  4. On success, frontend sends signature to `POST /api/donations/verify-payment/`.
  5. Backend marks donation paid, sends WhatsApp receipt, and emits instant tax 80G receipt PDF.

### B. Recurring Monthly Donation Subscription (`/subscription_payment/`)
- **Pages**: `#load-subscription-modal/` on Navbar, Footer, and Cause details.
- **Form ID**: `.subscription_form`.
- **Payload**:
  ```json
  {
    "donor_name": "Ananya Sharma",
    "donor_phone": "+919876543211",
    "monthly_amount": 1000,
    "plan_id": "sub_monthly_feed_child",
    "start_date": "2026-10-05"
  }
  ```
- **Backend Flow**: Setup Razorpay Subscriptions / e-Mandate or UPI Autopay.

### C. Abandoned Lead Auto-Save (`/api/donation-lead-autosave/`)
- **Current Behavior**: When a user inputs their phone or name in `#donorMob` or `#donorname`, the frontend debounces (after 800ms) and sends an autosave lead.
- **Payload**:
  ```json
  {
    "phone": "9876543210",
    "name": "Ravi",
    "campaign": "homeless",
    "intent_amount": 1200
  }
  ```
- **Purpose**: Enables CRM / WhatsApp follow-up if payment is not completed within 15 minutes.

### D. Contact & Feedback Form
- **Page**: [`src/pages/Contact.jsx`](file:///d:/DevSpace/not_imp/www.thaagam.org/thaagam-app/src/pages/Contact.jsx).
- **Form ID**: `#contact-form`.
- **Target Endpoint**: `POST /api/contact/submit/`.
- **Fields**: `first_name`, `last_name`, `email`, `phone`, `subject`, `message`.

### E. Bug Report Form
- **Page**: [`src/pages/ReportBugs.jsx`](file:///d:/DevSpace/not_imp/www.thaagam.org/thaagam-app/src/pages/ReportBugs.jsx).
- **Form ID**: `#bug-report-form`.
- **Target Endpoint**: `POST /api/bugs/report/`.
- **Fields**: `name`, `email`, `url`, `severity`, `description`, `file_attachment`.

### F. Celebration & Virtual Birthday Cutting Booking
- **Page**: [`src/pages/Celebration.jsx`](file:///d:/DevSpace/not_imp/www.thaagam.org/thaagam-app/src/pages/Celebration.jsx).
- **Target Endpoint**: `POST /api/celebrations/book/`.
- **Fields**: `celebrant_name`, `celebration_type` (Birthday/Anniversary), `date`, `cake_weight`, `meal_count`, `video_live_stream_requested` (boolean).

---

## 4. Authentication & Post-Login / Register Routes

The original site includes multiple user types: **Donors**, **Volunteers**, and **Beneficiaries/Students**.

### A. Donor Portal
1. **Login Flow**:
   - `POST /api/auth/donor/send-otp/`: takes `{ "phone": "9876543210" }`.
   - `POST /api/auth/donor/verify-otp/`: takes `{ "phone": "9876543210", "otp": "123456" }`.
   - Returns `{ "token": "JWT...", "user": { "id": 1, "name": "...", "email": "..." } }`.
2. **Google OAuth SSO**:
   - `POST /api/auth/google/`: sends Google ID Token / credential, returns JWT.
3. **Protected Post-Login Routes to Create/Enhance**:
   - `/profile` (or `/donor/dashboard`):
     - Displays donor summary (Total Donated, Lives Touched).
     - Table of Past Donations with filters.
     - "Download 80G Tax Exemption Receipt" button (`GET /api/donations/:id/receipt-pdf/`).
     - Address & PAN card profile update form (`PUT /api/donor/profile/`).

### B. Volunteer Portal
1. **Authentication**:
   - Routes: `/volunteer/volunteer_login`, `/volunteer/volunteer_logout`.
   - Endpoints:
     - `POST /volunteer/api/send-otp/`
     - `POST /volunteer/api/verify-otp/`
2. **Post-Login Routes Needed**:
   - `/volunteer/my_services` (Volunteer Dashboard):
     - Lists hours contributed, upcoming volunteering events, certificates earned.
   - `/volunteer/profile`:
     - Edit emergency contact, T-shirt size, blood group, preferred location.

---

## 5. Pages & Sub-Portals Still to be Created

The following static directories exist in the root folder and can either be integrated into the main app or connected to backend models:

### 1. Education Student Campaigns (64 Profiles)
- **Directory**: `CrowdFundEducation/donationgrid_id/` (Folders: `496`, `562`, `593`, `626`, etc.).
- **Requirement**:
  - Rather than 64 static files, create a single dynamic route:
    ```jsx
    <Route path="/CrowdFundEducation/donationgrid_id/:studentId" element={<StudentDetail />} />
    ```
  - Fetch student details from API: `GET /api/education/students/:id/`.
- **Login & Register**:
  - `/CrowdFundEducation/user_login/` (Student login).
  - `/CrowdFundEducation/education_user_register/` (Student applying for scholarship/fees).

### 2. Healthcare Patient Campaigns (2 Profiles)
- **Directory**: `CrowdFundHealthcare/donation_details/` (Folders: `18`, `83`).
- **Requirement**:
  - Route: `/CrowdFundHealthcare/donation_details/:patientId`.
  - Fetch patient diagnosis, hospital estimate, and target from `GET /api/healthcare/patients/:id/`.
- **Login & Register**:
  - `/CrowdFundHealthcare/healthcare_login/`.
  - `/CrowdFundHealthcare/healthcare_user_register/`.

### 3. Livelihood Sub-Campaigns (12 Profiles)
- **Directory**: `livelihood/campaign/` (Folders: `1`, `2`, `3`, `37`, `39`, etc.).
- **Requirement**:
  - Route: `/livelihood/campaign/:campaignId`.
  - API: `GET /api/livelihood/campaigns/:id/`.
- **Login & Register**:
  - `/livelihood/login/` & `/livelihood/livelihood_user_register/`.

### 4. Volunteer Event Portals
- **Directory**: `volunteer/`
- **Sub-pages to route**:
  - `/volunteer/chennai_category` (Chennai events list).
  - `/volunteer/delhi_category` (Delhi events list).
  - `/volunteer/volunteer_service` (Service sign-up).
  - `/volunteer/volunteer_user_upcoming_events` (Events calendar).

### 5. Field Verification Reports
- **Directory**: `fieldv2/institution/` (15 institution verification reports: `INS-00001`, `INS-00002`, etc.).
- **Requirement**: Route `/fieldv2/institution/:institutionId` displaying verified NGO / school inspection photos and geo-tags.

---

## 6. Step-by-Step API Implementation Guide for Frontend

### Step 1: Create an API Client
Create `src/api/client.js`:
```javascript
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.thaagam.org';

export async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem('thaagam_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || 'API request failed');
  }
  return data;
}
```

### Step 2: Hooking into Form Handlers
In components like [`EggMilk.jsx`](file:///d:/DevSpace/not_imp/www.thaagam.org/thaagam-app/src/pages/EggMilk.jsx), replace simulated timeouts with:
```javascript
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  // ... existing field validations ...

  try {
    btn.disabled = true;
    btn.textContent = 'Processing Payment...';
    
    // 1. Create Order
    const orderData = await apiRequest('/api/donations/create-order/', {
      method: 'POST',
      body: JSON.stringify({
        donor_name: nameEl.value,
        donor_phone: mobEl.value,
        service_date: dateEl.value,
        count: countEl.value,
        total_amount: totalEl.value,
        campaign: 'egg_milk',
      }),
    });

    // 2. Open Razorpay Checkout
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: orderData.amount,
      currency: 'INR',
      order_id: orderData.order_id,
      name: 'Thaagam Foundation',
      description: 'Egg & Milk Donation',
      handler: async function (response) {
        // 3. Verify Payment
        await apiRequest('/api/donations/verify-payment/', {
          method: 'POST',
          body: JSON.stringify(response),
        });
        navigate('/donation/success?order_id=' + orderData.order_id);
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (err) {
    alert(err.message);
  } finally {
    btn.disabled = false;
    btn.textContent = 'Donate Now';
  }
});
```

---

## 7. Environment Variables & Deployment Checklist

### A. Environment Configuration (`thaagam-app/.env`)
Create `.env` in `thaagam-app/`:
```env
VITE_API_BASE_URL=https://api.thaagam.org
VITE_RAZORPAY_KEY=rzp_live_xxxxxxxxxxxx
VITE_GOOGLE_CLIENT_ID=xxxxxxxx.apps.googleusercontent.com
VITE_ENABLE_ANALYTICS=true
```

### B. Deployment Checklist
1. **CORS Policy**: Ensure the backend allows `https://www.thaagam.org` and `http://localhost:5173`.
2. **SPA Fallback Routing**: When deploying with Nginx / Apache / Cloudflare Pages / AWS S3, configure URL rewriting to redirect all unknown routes to `/index.html`:
   - **Nginx configuration**:
     ```nginx
     location / {
         try_files $uri $uri/ /index.html;
     }
     ```
3. **SSL Certificate**: HTTPS is strictly required for camera access, Razorpay popups, and secure cookies.
4. **Cache Policy**:
   - `index.html`: `Cache-Control: no-cache`.
   - `/assets/*` (hashed JS & CSS): `Cache-Control: max-age=31536000, immutable`.
