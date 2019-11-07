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
                            <LinkContainer to='/register'><Button id="signButton" className="btn btn-primary btn-lg">Sign Up</Button></LinkContainer>
                        </Col>
                    </Container>
                </Jumbotron>
            </div>
        )
    }
}
export default Landing