import React from 'react';
import NavMain from '../NavMain';
import { userLogged } from '../../utils';

function Home() {

  if (userLogged()) {
    window.location.href = '/dashboard';
  } else {
    window.location.href = '/login';
  }

  return(
    <div>
      <NavMain />
    </div>
  );
}

export default Home;