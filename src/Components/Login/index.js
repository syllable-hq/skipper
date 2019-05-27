import React, { useRef, useState } from 'react';
import NavMain from '../NavMain';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert'

import {
  logout,
  saveMasterPassword,
  passwordStored,
} from '../../utils';

import {
  DASHBOARD_PATH,
  CURRENT_USER_KEY,
} from '../../constants';
import './index.scss';

function Login() {
  logout();
  const inputPasswordEl = useRef(null);
  const [message, setMessage] = useState('');

  function loginAction() {
    const password = inputPasswordEl.current.value;
    const foundKey = passwordStored(password);
    if (foundKey) {
      localStorage.setItem(CURRENT_USER_KEY, foundKey);
      saveMasterPassword(password);
      window.location.href = DASHBOARD_PATH;
    }else {
      setMessage('Password not found');
    }
  }

  return(
    <div className="page-login">
      <NavMain />
      <div className="page-inner">
        <div className="page-panel">
          <h1>LOGIN</h1>

          <Form.Group className="form-group">
            <Form.Label>Master Password</Form.Label>
            <Form.Control ref={inputPasswordEl} type="text" />
            <a href="/">What if I forget my Master Password?</a>
          </Form.Group>
          { message && <Alert variant='danger'> {message} </Alert> }
          <Button onClick={loginAction} className="login-button" variant="secondary">Login</Button>
        </div>
      </div>
      

    </div>
  )
}

export default Login;