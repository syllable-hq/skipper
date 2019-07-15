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
import RemoveAlert from './removeAlert';

import {
  getCredentialAt,
  logout,
  setCredentials,
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
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [credential, setCredential] = useState({});
  const [indexToUpdate, setIndexToUpdate] = useState(null);

  const [copiedFlag, setFlag] = useState(false);
  const id = props.match.params.id;
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
  function deleteHandler(indexItem) {
    const userInfo = removeCredential(indexItem);
    props.db.saveUserInfo(userInfo)
      .then(() => {
        window.location.href = '/dashboard';
      });
  }

  // Show remove secrets alert
  function removeHandler() {
    setShowRemoveModal(!showRemoveModal);
  }

  // Show edit secrets
  function editHandler(indexItem) {
    const credential = credentials[indexItem];
    setIndexToUpdate(indexItem);
    setCredential(credential);
    setShowEditModal(!showEditModal);
  }

  // Hide edit secrets
  function hideHandler(modal) {
    if (modal == 'edit') {
      return setShowEditModal(false);
    }
    setShowRemoveModal(false);
  }

  // Update secrets
  function updateHandler(data) {
    const updateCredential = Object.assign({}, credential, data);
    credentials.splice(indexToUpdate, 1, updateCredential);
    hideHandler('edit');
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
              <Button variant="danger" size="sm" onClick={removeHandler}>Remove</Button>
              <Button variant="dark" size="sm" onClick={() => editHandler(id)} >Edit</Button>
            </Form.Group>
          </div>
          <Form.Group>
            <a className="dashboard-link" href={DASHBOARD_PATH}>
              <Button variant="secondary">Dashboard</Button>
            </a>
          </Form.Group>
          <Modal show={showEditModal} onHide={() => hideHandler('edit')}>
            <Modal.Body>
              <CredentialForm {...credential} updateHandler={updateHandler} />
            </Modal.Body>
          </Modal>
          <Modal show={showRemoveModal} onHide={() => hideHandler('remove')}>
            <Modal.Body>
              <RemoveAlert deleteHandler={deleteHandler} hideHandler={hideHandler} id={id} />
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  )
}

export default withFirebase(Secrets);