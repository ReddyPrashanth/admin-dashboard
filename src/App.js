import React from 'react';
import './App.css';
import {Switch, Route, Redirect} from 'react-router-dom';
import configureStore from './store/configureStore';
import NavBar from './components/shared/NavBar';
import Home from './components/home';
import Login from './components/authentication/Login';
import SignUp from './components/authentication/SignUp';
import { Provider } from 'react-redux';
import Users from './components/users';
import UserProfile from './components/users/UserProfile';
import Roles from './components/roles';
import Permissions from './components/permissions';
import RoleDetails from './components/roles/RoleDetails';
import Permission from './components/permissions/Permission';
import ProtectedRoute from './components/authentication/ProtectedRoute';
import http from './http/api';
import { loginFailed, loginRequested, loginSucceded } from './store/entities/auth';

const store = configureStore();

class App extends React.Component {
  async componentDidMount() {
    try{
      store.dispatch({type: loginRequested.type});
      const response = await http.get('/auth/me', {withCredentials: true});
      store.dispatch({type: loginSucceded.type, payload: response.data})
    }catch(error) {
      store.dispatch({type: loginFailed.type});
    }
  }
  
  render() {
    return (
      <Provider store={store}>
        <React.Fragment>
          <NavBar></NavBar>
          <main className="container mx-16 my-4">
            <Switch>
              <Route path="/home" component={Home}/>
              <ProtectedRoute path="/users/:id" component={UserProfile}/>
              <ProtectedRoute path="/users" component={Users}/>
              <ProtectedRoute path="/roles/:id" component={RoleDetails}/>
              <ProtectedRoute path="/roles" component={Roles}/>
              <ProtectedRoute path="/permissions/:id" component={Permission}/>
              <ProtectedRoute path="/permissions" component={Permissions}/>
              <Route path="/login" component={Login}/>
              <ProtectedRoute path="/signup" component={SignUp}/>
              <Redirect exact to="/home" from="/"/>
            </Switch>
          </main>
        </React.Fragment>
      </Provider>
    );
  }
}

export default App;
