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
              <h3 className="h3">
                What is Skipper?
              </h3>
              <p>Skipper is a dead-simple password manager.<a href="#">Thank goodness because I can never remember all my website login credentials!</a></p>
              <p>Skipper is safe, secure and robust.<a href="#">How?</a></p>
              <p>Skipper is Open Source.<a href="#">Why is this good? Get involve</a></p>
              <p>Skipper keeps your secrets using a method where no one knows any of your secrets except you.<a href="#">Where can I learn more?</a></p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}


export default About;
