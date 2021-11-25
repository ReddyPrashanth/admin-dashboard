import React from 'react';
import './App.css';
import {Switch, Route, Redirect} from 'react-router-dom';
import configureStore from './store/configureStore';
import NavBar from './components/shared/NavBar';
import Home from './components/home';
import Login from './components/authentication/Login';
import SignUp from './components/authentication/SignUp';
import { Provider } from 'react-redux';

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
