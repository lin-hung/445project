import React, { Component } from 'react'
import {Link} from "react-router-dom"
import { Jumbotron, Container, Row, Col } from 'react-bootstrap'

class Landing extends Component {
    render() {
        return (
            <div id="content">
                <Jumbotron>
                    <Container>
                        <Col align="center">
                            <h1>Connecting Professionals Worldwide</h1>
                        </Col>

                        <Link to="/OAuthLogin">
                            Test
                        </Link>
                    </Container>
                </Jumbotron>
            </div>
        )
    }
}
export default Landing