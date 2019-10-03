import React, { Component } from 'react'
import {Link} from "react-router-dom"
import { Jumbotron, Container, Row, Col } from 'react-bootstrap'
import './landingStyle.css'

class Landing extends Component {
    render() {
        return (
            <div id="landingPage">
                <Jumbotron fluid id="landingJumbotron">
                    <Container>
                        <Col align="center">
                            <h1 id="landingHeader">Connecting Professionals Worldwide</h1>
                            <button type="button" className="btn btn-primary btn-lg" onClick={this.handleClick} value='2'>Sign Up</button>
                        </Col>
                    </Container>
                </Jumbotron>
            </div>
        )
    }
}
export default Landing