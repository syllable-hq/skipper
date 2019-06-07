import React from 'react';

const FirebaseContext = React.createContext(null);

export const withFirebase = Component => props => (
  <FirebaseContext.Consumer>
    { firebase => <Component {...props} db={firebase} /> }
  </FirebaseContext.Consumer>
)

export default FirebaseContext;
