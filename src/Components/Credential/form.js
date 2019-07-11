import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './form.scss';

function CredentialForm(props) {

  function changeWebsite(event) {
    setWebsite(event.target.value);
  }
  function changePrimaryUser(event) {
    setPrimaryUser(event.target.value);
  }

  function changeSecundaryUser(event) {
    setSecundaryUser(event.target.value);
  }

  function changePassword(event) {
    setPassword(event.target.value);
  }

  const [website, setWebsite] = useState(props.website);
  const [primaryUser, setPrimaryUser] = useState(props.primaryUser);
  const [secundaryUser, setSecundaryUser] = useState(props.secundaryUser);
  const [password, setPassword] = useState(props.password);

  function saveHandler() {
    props.updateHandler({ website, primaryUser, secundaryUser, password });
  }

  return (
    <Form.Group className="secrets-form">
      <Form.Label>URL:</Form.Label>
      <Form.Control type="text" name="website" value={website} onChange={changeWebsite} placeholder="http://www.website.com" />

      <Form.Label>Username Primary:</Form.Label>
      <Form.Control type="text" name="primaryUser" value={primaryUser} onChange={changePrimaryUser} placeholder="myusername or user@mail.com" />

      <Form.Label>Username Secondary:</Form.Label>
      <Form.Control type="text" name="secundaryUser" value={secundaryUser} onChange={changeSecundaryUser} />

      <Form.Label>Secret:</Form.Label>
      <Form.Control type="text" name="password" value={password} onChange={changePassword} placeholder="***********" />

      <Button onClick={saveHandler} variant="secondary">Save</Button>
    </Form.Group>
  );
}

export default CredentialForm;