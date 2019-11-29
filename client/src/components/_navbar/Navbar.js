import React, { Component } from 'react'
import { connect } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar as BSNav, Nav, Button } from 'react-bootstrap'
import Axios from 'axios'
import logo from '../../resources/logo.svg'
import { mapAuthStateToProps } from '../../resources/utils'
import { logoutAction } from '../../_actions/authActions'
import '../buttonColor.scss'
import './navBarStyle.scss'
import LoginModal from '../_auth/LoginModal'


class Navbar extends Component {
  state = {
    profile: {}
  }
  loginButton = () => {
    // const pathname=window.location.pathname
    if (!this.props.auth.isAuthed) {
      return (
        <LoginModal socket={this.props.socket} />
      )
    } else if (this.props.auth.isAuthed) {
      return (<Button id="navButton" className="btn btn-primary employeetButton" href="/" onClick={this.props.logoutAction}>Log Out</Button>
      )
    }

  }

  componentDidMount() {
    Axios.get('/api/profile/get').then((res) => {
      console.log(res)
      this.setState({ profile: res.data })
    })
  }

  utilities = () => {
    const pathname = window.location.pathname

    if (pathname === '/' || pathname === '/login' || pathname === '/register') {//if not logged in and on landing, login, register, don't show login button
      return (null)
    }
    if (this.props.auth.isAuthed) { //needs to change to if user has an account 
      return (
        <div>
          {/* <LinkContainer to='/home'><Button id="navButton" variant="primary">Home</Button></LinkContainer>
          {(this.state.profile.profileType === "candidate") ?
          <LinkContainer to='/applicantForm'><Button id="navButton" variant="primary">My Profile</Button></LinkContainer>
          : <LinkContainer to='/applicantForm'><Button id="navButton" variant="primary">My Profile</Button></LinkContainer>} */}
          <LinkContainer to='/home'><Button id="navButton" variant="primary">Home</Button></LinkContainer>
          {(this.state.profile.profileType === "candidate") ?
          <LinkContainer to='/applicantProfile'><Button id="navButton" variant="primary">My Profile</Button></LinkContainer>
          : <LinkContainer to='/companyProfile'><Button id="navButton" variant="primary">My Profile</Button></LinkContainer>}
        </div>
      )
    }

  }

  search = () => {
    const pathname = window.location.pathname
    if (pathname === '/' || pathname === '/login' || pathname === '/register') {//if not logged in and on landing, login, register, don't show login button
      return (null)
    }
    if (this.props.auth.isAuthed) {
      return (
        <div>
          <LinkContainer to='/search'><Button id="navButton" variant="light">Search Employers</Button></LinkContainer>
        </div>
      )
    }

  }

  profileUtilities = () => {
    const pathname = window.location.pathname
    if (pathname === '/' || pathname === '/login' || pathname === '/register') {//if not logged in and on landing, login, register, don't show login button
      return (null)
    }
    if (this.props.auth.isAuthed) {
      return (
        <div>
          <LinkContainer to='/messages'><Button id="navButton" variant="light">Messages</Button></LinkContainer>
          <LinkContainer to='/alerts'><Button id="navButton" variant="light">Alerts</Button></LinkContainer>
          <LinkContainer to='/help'><Button id="navButton" variant="light">Help</Button></LinkContainer>
        </div>
      )
    }

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

        <Nav className="col">
          <this.utilities />
        </Nav>
        <Nav className="col">
          <this.search />
        </Nav>
        <Nav>
          <this.profileUtilities />
          <this.loginButton />
        </Nav>
      </BSNav>
    )
  }
}

export default connect(mapAuthStateToProps, { logoutAction })(Navbar)