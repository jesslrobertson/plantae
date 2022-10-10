import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as MenuLines } from "../assets/icon-menu.svg";
import { UserContext } from "../context/UserProvider";

export default function SlidingMenu() {
  const [showMenu, setShowMenu] = useState(false);
  const { logout } = useContext(UserContext);
  const visibility = showMenu ? "show" : "hide";

  function toggleMenu() {
    setShowMenu((prev) => !prev);
  }

  return (
    <div className="nav-container">
      <MenuLines onMouseDown={toggleMenu} className="menu-lines" />
      <div className={`${visibility} menu`} onClick={toggleMenu}>
        <div className="nav-links">
          <div className="link-container">
            <Link to="/home" className="nav-link">
              Home
            </Link>
          </div>
          <div className="link-container">
            <Link to="/profile" className="nav-link">
              Profile
            </Link>
          </div>
          <div className="link-container">
            <Link to="/new-post" className="nav-link">
              New Post
            </Link>
          </div>
        </div>
        <button className="menu-button" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}
