import React, { useState, useEffect } from 'react';
import NavMain from '../NavMain';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import randomize from 'randomatic';
import copyClipboard from 'clipboard-copy';
import Cookies from 'universal-cookie';
import bcrypt from 'bcryptjs';

import { 
  RANDOMIZE_PATTERN, RANDOMIZE_LENGTH,
  USER_KEY
} from '../../constants';

import './index.scss';

function Home() {
  const [masterPassword, setMasterPassword] = useState(
    randomize(RANDOMIZE_PATTERN, RANDOMIZE_LENGTH)
  );
  const cookies = new Cookies();

  useEffect(() => {
    cookies.set('activeMasterPassword', masterPassword, { path: '/' });
  }, [masterPassword]);

  function generatePassword() {
    const masterPassword = randomize(RANDOMIZE_PATTERN, RANDOMIZE_LENGTH)
    setMasterPassword(masterPassword);
  }

  function nextHandler() {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(masterPassword, salt, function(err, hash) {
        console.log('userkey', hash);
        window.location.href = '/signup_confirmation';
        localStorage.setItem(USER_KEY, hash);
      });
    });
  }

  function copyToClipboard() {
    copyClipboard(masterPassword);
  }

  return (
    <div className="page page-home">
      <NavMain activePage='home'/>
      <div className="page-inner">
        <div className="page-panel">
          <h1>SIGN UP</h1>

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
            <Form.Control type="password" placeholder="xxxxxxxxxxxxxxxx" />
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
