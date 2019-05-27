import React from 'react';
import './index.scss';

import { userLogged } from '../../utils';

function NavMain() {

  const userIsLogged = userLogged();
  return (
    <nav className="nav-main">
      <a href="/">
        <img className="logo" src={`/skipper_logo.png`} />
      </a>
      <input className="menu-btn" type="checkbox" id="menu-btn" />
      <label className="menu-icon" htmlFor="menu-btn"><span className="navicon"></span></label>
      <ul className="menu">
        <li><a href="/dashboard">Dashboard</a></li>
        <li><a href="/about">About Skipper</a></li>
        <li><a href="#careers">Contact Skipper</a></li>
        <li>
          <a href={userIsLogged ? '/login' : '/signup'}>
            { userIsLogged ? 'Logout' : 'Signup' }
          </a>
        </li>
        <li><a href="#contact">FAQ</a></li>
      </ul>
    </nav>
  ); 
}

export default NavMain;
