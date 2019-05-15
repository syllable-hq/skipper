import React, { useState } from 'react';
import NavMain from '../NavMain';
import './index.scss';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import phonetic from 'phonetic';
import { USER_KEY } from '../../utils/constants';

function SingupConfirmation() {
  const generatedName = phonetic.generate({ seed: localStorage.getItem(USER_KEY) });
  const [userName, setUserName] = useState(generatedName);


  function changeUserNameHandler(evt) {
    console.log(evt.target.value)
  }

  return(
    <div className="page signup-confirmation">
      <NavMain activePage='home'/>
      <div className="page-inner">
        <div className="page-panel">
          <h1>SIGN UP</h1>
          <span className="sub-title">Confirmed</span>

          <h2>Welcome Aboard!</h2>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" value={userName} onChange={changeUserNameHandler} />
            <Button className="edit-button" variant="secondary">Edit</Button>
          </Form.Group>

          <div>
            <span>FAQ</span>
            <p>
              Skipper doesn't known password and never will keep this password save.
              Check out this <a href="/">resource</a> for how to follow best practice for staying safe.
            </p>
          </div>

          <span>Lets Get Started...</span>
          <Form.Group className="centered">
            <Button variant="secondary">
              <a className="dashboard-link" href="/">Dashboard</a>
            </Button>
          </Form.Group>

        </div>
      </div>
    </div>
  );
}

export default SingupConfirmation;