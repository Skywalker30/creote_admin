import React, { useContext } from "react";
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
    <ul
      className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      {/* <!-- Sidebar - Brand --> */}
      <a
        className="sidebar-brand d-flex align-items-center justify-content-center"
        href="index.html"
      >
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

      <>
        <li className="nav-item active">
          <Link className="nav-link" to="/portal/dashboard">
            <FontAwesomeIcon
              icon={faTachographDigital}
              style={{ marginRight: "0.5rem" }}
            />
            <span>Dashboard</span>
          </Link>
        </li>
        {/* <!-- Divider --> */}
        <hr className="sidebar-divider my-0" />

        {/* <!-- Nav Item - Users --> */}
        <li className="nav-item active text-black-50">
          <Link className="nav-link" to="/portal/teammembers-list">
            <FontAwesomeIcon icon={faUsers} style={{ marginRight: "0.5rem" }} />
            <span>TeamMembers</span>
          </Link>
        </li>
        <hr className="sidebar-divider my-0" />

        <li className="nav-item active text-black-50">
          <Link className="nav-link" to="/portal/slider-list">
            <FontAwesomeIcon
              icon={faDatabase}
              style={{ marginRight: "0.5rem" }}
            />
            <span>Slider Data</span>
          </Link>
        </li>
        <hr className="sidebar-divider my-0" />
        <li className="nav-item active text-black-50">
          <Link className="nav-link" to="/portal/humanresource-list">
            <FontAwesomeIcon
              icon={faDatabase}
              style={{ marginRight: "0.5rem" }}
            />
            <span>HumanResource Data</span>
          </Link>
        </li>
        <hr className="sidebar-divider my-0" />

        <li className="nav-item active text-black-50">
          <Link className="nav-link" to="/portal/customerservice-list">
            <FontAwesomeIcon
              icon={faDatabase}
              style={{ marginRight: "0.5rem" }}
            />
            <span>CustomerService Data</span>
          </Link>
        </li>
        <hr className="sidebar-divider my-0" />

        <li className="nav-item active text-black-50">
          <Link className="nav-link" to="/portal/header-list">
            <FontAwesomeIcon
              icon={faDatabase}
              style={{ marginRight: "0.5rem" }}
            />
            <span>Header Data</span>
          </Link>
        </li>
        <hr className="sidebar-divider my-0" />

        <li className="nav-item active text-black-50">
          <Link className="nav-link" to="/portal/logo-list">
            <FontAwesomeIcon
              icon={faDatabase}
              style={{ marginRight: "0.5rem" }}
            />
            <span>Logo</span>
          </Link>
        </li>
        <hr className="sidebar-divider my-0" />

        <li className="nav-item active text-black-50">
          <Link className="nav-link" to="/portal/imageBox-list">
            <FontAwesomeIcon
              icon={faDatabase}
              style={{ marginRight: "0.5rem" }}
            />
            <span>ImageBox Section</span>
          </Link>
        </li>
        <hr className="sidebar-divider my-0" />

        <li className="nav-item active text-black-50">
          <Link className="nav-link" to="/portal/testimonial-list">
            <FontAwesomeIcon
              icon={faDatabase}
              style={{ marginRight: "0.5rem" }}
            />
            <span>Testimonial Section</span>
          </Link>
        </li>
        <hr className="sidebar-divider my-0" />

        <li className="nav-item active text-black-50">
          <Link className="nav-link" to="/portal/tab-list">
            <FontAwesomeIcon
              icon={faDatabase}
              style={{ marginRight: "0.5rem" }}
            />
            <span>Tab Section</span>
          </Link>
        </li>
        <hr className="sidebar-divider my-0" />

        <li className="nav-item active text-black-50">
          <Link className="nav-link" to="/portal/blog-list">
            <FontAwesomeIcon
              icon={faDatabase}
              style={{ marginRight: "0.5rem" }}
            />
            <span>Blog Section</span>
          </Link>
        </li>
        <hr className="sidebar-divider my-0" />

      </>

      <li className="nav-item active">
        <button
          className="nav-link btn btn-link text-left sidebar-btn"
          onClick={handleLogout}
        >
          <FontAwesomeIcon icon={faSignOut} style={{ marginRight: "0.5rem" }} />
          <span>Logout</span>
        </button>
      </li>
    </ul>
  );
}

export default Sidebar;