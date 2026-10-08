import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Causes from './pages/Causes';
import NewBlog from './pages/NewBlog';
import Blog from './pages/Blog';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import PrivacyPolicy from './pages/PrivacyPolicy';
import EggMilk from './pages/EggMilk';
import Homeless from './pages/Homeless';
import Environment from './pages/Environment';
import Food from './pages/Food';
import RefundPolicy from './pages/RefundPolicy';
import TermsConditions from './pages/TermsConditions';
import NepalFlood from './pages/NepalFlood';
import Volunteer from './pages/Volunteer';
import VolunteerLogin from './pages/VolunteerLogin';
import OurMission from './pages/OurMission';
import Celebration from './pages/Celebration';
import Animal from './pages/Animal';
import ReportBugs from './pages/ReportBugs';
import Orphanage from './pages/Orphanage';
import Education from './pages/Education';
import Healthcare from './pages/Healthcare';
import Livelihood from './pages/Livelihood';
import CausesDetail from './pages/CausesDetail';
import UnderConstruction from './pages/UnderConstruction';
import VolunteerService from './pages/VolunteerService';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import { AdminAuthProvider } from './context/AdminAuthContext';
import GlobalModalEnhancer from './components/GlobalModalEnhancer';

export default function App() {
  return (
    <AdminAuthProvider>
      <Router>
        <GlobalModalEnhancer />
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>} />
          <Route path="/admin/dashboard" element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>} />
          <Route path="/" element={<Home />} />
        <Route path="/packages_form.html" element={<Home />} />
        <Route path="/packages_form" element={<Home />} />
        <Route path="/packages_form/" element={<Home />} />
        <Route path="/index.html" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/about/index.html" element={<About />} />
        <Route path="/about/" element={<About />} />
        <Route path="/causes" element={<Causes />} />
        <Route path="/causes/" element={<Causes />} />
        <Route path="/causes/index.html" element={<Causes />} />
        <Route path="/causes-detail" element={<Causes />} />
        <Route path="/causes-detail/" element={<Causes />} />
        <Route path="/new-blog" element={<NewBlog />} />
        <Route path="/new-blog/index.html" element={<NewBlog />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/index.html" element={<Blog />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/gallery/index.html" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/contact/index.html" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/index.html" element={<Profile />} />
        <Route path="/donor/login" element={<Profile />} />
        <Route path="/donor/login/" element={<Profile />} />
        <Route path="/privacy_policy" element={<PrivacyPolicy />} />
        <Route path="/privacy_policy/index.html" element={<PrivacyPolicy />} />
        <Route path="/egg_milk" element={<EggMilk />} />
        <Route path="/egg_milk/index.html" element={<EggMilk />} />
        <Route path="/causes-detail/egg_milk" element={<EggMilk />} />
        <Route path="/causes-detail/egg_milk/index.html" element={<EggMilk />} />
        <Route path="/homeless" element={<Homeless />} />
        <Route path="/homeless/index.html" element={<Homeless />} />
        <Route path="/causes-detail/homeless" element={<Homeless />} />
        <Route path="/causes-detail/homeless/index.html" element={<Homeless />} />
        <Route path="/environment" element={<Environment />} />
        <Route path="/environment/index.html" element={<Environment />} />
        <Route path="/causes-detail/environment" element={<Environment />} />
        <Route path="/food" element={<Food />} />
        <Route path="/food/index.html" element={<Food />} />
        <Route path="/causes-detail/food" element={<Food />} />
        <Route path="/causes-detail/food/index.html" element={<Food />} />
        <Route path="/Refund_Policy" element={<RefundPolicy />} />
        <Route path="/Refund_Policy/index.html" element={<RefundPolicy />} />
        <Route path="/refund_policy" element={<RefundPolicy />} />
        <Route path="/refund_policy/index.html" element={<RefundPolicy />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/refund-policy/index.html" element={<RefundPolicy />} />
        <Route path="/terms_conditions" element={<TermsConditions />} />
        <Route path="/terms_conditions/index.html" element={<TermsConditions />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/terms-conditions/index.html" element={<TermsConditions />} />
        <Route path="/terms-and-conditions" element={<TermsConditions />} />
        <Route path="/terms-and-conditions/index.html" element={<TermsConditions />} />
        <Route path="/terms_condition" element={<TermsConditions />} />
        <Route path="/terms_condition/index.html" element={<TermsConditions />} />
        <Route path="/terms-condition" element={<TermsConditions />} />
        <Route path="/terms-condition/index.html" element={<TermsConditions />} />
        <Route path="/nepal_flood" element={<NepalFlood />} />
        <Route path="/nepal_flood/index.html" element={<NepalFlood />} />
        <Route path="/nepal-flood" element={<NepalFlood />} />
        <Route path="/nepal-flood/index.html" element={<NepalFlood />} />
        <Route path="/causes-detail/Nepal" element={<NepalFlood />} />
        <Route path="/causes-detail/Nepal/index.html" element={<NepalFlood />} />
        <Route path="/causes-detail/nepal_flood" element={<NepalFlood />} />
        <Route path="/causes-detail/nepal_flood/index.html" element={<NepalFlood />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/volunteer/index.html" element={<Volunteer />} />
        <Route path="/volunteer/volunteer_logout" element={<Volunteer />} />
        <Route path="/volunteer/volunteer_logout/index.html" element={<Volunteer />} />
        <Route path="/volunteer/volunteer_login" element={<VolunteerLogin />} />
        <Route path="/volunteer/volunteer_login/index.html" element={<VolunteerLogin />} />
        <Route path="/volunteer/login_page" element={<VolunteerLogin />} />
        <Route path="/volunteer/login_page/index.html" element={<VolunteerLogin />} />
        <Route path="/volunteer/volunteer_service" element={<VolunteerService />} />
        <Route path="/volunteer/volunteer_service/" element={<VolunteerService />} />
        <Route path="/volunteer/volunteer_service/index.html" element={<VolunteerService />} />
        <Route path="/our_mission" element={<OurMission />} />
        <Route path="/our_mission/index.html" element={<OurMission />} />
        <Route path="/our-mission" element={<OurMission />} />
        <Route path="/our-mission/index.html" element={<OurMission />} />
        <Route path="/our_team" element={<OurMission />} />
        <Route path="/our_team/index.html" element={<OurMission />} />
        <Route path="/our-team" element={<OurMission />} />
        <Route path="/our-team/index.html" element={<OurMission />} />
        <Route path="/celebration" element={<Celebration />} />
        <Route path="/celebration/index.html" element={<Celebration />} />
        <Route path="/celebration/" element={<Celebration />} />
        <Route path="/animal" element={<Animal />} />
        <Route path="/animal/index.html" element={<Animal />} />
        <Route path="/animal/" element={<Animal />} />
        <Route path="/causes-detail/animal" element={<Animal />} />
        <Route path="/causes-detail/animal/index.html" element={<Animal />} />
        <Route path="/causes-detail/stray_dog" element={<Animal />} />
        <Route path="/causes-detail/stray_dog/index.html" element={<Animal />} />
        <Route path="/causes-detail/cow_feeding" element={<Animal />} />
        <Route path="/causes-detail/cow_feeding/index.html" element={<Animal />} />
        <Route path="/causes-detail/dog_collar" element={<Animal />} />
        <Route path="/causes-detail/dog_collar/index.html" element={<Animal />} />
        <Route path="/causes-detail/water_bottle" element={<CausesDetail />} />
        <Route path="/causes-detail/water_bottle/" element={<CausesDetail />} />
        <Route path="/causes-detail/water_bottle/index.html" element={<CausesDetail />} />
        <Route path="/causes-detail/chicken_briyani" element={<CausesDetail />} />
        <Route path="/causes-detail/chicken_briyani/" element={<CausesDetail />} />
        <Route path="/causes-detail/chicken_briyani/index.html" element={<CausesDetail />} />
        <Route path="/causes-detail/egg_briyani" element={<CausesDetail />} />
        <Route path="/causes-detail/egg_briyani/" element={<CausesDetail />} />
        <Route path="/causes-detail/egg_briyani/index.html" element={<CausesDetail />} />
        <Route path="/causes-detail/veg_briyani" element={<CausesDetail />} />
        <Route path="/causes-detail/veg_briyani/" element={<CausesDetail />} />
        <Route path="/causes-detail/veg_briyani/index.html" element={<CausesDetail />} />
        <Route path="/causes-detail/thaali" element={<CausesDetail />} />
        <Route path="/causes-detail/thaali/" element={<CausesDetail />} />
        <Route path="/causes-detail/thaali/index.html" element={<CausesDetail />} />
        <Route path="/causes-detail/hygiene_kit" element={<CausesDetail />} />
        <Route path="/causes-detail/hygiene_kit/" element={<CausesDetail />} />
        <Route path="/causes-detail/hygiene_kit/index.html" element={<CausesDetail />} />
        <Route path="/causes-detail/childcare_kit" element={<CausesDetail />} />
        <Route path="/causes-detail/childcare_kit/" element={<CausesDetail />} />
        <Route path="/causes-detail/childcare_kit/index.html" element={<CausesDetail />} />
        <Route path="/causes-detail/child_gift" element={<CausesDetail />} />
        <Route path="/causes-detail/child_gift/" element={<CausesDetail />} />
        <Route path="/causes-detail/child_gift/index.html" element={<CausesDetail />} />
        <Route path="/causes-detail/slipper" element={<CausesDetail />} />
        <Route path="/causes-detail/slipper/" element={<CausesDetail />} />
        <Route path="/causes-detail/slipper/index.html" element={<CausesDetail />} />
        <Route path="/causes-detail/mother_kit" element={<CausesDetail />} />
        <Route path="/causes-detail/mother_kit/" element={<CausesDetail />} />
        <Route path="/causes-detail/mother_kit/index.html" element={<CausesDetail />} />
        <Route path="/causes-detail/bicycle" element={<CausesDetail />} />
        <Route path="/causes-detail/bicycle/" element={<CausesDetail />} />
        <Route path="/causes-detail/bicycle/index.html" element={<CausesDetail />} />
        <Route path="/causes-detail/banana_milk" element={<CausesDetail />} />
        <Route path="/causes-detail/banana_milk/" element={<CausesDetail />} />
        <Route path="/causes-detail/banana_milk/index.html" element={<CausesDetail />} />
        <Route path="/causes-detail/mosquito_net" element={<CausesDetail />} />
        <Route path="/causes-detail/mosquito_net/" element={<CausesDetail />} />
        <Route path="/causes-detail/mosquito_net/index.html" element={<CausesDetail />} />
        <Route path="/causes-detail/school_bag" element={<CausesDetail />} />
        <Route path="/causes-detail/school_bag/" element={<CausesDetail />} />
        <Route path="/causes-detail/school_bag/index.html" element={<CausesDetail />} />
        <Route path="/causes-detail/child_education" element={<CausesDetail />} />
        <Route path="/causes-detail/child_education/" element={<CausesDetail />} />
        <Route path="/causes-detail/child_education/index.html" element={<CausesDetail />} />
        <Route path="/causes-detail/birthday_cake" element={<CausesDetail />} />
        <Route path="/causes-detail/birthday_cake/" element={<CausesDetail />} />
        <Route path="/causes-detail/birthday_cake/index.html" element={<CausesDetail />} />
        <Route path="/causes-detail/virtual_birthday_cake" element={<CausesDetail />} />
        <Route path="/causes-detail/virtual_birthday_cake/" element={<CausesDetail />} />
        <Route path="/causes-detail/virtual_birthday_cake/index.html" element={<CausesDetail />} />
        <Route path="/causes-detail/water_bowl" element={<CausesDetail />} />
        <Route path="/causes-detail/water_bowl/" element={<CausesDetail />} />
        <Route path="/causes-detail/water_bowl/index.html" element={<CausesDetail />} />
        <Route path="/causes-detail/bird_house" element={<CausesDetail />} />
        <Route path="/causes-detail/bird_house/" element={<CausesDetail />} />
        <Route path="/causes-detail/bird_house/index.html" element={<CausesDetail />} />
        <Route path="/causes-detail/transgender_kit" element={<CausesDetail />} />
        <Route path="/causes-detail/transgender_kit/" element={<CausesDetail />} />
        <Route path="/causes-detail/transgender_kit/index.html" element={<CausesDetail />} />
        <Route path="/causes-detail/bihar_kit" element={<CausesDetail />} />
        <Route path="/causes-detail/bihar_kit/" element={<CausesDetail />} />
        <Route path="/causes-detail/bihar_kit/index.html" element={<CausesDetail />} />
        <Route path="/causes-detail/Induction_Stove" element={<CausesDetail />} />
        <Route path="/causes-detail/Induction_Stove/" element={<CausesDetail />} />
        <Route path="/causes-detail/Induction_Stove/index.html" element={<CausesDetail />} />
        <Route path="/causes-detail/induction_stove" element={<CausesDetail />} />
        <Route path="/causes-detail/induction_stove/" element={<CausesDetail />} />
        <Route path="/causes-detail/induction_stove/index.html" element={<CausesDetail />} />
        <Route path="/causes-detail/nepal_house" element={<CausesDetail />} />
        <Route path="/causes-detail/nepal_house/" element={<CausesDetail />} />
        <Route path="/causes-detail/nepal_house/index.html" element={<CausesDetail />} />
        <Route path="/causes-detail/grocery_kit" element={<CausesDetail />} />
        <Route path="/causes-detail/grocery_kit/" element={<CausesDetail />} />
        <Route path="/causes-detail/grocery_kit/index.html" element={<CausesDetail />} />
        <Route path="/causes-detail/blanket" element={<CausesDetail />} />
        <Route path="/causes-detail/blanket/" element={<CausesDetail />} />
        <Route path="/causes-detail/blanket/index.html" element={<CausesDetail />} />
        <Route path="/causes-detail/plant_tree" element={<CausesDetail />} />
        <Route path="/causes-detail/plant_tree/" element={<CausesDetail />} />
        <Route path="/causes-detail/plant_tree/index.html" element={<CausesDetail />} />
        <Route path="/causes-detail/wheel_chair" element={<CausesDetail />} />
        <Route path="/causes-detail/wheel_chair/" element={<CausesDetail />} />
        <Route path="/causes-detail/wheel_chair/index.html" element={<CausesDetail />} />
        <Route path="/causes-detail/napkin" element={<CausesDetail />} />
        <Route path="/causes-detail/napkin/" element={<CausesDetail />} />
        <Route path="/causes-detail/napkin/index.html" element={<CausesDetail />} />
        <Route path="/causes-detail/tailoring_machine" element={<CausesDetail />} />
        <Route path="/causes-detail/tailoring_machine/" element={<CausesDetail />} />
        <Route path="/causes-detail/tailoring_machine/index.html" element={<CausesDetail />} />
        <Route path="/causes-detail/hearing_aid" element={<CausesDetail />} />
        <Route path="/causes-detail/hearing_aid/" element={<CausesDetail />} />
        <Route path="/causes-detail/hearing_aid/index.html" element={<CausesDetail />} />
        {/* Generic parameter route for causes-detail */}
        <Route path="/causes-detail/:slug" element={<CausesDetail />} />
        <Route path="/causes-detail/:slug/" element={<CausesDetail />} />
        <Route path="/causes-detail/:slug/index.html" element={<CausesDetail />} />
        <Route path="/Report_bugs" element={<ReportBugs />} />
        <Route path="/Report_bugs/index.html" element={<ReportBugs />} />
        <Route path="/Report_bugs/" element={<ReportBugs />} />
        <Route path="/report_bugs" element={<ReportBugs />} />
        <Route path="/report_bugs/index.html" element={<ReportBugs />} />
        <Route path="/report_bugs/" element={<ReportBugs />} />
        <Route path="/report-bugs" element={<ReportBugs />} />
        <Route path="/report-bugs/index.html" element={<ReportBugs />} />
        <Route path="/report-bugs/" element={<ReportBugs />} />
        <Route path="/orphanage" element={<Orphanage />} />
        <Route path="/orphanage/index.html" element={<Orphanage />} />
        <Route path="/orphanage/" element={<Orphanage />} />
        <Route path="/CrowdFundEducation" element={<Education />} />
        <Route path="/CrowdFundEducation/" element={<Education />} />
        <Route path="/CrowdFundEducation/index.html" element={<Education />} />
        <Route path="/CrowdFundEducation/Educationindex" element={<Education />} />
        <Route path="/CrowdFundEducation/Educationindex/" element={<Education />} />
        <Route path="/CrowdFundEducation/Educationindex/index.html" element={<Education />} />
        <Route path="/education" element={<Education />} />
        <Route path="/education/" element={<Education />} />
        <Route path="/education/index.html" element={<Education />} />
        <Route path="/CrowdFundHealthcare" element={<Healthcare />} />
        <Route path="/CrowdFundHealthcare/" element={<Healthcare />} />
        <Route path="/CrowdFundHealthcare/index.html" element={<Healthcare />} />
        <Route path="/healthcare" element={<Healthcare />} />
        <Route path="/healthcare/" element={<Healthcare />} />
        <Route path="/healthcare/index.html" element={<Healthcare />} />
        <Route path="/medical" element={<Healthcare />} />
        <Route path="/medical/" element={<Healthcare />} />
        <Route path="/medical/index.html" element={<Healthcare />} />
        <Route path="/livelihood" element={<Livelihood />} />
        <Route path="/livelihood/" element={<Livelihood />} />
        <Route path="/livelihood/index.html" element={<Livelihood />} />
                {/* Direct cause aliases without /causes-detail/ prefix */}
        <Route path="/water_bottle" element={<CausesDetail slugOverride="water_bottle" />} />
        <Route path="/water_bottle/" element={<CausesDetail slugOverride="water_bottle" />} />
        <Route path="/water_bottle/index.html" element={<CausesDetail slugOverride="water_bottle" />} />
        <Route path="/chicken_briyani" element={<CausesDetail slugOverride="chicken_briyani" />} />
        <Route path="/chicken_briyani/" element={<CausesDetail slugOverride="chicken_briyani" />} />
        <Route path="/chicken_briyani/index.html" element={<CausesDetail slugOverride="chicken_briyani" />} />
        <Route path="/egg_briyani" element={<CausesDetail slugOverride="egg_briyani" />} />
        <Route path="/egg_briyani/" element={<CausesDetail slugOverride="egg_briyani" />} />
        <Route path="/egg_briyani/index.html" element={<CausesDetail slugOverride="egg_briyani" />} />
        <Route path="/veg_briyani" element={<CausesDetail slugOverride="veg_briyani" />} />
        <Route path="/veg_briyani/" element={<CausesDetail slugOverride="veg_briyani" />} />
        <Route path="/veg_briyani/index.html" element={<CausesDetail slugOverride="veg_briyani" />} />
        <Route path="/thaali" element={<CausesDetail slugOverride="thaali" />} />
        <Route path="/thaali/" element={<CausesDetail slugOverride="thaali" />} />
        <Route path="/thaali/index.html" element={<CausesDetail slugOverride="thaali" />} />
        <Route path="/hygiene_kit" element={<CausesDetail slugOverride="hygiene_kit" />} />
        <Route path="/hygiene_kit/" element={<CausesDetail slugOverride="hygiene_kit" />} />
        <Route path="/hygiene_kit/index.html" element={<CausesDetail slugOverride="hygiene_kit" />} />
        <Route path="/childcare_kit" element={<CausesDetail slugOverride="childcare_kit" />} />
        <Route path="/childcare_kit/" element={<CausesDetail slugOverride="childcare_kit" />} />
        <Route path="/childcare_kit/index.html" element={<CausesDetail slugOverride="childcare_kit" />} />
        <Route path="/child_gift" element={<CausesDetail slugOverride="child_gift" />} />
        <Route path="/child_gift/" element={<CausesDetail slugOverride="child_gift" />} />
        <Route path="/child_gift/index.html" element={<CausesDetail slugOverride="child_gift" />} />
        <Route path="/slipper" element={<CausesDetail slugOverride="slipper" />} />
        <Route path="/slipper/" element={<CausesDetail slugOverride="slipper" />} />
        <Route path="/slipper/index.html" element={<CausesDetail slugOverride="slipper" />} />
        <Route path="/mother_kit" element={<CausesDetail slugOverride="mother_kit" />} />
        <Route path="/mother_kit/" element={<CausesDetail slugOverride="mother_kit" />} />
        <Route path="/mother_kit/index.html" element={<CausesDetail slugOverride="mother_kit" />} />
        <Route path="/bicycle" element={<CausesDetail slugOverride="bicycle" />} />
        <Route path="/bicycle/" element={<CausesDetail slugOverride="bicycle" />} />
        <Route path="/bicycle/index.html" element={<CausesDetail slugOverride="bicycle" />} />
        <Route path="/banana_milk" element={<CausesDetail slugOverride="banana_milk" />} />
        <Route path="/banana_milk/" element={<CausesDetail slugOverride="banana_milk" />} />
        <Route path="/banana_milk/index.html" element={<CausesDetail slugOverride="banana_milk" />} />
        <Route path="/mosquito_net" element={<CausesDetail slugOverride="mosquito_net" />} />
        <Route path="/mosquito_net/" element={<CausesDetail slugOverride="mosquito_net" />} />
        <Route path="/mosquito_net/index.html" element={<CausesDetail slugOverride="mosquito_net" />} />
        <Route path="/school_bag" element={<CausesDetail slugOverride="school_bag" />} />
        <Route path="/school_bag/" element={<CausesDetail slugOverride="school_bag" />} />
        <Route path="/school_bag/index.html" element={<CausesDetail slugOverride="school_bag" />} />
        <Route path="/child_education" element={<CausesDetail slugOverride="child_education" />} />
        <Route path="/child_education/" element={<CausesDetail slugOverride="child_education" />} />
        <Route path="/child_education/index.html" element={<CausesDetail slugOverride="child_education" />} />
        <Route path="/birthday_cake" element={<CausesDetail slugOverride="birthday_cake" />} />
        <Route path="/birthday_cake/" element={<CausesDetail slugOverride="birthday_cake" />} />
        <Route path="/birthday_cake/index.html" element={<CausesDetail slugOverride="birthday_cake" />} />
        <Route path="/virtual_birthday_cake" element={<CausesDetail slugOverride="virtual_birthday_cake" />} />
        <Route path="/virtual_birthday_cake/" element={<CausesDetail slugOverride="virtual_birthday_cake" />} />
        <Route path="/virtual_birthday_cake/index.html" element={<CausesDetail slugOverride="virtual_birthday_cake" />} />
        <Route path="/water_bowl" element={<CausesDetail slugOverride="water_bowl" />} />
        <Route path="/water_bowl/" element={<CausesDetail slugOverride="water_bowl" />} />
        <Route path="/water_bowl/index.html" element={<CausesDetail slugOverride="water_bowl" />} />
        <Route path="/bird_house" element={<CausesDetail slugOverride="bird_house" />} />
        <Route path="/bird_house/" element={<CausesDetail slugOverride="bird_house" />} />
        <Route path="/bird_house/index.html" element={<CausesDetail slugOverride="bird_house" />} />
        <Route path="/transgender_kit" element={<CausesDetail slugOverride="transgender_kit" />} />
        <Route path="/transgender_kit/" element={<CausesDetail slugOverride="transgender_kit" />} />
        <Route path="/transgender_kit/index.html" element={<CausesDetail slugOverride="transgender_kit" />} />
        <Route path="/bihar_kit" element={<CausesDetail slugOverride="bihar_kit" />} />
        <Route path="/bihar_kit/" element={<CausesDetail slugOverride="bihar_kit" />} />
        <Route path="/bihar_kit/index.html" element={<CausesDetail slugOverride="bihar_kit" />} />
        <Route path="/Induction_Stove" element={<CausesDetail slugOverride="Induction_Stove" />} />
        <Route path="/Induction_Stove/" element={<CausesDetail slugOverride="Induction_Stove" />} />
        <Route path="/Induction_Stove/index.html" element={<CausesDetail slugOverride="Induction_Stove" />} />
        <Route path="/induction_stove" element={<CausesDetail slugOverride="Induction_Stove" />} />
        <Route path="/induction_stove/" element={<CausesDetail slugOverride="Induction_Stove" />} />
        <Route path="/induction_stove/index.html" element={<CausesDetail slugOverride="Induction_Stove" />} />
        <Route path="/nepal_house" element={<CausesDetail slugOverride="nepal_house" />} />
        <Route path="/nepal_house/" element={<CausesDetail slugOverride="nepal_house" />} />
        <Route path="/nepal_house/index.html" element={<CausesDetail slugOverride="nepal_house" />} />
        <Route path="/grocery_kit" element={<CausesDetail slugOverride="grocery_kit" />} />
        <Route path="/grocery_kit/" element={<CausesDetail slugOverride="grocery_kit" />} />
        <Route path="/grocery_kit/index.html" element={<CausesDetail slugOverride="grocery_kit" />} />
        <Route path="/blanket" element={<CausesDetail slugOverride="blanket" />} />
        <Route path="/blanket/" element={<CausesDetail slugOverride="blanket" />} />
        <Route path="/blanket/index.html" element={<CausesDetail slugOverride="blanket" />} />
        <Route path="/plant_tree" element={<CausesDetail slugOverride="plant_tree" />} />
        <Route path="/plant_tree/" element={<CausesDetail slugOverride="plant_tree" />} />
        <Route path="/plant_tree/index.html" element={<CausesDetail slugOverride="plant_tree" />} />
        <Route path="/wheel_chair" element={<CausesDetail slugOverride="wheel_chair" />} />
        <Route path="/wheel_chair/" element={<CausesDetail slugOverride="wheel_chair" />} />
        <Route path="/wheel_chair/index.html" element={<CausesDetail slugOverride="wheel_chair" />} />
        <Route path="/napkin" element={<CausesDetail slugOverride="napkin" />} />
        <Route path="/napkin/" element={<CausesDetail slugOverride="napkin" />} />
        <Route path="/napkin/index.html" element={<CausesDetail slugOverride="napkin" />} />
        <Route path="/tailoring_machine" element={<CausesDetail slugOverride="tailoring_machine" />} />
        <Route path="/tailoring_machine/" element={<CausesDetail slugOverride="tailoring_machine" />} />
        <Route path="/tailoring_machine/index.html" element={<CausesDetail slugOverride="tailoring_machine" />} />
        <Route path="/hearing_aid" element={<CausesDetail slugOverride="hearing_aid" />} />
        <Route path="/hearing_aid/" element={<CausesDetail slugOverride="hearing_aid" />} />
        <Route path="/hearing_aid/index.html" element={<CausesDetail slugOverride="hearing_aid" />} />
        <Route path="/stray_dog" element={<Animal />} />
        <Route path="/stray_dog/" element={<Animal />} />
        <Route path="/stray_dog/index.html" element={<Animal />} />
        <Route path="/cow_feeding" element={<Animal />} />
        <Route path="/cow_feeding/" element={<Animal />} />
        <Route path="/cow_feeding/index.html" element={<Animal />} />
        <Route path="/dog_collar" element={<Animal />} />
        <Route path="/dog_collar/" element={<Animal />} />
        <Route path="/dog_collar/index.html" element={<Animal />} />
        {/* All other routes show Under Construction until provided */}
        <Route path="*" element={<UnderConstruction />} />
      </Routes>
    </Router>
    </AdminAuthProvider>
  );
}
