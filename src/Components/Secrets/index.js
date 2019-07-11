import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col'
import copyClipboard from 'clipboard-copy';
import NavMain from '../NavMain';
import useCredentialFetch from '../Dashboard/useStateCredentials';
import { withFirebase } from '../../Firebase';
import CredentialForm from '../Credential/form';

import {
  getCredentialAt,
  logout,
  setCredentials,
  getCredentials,
  removeCredential,
} from '../../utils';

import { DASHBOARD_PATH } from '../../constants';

import './index.scss';

function RowItem({ label, value, valueCopiedHandler }) {
  return (
    <Row>
      <Col className="text-left">
        <Row>
          <Col>
            <Form.Label>{label}:</Form.Label>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Label>{label === 'Secret' ? '************' : value}</Form.Label>
          </Col>
        </Row>
      </Col>
      <Col className="text-rigth">
        <Button className="btn-copy" onClick={() => valueCopiedHandler(value)} variant="secondary">Copy</Button>
      </Col>
    </Row>
  );
}

// Secrets component
function Secrets(props) {
  const credentials = useCredentialFetch(props);
  const [display, setDisplay] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [credential, setCredential] = useState({});
  const [indexToUpdate, setIndexToUpdate] = useState(null);

  const [copiedFlag, setFlag] = useState(false);

  const { id } = props;
  const secrets = getCredentialAt(id);

  validatePage(secrets);

  // Validate if CURRENT_USER_KEY exist otherwise force logout 
  function validatePage(credentialFound) {
    if (!credentialFound) {
      logout();
      return (<div></div>)
    }
  }

  // Copy secrets specific value
  function valueCopiedHandler(value) {
    setFlag(true);
    copyClipboard(value);
    setTimeout(() => setFlag(false), 2000)
  }

  // Delete secrets
  function removeHandler(indexItem) {
    const userInfo = removeCredential(indexItem);
    props.db.saveUserInfo(userInfo)
      .then(() => {
        window.location.href = '/dashboard';
      });
  }

  // Show edit secrets
  function editHandler(indexItem) {
    const credential = credentials[indexItem];
    setIndexToUpdate(indexItem);
    setCredential(credential);
    setShowEditModal(!showEditModal);
  }

  // Hide edit secrets
  function hideHandler() {
    setShowEditModal(false);
  }

  // Update secrets
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

  return (
    <div className="page page-secrets">
      <NavMain />
      <div className="page-inner">
        <div className="page-panel">

          <h1>SECRET BURIED!</h1>
          {copiedFlag && <Alert className="alert-copied" variant="info">
            Value Copied!
            </Alert>}

          <div className="subtitle">
            <span>Secret Info:</span>
          </div>

          <div className="secrets-group">
            <Form.Group>
              <RowItem valueCopiedHandler={valueCopiedHandler} label="URL" value={secrets.website} />
            </Form.Group>

            <Form.Group>
              <RowItem valueCopiedHandler={valueCopiedHandler} label="Username Primary" value={secrets.primaryUser} />
            </Form.Group>

            <Form.Group>
              <RowItem valueCopiedHandler={valueCopiedHandler} label="Username Secondary" value={secrets.secundaryUser} />
            </Form.Group>

            <Form.Group>
              <RowItem valueCopiedHandler={valueCopiedHandler} label="Secret" value={secrets.password} />
            </Form.Group>
            <Form.Group className="actions">
              <Button variant="danger" size="sm" onClick={() => removeHandler(id)}>Remove</Button>
              <Button variant="dark" size="sm" onClick={() => editHandler(id)} >Edit</Button>
            </Form.Group>
          </div>
          <Form.Group>
            <a className="dashboard-link" href={DASHBOARD_PATH}>
              <Button variant="secondary">Dashboard</Button>
            </a>
          </Form.Group>
          <Modal show={showEditModal} onHide={hideHandler}>
            <Modal.Body>
              <CredentialForm {...credential} updateHandler={updateHandler} />
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  )
}

export default withFirebase(Secrets);