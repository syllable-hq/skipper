import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import Home from './Components/Home';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import Credential from './Components/Credential';
import Secrets from './Components/Secrets';
import Firebase, { FirebaseContext } from './Firebase';
import SignupConfirmation from './Components/SignupConfirmation';
import Signup from './Components/Signup';
import About from './Components/About';
import Faq from './Components/Faq';
import Comp404 from './Components/404';
import './app.scss';

const firebase = new Firebase();
const App = () => (
  <FirebaseContext.Provider value={firebase}>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/dashboard' component={Dashboard} />
      <Route exact path='/credential' component={Credential} />
      <Route exact path='/signup_confirmation' component={SignupConfirmation} />
      <Route exact path='/signup' component={Signup} />
      <Route exact path='/about' component={About} />
      <Route exact path='/faq' component={Faq} />
      <Route exact path='/secrets/:id' component={Secrets} />
      <Route component={Comp404} />
    </Switch>
  </FirebaseContext.Provider>
);

export default App;
