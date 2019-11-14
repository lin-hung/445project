import React, { Component } from 'react'
import { connect } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar as BSNav, Nav, Button } from 'react-bootstrap'
import logo from '../resources/logo.svg'
import { mapAuthStateToProps } from '../resources/utils'
import { logoutAction } from '../_actions/authActions'
import LoginModal from './auth/LoginModal'
import './buttonColor.scss'

class Navbar extends Component {
  loginButton = () => {
    if (this.props.auth.isAuthed) {
      return (<Button className="btn btn-danger employeetBtn" onClick={this.props.logoutAction}>Log Out</Button>
      )
    }
    const pathname = window.location.pathname
    // if(pathname==='/' || pathname ==='/login' || pathname === '/register'){//if not logged in and on landing, login, register, don't show login button
    //   return(null)
    // }
    return (<LoginModal socket={this.props.socket} />)
  }

  render() {
    return (
      <BSNav>
        <LinkContainer to="/">
          <BSNav.Brand>
            <img src={logo} height="125px" alt="logo" /> {/** emploYEET logo in navbar */}
          </BSNav.Brand>
        </LinkContainer>

        <Nav className="ml-auto"> {/** ml-auto to align button to right, 'pullRight' doesn't work */}
          <this.loginButton />
        </Nav>
      </BSNav>
    )
  }
}

export default connect(mapAuthStateToProps, { logoutAction })(Navbar)