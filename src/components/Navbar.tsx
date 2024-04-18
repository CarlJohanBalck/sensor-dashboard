// src/Navbar.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';

const Navbar: React.FC = () => {
  return (
    <nav>
      <ul className="ul">
        <li className="li">
          <Link to="/">Temperature</Link>
        </li>
        <li className="li">
          <Link to="/humidity">Humidity</Link>
        </li>
        <li className="li">
          <Link to="/pressure">Pressure</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
