import React from 'react';
import { userLogged } from '../../utils';
import InBrowserOnly from '../InBrowserOnly';


class Home extends React.Component {

  componentDidMount() {
    if (userLogged()) {
      window.location.href = '/dashboard';
    } else {
      window.location.href = '/login';
    }
  }

  render() {
    return(
      <InBrowserOnly>
        <div>
          ...
        </div>
      </InBrowserOnly>
    );
  }
}

export default Home;