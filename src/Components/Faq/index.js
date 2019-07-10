import React from 'react';
import NavMain from '../NavMain';
import './index.scss';

function Faq() {
  return (
    <div className="page page-about">
      <NavMain />
      <div className="page-inner">
        <div className="page-panel">
          <div>
            <section>
              <a href='/#'>What is Skipper?</a><br></br>
              <a href='/#'>Why did we make Skipper?</a><br></br>
              <a href='/#'>How did we make Skipper?</a><br></br>
              <a href='/#'>Who is maintaining Skipper?</a><br></br>
              <a href='/#'>Can I use Skipper on my computer?</a><br></br>
              <a href='/#'>Can I use Skipper on my phone?</a><br></br>
              <a href='/#'>Is Skipper an iOS App?</a><br></br>
              <a href='/#'>Is Skipper web-based?</a><br></br>
              <a href='/#'>Does Skipper have a plugin for web browsers</a><br></br>
              <a href='/#'>How does Skipper protect my credentials from unsavory pirates?</a><br></br>
              <a href='/#'>What is federated/decentralised and end-to-end encryption and how does it apply to Skipper?</a><br></br>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Faq;
