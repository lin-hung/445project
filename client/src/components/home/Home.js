import React, { Component } from 'react'
import { Button, Navbar, Nav} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import './homeStyle.css'

class Home extends Component {
    render() {
        return (
            <div id="homePage">
                <Navbar class = "row" id = "navbar" bg = "light">  
                    <Nav class = "col-5">
                        <LinkContainer to='/home'><Button id = "navButton" variant = "primary">Home</Button></LinkContainer>
                        <LinkContainer to='/profile'><Button id = "navButton" variant = "primary">My Profile</Button></LinkContainer>
                    </Nav>
                    <Nav class = "col-4">
                        <LinkContainer to='/search'><Button id = "navButton" variant = "light">Search Employers</Button></LinkContainer>
                    </Nav>
                    <Nav class = "col-4">
                        <LinkContainer to='/messages'><Button id = "navButton" variant ="light">Messages</Button></LinkContainer>
                        <LinkContainer to='/alerts'><Button id = "navButton" variant ="light">Alerts</Button></LinkContainer>
                        <LinkContainer to='/help'><Button id = "navButton" variant ="light">Help</Button></LinkContainer>
                    </Nav>

                </Navbar>
            </div>
        )
    }
}
export default Home