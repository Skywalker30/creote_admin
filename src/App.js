import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import Login from "./pages/Login";
import Portal from "./Components/Portal";
import Dashboard from "./pages/Dashboard";
import TeamMembersList from "./pages/teammembers/TeamMembersList";
import TeamMembersCreate from "./pages/teammembers/TeamMembersCreate";
import TeamMembersView from "./pages/teammembers/TeamMembersView";
import TeamMembersEdit from "./pages/teammembers/TeamMembersEdit";
import Register from "./pages/Register";
import "./sb-admin-2.min.css";
import HumanResourcelist from "./pages/humanresource/HumanResourceList";
import HumanResourceCreate from "./pages/humanresource/HumanResourceCreate";
import HumanResourceEdit from "./pages/humanresource/HumanResourceEdit";
import Customerlist from "./pages/customerServiceSection/CustomerServiceList";
import CustomerCreate from "./pages/customerServiceSection/CustomerServiceCreate";
import CustomerEdit from "./pages/customerServiceSection/CustomerServiceEdit";
import HeaderList from "./pages/header/HeaderList";
import HeaderCreate from "./pages/header/HeaderCreate";
import HeaderEdit from "./pages/header/HeaderEdit";
import SliderList from "./pages/slider/SliderList";
import SliderEdit from "./pages/slider/SliderEdit";
import SliderCreate from "./pages/slider/SliderCreate";
import LogoList from "./pages/Logo/LogoList";
import LogoEdit from "./pages/Logo/LogoEdit";
import LogoCreate from "./pages/Logo/LogoCreate";
import ImageBoxlist from "./pages/ImageBoxSection/ImageBoxSectionList";
import ImageBoxCreate from "./pages/ImageBoxSection/ImageBoxSectionCreate";
import ImageBoxEdit from "./pages/ImageBoxSection/ImageBoxSectionEdit";
import TestimonialList from "./pages/TestimonialSection/TestimonialSectionList";
import TestimonialCreate from "./pages/TestimonialSection/TestimonialSectionCreate";
import TestimonialEdit from "./pages/TestimonialSection/TestimonialSectionEdit";
import TabList from "./pages/TabSection/TabList"
import TabCreate from "./pages/TabSection/TabCreate";
import TabEdit from "./pages/TabSection/TabEdit";
import BlogList from "./pages/BlogSection/BlogList";
import BlogCreate from "./pages/BlogSection/BlogCreate";
import BlogEdit from "./pages/BlogSection/BlogEdit";

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
          </Route>

          {/* Default route */}
          <Route path="/" element={<Login />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;