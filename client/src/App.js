<<<<<<< Updated upstream
import React from 'react'
import { Container } from 'react-bootstrap'
import { Provider } from "react-redux"
import { BrowserRouter as Router, Route } from "react-router-dom"
import io from 'socket.io-client'
import { DummyContent2, Footer } from './components/DummyContent'
import Landing from "./components/Landing"
import Navbar from "./components/Navbar"
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import { setAuthToken } from './resources/utils'
import { oAuthLoginAction } from './_actions/authActions'
import store from "./_store/store"

if (localStorage.jwtToken) {
  // Set auth token header if localstorage contains token
  const token = localStorage.jwtToken
  setAuthToken(token)
  store.dispatch(oAuthLoginAction(token))
  console.log(`app.js login script`)
=======
import React from "react";
import { Container } from "react-bootstrap";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import io from "socket.io-client";
import { Footer } from "./components/Footer";
import Landing from "./components/Landing";
import Navbar from "./components/Navbar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { setAuthToken } from "./resources/utils";
import { oAuthLoginAction } from "./_actions/authActions";
import store from "./_store/store";
import "./resources/appStyle.css"; //STYLING

if (localStorage.jwtToken) {
  // Set auth token header if localstorage contains token
  const token = localStorage.jwtToken;
  setAuthToken(token);
  store.dispatch(oAuthLoginAction(token));
>>>>>>> Stashed changes
}

function App() {
  const socket = io("http://localhost:3002/");
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Container id="content">
<<<<<<< Updated upstream
            <Route exact path="/" component={Landing} />
            <Route exact path="/DC2" component={DummyContent2} />
            <Route exact path="/login"
              render={(props) => <Login socket={socket} />} />
            <Route exact path="/register"
              render={(props) => <Register socket={socket} />} />
=======
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route
                exact
                path="/login"
                render={props => <Login socket={socket} />}
              />
              <Route
                exact
                path="/register"
                render={props => <Register socket={socket} />}
              />
            </Switch>
>>>>>>> Stashed changes
          </Container>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}
export default App;
