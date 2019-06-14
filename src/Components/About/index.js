import React from 'react';
import NavMain from '../NavMain';
import './index.scss';
 
function About() {
  return (
    <div className="page page-about">
      <NavMain />
      <div className="page-inner">
        <div className="page-panel">
          <div>
            <section>
              <h2 className="h2">
                About Us
              </h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}


export default About;
