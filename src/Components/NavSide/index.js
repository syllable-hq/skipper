import React from 'react';
import './index.scss';

class NavSide extends React.Component {
  render() {
    return (
      <div className="nav-side">
        <div className="bar-wrap left">
          <div className="bar">
            <div className="menu">
              <a className="menu-item" href="https://medium.com/@syllable">
                <div className="menu-item__animation-wrapper">
                  <span className="menu-item__icon icon-medium"></span>
                  <span className="menu-item__label">Blog</span>
                </div>
              </a>
              <a className="menu-item" href="https://www.behance.net/syllablehq">
                <div className="menu-item__animation-wrapper">
                  <span className="menu-item__icon icon-behance"></span>
                  <span className="menu-item__label">Portfolio</span>
                </div>
              </a>
              <a className="menu-item" href="https://twitter.com/syllablehq">
                <div className="menu-item__animation-wrapper">
                  <span className="menu-item__icon icon-twitter"></span>
                  <span className="menu-item__label">Twitter</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="bar-wrap right">
          <div className="bar">
          </div>
        </div>
      </div>
    );
  }
}

export default NavSide;
