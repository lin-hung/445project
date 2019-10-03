import React, { Component } from 'react'
import { connect } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar as BSNav, Nav, Button } from 'react-bootstrap'
import logo from '../resources/logo.svg'
import { mapAuthStateToProps } from '../resources/utils'
import { logoutAction } from '../_actions/authActions'

class Navbar extends Component {
  loginButton = () => {
    if(this.props.auth.isAuthed) {
      return(<Button onClick={this.props.logoutAction}>Log Out</Button>
      )
    }
    return(<LinkContainer to='/login'><Button>Log In</Button></LinkContainer>)
  }
  render() {
    return (
      <BSNav bg="dark" variant="dark">
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
          <this.loginButton/>
        </Nav>
      </BSNav>

    )
  }
}
export default connect(mapAuthStateToProps, { logoutAction })(Navbar)