import React from 'react'
import io from 'socket.io-client'
import { Provider } from "react-redux"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import Navbar from "./components/Navbar"
import { Container, Jumbotron, Row, Col } from 'react-bootstrap'
import store from "./_store/store"
import OAuthLogin from './OAuthLogin'
import Landing from "./components/Landing"
import { Footer, DummyContent2 } from './components/DummyContent'

//console.log(process.env.serverport)
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
            <Route excact path="/test"  
              render={(props)=><OAuthLogin socket={socket}/>}
            />
          </Container>
          <Footer />
        </div>
      </Router>
    </Provider>
  )
}



export default App;
