import React, { Component } from 'react'
import {Link} from "react-router-dom"
import { Jumbotron, Container, Row, Col } from 'react-bootstrap'
import './landingStyle.css'

class Landing extends Component {
    render() {
        return (
            <div id="landingPage">
                <Jumbotron fluid bsPrefix>
                    <Container>
                        <Col align="center">
                            <h1 className="landingHeader">Connecting Professionals Worldwide</h1>
                        </Col>
                    </Container>
                </Jumbotron>
            </div>
        )
    }
}
export default Landing