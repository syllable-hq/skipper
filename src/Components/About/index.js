import React from 'react';
import NavMain from '../NavMain';
import './index.scss';

function About() {
  return (
    <div className="page page-about">
      <NavMain />
      <div className="page-inner">
        <div className="page-panel">
          <h1>About Skipper</h1>
          <div>
            <section>
              <h3 className="h3">
                Who made Skipper?
              </h3>
              <p>Skipper is an open source project sponsored by <a href="https://www.syllablehq.com/" target="_blank" rel="noopener noreferrer">Syllable</a>. <br/>

              </p>
              <h3 className="h3">
                What is Skipper?
              </h3>
              <p>Skipper is a dead-simple password manager.</p>
              <p>Skipper is safe, secure and robust. <br />
                <a href="#">How?</a>
              </p>
              <p>Skipper is Open Source. <br />
                <a href="#">Why is this good? Get involved</a>
              </p>
              <p>Skipper keeps your secrets using a method where no one knows any of your secrets except you. <br />
                <a href="#">Where can I learn more?</a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}


export default About;
