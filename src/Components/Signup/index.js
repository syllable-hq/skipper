import React, { useState, useRef } from 'react';
import NavMain from '../NavMain';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import randomize from 'randomatic';
import copyClipboard from 'clipboard-copy';

import { 
  RANDOMIZE_PATTERN, RANDOMIZE_LENGTH
} from '../../utils/constants';

import './index.scss';

function Home() {
  const [masterPassword, setMasterPassword] = useState(randomize(RANDOMIZE_PATTERN, RANDOMIZE_LENGTH));
  const txtPasswordRef = useRef(null);

  function generatePassword() {
    setMasterPassword(randomize(RANDOMIZE_PATTERN, RANDOMIZE_LENGTH))
  }

  function copyToClipboard() {
    copyClipboard(txtPasswordRef.current.value);
  }

  return (
    <div className="page page-home">
      <NavMain activePage='home'/>
      <div className="page-inner">
        <div className="page-panel">
          <h1>SIGN UP</h1>

          <Form.Group>
            <Form.Label>Generate Master Password</Form.Label>
            <Form.Control ref={txtPasswordRef} type="text" value={masterPassword} placeholder="Generate me!" readOnly={true}/>
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
            <a href="/signup_confirmation">
              <Button className="next-button" variant="secondary">
                Next
              </Button>
            </a>
          </Form.Group>
        </div>
      </div>
    </div>
  );
}

export default Home;
