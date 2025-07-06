import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../context/StoreContext';

const Navbar = ({ setShowLogin }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { token, setToken } = useContext(StoreContext);

  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigation = (path, sectionId = null) => {
    setMenuOpen(false); // Close menu on navigation

    if (sectionId && location.pathname === '/') {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    if (sectionId) {
      navigate(`/#${sectionId}`);
    } else {
      navigate(path);
    }
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => handleNavigation('/')}>
        <img src={assets.logo} alt="Logo" />
      </div>

      <div className="navbar-hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <span>&#9776;</span>
      </div>

      <div className={`navbar-buttons ${menuOpen ? 'open' : ''}`}>
        <button onClick={() => handleNavigation('/')}>Home</button>
        <button onClick={() => handleNavigation('/', 'explore-menu')}>Menu</button>
        <button onClick={() => handleNavigation('/', 'mobile-app')}>Mobile App</button>
        <button onClick={() => handleNavigation('/cart')}>Cart</button>
        <button onClick={() => handleNavigation('/contact')}>Contact</button>

        {token ? (
          <>
            <button onClick={() => handleNavigation('/myorders')}>My Orders</button>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <button onClick={() => setShowLogin(true)}>Login / Register</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
