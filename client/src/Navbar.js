import React, {Component} from 'react'
import {Navbar as BSNav, Nav, Form, FormControl, Button} from 'react-bootstrap'
import logo from './resources/logo.svg';
class Navbar extends Component {
    render(){
        return(
            <BSNav bg="dark" variant="dark" fixed="top">
            <BSNav.Brand href="#home">
              <img src={logo} height="30px" alt="logo" />
              Nav
            </BSNav.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav>
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-info">Search</Button>
            </Form>
          </BSNav>
    
        )
    }
}
export default Navbar