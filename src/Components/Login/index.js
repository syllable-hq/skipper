import React, { useRef, useState } from 'react';
import InBrowserOnly from '../InBrowserOnly';
import NavMain from '../NavMain';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { withFirebase } from '../../Firebase';

import {
  logout,
  saveMasterPassword,
  findUserMatch,
} from '../../utils';

import {
  DASHBOARD_PATH,
  CURRENT_USER_KEY,
  USER_ID,
} from '../../constants';
import './index.scss';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.inputPassWordRef = React.createRef();
  }

  loginAction(evt) {
    evt.preventDefault();
    const password = inputPasswordEl.current.value;
    props.db.getAllUsers()
    .then(querySnapshot => {
      const users = [];
      querySnapshot.forEach(function(doc) {
        const userObject = Object.assign({}, doc.data(), {id: doc.id});
        users.push(userObject);
      });
      const userFound = findUserMatch(password, users);
      if(!userFound) {
        setMessage('User Not Found');
        setTimeout(() => setMessage(''), 2000);
        return;
      }
      saveMasterPassword(password);
      // TODO: Not sure why build error "localStorage is not defined" still shows up
      // localStorage.setItem(userFound.userKey, JSON.stringify(userFound));
      // localStorage.setItem(CURRENT_USER_KEY, userFound.userKey);
      // localStorage.setItem(USER_ID, userFound.id);
      window.location.href = DASHBOARD_PATH;
    });
  }

  render() {
    logout();
    const inputPasswordEl = useRef(null);
    const [message, setMessage] = useState('');

    return(
      <InBrowserOnly>
        <div className="page page-login">
        <NavMain />
          <div className="page-inner">
            <div className="page-panel">
              <h1>LOGIN</h1>
              <Form>
                <Form.Group className="form-group">
                  <Form.Label>Master Password</Form.Label>
                  <Form.Control ref={this.inputPassWordRef} type="password" />
                  <a href="/">What if I forget my Master Password?</a>
                </Form.Group>
                { message && <Alert variant='danger'> {message} </Alert> }
                <Button type="submit" onClick={loginAction} className="login-button" variant="secondary">Login</Button>
              </Form>
            </div>
          </div>
        </div>
      </InBrowserOnly>
    )
  }
}

export default withFirebase(Login);