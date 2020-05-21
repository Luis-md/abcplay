import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './global.css';

/*COMPONENTS*/
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  return (
    <div>
      <Router>
      <Navbar />  
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/cadastro' component={Register} />
        <Route exact path='/login' component={Login} />
      </Switch>
    </Router>
    </div>
  );
}

export default App;
