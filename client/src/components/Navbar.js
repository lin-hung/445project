import React, { Component } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar as BSNav, Nav, Form, FormControl, Button } from 'react-bootstrap'
import logo from '../resources/logo.svg'

class Navbar extends Component {
  render() {
    return (
      <BSNav bg="dark" variant="dark" fixed="top">
        <LinkContainer to="/">
          <BSNav.Brand>
            <img src={logo} height="30px" alt="logo" />
            Nav
            </BSNav.Brand>
        </LinkContainer>
        <Nav className="mr-auto">
          <LinkContainer to="/">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/DC2">
            <Nav.Link>Test</Nav.Link>
          </LinkContainer>
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