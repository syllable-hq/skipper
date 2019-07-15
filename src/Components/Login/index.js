import React, { useRef, useState } from 'react';
import NavMain from '../NavMain';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { withFirebase } from '../../Firebase';

import {
  clearStorage,
  saveMasterPassword,
  findUserMatch,
} from '../../utils';

import {
  DASHBOARD_PATH,
  CURRENT_USER_KEY,
  USER_ID,
} from '../../constants';
import './index.scss';

function Login(props) {
  clearStorage();
  const inputPasswordEl = useRef(null);
  const [message, setMessage] = useState('');

  function loginAction(evt) {
    evt.preventDefault();
    const password = inputPasswordEl.current.value;
    props.db.getAllUsers()
      .then(querySnapshot => {
        const users = [];
        querySnapshot.forEach(function (doc) {
          const userObject = Object.assign({}, doc.data(), { id: doc.id });
          users.push(userObject);
        });
        const userFound = findUserMatch(password, users);
        if (!userFound) {
          setMessage('User Not Found');
          setTimeout(() => setMessage(''), 2000);
          return;
        }
        saveMasterPassword(password);
        localStorage.setItem(userFound.userKey, JSON.stringify(userFound));
        localStorage.setItem(CURRENT_USER_KEY, userFound.userKey);
        localStorage.setItem(USER_ID, userFound.id);
        window.location.href = DASHBOARD_PATH;
      });
  }

  function signupAction(evt) {
    window.location.href = '/signup';
  }

  return (
    <div className="page page-login">
      <NavMain />
      <div className="page-inner">
        <div className="page-panel">
          <h1>LOGIN</h1>
          <Form>
            <Form.Group className="form-group">
              <Form.Label>Master Password</Form.Label>
              <Form.Control ref={inputPasswordEl} type="password" />
              {message && <Alert variant='danger'> {message} </Alert>}
              <div>
                <a href="/">Forgot Master Password?</a>
                <Button type="submit" onClick={loginAction} className="login-button" variant="secondary">Log In</Button>
              </div>
            </Form.Group>
          </Form>
          <div className="signup-section">
            <p>New to the ship?</p>
            <Button type="button" onClick={signupAction} className="login-button" variant="secondary">Sign Up</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withFirebase(Login);