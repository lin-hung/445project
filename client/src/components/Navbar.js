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
<<<<<<< Updated upstream
      return(<Button onClick={this.props.logoutAction}>Log Out</Button>
=======
      return(<Button className="btn employeetButton" onClick={this.props.logoutAction}>Log Out</Button>
>>>>>>> Stashed changes
      )
    }
    const pathname=window.location.pathname
    // if(pathname==='/' || pathname ==='/login' || pathname === '/register'){//if not logged in and on landing, login, register, don't show login button
    //   return(null)
    // }
<<<<<<< Updated upstream
    return(<LinkContainer to='/login'><Button>Log In</Button></LinkContainer>)
=======
    return(<LinkContainer to='/login'><Button className="btn employeetButton">Log In</Button></LinkContainer>)
>>>>>>> Stashed changes
  }

  render() {
    return (
      <BSNav>
        <LinkContainer to="/">
          <BSNav.Brand>
            <img src={logo} height="125px" alt="logo"/> {/** emploYEET logo in navbar */}
          </BSNav.Brand>
        </LinkContainer>
        
        <Nav className="ml-auto"> {/** ml-auto to align button to right, 'pullRight' doesn't work */}
          <this.loginButton/>
        </Nav>
      </BSNav>
    )
  }
}

export default connect(mapAuthStateToProps, { logoutAction })(Navbar)