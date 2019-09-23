import Jwt_decode from 'jwt-decode'
import React from 'react'
import { Container } from 'react-bootstrap'
import { Provider } from "react-redux"
import { BrowserRouter as Router, Route } from "react-router-dom"
import io from 'socket.io-client'
import { DummyContent2, Footer } from './components/DummyContent'
import Landing from "./components/Landing"
import Navbar from "./components/Navbar"
import OAuthLogin from './components/OAuthLogin'
import { oAuthLoginAction, setAuthToken } from './_actions/authActions'; //not a redux action
import store from "./_store/store"

if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken
  setAuthToken(token)
  store.dispatch(oAuthLoginAction(token))
  console.log(`app.js login script`)
}

function App() {
  const socket = io("http://localhost:3002/")
  return (
    <Provider store={store}>
      "ABCDEFG"
      <Router>
        <div className="App">
          <Navbar />
          <Container id="content">
            <Route exact path="/" component={Landing} />
            <Route exact path="/DC2" component={DummyContent2} />
            <Route excact path="/OAuthLogin"
              render={(props) => <OAuthLogin socket={socket} />}
            />
          </Container>
          <Footer />
        </div>
      </Router>
    </Provider>
  )
}



export default App;
