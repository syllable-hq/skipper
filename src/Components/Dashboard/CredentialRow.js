import React, { useState } from 'react';
import PropTypes from 'prop-types';


function CredentialRow({website, primaryUser, secundaryUser, password}) {
  return(
    <tr>
      <td>
        <ul>
          <li>URL: {website}</li>
          <li>username: {primaryUser}</li>
          <li>username2: {secundaryUser}</li>
          <li>password: {password}</li>
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