import './App.css';
import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import CreateAccount from './components/CreateAccount/CreateAccount';
import Car from './components/Car/Car';
import Moto from './components/Moto/Moto'
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Destination from './components/Destination/Destination';

const height = window.innerHeight;

export const UserContext = createContext()

function App() {
  const [loggedInUser, setLoggedInUser] = useState({
    name: '',
    email: '',
    password: '',
    confPassword: ''
  })
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
    <Router>
      <div style={{height: height}} className="main-div">        
        <Switch>
          <Route path="/about">
            
          </Route>
          <Route path="/users">
            
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <PrivateRoute path="/destination">
            <Destination></Destination>
          </PrivateRoute>
          <Route path="/createAccount">
            <CreateAccount></CreateAccount>
          </Route>
          <Route path="/home">
            <Home></Home>
          </Route>
          <PrivateRoute path="/car">
            <Car></Car>
          </PrivateRoute>
          <PrivateRoute path="/moto">
            <Moto></Moto>
          </PrivateRoute>
          <Route path="/">
            <Home></Home>
          </Route>
        </Switch>
      </div>
      
    </Router>
    </UserContext.Provider>
  );
}

export default App;
