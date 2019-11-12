import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { noop } from 'rxjs'
import { mapAuthStateToProps } from '../../resources/utils'
import { oAuthLoginAction } from '../../_actions/authActions'
import './style.scss'
class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            step: 1
        }
    }
    componentDidMount() {
        const socket = this.props.socket
        socket.once('authtoken', (token) => {
            console.log(`authtoken recieved: ${token}`)
            this.setState({ step: 3 })
            this.props.oAuthLoginAction(token)
        })
        socket.once('authfailure', (msg) => {
            console.log(`authfailure msg: ${msg}`)
            this.setState({ step: 5 })
        })
    }
    componentWillUnmount() {
        const socket = this.props.socket
        socket.removeAllListeners()
    }
    handleClick = (e) => {
        this.setState({ step: parseInt(e.target.value) })
    }
    openOAuthWindow = (e) => {
        const provider = e.target.value
        const socket = this.props.socket
        const width = 600, height = 600
        const left = (window.innerWidth / 2) - (width / 2)
        const top = (window.innerHeight / 2) - (height / 2)
        const url = `http://localhost:3001/api/auth/${provider}?socketId=${socket.id}`;
        return window.open(url, '',
            `toolbar=no, location=no, directories=no, status=no, menubar=no, 
            scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
            height=${height}, top=${top}, left=${left}`
        )
    }
    render() {
        var headline, subhead, buttonA, buttonB
        switch (this.state.step) {
            /*
            case 1:{
                headline = `Welcome to Employeet!`
                subhead = `Do you have an account?`
                buttonA = { text: `Yes`, onClick: this.handleClick, val: 2 }
                buttonB = { text: `No`, onClick: this.handleClick, val: 3 }
                break
            }
            */
            case 1: {
                headline = `Log in with:`
                subhead = ` `
                buttonA = { text: `Google`, onClick: this.openOAuthWindow, val: 'google' }
                buttonB = { text: `LinkedIn`, onClick: this.openOAuthWindow, val: 'linkedIn' }
                break
            }
            case 2:
                return (
                    <Redirect to='/register' />
                )
            case 3:
                return (
                    <Redirect to='/profile' />
                )
            case 4:{               
                headline=`You don't have an account yet!`
                subhead=`Would you like to register?`
                buttonA={ text: `Yes`, onClick: this.handleClick, val: 2 }
                buttonB={ text: `No`, onClick: this.handleClick, val: 3 }
                break
            }
            default: {
                headline=`Error`
                buttonA={ text: ``, onClick: noop, val: 0 }
                buttonB={ text: ``, onClick: noop, val: 0 }
            }

        }
        return (<div id='login' className="container h-100">
            <div className="col-sm-12 my-auto">
                <div className="jumbotron text-center">
                    <h1 className="display-4">{headline}</h1>
                    <p className="lead">{subhead}</p>
                    <p className="lead">
                        <button type="button" className="btn btn-primary btn-lg" onClick={buttonA.onClick} value={buttonA.val}>{buttonA.text}</button>
                        <button type="button" className="btn btn-primary btn-lg" onClick={buttonB.onClick} value={buttonB.val}>{buttonB.text}</button>
                    </p>
                </div>
            </div>
        </div>)

    }
}

export default connect(mapAuthStateToProps, { oAuthLoginAction })(Login)