import React, { useState, useEffect } from 'react';
import NavMain from '../NavMain';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import CredentialRow from './CredentialRow';
import useCredentialFetch from './useStateCredentials';
import { withFirebase } from '../../Firebase';
import CSVReader from 'react-csv-reader';
import Modal from 'react-bootstrap/Modal';
import CredentialForm from '../Credential/form';
import { CSVLink } from "react-csv";
import { InBrowserOnly } from '../../utils/InBrowserOnly';

import {
  userLogged,
  filterList,
  buildURLParam,
  buildCredential,
  addCredentialInfo,
  removeCredential,
  getCredentials,
  setCredentials,
} from '../../utils';

import { LOGIN_PATH } from '../../constants';
import './index.scss';

function Dashboard(props) {
  if (!userLogged()) {
    return window.location.href = LOGIN_PATH;
  }

  const credentials = useCredentialFetch(props);
  const [display, setDisplay] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [credential, setCredential] = useState({});
  const [indexToUpdate, setIndexToUpdate] = useState(null);

  const csvData = credentials.map(cred => [cred.website, cred.primaryUser, cred.secundaryUser, cred.password]);

  useEffect(() => {
    setDisplay(credentials);
  }, [credentials])

  function credentialRow(credential, i) {
    return <CredentialRow key={i} indexItem={i} {...credential}
      removeHandler={removeHandler} editHandler={editHandler}
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

  function removeHandler(indexItem) {
    const userInfo = removeCredential(indexItem);
    props.db.saveUserInfo(userInfo)
    .then(() => {
      setDisplay(getCredentials(userInfo.credentials));
    });
  }

  function editHandler(indexItem) {
    const credential =  credentials[indexItem];
    setIndexToUpdate(indexItem);
    setCredential(credential);
    setShowEditModal(!showEditModal);
  }

  function hideHandler() {
    setShowEditModal(false);
  }

  function updateHandler(data) {
    const updateCredential = Object.assign({}, credential, data);
    credentials.splice(indexToUpdate, 1, updateCredential);
    hideHandler();
    const userInfo = setCredentials(credentials);
    props.db.saveUserInfo(userInfo)
    .then(() => {
      setDisplay([...credentials])
    });
  }

  return(
    <InBrowserOnly>
      <div className="page dashboard">
      <NavMain activePage='home'/>
        <div className="page-inner">
          <div className="page-panel">
            <h1>DASHBOARD</h1>

            <Form.Group>
              <Form.Control onChange={searchHandler} type="text" placeholder="Search yout secrets" />
            </Form.Group>

            <span>Recent Searches</span>

            <Table striped>
              <tbody>
                { display.map(credentialRow) }
              </tbody>
            </Table>

            <a href="/credential">
              <button className="btn-add"><span>+</span></button>
            </a>

            <CSVReader
              label="Upload your passwords from a csv"
              onFileLoaded={handleForce}
              inputId="password-reader"
            />
            <CSVLink data={csvData}>Export Credentials</CSVLink>
            <Modal show={showEditModal} onHide={hideHandler}>
              <Modal.Body>
                <CredentialForm {...credential} updateHandler={updateHandler}  />
              </Modal.Body>
            </Modal>
          </div>
        </div>
    </div>
    </InBrowserOnly>
  );
}

export default withFirebase(Dashboard);
