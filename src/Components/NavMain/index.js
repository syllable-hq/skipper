import React from 'react';
import './index.scss';

class NavMain extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <nav className="nav-main">
        <img className="logo" src={`/skipper_logo.png`} />
        <input className="menu-btn" type="checkbox" id="menu-btn" />
        <label className="menu-icon" htmlFor="menu-btn"><span className="navicon"></span></label>
        <ul className="menu">
          <li><a href="/dashboard">Dashboard</a></li>
          <li><a href="#about">About Skipper</a></li>
          <li><a href="#careers">Contact Skipper</a></li>
          <li><a href="#contact">FAQ</a></li>
          <li><a href="/signup">Signup</a></li>
        </ul>
      </nav>
    );
  }
}

export default NavMain;
