import React, { useState, useEffect } from 'react';
import NavMain from '../NavMain';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import randomize from 'randomatic';
import copyClipboard from 'clipboard-copy';
import Alert from 'react-bootstrap/Alert';

import {
  createUserStorage,
  saveMasterPassword,
  passwordStored,
 } from '../../utils';
import { 
  RANDOMIZE_PATTERN, RANDOMIZE_LENGTH,
  SIGNUP_CONFIRMATION_PATH,
  CURRENT_USER_KEY,
} from '../../constants';

import './index.scss';

function Home() {
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
    const passwordFound = passwordStored(passwordToUse);

    if (passwordFound) {
      setMessage('Password was found');
      return;
    }
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(masterPassword, salt, function(err, hash) {
        createUserStorage(hash);
        localStorage.setItem(CURRENT_USER_KEY, hash);
        window.location.href = SIGNUP_CONFIRMATION_PATH;
      });
    });
  }

  function copyToClipboard() {
    copyClipboard(masterPassword);
    setFlag(true);
    setTimeout(() => setFlag(false), 2000)
  }

  return (
    <div className="page page-home">
      <NavMain activePage='home'/>
      <div className="page-inner">
        <div className="page-panel">
          <h1>SIGN UP</h1>
          { message && <Alert variant='danger'> {message} </Alert> }
          { copiedFlag && <Alert className="alert-copied" variant="info">
            Value Copied!
          </Alert> }
          <Form.Group>
            <Form.Label>Generate Master Password</Form.Label>
            <Form.Control type="text" value={masterPassword} placeholder="Generate me!" readOnly={true}/>
          </Form.Group>

          <Form.Group>
            <Button onClick={generatePassword} className="generate-button" variant="secondary">Generate</Button>
            <Button onClick={copyToClipboard} className="copy-button" variant="secondary">Copy</Button>
          </Form.Group>

          <div className="divider">OR</div>

          <Form.Group>
            <Form.Label>Choose your Master Password</Form.Label>
            <Form.Control type="password" value={typedPassword} onChange={typedPasswordHandler} placeholder="xxxxxxxxxxxxxxxx" />
            <a className="info">Why 15 characters?</a>
          </Form.Group>

          <Form.Group>
            <Button onClick={nextHandler} className="next-button" variant="secondary">
              Next
            </Button>
          </Form.Group>
        </div>
      </div>
    </div>
  );
}

export default Home;
