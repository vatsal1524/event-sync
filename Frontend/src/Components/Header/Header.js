//author: Faizal
//Author: Dhruvin Dankhara
//author: Mehulkumar Bhunsadiya

import React, { useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import userProfileImage from "../../Images/user.png";
import { Dropdown } from "react-bootstrap";

//reference - https://react-bootstrap.netlify.app/docs/components/navbar/#responsive-behaviors
function Header() {
  const navigate = useNavigate();
  const handleGetRoutes = (route, e) => {
    e.preventDefault();
    navigate(route);
  };
  const userId = localStorage.getItem("userId");

  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="md"
        bg="dark"
        data-bs-theme="dark"
        className="mb-4"
        id="header"
      >
        <Navbar.Brand className="ms-3">
          <span
            onClick={(e) => {
              handleGetRoutes("/", e);
            }}
          >
            <img
              src="https://cdn.logojoy.com/wp-content/uploads/2018/05/30163918/1241-768x591.png"
              style={{ width: "7%" }}
              alt="No image available"
            />
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="me-3">
          <Nav className="ms-3 ms-md-auto">
            <li className="nav-item">
              <span
                onClick={(e) => {
                  handleGetRoutes("/dashboard", e);
                }}
                className="nav-link px-2"
              >
                Home
              </span>
            </li>
            <li className="EventDropdown nav-item">
              <Dropdown>
                <Dropdown.Toggle className="dropdown-title px-2 ">
                  Events
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={(e) => {
                      handleGetRoutes("/my-events", e);
                    }}
                  >
                    My Events
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={(e) => {
                      handleGetRoutes("/events-list", e);
                    }}
                  >
                    Event List
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
            <li className="nav-item">
              <span
                onClick={(e) => {
                  handleGetRoutes("/wishlist", e);
                }}
                className="nav-link px-2"
              >
                Wishlist
              </span>
            </li>
            <li className="nav-item">
              <span
                onClick={(e) => {
                  handleGetRoutes(`/notifications`, e);
                }}
                className="nav-link px-2"
              >
                Notifications
              </span>
            </li>
            {/* <li className="nav-item">
              <span
                onClick={(e) => {
                  handleGetRoutes("/analytics/64b625a5b2eea9fde57bf21c", e);
                }}
                className="nav-link px-2"
              >
                Analytics
              </span>
            </li> */}
            <li className="nav-item">
              <span
                onClick={toggleDropdown}
                className="nav-link px-2"
                style={{ position: "relative" }}
              >
                <img
                  className="user-profile"
                  src={userProfileImage}
                  alt="User Profile"
                />
                {dropdownVisible && (
                  <div className="profile-dropdown-menu">
                    <span
                      onClick={(e) => {
                        handleGetRoutes(`/edit-profile/${userId}`, e);
                      }}
                      className="dropdown-item"
                    >
                      Edit Profile
                    </span>
                    <span onClick={handleLogout} className="dropdown-item">
                      Logout
                    </span>
                  </div>
                )}
              </span>
            </li>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default Header;
