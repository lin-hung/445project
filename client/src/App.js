import React from 'react'
import { Container } from 'react-bootstrap'
import { Provider } from "react-redux"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import io from 'socket.io-client'
import { Footer } from './components/Footer'
import Landing from "./components/Landing"
import Navbar from "./components/Navbar"
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Home from './components/home/Home.js'
import Profile from './components/Profile'
import CompanyProfile from'./components/CompanyProfile'
import { setAuthToken } from './resources/utils'
import { oAuthLoginAction } from './_actions/authActions'
import store from "./_store/store"
import "./resources/appStyle.scss"
if (localStorage.jwtToken) {
  // Set auth token header if localstorage contains token
  const token = localStorage.jwtToken
  setAuthToken(token)
  store.dispatch(oAuthLoginAction(token))
}

function App() {
  const socket = io("http://localhost:3002/");
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar socket={socket} />
          <Container id="content">

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
              <Route exact path="/profileform"
                render={(props) => <Profile socket={socket} />} />
              <Route
                exact
                path="/home"
                render={props => <Home socket={socket} />}
              />
              <Route exact path="/companyform"
                render={(props) => <CompanyProfile socket={socket} />} />
            </Switch>

          </Container>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}
export default App;
