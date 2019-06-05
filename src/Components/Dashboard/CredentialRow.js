import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

function CredentialRow({indexItem, website, primaryUser, secundaryUser, password, goToCredential, removeHandler, editHandler}) {
  return(
    <tr>
      <td onClick={goToCredential}>
        <ul>
          <li>URL: {website}</li>
          <li>username: {primaryUser}</li>
          <li>username2: {secundaryUser}</li>
          <li>password: {password}</li>
        </ul>
      </td>
      <td>
        <Button variant="danger" size="sm" onClick={() => removeHandler(indexItem)}>Remove</Button>
        <Button variant="dark" size="sm" onClick={() => editHandler(indexItem)} >Edit</Button>
      </td>
    </tr>
  );
}

CredentialRow.propTypes = {
  website: PropTypes.string,
  primaryUser: PropTypes.string,
  secundaryUser: PropTypes.string,
  password: PropTypes.string,
};

export default CredentialRow;