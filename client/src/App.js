import React from 'react';
import io from 'socket.io-client'
import Navbar from "./Navbar"
import { Container, Jumbotron, Row, Col } from 'react-bootstrap'
import Test from './TestComponent'

const socket=io("http://localhost:3002/")
//console.log(process.env.serverport)
function App() {
  return (
    <div className="App">
     <Navbar />
      <div id="content">
        <Jumbotron>
          <Container>
            <Test socket={socket} />
            <p>This is a template for a simple marketing or informational website. It includes a large callout called a jumbotron and three supporting pieces of content. Use it as a starting point to create something more unique.</p>
            <p><a className="btn btn-primary btn-lg" href="#" role="button">Learn more »</a></p>
          </Container>  
        </Jumbotron>
        <Container>
          <Row>
            <Col md={6}>
              <h2>Heading</h2>
              <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
              <p><a className="btn btn-secondary" href="#" role="button">View details »</a></p>
            </Col>
            <Col>
              <h2>Heading</h2>
              <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
              <p><a className="btn btn-secondary" href="#" role="button">View details »</a></p>
            </Col>
            <Col>
              <h2>Heading</h2>
              <p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
              <p><a className="btn btn-secondary" href="#" role="button">View details »</a></p>
            </Col>
          </Row>

          <hr />

        </Container>
      </div>
      <footer><Container>
        <p>© Company 2017-2019</p>
      </Container>
      </footer>
    </div>


  );
}

export default App;
