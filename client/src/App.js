import React from 'react'
import { Container } from 'react-bootstrap'
import { Provider } from "react-redux"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import io from 'socket.io-client'
import { Footer } from './components/Footer'
import Landing from "./components/landing/Landing"
import Navbar from "./components/_navbar/Navbar"
import Register from './components/_auth/Register'
import Home from './components/home/Home.js'
import ApplicantForm from './components/applicantProfile/applicantForm'
import CompanyForm from './components/companyProfile/CompanyForm'
import viewApplicantProfile from './components/applicantProfile/viewApplicantProfile'
import viewCompanyProfile from './components/companyProfile/viewCompanyProfile'
import { setAuthToken } from './resources/utils'
import { oAuthLoginAction } from './_actions/authActions'
import { store, persistor } from "./_store/store"
import YeetedList from './components/yeetlist/YeetedList'
import Message from './components/messaging/Messaging'

import "./resources/appStyle.scss"

import { PrivateRoute/*, PropsRoute*/ } from './routes'
import { PersistGate } from 'redux-persist/integration/react'

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
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <div className="App">
            <Navbar socket={socket} />
            <Container id="content">
              <Switch>
                <Route exact path="/" component={Landing} />
                <Route
                  exact
                  path="/register"
                  render={props => <Register socket={socket} />}
                />
                <PrivateRoute exact path='/home' component={Home} />
                <PrivateRoute exact path="/applicantForm" component={ApplicantForm} />
                <PrivateRoute exact path="/companyForm" component={CompanyForm} />
                <PrivateRoute exact path="/applicantProfile" component={viewApplicantProfile} />
                <PrivateRoute exact path="/companyProfile" component={viewCompanyProfile} />
                <PrivateRoute exact path="/yeetedList" component={YeetedList} />
                <PrivateRoute path="/messages" component={Message} io={io} />
              </Switch>
            </Container>
            <Footer />
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
}
export default App;
