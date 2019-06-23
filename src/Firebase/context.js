import React from 'react';
import InBrowserOnly from '../Components/InBrowserOnly';

const FirebaseContext = React.createContext(null);

export const withFirebase = Component => props => (
  <InBrowserOnly>
    <FirebaseContext.Consumer>
      { firebase => <Component {...props} db={firebase} /> }
    </FirebaseContext.Consumer>
  </InBrowserOnly>
)

export default FirebaseContext;
