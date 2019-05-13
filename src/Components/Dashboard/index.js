import React from 'react';
import NavMain from '../NavMain';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table'

import './index.scss';

function Dashboard(params) {
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
                <tr>
                  <td>
                    <ul>
                      <li>URL: www.website.com</li>
                      <li>username: johndoe@gmail.com</li>
                      <li>password: ******</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td>
                    <ul>
                      <li>URL: www.website2.com</li>
                      <li>username: johndoe@gmail.com</li>
                      <li>password: ******</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td>
                    <ul>
                      <li>URL: www.website3.com</li>
                      <li>username: johndoe@gmail.com</li>
                      <li>password: ******</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td>
                    <ul>
                      <li>URL: www.website3.com</li>
                      <li>username: johndoe@gmail.com</li>
                      <li>password: ******</li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </Table>

          </div>
        </div>
    </div>
  );
}

export default Dashboard;