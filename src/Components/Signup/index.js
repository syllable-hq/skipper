import React, { useState, useEffect } from 'react';
import { navigate } from "@reach/router";
import NavMain from '../NavMain';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import randomize from 'randomatic';
import copyClipboard from 'clipboard-copy';
import Alert from 'react-bootstrap/Alert';
import { withFirebase } from '../../Firebase';

import {
  saveMasterPassword,
  findUserMatch,
  cypherMasterPassword,
  createUserStorage,
} from '../../utils';
import {
  RANDOMIZE_PATTERN,
  RANDOMIZE_LENGTH,
  SIGNUP_CONFIRMATION_PATH,
  USER_ID,
  PASSWORD_LENGTH
} from '../../constants';

import './index.scss';

function Signup(props) {
  const [masterPassword, setMasterPassword] = useState(
    randomize(RANDOMIZE_PATTERN, RANDOMIZE_LENGTH)
  );
  const [copiedFlag, setFlag] = useState(false);
  const [message, setMessage] = useState('');
  const [typedPassword, setTypedPassword] = useState('');

  useEffect(() => {
    saveMasterPassword(masterPassword);
  }, [masterPassword]);

  function generatePassword() {
    const masterPassword = randomize(RANDOMIZE_PATTERN, RANDOMIZE_LENGTH)
    setMasterPassword(masterPassword);
  }

  function typedPasswordHandler(evt) {
    setTypedPassword(evt.target.value);
  }

  function nextHandler() {
    const passwordToUse = typedPassword ? typedPassword : masterPassword;

    if (typedPassword && typedPassword.length < PASSWORD_LENGTH) {
      setMessage(`Password is to short! At least ${PASSWORD_LENGTH} character required`);
      return;
    }

    props.db.getAllUsers()
      .then(querySnapshot => {
        const users = [];
        querySnapshot.forEach(function (doc) {
          const userObject = Object.assign({}, doc.data(), { id: doc.id });
          users.push(userObject);
        });

        const userFound = findUserMatch(passwordToUse, users);
        if (userFound) {
          setMessage('Password Found');
          return;
        }
        return cypherMasterPassword(passwordToUse)
      })
      .then(hashedPassword => {
        const user = createUserStorage(hashedPassword);
        return props.db.createUserInfo(user);
      })
      .then(doc => {
        localStorage.setItem(USER_ID, doc.id);
        window.location.href = SIGNUP_CONFIRMATION_PATH;
      });
  }

  function copyToClipboard() {
    copyClipboard(masterPassword);
    setFlag(true);
    setTimeout(() => setFlag(false), 2000)
  }

  function loginAction(evt) {
    navigate('/login');
  }

  return (
    <div className="page page-home">
      <NavMain activePage='home' />
      <div className="page-inner">
        <div className="page-panel">
          <h1>SIGN UP</h1>
          {message && <Alert variant='danger'> {message} </Alert>}
          {copiedFlag && <Alert className="alert-copied" variant="info">
            Value Copied!
          </Alert>}
          <Form.Group>
            <Form.Label>Generate Master Password</Form.Label>
            <Form.Control type="text" value={masterPassword} placeholder="Generate me!" readOnly={true} />
          </Form.Group>

          <Form.Group>
            <Button onClick={generatePassword} className="generate-button" variant="secondary">Generate</Button>
            <Button onClick={copyToClipboard} className="copy-button" variant="secondary">Copy</Button>
          </Form.Group>

          <div className="divider">OR</div>

          <Form.Group>
            <Form.Label>Choose your Master Password</Form.Label>
            <Form.Control type="password" value={typedPassword} onChange={typedPasswordHandler} placeholder="xxxxxxxxxxxx" />
            <a className="info">Why 12 characters?</a>
          </Form.Group>
          <div className="next">
            <Button onClick={nextHandler} className="next-button" variant="secondary">
              Next
            </Button>
          </div>
          <div className="back-login">
            <p>Already on Skipper?</p>
            <Button type="button" onClick={loginAction} className="login-button" variant="secondary">Log In</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withFirebase(Signup);
