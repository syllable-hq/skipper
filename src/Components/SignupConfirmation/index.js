import React, { useState } from 'react';
import NavMain from '../NavMain';
import './index.scss';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { getUserName, updateUserName } from '../../utils';
import { DASHBOARD_PATH } from '../../constants';

function SingupConfirmation() {
  const [userName, setUserName] = useState(getUserName());

  function changeUserNameHandler(evt) {
    setUserName(evt.target.value);
  }

  function editUsername() {
    updateUserName(userName);
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
            <Form.Control  type="text" value={userName} onChange={changeUserNameHandler} />
            <Button className="edit-button" onClick={editUsername} variant="secondary">Edit</Button>
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
            <a href={DASHBOARD_PATH}>
              <Button variant="secondary">
                Dashboard
              </Button>
            </a>
          </Form.Group>

        </div>
      </div>
    </div>
  );
}

export default SingupConfirmation;