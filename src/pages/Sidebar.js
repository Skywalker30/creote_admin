import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../API/api";
import { AuthContext } from "../auth/AuthContext";
import {
  faFaceLaughWink,
  faSignOut,
  faTachographDigital,
  faUsers,
  faDatabase,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [homeDropdownOpen, setHomeDropdownOpen] = useState(false);
  const [pagesDropdownOpen, setPagesDropdownOpen] = useState(false);

  const toggleHomeDropdown = () => {
    setHomeDropdownOpen((prevState) => !prevState);
    setPagesDropdownOpen(false);
  };

  const togglePagesDropdown = () => {
    setPagesDropdownOpen((prevState) => !prevState);
    setHomeDropdownOpen(false);
  };

  const handleLogout = async () => {
    try {
      const response = await api.post("/api/auth/logout");
      console.log(response.data);
      logout();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const closeDropdowns = () => {
    setHomeDropdownOpen(false);
    setPagesDropdownOpen(false);
  };

  return (
    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
      <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
        <div className="sidebar-brand-icon rotate-n-15">
          <FontAwesomeIcon icon={faFaceLaughWink} size={"2x"} />
        </div>
        <div className="sidebar-brand-text mx-3">
          Creote<sup></sup>
        </div>
      </a>
      <hr className="sidebar-divider my-0" />
      <li className="nav-item">
        <Link className="nav-link" to="/portal/dashboard">
          <FontAwesomeIcon icon={faTachographDigital} style={{ marginRight: "0.5rem" }} />
          <span>Dashboard</span>
        </Link>
      </li>
      <hr className="sidebar-divider my-0" />
      <li className={`nav-item ${homeDropdownOpen ? "active show" : ""}`}>
        <a className="nav-link dropdown-toggle" onClick={toggleHomeDropdown} style={{ cursor: "pointer" }}>
          <FontAwesomeIcon icon={faDatabase} style={{ marginRight: "0.5rem" }} />
          <span>Home Section</span>
        </a>
        {homeDropdownOpen && (
          <div className="dropdown-menu show bg-gradient-primary border-0 w-100 shadow-none">
            <Link className="dropdown-item text-white" to="/portal/teammembers-list" onClick={closeDropdowns}>
              <FontAwesomeIcon icon={faUsers} style={{ marginRight: "0.5rem" }} />
              <span>TeamMembers</span>
            </Link>
            <Link className="dropdown-item text-white" to="/portal/slider-list" onClick={closeDropdowns}>
              <FontAwesomeIcon icon={faDatabase} style={{ marginRight: "0.5rem" }} />
              <span>Slider Data</span>
            </Link>
            <Link className="dropdown-item text-white" to="/portal/humanresource-list" onClick={closeDropdowns}>
              <FontAwesomeIcon icon={faDatabase} style={{ marginRight: "0.5rem" }} />
              <span>HumanResource Data</span>
            </Link>
            <Link className="dropdown-item text-white" to="/portal/customerservice-list" onClick={closeDropdowns}>
              <FontAwesomeIcon icon={faDatabase} style={{ marginRight: "0.5rem" }} />
              <span>CustomerService Data</span>
            </Link>
            <Link className="dropdown-item text-white" to="/portal/header-list" onClick={closeDropdowns}>
              <FontAwesomeIcon icon={faDatabase} style={{ marginRight: "0.5rem" }} />
              <span>Header Data</span>
            </Link>
            <Link className="dropdown-item text-white" to="/portal/logo-list" onClick={closeDropdowns}>
              <FontAwesomeIcon icon={faDatabase} style={{ marginRight: "0.5rem" }} />
              <span>Logo</span>
            </Link>
            <Link className="dropdown-item text-white" to="/portal/imageBox-list" onClick={closeDropdowns}>
              <FontAwesomeIcon icon={faDatabase} style={{ marginRight: "0.5rem" }} />
              <span>ImageBox Section</span>
            </Link>
            <Link className="dropdown-item text-white" to="/portal/testimonial-list" onClick={closeDropdowns}>
              <FontAwesomeIcon icon={faDatabase} style={{ marginRight: "0.5rem" }} />
              <span>Testimonial Section</span>
            </Link>
            <Link className="dropdown-item text-white" to="/portal/tab-list" onClick={closeDropdowns}>
              <FontAwesomeIcon icon={faDatabase} style={{ marginRight: "0.5rem" }} />
              <span>Tab Section</span>
            </Link>
            <Link className="dropdown-item text-white" to="/portal/blog-list" onClick={closeDropdowns}>
              <FontAwesomeIcon icon={faDatabase} style={{ marginRight: "0.5rem" }} />
              <span>Blog Section</span>
            </Link>
          </div>
        )}
      </li>
      <hr className="sidebar-divider my-0" />
      <li className={`nav-item ${pagesDropdownOpen ? "active show" : ""}`}>
        <a className="nav-link dropdown-toggle" onClick={togglePagesDropdown} style={{ cursor: "pointer" }}>
          <FontAwesomeIcon icon={faDatabase} style={{ marginRight: "0.5rem" }} />
          <span>Pages Section</span>
        </a>
        {pagesDropdownOpen && (
          <div className="dropdown-menu show bg-gradient-primary border-0 w-100 shadow-none">
            <Link className="dropdown-item text-white" to="/portal/logoSectionDataOurTeam-list" onClick={closeDropdowns}>
              <FontAwesomeIcon icon={faDatabase} style={{ marginRight: "0.5rem" }} />
              <span>Logo Section Data of OurTeam</span>
            </Link>
            <Link className="dropdown-item text-white" to="/portal/team-intro-list" onClick={closeDropdowns}>
              <FontAwesomeIcon icon={faDatabase} style={{ marginRight: "0.5rem" }} />
              <span>TeamIntro of OurTeam</span>
            </Link>
            <Link className="dropdown-item text-white" to="/portal/cv-list" onClick={closeDropdowns}>
              <FontAwesomeIcon icon={faDatabase} style={{ marginRight: "0.5rem" }} />
              <span>CV</span>
            </Link>
          </div>
        )}
      </li>
      <hr className="sidebar-divider my-0" />
      <li className="nav-item">
        <button className="nav-link btn btn-link text-left sidebar-btn" onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOut} style={{ marginRight: "0.5rem" }} />
          <span>Logout</span>
        </button>
      </li>
    </ul>
  );
}

export default Sidebar;
