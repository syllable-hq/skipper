import React, { useState } from 'react';
import NavMain from '../NavMain';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import randomize from 'randomatic';
import { RANDOMIZE_PATTERN, RANDOMIZE_LENGTH } from '../../constants';

import './index.scss';

function Credential() {

  const [password, setPassword] = useState(
    randomize(RANDOMIZE_PATTERN, RANDOMIZE_LENGTH)
  );

  function generatePassword() {
    const newPassword = randomize(RANDOMIZE_PATTERN, RANDOMIZE_LENGTH);
    setPassword(newPassword);
  }
  
  return(
    <div className="page-credential">
      <NavMain activePage='home'/>
      <div className="page-inner">
        <div className="page-panel">
          <h1>CREATE</h1>

          <span>Create a new secret:</span>
          
          <Form.Group class="form-group">
            <Form.Label>URL:</Form.Label>
            <Form.Control type="text" placeholder="http://www.website.com"/>

            <Form.Label>Username Primary:</Form.Label>
            <Form.Control type="text" placeholder="myusername or user@mail.com"/>

            <Form.Label>Username Secondary:</Form.Label>
            <Form.Control type="text" />

            <Form.Label>Secret:</Form.Label>
            <Form.Control type="text" value={password} placeholder="***********"/>

            <Button onClick={generatePassword} className="generate-button" variant="secondary">Generate</Button>
          </Form.Group>

          <Form.Group>
            <Button className="save-button" variant="secondary">Save</Button>
          </Form.Group>
        </div>  
      </div>
    </div>
  )
}

export default Credential;