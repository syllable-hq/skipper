import React, { useState } from 'react';
import NavMain from '../NavMain';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import CredentialRow from './CredentialRow';
import { getCredentials, userLogged } from '../../utils';
import { LOGIN_PATH } from '../../constants';
import './index.scss';

function Dashboard() {
  if (!userLogged()) {
    return window.location.href = LOGIN_PATH;
  }
  const [credentials, _] = useState(
    getCredentials()
  );  
  function credentialRow(credential, i) {
    return <CredentialRow key={i} {...credential}
      goToCredential={() => goToCredential(i)} />
  }

  function goToCredential(itemIndex) {
    window.location.href = `/secrets/${itemIndex}`;
  }
  return(
    <div className="dashboard">
      <NavMain activePage='home'/>
        <div className="page-inner">
          <div className="page-panel">
            <h1>DASHBOARD</h1>

            <Form.Group>
              <Form.Control type="text" placeholder="Search yout secrets" />
            </Form.Group>

            <span>Recent Searches</span>

            <Table striped>
              <tbody>
                { credentials.map(credentialRow) }
              </tbody>
            </Table>

            <a href="/credential">
              <button className="btn-add"><span>+</span></button>
            </a>

          </div>
        </div>
    </div>
  );
}

export default Dashboard;