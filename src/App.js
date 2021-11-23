import React from 'react';
import './App.css';
import {Switch, Route, Redirect} from 'react-router-dom';
import NavBar from './components/shared/NavBar';
import Home from './components/home';
import Login from './components/authentication/Login';
import SignUp from './components/authentication/SignUp';

function App() {
  return (
    <React.Fragment>
      <NavBar></NavBar>
      <main className="container mx-16 my-4">
        <Switch>
          <Route path="/home" component={Home}/>
          <Route path="/login" component={Login}/>
          <Route path="/signup" component={SignUp}/>
          <Redirect exact to="/home" from="/"/>
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
