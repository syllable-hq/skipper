import React, { useState, useEffect } from 'react';
import NavMain from '../NavMain';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import CredentialRow from './CredentialRow';
import useCredentialFetch from './useStateCredentials';
import { withFirebase } from '../../Firebase';
import CSVReader from 'react-csv-reader';
import { CSVLink } from "react-csv";

import {
  userLogged,
  filterList,
  buildURLParam,
  buildCredential,
  addCredentialInfo,
} from '../../utils';

import { LOGIN_PATH } from '../../constants';
import './index.scss';

function Dashboard(props) {
  if (!userLogged()) {
    return window.location.href = LOGIN_PATH;
  }

  const credentials = useCredentialFetch(props);
  const [display, setDisplay] = useState([]);

  const csvData = credentials.map(cred => [cred.website, cred.primaryUser, cred.secundaryUser, cred.password]);

  // Define csv headers
  csvData.unshift(['Website', 'Password', 'Primary User', 'Secondary User'])

  useEffect(() => {
    setDisplay(credentials);
  }, [credentials])

  function credentialRow(credential, i) {
    return <CredentialRow key={i} indexItem={i} {...credential}
      goToCredential={() => goToCredential(i)} />
  }

  function goToCredential(itemIndex) {
    const credential = credentials[itemIndex];
    delete credential.password;
    window.location.href = `/secrets/${itemIndex}?${buildURLParam(credential)}`;
  }

  function searchHandler(evt) {
    const query = evt.target.value;
    const filteredCredentials = query ? filterList(query, credentials) : credentials;
    setDisplay(filteredCredentials);
  }

  function handleForce(data) {
    const credentialsObject = buildCredential(data);
    const userInfo = addCredentialInfo(credentialsObject);
    props.db.saveUserInfo(userInfo)
      .then(() => {
        setDisplay([...credentials, ...credentialsObject])
      });
  }

  return (
    <div className="page dashboard">
      <NavMain activePage='home' />
      <div className="page-inner">
        <div className="page-panel">
          <h1>DASHBOARD</h1>

          <Form.Group>
            <Form.Control onChange={searchHandler} type="text" placeholder="Search yout secrets" />
          </Form.Group>

          <div className="btn-add-container">
            <a href="/credential">
              <button className="btn-add"><span>+</span></button>
            </a>
          </div>

          <span className="recent-searches">Recent Searches</span>

          <Table striped>
            <tbody>
              {display.map(credentialRow)}
            </tbody>
          </Table>

          <CSVReader
            label="Upload your passwords from a csv"
            onFileLoaded={handleForce}
            inputId="password-reader"
          />
          <CSVLink data={csvData}>Export Credentials</CSVLink>
        </div>
      </div>
    </div>
  );
}

export default withFirebase(Dashboard);
