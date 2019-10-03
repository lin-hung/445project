import React, { Component } from 'react'
import {Link} from "react-router-dom"
import { Jumbotron, Container, Row, Col } from 'react-bootstrap'

class Landing extends Component {
    render() {
        return (
            <div id="content">
                <Jumbotron>
                    <Container>
                        <p>This is a template for a simple marketing or informational website. It includes a large callout called a jumbotron and three supporting pieces of content. Use it as a starting point to create something more unique.</p>
                        <p><a className="btn btn-primary btn-lg" href="#" role="button">Learn more »</a></p>

                        <Link to="/OAuthLogin">
                            Test
                        </Link>
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
        )
    }
}
export default Landing