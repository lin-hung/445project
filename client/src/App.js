import React from 'react'
import { Container } from 'react-bootstrap'
import { Provider } from "react-redux"
import { BrowserRouter as Router, Route } from "react-router-dom"
import io from 'socket.io-client'
import { DummyContent2, Footer } from './components/DummyContent'
import Landing from "./components/Landing"
import Navbar from "./components/Navbar"
import OAuthLogin from './components/OAuthLogin'
import store from "./_store/store"

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
            <Route excact path="/OAuthLogin"  
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
