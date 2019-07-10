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

  return (
    <div className="page signup-confirmation">
      <NavMain activePage='home' />
      <div className="page-inner">
        <div className="page-panel">
          <h1>
            SIGN UP
            <br></br>
            Confirmed
          </h1>

          <h2>Welcome Aboard!</h2>
          <Form.Group className="name-group">
            <Form.Label><span>Name:</span> <Form.Control type="text" value={userName} onChange={changeUserNameHandler} /></Form.Label>
            <Button className="edit-button" onClick={editUsername} variant="secondary">Edit</Button>

          </Form.Group>

          <div className="get-started">
            <span>Lets Get Started...</span>
            <a href={DASHBOARD_PATH}>
              <Button variant="secondary">
                Dashboard
              </Button>
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}

export default SingupConfirmation;