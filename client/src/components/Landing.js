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
<<<<<<< HEAD
                            <LinkContainer to='/login'><Button>Sign Up or Log In</Button></LinkContainer>
=======
                            <LinkContainer to='/register'><Button className="btn btn-primary btn-lg employeetButton">Sign Up</Button></LinkContainer>
>>>>>>> origin/master
                        </Col>
                    </Container>
                </Jumbotron>
            </div>
        )
    }
}
export default Landing