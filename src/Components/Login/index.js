import React, { useRef } from 'react';
import NavMain from '../NavMain';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './index.scss';

function Login() {
  const inputPasswordEl = useRef(null);

  function loginAction() {
    console.log(inputPasswordEl.current.value)
  }

  return(
    <div className="page-login">
      <NavMain />
      <div className="page-inner">
        <div className="page-panel">
          <h1>LOGIN</h1>

          <Form.Group className="form-group">
            <Form.Label>Master Passowrd</Form.Label>
            <Form.Control ref={inputPasswordEl} type="text" />
            <a href="/">What if I forget my Master Password?</a>
          </Form.Group>
          <Button onClick={loginAction} className="login-button" variant="secondary">Login</Button>
        </div>
      </div>
      

    </div>
  )
}

export default Login;