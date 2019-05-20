import React from 'react';
import NavMain from '../NavMain';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import copyClipboard from 'clipboard-copy';

import { DASHBOARD_PATH } from '../../constants';
import { getCredentialAt } from '../../utils';

import './index.scss';

function RowItem({label, value}) {
  return(
    <Row>
      <Col>
        <Row>
          <Col>
            <Form.Label>{label}:</Form.Label>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Label>{label === 'Secret' ? '************' : value }</Form.Label>
          </Col>
        </Row>
      </Col>
      <Col>
        <Button className="btn-copy" onClick={() => copyClipboard(value)} variant="secondary">Copy</Button>
      </Col>
    </Row>
  );
}

function Secrets(props) {
  const { id } = props;
  const credential = getCredentialAt(id);
  return(
    <div className="page-secrets">
      <NavMain />
      <div className="page-inner">
        <div className="page-panel">

          <h1>SECRET BURIED:</h1>
          <span>Secret Info:</span>

          <Form.Group>
            <RowItem label="URL" value={credential.website} />
          </Form.Group>

          <Form.Group>
            <RowItem label="Username Primary" value={credential.primaryUser} />
          </Form.Group>

          <Form.Group>
            <RowItem label="Username Secondary" value={credential.secundaryUser} />
          </Form.Group>

          <Form.Group>
            <RowItem label="Secret" value={credential.password} />
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