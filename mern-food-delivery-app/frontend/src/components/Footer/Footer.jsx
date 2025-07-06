import React from 'react';
import './Footer.css';
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        {/* Left Section */}
        <div className="footer-content-left">
          <img src={assets.logo} alt="Company Logo" />
          <p>
            Welcome to our food delivery service. We are committed to delivering delicious meals quickly and reliably to your doorstep.
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="Facebook" />
            <img src={assets.twitter_icon} alt="Twitter" />
            <img src={assets.linkedin_icon} alt="LinkedIn" />
          </div>
        </div>

        {/* Center Section */}
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li><a href="tel:+94765489545">📞 +91 891 930 8859</a></li>
            <li><a href="mailto:varshithavemula10@gmail.com">mailto:varshithavemula10@gmail.com</a></li>
          </ul>
        </div>
      </div>

      <hr />

      <p className="footer-copyright">
        &copy; {new Date().getFullYear()} VarshithaVemula  — All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
