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
import Professor from './pages/Professor/Professor'
import Professores from './pages/Professores/Professores'
import BuscarProfessor from './pages/BuscarProfessor/BuscarProfessor'
import Series from './pages/Serie/Series'
import Assuntos from './pages/Assuntos/Assuntos'
import Quiz from './pages/Quiz/Quiz'
import Result from './pages/Result/Result'
import Desempenho from './pages/Desempenho/Desempenho'

/*PRIVATE ROUTE*/
import PrivateRoute from './components/routing/PrivateRoute'

/*STATES*/
import AuthState from './context/auth/AuthState'
import SeriesState from './context/serie/SeriesState'

if(localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {
  return (
    <AuthState>
      <SeriesState>
        <>
          <Router>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/cadastro' component={Register} />
            <Route exact path='/login' component={Login} />
            <PrivateRoute exact path="/user" component={ User } />
            <PrivateRoute exact path='/serie' component={ Series } />
            <PrivateRoute exact path="/assuntos" component={ Assuntos } />
            <PrivateRoute exact path="/quiz" component={ Quiz } />
            <PrivateRoute exact path="/resultado" component={ Result } />
            <PrivateRoute exact path="/desempenho" component={ Desempenho } />
            <PrivateRoute exact path="/professor" component={ Professor } />
            <PrivateRoute exact path="/professores" component={ Professores } />
            <PrivateRoute exact path="/buscar-professor" component={ BuscarProfessor } />
          </Switch>
        </Router>
        </>
      </SeriesState>
    </AuthState>
  );
}

export default App;
