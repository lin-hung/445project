import React, { Component } from 'react'
import { Button, Col, Container, Jumbotron } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
//STYLING
import './landingStyle.scss'
import './buttonColor.scss'

class Landing extends Component {
    render() {
        return (
            <div id="landingPage">
                <Jumbotron fluid id="landingJumbotron">
                    <Container>
                        <Col align="center">
                            <h1 id="landingHeader">Connecting Professionals Worldwide</h1>
                            <button id="signButton" type="button" className="btn btn-primary btn-lg" onClick={this.handleClick} value='2'>Sign Up</button>
                        </Col>
                    </Container>
                </Jumbotron>
            </div>
        )
    }
}
export default Landing