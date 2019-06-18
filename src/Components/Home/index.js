import React from 'react';
import { userLogged } from '../../utils';
import { InBrowserOnly } from '../../utils/InBrowserOnly';

function Home() {

  if (userLogged()) {
    window.location.href = '/dashboard';
  } else {
    window.location.href = '/login';
  }

  return(
    <InBrowserOnly>
      <div>
        ...
      </div>
    </InBrowserOnly>
  );
}

export default Home;