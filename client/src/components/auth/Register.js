import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import { mapAuthStateToProps } from '../../resources/utils'
import { oAuthLoginAction } from '../../_actions/authActions'
import './style.css'
class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            step: 1,
            userType: null,
            provider: null,
            error: null
        }
    }
    componentDidMount() {
        const socket = this.props.socket
        socket.once('authtoken', (token) => {
            this.setState({step:3})
            this.props.oAuthLoginAction(token)
        })
        socket.once('authfailure', (msg) => {
            this.setState({ step: 0, error: msg })
        })
        socket.once('isRegistered', (msg) => {
            console.log(`is registered: ${JSON.stringify(msg)}`)
            this.setState({ error:"Account exists already!", step: 5 })
        })
    }
    componentWillUnmount() {
        const socket = this.props.socket
        socket.removeAllListeners()
    }
    handleClick = (e) => {
        const step = this.state.step
        switch (step) {
            case 1: {
                this.setState({ userType: e.target.value })
                break
            }
            case 2: {
                this.setState({ provider: e.target.value })
                break
            }
            default:{
                this.setState({step:0, error:e})
                break
            }
        }
        this.setState({ step: this.state.step + 1 })
    }
    openOAuthWindow = (e) => {
        const provider = e.target.value
        const socket = this.props.socket
        const width = 600, height = 600
        const left = (window.innerWidth / 2) - (width / 2)
        const top = (window.innerHeight / 2) - (height / 2)
        const url = `http://localhost:3001/api/auth/${provider}?socketId=${socket.id}&registerType=${this.state.userType}`
        return window.open(url, '',
            `toolbar=no, location=no, directories=no, status=no, menubar=no, 
            scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
            height=${height}, top=${top}, left=${left}`
        )
    }
    render() {
        switch (this.state.step) {
            case 1: return (<div id='login' className="container h-100">
                <div className="col-sm-12 my-auto">
                    <div className="jumbotron text-center">
                        <h1 className="display-4">Welcome to Employeet!</h1>
                        <p className="lead">Are you a recruiter or candidate?</p>
                        <p className="lead">
                            <button type="button" className="btn btn-primary btn-lg" onClick={this.handleClick} value='recruiter'>Recruiter</button>
                            <button type="button" className="btn btn-secondary btn-lg" onClick={this.handleClick} value='candidate'>Candidate</button>
                        </p>
                    </div>
                </div>
            </div>)
            case 2: return (
                <div id='login' className="container h-100">
                    <div className="col-sm-12 my-auto">
                        <div className="jumbotron text-center">
                            <h1 className="display-4">Register with:</h1>
                            <p className="lead"> </p>
                            <p className="lead">
                                <button type="button" className="btn btn-primary btn-lg" onClick={this.openOAuthWindow} value={'google'}>Google</button>
                                <button type="button" className="btn btn-primary btn-lg" onClick={this.openOAuthWindow} value={'linkedIn'}>LinkedIn</button>
                            </p>
                        </div>
                    </div>
                </div>
            )
            case 3:
                return (
                    <Redirect to='/ApplicantForm' />
                )
            default: {
                return (
                    <div id='login' className="container h-100">
                        <div className="col-sm-12 my-auto">
                            <div className="jumbotron text-center">
                                <h1 className="display-4">Error</h1>
                                <p className="lead">{this.state.error}</p>
                            </div>
                        </div>
                    </div>
                )
            }
        }
    }
}
export default connect(mapAuthStateToProps, { oAuthLoginAction })(Register)