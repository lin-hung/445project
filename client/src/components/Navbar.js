import React, { Component } from 'react'
import { connect } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar as BSNav, Nav, Button } from 'react-bootstrap'
import logo from '../resources/logo.svg'
import { mapAuthStateToProps } from '../resources/utils'
import { logoutAction } from '../_actions/authActions'
import { isThisHour } from 'date-fns'

class Navbar extends Component {
  loginButton = () => {
    const pathname=window.location.pathname
    if(pathname==='/' || pathname ==='/login' || pathname === '/register'){//if not logged in and on landing, login, register, don't show login button
      return(null)
    }
    if(this.props.auth.isAuthed) {
      return(//<Button variant ="light" onClick={this.props.logoutAction}>Log Out</Button>
      <a className='btn btn-primary' href='#' onCLick={this.props.logoutAction}>Log Out </a>
      )
    }
    
    return(<LinkContainer to='/login'><Button variant ="light">Log In</Button></LinkContainer>)
  }

  utilities = () => {
    const pathname=window.location.pathname
    if(pathname==='/' || pathname ==='/login' || pathname === '/register'){//if not logged in and on landing, login, register, don't show login button
      return(null)
    }
    if(this.props.auth.isAuthed) {
      return(
        <div>
            <LinkContainer to='/home'><Button id = "navButton" variant = "primary">Home</Button></LinkContainer>
            <LinkContainer to='/profile'><Button id = "navButton" variant = "primary">My Profile</Button></LinkContainer>
        </div>
      )
    }
    
  }

  search = () => {
    const pathname=window.location.pathname
    if(pathname==='/' || pathname ==='/login' || pathname === '/register'){//if not logged in and on landing, login, register, don't show login button
      return(null)
    }
    if(this.props.auth.isAuthed) {
      return(
        <div>
            <LinkContainer to='/search'><Button id = "navButton" variant = "light">Search Employers</Button></LinkContainer>
        </div>
      )
    }
    
  }

  profileUtilities = () => {
    const pathname=window.location.pathname
    if(pathname==='/' || pathname ==='/login' || pathname === '/register'){//if not logged in and on landing, login, register, don't show login button
      return(null)
    }
    if(this.props.auth.isAuthed) {
      return(
        <div>
            <LinkContainer to='/messages'><Button id = "navButton" variant ="light">Messages</Button></LinkContainer>
            <LinkContainer to='/alerts'><Button id = "navButton" variant ="light">Alerts</Button></LinkContainer>
            <LinkContainer to='/help'><Button id = "navButton" variant ="light">Help</Button></LinkContainer>        
        </div>
      )
    }
    
  }

  render() {
    return (
      <BSNav class = "row">
        <LinkContainer to="/">
          <BSNav.Brand>
            <img src={logo} height="125px" alt="logo"/> {/** emploYEET logo in navbar */}
          </BSNav.Brand>
        </LinkContainer>
        
        <Nav class = "col">
          <this.utilities/>
        </Nav>
        <Nav class = "col">
          <this.search/>
        </Nav>
        <Nav>
          <this.profileUtilities/>
          <this.loginButton/>
        </Nav>
      </BSNav>
    )
  }
}
export default connect(mapAuthStateToProps, { logoutAction })(Navbar)