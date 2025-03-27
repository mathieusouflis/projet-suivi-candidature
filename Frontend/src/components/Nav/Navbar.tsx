import React from 'react';
import { Link } from 'react-router-dom'; 

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          MyApp
        </Link>

        {/* Links */}
        <ul className="navbar-links">
          <li>
            <Link to="/" className="navbar-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="navbar-link">
              About
            </Link>
          </li>
          <li>
            <Link to="/services" className="navbar-link">
              Services
            </Link>
          </li>
          <li>
            <Link to="/contact" className="navbar-link">
              Contact
            </Link>
          </li>
        </ul>

        {/* mobile toggle button */}
        <div className="navbar-toggle">
          <span className="navbar-toggle-icon">&#9776;</span> {/* Hamburger icon */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;