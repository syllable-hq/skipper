  import React from 'react';
import NavMain from '../NavMain';
import './index.scss';

function Faq() {
  return (
    <div className="page page-about">
      <NavMain />
      <div className="page-inner">
        <div className="page-panel">
          <h1>FAQ</h1>
          <div>
            <section>
              <ul className="faq-list">
                <li>
                  <a href='#'>What is Skipper?</a>
                </li>
                <li>
                  <a href='#'>Why did we make Skipper?</a>
                </li>
                <li>
                  <a href='#'>How did we make Skipper?</a>
                </li>
                <li>
                  <a href='#'>Who is maintaining Skipper?</a>
                </li>
                <li>
                  <a href='#'>Can I use Skipper on my computer?</a>
                </li>
                <li>
                  <a href='#'>Can I use Skipper on my phone?</a>
                </li>
                <li>
                  <a href='#'>Is Skipper an iOS App?</a>
                </li>
                <li>
                  <a href='#'>Is Skipper web-based?</a>
                </li>
                <li>
                  <a href='#'>Does Skipper have a plugin for web browsers</a>
                </li>
                <li>
                  <a href='#'>How does Skipper protect my credentials from unsavory pirates?</a>
                </li>
                <li>
                  <a href='#'>What is federated/decentralised and end-to-end encryption and how does it apply to Skipper?</a>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Faq;
