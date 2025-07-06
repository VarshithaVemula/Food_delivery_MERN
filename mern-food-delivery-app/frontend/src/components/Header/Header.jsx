import React from 'react';
import './Header.css';

const Header = () => {
  const scrollToMenu = () => {
    const menuSection = document.getElementById('explore-menu');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className='header'>
      <div className="header-contents">
        <h2>Order your favourite food here</h2>
        <p>From our kitchen to your table – a symphony of taste, delivered fresh and fast.</p>
        <button onClick={scrollToMenu}>View Menu</button>
      </div>
    </header>
  );
};

export default Header;
