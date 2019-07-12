import React from 'react';
import './index.scss';

import { userLogged } from '../../utils';

function NavMain() {

  const userIsLogged = userLogged();
  return (
    <nav className="nav-main">
      <div className="nav-container">
        <a href="/">
          <img className="logo" src={`/skipper_logo.png`} />
        </a>
        <label className="app-title">
          Skipper
        </label>
        <input className="menu-btn" type="checkbox" id="menu-btn" />
        <label className="menu-icon" htmlFor="menu-btn">
          <span className="navicon"></span>
        </label>
        <ul className="menu">
          <li><a href="/dashboard">Dashboard</a></li>
          <li><a href="/about">About Skipper</a></li>
          <li><a href="/contact">Contact Skipper</a></li>
          <li>
            <a href={userIsLogged ? '/login' : '/signup'}>
              {userIsLogged ? 'Logout' : 'Signup'}
            </a>
          </li>
          <li><a href="/faq">FAQ</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default NavMain;
