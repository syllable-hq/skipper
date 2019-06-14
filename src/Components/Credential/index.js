import React, { useState } from 'react';
import NavMain from '../NavMain';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import randomize from 'randomatic';
import { withFirebase } from '../../Firebase';
import Alert from 'react-bootstrap/Alert';

import {
  RANDOMIZE_PATTERN,
  RANDOMIZE_LENGTH,
  DASHBOARD_PATH,
  PASSWORD_LENGTH,
} from '../../constants';
import { addCredentialInfo } from '../../utils';

import './index.scss';

function Credential(props) {

  const [password, setPassword] = useState(
    randomize(RANDOMIZE_PATTERN, RANDOMIZE_LENGTH)
  );
  const [website, setWebsite] = useState('');
  const [primaryUser, setPrimaryUser] = useState('');
  const [secundaryUser, setSecundaryUser] = useState('');
  const [message, setMessage] = useState('');

  function generatePassword() {
    const newPassword = randomize(RANDOMIZE_PATTERN, RANDOMIZE_LENGTH);
    setPassword(newPassword);
  }

  function addCredential() {
    if(password.length < PASSWORD_LENGTH) {
      setMessage(`Password is to short! At least ${PASSWORD_LENGTH} character required`);
      return;
    }
    const userInfo = addCredentialInfo([{website, password, primaryUser, secundaryUser}]);
    props.db.saveUserInfo(userInfo)
    .then(() => {
      window.location.href = DASHBOARD_PATH;
    });
  }

  function changeWebsiteHandler(event) {
    setWebsite(event.target.value);
  }

  function changePrimaryHandler(event) {
    setPrimaryUser(event.target.value);
  }

  function changeSecundaryHandler(event) {
    setSecundaryUser(event.target.value);
  }

  function changePasswordHandler(event) {
    setPassword(event.target.value);
  }
  
  return(
    <div className="page page-credential">
      <NavMain activePage='home'/>
      <div className="page-inner">
        <div className="page-panel">
          <h1>CREATE</h1>

          <span>Create a new secret:</span>

          { message && <Alert variant='warning'> {message} </Alert> }

          <Form.Group className="form-group">
            <Form.Label>URL:</Form.Label>
            <Form.Control type="text" value={website} onChange={changeWebsiteHandler} placeholder="http://www.website.com"/>

            <Form.Label>Username Primary:</Form.Label>
            <Form.Control type="text" value={primaryUser} onChange={changePrimaryHandler} placeholder="myusername or user@mail.com"/>

            <Form.Label>Username Secondary:</Form.Label>
            <Form.Control type="text" value={secundaryUser} onChange={changeSecundaryHandler} />

            <Form.Label>Secret:</Form.Label>
            <Form.Control type="text"  onChange={changePasswordHandler}  value={password} placeholder="***********" />

            <Button onClick={generatePassword} className="generate-button" variant="secondary">Generate</Button>
          </Form.Group>

          <Form.Group>
            <a href={DASHBOARD_PATH}>
              <Button variant="secondary">Cancel</Button>
            </a>
            <Button onClick={addCredential} className="save-button" variant="secondary">Save</Button>
          </Form.Group>
        </div>  
      </div>
    </div>
  )
}

export default withFirebase(Credential);