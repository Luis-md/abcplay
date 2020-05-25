import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './global.css';

import setAuthToken from './utils/setAuthToken'

/*COMPONENTS*/
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import User from './pages/User'

/*PRIVATE ROUTE*/
import PrivateRoute from './components/routing/PrivateRoute'

/*STATES*/
import AuthState from './context/auth/AuthState'

if(localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {
  return (
    <AuthState>
      <>
        <Router>
        <Navbar />  
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/cadastro' component={Register} />
          <Route exact path='/login' component={Login} />
          <PrivateRoute exact path="/user" component={ User } />
        </Switch>
      </Router>
      </>
    </AuthState>
  );
}

export default App;
