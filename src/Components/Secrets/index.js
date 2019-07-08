import React, { useState } from 'react';
import NavMain from '../NavMain';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import copyClipboard from 'clipboard-copy';
import Alert from 'react-bootstrap/Alert';

import { DASHBOARD_PATH } from '../../constants';
import { getCredentialAt, logout } from '../../utils';

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

function Secrets(props) {
  const { id } = props;
  const credential = getCredentialAt(id);
  if (!credential) {
    logout();
    return (<div></div>)
  }

  const [copiedFlag, setFlag] = useState(false);

  function valueCopiedHandler(value) {
    setFlag(true);
    copyClipboard(value);
    setTimeout(() => setFlag(false), 2000)
  }

  return (
    <div className="page page-secrets">
      <NavMain />
      <div className="page-inner">
        <div className="page-panel">

          <h1>SECRET BURIED:</h1>
          {copiedFlag && <Alert className="alert-copied" variant="info">
            Value Copied!
            </Alert>}
          <span className="subtitle">Secret Info:</span>

          <Form.Group>
            <RowItem valueCopiedHandler={valueCopiedHandler} label="URL" value={credential.website} />
          </Form.Group>

          <Form.Group>
            <RowItem valueCopiedHandler={valueCopiedHandler} label="Username Primary" value={credential.primaryUser} />
          </Form.Group>

          <Form.Group>
            <RowItem valueCopiedHandler={valueCopiedHandler} label="Username Secondary" value={credential.secundaryUser} />
          </Form.Group>

          <Form.Group>
            <RowItem valueCopiedHandler={valueCopiedHandler} label="Secret" value={credential.password} />
          </Form.Group>

          <Form.Group>
            <a className="dashboard-link" href={DASHBOARD_PATH}>
              <Button variant="secondary">Dashboard</Button>
            </a>
          </Form.Group>
        </div>
      </div>
    </div>
  )
}

export default Secrets;