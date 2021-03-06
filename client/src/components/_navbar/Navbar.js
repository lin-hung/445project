import React, { Component } from 'react'
import { Button, Nav, Navbar as BSNav } from 'react-bootstrap'
import { connect } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import logo from '../../resources/logo.svg'
import { mapAuthStateToProps } from '../../resources/utils'
import { logoutAction } from '../../_actions/authActions'
import '../buttonColor.scss'
import LoginModal from '../_auth/LoginModal'
import './navBarStyle.scss'


class Navbar extends Component {
  loginButton = () => {
    if (this.props.auth.isAuthed) {
      return (<Button id="navButton" className="btn btn-primary employeetBtn" href="/" onClick={this.props.logoutAction}>Log Out</Button>
      )
    }
    return <LoginModal socket={this.props.socket} />

  }



  utilities = () => {
    const pathname = window.location.pathname

    if (pathname === '/' || pathname === '/login' || pathname === '/register') {//if not logged in and on landing, login, register, don't show login button
      return (null)
    }
    if (this.props.auth.isAuthed && this.props.auth.profile) { //needs to change to if user has an account 
      return (
        <div>
          <LinkContainer to='/home'><Button id="navButton" variant="primary">Home</Button></LinkContainer>
          {(this.props.auth.profile.profileType === "candidate") ?
            <LinkContainer to='/applicantProfile'><Button id="navButton" variant="primary">Applicant Profile</Button></LinkContainer>
            : <LinkContainer to='/companyProfile'><Button id="navButton" variant="primary">Company Profile</Button></LinkContainer>}
          {(this.props.auth.profile.profileType === "recruiter") ?
            <LinkContainer to='/yeetedList'><Button id="navButton" variant="primary">Yeeted Profiles</Button></LinkContainer>
            : null}
        </div>
      )
    }
    return null
  }

  // search = () => {
  //   const pathname = window.location.pathname
  //   if (pathname === '/' || pathname === '/login' || pathname === '/register') {//if not logged in and on landing, login, register, don't show login button
  //     return (null)
  //   }
  //   if (this.props.auth.isAuthed) {
  //     return (
  //       <div>
  //         <LinkContainer to='/search'><Button id="navButton" variant="light">Search Employers</Button></LinkContainer>
  //       </div>
  //     )
  //   }
  //   return null
  // }

  profileUtilities = () => {
    const pathname = window.location.pathname
    if (pathname === '/' || pathname === '/login' || pathname === '/register') {//if not logged in and on landing, login, register, don't show login button
      return (null)
    }
    if (this.props.auth.isAuthed) {
      return (
        <div>
          <LinkContainer to='/messages'><Button id="navButton" variant="light">Messages</Button></LinkContainer>
          <LinkContainer to='/help'><Button id="navButton" variant="light">Help</Button></LinkContainer>
        </div>
      )
    }
    return null
    // if(pathname==='/' || pathname ==='/login' || pathname === '/register'){//if not logged in and on landing, login, register, don't show login button
    //   return(null)
    // }
    //return(<LinkContainer to='/login'><Button className="btn btn-primary employeetButton">Log In</Button></LinkContainer>)

  }

  render() {
    return (
      <BSNav className="navbar row">
        <LinkContainer to="/">
          <BSNav.Brand>
            <img src={logo} height="125px" alt="logo" /> {/** emploYEET logo in navbar */}
          </BSNav.Brand>
        </LinkContainer>

        <Nav className="colFirst">
          <this.utilities />
        </Nav>
        {/* <Nav className="col">
          <this.search />
        </Nav> */}
        <Nav>
          <this.profileUtilities />
          <this.loginButton />
        </Nav>
      </BSNav>
    )
  }
}

export default connect(mapAuthStateToProps, { logoutAction })(Navbar)