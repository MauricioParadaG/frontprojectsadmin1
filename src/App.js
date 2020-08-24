import React from 'react';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import LoginComponent from './components/auth/Login.component';
import NewAccountComponent from './components/auth/NewAccount.component';
import ProjectsComponent from './components/projects/Projects.component';

import ProjectState from './context/projects/projectState';
import TaskState from './context/task/taskState';

import AuthState from './context/loginsignup/authState';
import AlertState from './context/alerts/alertState';

import tokenAuth from './config/token';
import PrivateRoute from './components/routesFront/PrivateRoute';

function App() {

  // The answer for the backend url, http://localhost:4000
  //console.log(process.env.REACT_APP_BACKEND_URL);

  const token = localStorage.getItem('token');
  if(token) {
    tokenAuth(token);
  }

  return (
    <ProjectState>
      <TaskState>
        <AlertState>
        <AuthState>
        <Router>
          <Switch>

            <Route exact path="/" component={LoginComponent}/>
            <Route exact path="/new-account" component={NewAccountComponent}/>
            <PrivateRoute exact path="/projects" component={ProjectsComponent}/>
            
          </Switch>
        </Router>
        </AuthState>
        </AlertState>
      </TaskState>
    </ProjectState>
  );
}

export default App;
