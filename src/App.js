import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import Login from "./pages/Login";
import Portal from "./Components/Portal";
import Dashboard from "./pages/Dashboard";
import TeamMembersList from "./pages/Page/OurTeam/teammembers/TeamMembersList";
import TeamMembersCreate from "./pages/Page/OurTeam/teammembers/TeamMembersCreate";
import TeamMembersView from "./pages/Page/OurTeam/teammembers/TeamMembersView";
import TeamMembersEdit from "./pages/Page/OurTeam/teammembers/TeamMembersEdit";
import Register from "./pages/Register";
import "./sb-admin-2.min.css";
import HumanResourcelist from "./pages/Home/humanresource/HumanResourceList";
import HumanResourceCreate from "./pages/Home/humanresource/HumanResourceCreate";
import HumanResourceEdit from "./pages/Home/humanresource/HumanResourceEdit";
import Customerlist from "./pages/Home/customerServiceSection/CustomerServiceList";
import CustomerCreate from "./pages/Home/customerServiceSection/CustomerServiceCreate";
import CustomerEdit from "./pages/Home/customerServiceSection/CustomerServiceEdit";
import HeaderList from "./pages/Home/header/HeaderList";
import HeaderCreate from "./pages/Home/header/HeaderCreate";
import HeaderEdit from "./pages/Home/header/HeaderEdit";
import SliderList from "./pages/Home/slider/SliderList";
import SliderEdit from "./pages/Home/slider/SliderEdit";
import SliderCreate from "./pages/Home/slider/SliderEdit";
import LogoList from "./pages/Home/Logo/LogoList";
import LogoEdit from "./pages/Home/Logo/LogoCreate";
import LogoCreate from "./pages/Home/Logo/LogoCreate";
import ImageBoxlist from "./pages/Home/ImageBoxSection/ImageBoxSectionList";
import ImageBoxCreate from "./pages/Home/ImageBoxSection/ImageBoxSectionCreate";
import ImageBoxEdit from "./pages/Home/ImageBoxSection/ImageBoxSectionEdit";
import TestimonialList from "./pages/Home/TestimonialSection/TestimonialSectionList";
import TestimonialCreate from "./pages/Home/TestimonialSection/TestimonialSectionCreate";
import TestimonialEdit from "./pages/Home/TestimonialSection/TestimonialSectionEdit";
import TabList from "./pages/Home/TabSection/TabList"
import TabCreate from "./pages/Home/TabSection/TabCreate";
import TabEdit from "./pages/Home/TabSection/TabEdit";
import BlogList from "./pages/Home/BlogSection/BlogList";
import BlogCreate from "./pages/Home/BlogSection/BlogCreate";
import BlogEdit from "./pages/Home/BlogSection/BlogEdit";
import LogoSectionOurTeamList from "./pages/Page/OurTeam/LogoSectionOurTeam/LogoSectionOurTeamList";
import LogoSectionOurTeamCreate from "./pages/Page/OurTeam/LogoSectionOurTeam/LogoSectionOurTeamCreate";
import LogoSectionOurTeamEdit from "./pages/Page/OurTeam/LogoSectionOurTeam/LogoSectionOurTeamEdit";
import TeamMemberIntroList from "./pages/Page/OurTeam/TeamIntro/TeamIntroList";
import TeamMemberIntroCreate from "./pages/Page/OurTeam/TeamIntro/TeamIntroCreate";
import TeamMemberIntroEdit from "./pages/Page/OurTeam/TeamIntro/TeamIntroEdit";
import CVList from "./pages/Page/CV/CVList";
import CVCreate from "./pages/Page/CV/CVCreate";
import CVEdit from "./pages/Page/CV/CVEdit";
import ProjectList from "./pages/Page/Project/ProjectList";
import ProjectCreate from "./pages/Page/Project/ProjectCreate";
import ProjectEdit from "./pages/Page/Project/ProjectEdit";


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes */}
          <Route path="/portal" element={<Portal />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="teammembers-list" element={<TeamMembersList />} />
            <Route path="teammembers-user" element={<TeamMembersCreate />} />
            <Route path="teammembers-view/:id" element={<TeamMembersView />} />
            <Route path="teammembers-edit/:id" element={<TeamMembersEdit />} />
            <Route path="humanresource-list" element={<HumanResourcelist />} />
            <Route path="humanresource-create" element={<HumanResourceCreate />} />
            <Route path="humanresource-edit/:id" element={<HumanResourceEdit />} />
            <Route path="customerservice-list" element={<Customerlist />} />
            <Route path="customerservice-create" element={<CustomerCreate />} />
            <Route path="customerservice-edit/:id" element={<CustomerEdit />} />
            <Route path="header-list" element={<HeaderList />} />
            <Route path="header-create" element={<HeaderCreate />} />
            <Route path="header-edit/:id" element={<HeaderEdit />} />
            <Route path="slider-list" element={<SliderList />} />
            <Route path="slider-edit/:id" element={<SliderEdit />} />
            <Route path="slider-create" element={<SliderCreate />} />
            <Route path="logo-list" element={<LogoList />} />
            <Route path="logo-edit/:id" element={<LogoEdit />} />
            <Route path="logo-create" element={<LogoCreate />} />
            <Route path="imageBox-list" element={<ImageBoxlist />} />
            <Route path="imageBox-create" element={<ImageBoxCreate />} />
            <Route path="imageBox-edit/:id" element={<ImageBoxEdit />} />
            <Route path="testimonial-list" element={<TestimonialList />} />
            <Route path="testimonial-create" element={<TestimonialCreate />} />
            <Route path="testimonial-edit/:id" element={<TestimonialEdit />} />
            <Route path="tab-list" element={<TabList />} />
            <Route path="tab-create" element={<TabCreate />} />
            <Route path="tab-edit/:id" element={<TabEdit />} />
            <Route path="blog-list" element={<BlogList />} />
            <Route path="blog-create" element={<BlogCreate />} />
            <Route path="blog-edit/:id" element={<BlogEdit />} />
            <Route path="logoSectionDataOurTeam-list" element={<LogoSectionOurTeamList />} />
            <Route path="logoSectionDataOurTeam-create" element={<LogoSectionOurTeamCreate />} />
            <Route path="logoSectionDataOurTeam-edit/:id" element={<LogoSectionOurTeamEdit />} />
            <Route path="team-intro-list" element={<TeamMemberIntroList />} />
            <Route path="team-intro-create" element={<TeamMemberIntroCreate />} />
            <Route path="team-intro-edit/:id" element={<TeamMemberIntroEdit />} />
            <Route path="cv-list" element={<CVList />} />
            <Route path="cv-create" element={<CVCreate />} />
            <Route path="cv-edit/:id" element={<CVEdit />} />
            <Route path="project-list" element={<ProjectList />} />
            <Route path="project-create" element={<ProjectCreate />} />
            <Route path="project-edit/:id" element={<ProjectEdit />} />
          </Route>

          {/* Default route */}
          <Route path="/" element={<Login />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;