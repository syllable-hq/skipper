import React from 'react';
import { userLogged } from '../../utils';

function Home() {

  if (userLogged()) {
    window.location.href = '/dashboard';
  } else {
    window.location.href = '/login';
  }

  return(
    <div>
      ...
    </div>
  );
}

export default Home;