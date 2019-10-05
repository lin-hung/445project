import React, { Component } from 'react'
import {Link} from "react-router-dom"
import {LinkContainer} from 'react-router-bootstrap'
import {Button} from 'react-bootstrap'
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
                            <LinkContainer to='/login'><Button>Sign Up or Log In</Button></LinkContainer>
                        </Col>
                    </Container>
                </Jumbotron>
            </div>
        )
    }
}
export default Landing