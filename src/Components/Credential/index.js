import React, { useState } from 'react';
import NavMain from '../NavMain';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import randomize from 'randomatic';
import { withFirebase } from '../../Firebase';

import {
  RANDOMIZE_PATTERN,
  RANDOMIZE_LENGTH,
  DASHBOARD_PATH,
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

  function generatePassword() {
    const newPassword = randomize(RANDOMIZE_PATTERN, RANDOMIZE_LENGTH);
    setPassword(newPassword);
  }

  function addCredential() {
    const userInfo = addCredentialInfo([{website, password, primaryUser, secundaryUser}]);
    props.db.saveUserInfo(userInfo)
    .then(() => {
      window.location.href = DASHBOARD_PATH;
    });
  }

  function changeWebsiteHandler(evt) {
    setWebsite(evt.target.value);
  }

  function changePrimaryHandler(evt) {
    setPrimaryUser(evt.target.value);
  }

  function changeSecundaryHandler(evt) {
    setSecundaryUser(evt.target.value);
  }
  
  return(
    <div className="page page-credential">
      <NavMain activePage='home'/>
      <div className="page-inner">
        <div className="page-panel">
          <h1>CREATE</h1>

          <span>Create a new secret:</span>
          <Form.Group className="form-group">
            <Form.Label>URL:</Form.Label>
            <Form.Control type="text" value={website} onChange={changeWebsiteHandler} placeholder="http://www.website.com"/>

            <Form.Label>Username Primary:</Form.Label>
            <Form.Control type="text" value={primaryUser} onChange={changePrimaryHandler} placeholder="myusername or user@mail.com"/>

            <Form.Label>Username Secondary:</Form.Label>
            <Form.Control type="text" value={secundaryUser} onChange={changeSecundaryHandler} />

            <Form.Label>Secret:</Form.Label>
            <Form.Control type="text" value={password} placeholder="***********" readOnly={true}/>

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