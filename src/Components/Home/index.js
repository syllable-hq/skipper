import React from 'react';
import { userLogged } from '../../utils';

class Home extends React.Component {
  componentDidMount() {
    if (userLogged()) {
      window.location.href = '/dashboard';
    } else {
      window.location.href = '/login';
    }
  }

  render() {
    return (
      <div>
        ...
      </div>
    )
  }
}

export default Home;
