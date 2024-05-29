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
import { Dropdown } from "react-bootstrap";

function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [homeDropdownOpen, setHomeDropdownOpen] = useState(false);
  const [pagesDropdownOpen, setPagesDropdownOpen] = useState(false);

  const toggleHomeDropdown = () => {
    setHomeDropdownOpen((prevState) => !prevState);
    setPagesDropdownOpen(false); // Ensure the other dropdown is closed
  };
  const togglePagesDropdown = () => {
    setPagesDropdownOpen((prevState) => !prevState);
    setHomeDropdownOpen(false); // Ensure the other dropdown is closed
  };

  const handleLogout = async () => {
    try {
      const response = await api.post("/api/auth/logout");
      console.log(response.data); // Log the response from the logout API
      logout();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      // Handle logout error if needed
    }
  };

  return (
    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
      {/* <!-- Sidebar - Brand --> */}
      <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
        <div className="sidebar-brand-icon rotate-n-15">
          <FontAwesomeIcon icon={faFaceLaughWink} size={"2x"} />
        </div>
        <div className="sidebar-brand-text mx-3">
          Creote<sup></sup>
        </div>
      </a>
      {/* <!-- Divider --> */}
      <hr className="sidebar-divider my-0" />
      {/* <!-- Nav Item - Dashboard --> */}
      <li className="nav-item active">
        <Link className="nav-link" to="/portal/dashboard">
          <FontAwesomeIcon icon={faTachographDigital} style={{ marginRight: "0.5rem" }} />
          <span>Dashboard</span>
        </Link>
      </li>
      <hr className="sidebar-divider my-0" />
      {/* <!-- Dropdown - Home Section --> */}
      <li className={`nav-item ${homeDropdownOpen ? "active show" : ""}`}>
        <Dropdown className="w-100" show={homeDropdownOpen} onToggle={toggleHomeDropdown}>
          <Dropdown.Toggle as="a" className="nav-link dropdown-toggle d-flex align-items-center" style={{ cursor: "pointer", color: "white" }} id="dropdown-basic">
            <FontAwesomeIcon icon={faDatabase} style={{ marginRight: "0.5rem" }} />
            <span>Home Section</span>
          </Dropdown.Toggle>
          <Dropdown.Menu className="bg-gradient-primary border-0 w-100 shadow-none">
            <Dropdown.Item as={Link} to="/portal/teammembers-list" className="text-white bg-gradient-primary nav-link" style={{ paddingLeft: "1rem" }}>
              <FontAwesomeIcon icon={faUsers} style={{ marginRight: "0.5rem" }} />
              <span>TeamMembers</span>
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/portal/slider-list" className="text-white bg-gradient-primary nav-link" style={{ paddingLeft: "1rem" }}>
              <FontAwesomeIcon icon={faDatabase} style={{ marginRight: "0.5rem" }} />
              <span>Slider Data</span>
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/portal/humanresource-list" className="text-white bg-gradient-primary nav-link" style={{ paddingLeft: "1rem" }}>
              <FontAwesomeIcon icon={faDatabase} style={{ marginRight: "0.5rem" }} />
              <span>HumanResource Data</span>
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/portal/customerservice-list" className="text-white bg-gradient-primary nav-link" style={{ paddingLeft: "1rem" }}>
              <FontAwesomeIcon icon={faDatabase} style={{ marginRight: "0.5rem" }} />
              <span>CustomerService Data</span>
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/portal/header-list" className="text-white bg-gradient-primary nav-link" style={{ paddingLeft: "1rem" }}>
              <FontAwesomeIcon icon={faDatabase} style={{ marginRight: "0.5rem" }} />
              <span>Header Data</span>
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/portal/logo-list" className="text-white bg-gradient-primary nav-link" style={{ paddingLeft: "1rem" }}>
              <FontAwesomeIcon icon={faDatabase} style={{ marginRight: "0.5rem" }} />
              <span>Logo</span>
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/portal/imageBox-list" className="text-white bg-gradient-primary nav-link" style={{ paddingLeft: "1rem" }}>
              <FontAwesomeIcon icon={faDatabase} style={{ marginRight: "0.5rem" }} />
              <span>ImageBox Section</span>
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/portal/testimonial-list" className="text-white bg-gradient-primary nav-link" style={{ paddingLeft: "1rem" }}>
              <FontAwesomeIcon icon={faDatabase} style={{ marginRight: "0.5rem" }} />
              <span>Testimonial Section</span>
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/portal/tab-list" className="text-white bg-gradient-primary nav-link" style={{ paddingLeft: "1rem" }}>
              <FontAwesomeIcon icon={faDatabase} style={{ marginRight: "0.5rem" }} />
              <span>Tab Section</span>
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/portal/blog-list" className="text-white bg-gradient-primary nav-link" style={{ paddingLeft: "1rem" }}>
              <FontAwesomeIcon icon={faDatabase} style={{ marginRight: "0.5rem" }} />
              <span>Blog Section</span>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </li>
      <hr className="sidebar-divider my-0" />
      <li className={`nav-item ${pagesDropdownOpen ? "active show" : ""}`}>
        <Dropdown className="w-100" show={pagesDropdownOpen} onToggle={togglePagesDropdown}>
          <Dropdown.Toggle as="a" className="nav-link dropdown-toggle d-flex align-items-center" style={{ cursor: "pointer", color: "white" }} id="dropdown-basic">
            <FontAwesomeIcon icon={faDatabase} style={{ marginRight: "0.5rem" }} />
            <span>Pages Section</span>
          </Dropdown.Toggle>
          <Dropdown.Menu className="bg-gradient-primary border-0 w-100 shadow-none">
            <Dropdown.Item as={Link} to="/portal/logoSectionDataOurTeam-list" className="text-white bg-gradient-primary nav-link" style={{ paddingLeft: "1rem" }}>
              <FontAwesomeIcon icon={faDatabase} style={{ marginRight: "0.5rem" }} />
              <span>Logo Section Data of OurTeam</span>
            </Dropdown.Item>
          </Dropdown.Menu>
          <Dropdown.Menu className="bg-gradient-primary border-0 w-100 shadow-none">
            <Dropdown.Item as={Link} to="/portal/team-intro-list" className="text-white bg-gradient-primary nav-link" style={{ paddingLeft: "1rem" }}>
              <FontAwesomeIcon icon={faDatabase} style={{ marginRight: "0.5rem" }} />
              <span>TeamIntro of OurTeam</span>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </li>
      <hr className="sidebar-divider my-0" />
      <li className="nav-item active" style={{ marginTop: homeDropdownOpen || pagesDropdownOpen ? 'auto' : '0' }}>
        <button className="nav-link btn btn-link text-left sidebar-btn" onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOut} style={{ marginRight: "0.5rem" }} />
          <span>Logout</span>
        </button>
      </li>
    </ul>
  );
}

export default Sidebar;
