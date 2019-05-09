import React from 'react';
import NavMain from '../NavMain';
import NavSide from '../NavSide';
import './index.scss';

class Studio extends React.Component {

  componentDidMount() {
    //hack in case old page name 'about' is served
    if(window.location.pathname === '/about') {
      window.location.pathname = '/studio';
    }
  }

  render() {
    return (
      <div className="page page-about">
        <NavMain activePage='studio'/>
        <div className="page-inner">
          <div className="page-panel">
            <div className="flex-container">
              <div className="two-col-panel flex-cols-2 about-map">
                <div className="background-map"></div>
              </div>
              <div className="two-col-panel scroll flex-cols-2 col-right">
                <section>
                  <h2 className="h2">
                    About Us
                  </h2>
                  <p>Syllable is a technology and design shop focused on mission-driven projects.</p>
                  <p>Based in Brooklyn, New York, we're a full service agency. We build websites and other digital products from brainstorm, to wireframe, to software development.</p>
                  <h2 className="h2">
                    Our Mission
                  </h2>
                  <p>We want to work with partners who inspire us. We seek out non-profits and cultural institutions in sectors like education, green energy, and emerging technologies.</p>
                  <p>Syllable is run by Eric Chaves. <a href="mailto:eric@syllablehq.com" target='_blank' rel="noopener noreferrer">Let's work together!</a></p>
                </section>
                <section>
                  <h2 className="h2">
                    Contact
                  </h2>
                  <address>
                    Syllable Productions<br/>
                    67 West St, Suite 401-C11 <br/>
                    Brooklyn, NY 11222
                  </address>
                  <p>
                    <a href="mailto:eric@syllablehq.com" target='_blank' rel="noopener noreferrer">eric@syllablehq.com</a>
                  </p>
                </section>
              </div>
            </div>
          </div>
        </div>
        <NavSide />
      </div>
    );
  }
}

export default Studio;
