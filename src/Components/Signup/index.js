import React, { useState, useEffect } from 'react';
import NavMain from '../NavMain';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import randomize from 'randomatic';
import copyClipboard from 'clipboard-copy';
import Alert from 'react-bootstrap/Alert';
import { withFirebase } from '../../Firebase';
import InBrowserOnly from '../InBrowserOnly';

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
} from '../../constants';

import './index.scss';

const [masterPassword, setMasterPassword] = useState(
  randomize(RANDOMIZE_PATTERN, RANDOMIZE_LENGTH)
);
const [copiedFlag, setFlag] = useState(false);
const [message, setMessage] = useState('');
const [typedPassword, setTypedPassword] = useState('');

useEffect(() => {
  saveMasterPassword(masterPassword);
}, [masterPassword]);

class Signup extends React.Component {
  constructor() {
    super();

    this.state = {
      currentProjectIdx: 0,
    };

    this.generatePassword = this.generatePassword.bind(this);
    this.typedPasswordHandler = this.typedPasswordHandler.bind(this);
    this.nextHandler = this.nextHandler.bind(this);
    this.copyToClipboard = this.copyToClipboard.bind(this);
  }

  generatePassword() {
    const masterPassword = randomize(RANDOMIZE_PATTERN, RANDOMIZE_LENGTH)
    setMasterPassword(masterPassword);
  }

  typedPasswordHandler(evt) {
    setTypedPassword(evt.target.value);
  }

  nextHandler() {
    const passwordToUse = typedPassword ? typedPassword : masterPassword;

    props.db.getAllUsers()
    .then(querySnapshot => {
      const users = [];
      querySnapshot.forEach(function(doc) {
        const userObject = Object.assign({}, doc.data(), {id: doc.id});
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

  copyToClipboard() {
    copyClipboard(masterPassword);
    setFlag(true);
    setTimeout(() => setFlag(false), 2000)
  }

  render() {
    return (
      <InBrowserOnly>
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
      </InBrowserOnly>
    );
  }
}

export default withFirebase(Signup);
