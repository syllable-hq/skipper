import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

function CredentialRow({ indexItem, website, primaryUser, secundaryUser, password, goToCredential }) {
  return (
    <tr>
      <td onClick={goToCredential}>
        <ul>
          <li>URL: {website}</li>
          <li>username: {primaryUser}</li>
          <li>username2: {secundaryUser}</li>
          {/*
            todo: Don't show the password. But add a copy button here like on the credential page?
            <li>password: {password}</li>
          */}
          <li>password: ***********</li>
        </ul>
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