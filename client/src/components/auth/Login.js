import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReduxDisplayComponent from '../ReduxDisplayComponent'
import { mapAuthStateToProps } from '../../resources/utils'
import {oAuthLoginAction} from '../../_actions/authActions'
import './style.css'
class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            step: 1
        }
    }
    handleClick=(e)=>{
        this.setState({step:parseInt(e.target.value)})
        const socket=this.props.socket
        socket.on('google',(msg)=>{
            this.props.oAuthLoginAction(msg)
        })
    }
    openOAuthWindow=(e)=>{
        const provider=e.target.value
        const socket=this.props.socket
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
        switch (this.state.step) {
            case 1:
                {
                    return (
                        <div id='login' className="container h-100">
                            <div className="col-sm-12 my-auto">
                                <div className="jumbotron text-center">
                                    <h1 className="display-4">Welcome to Employeet!</h1>
                                    <p className="lead">Do you have an account?</p>
                                    <p className="lead">
                                        <button type="button" className="btn btn-primary btn-lg" onClick={this.handleClick} value='2'>Yes</button>
                                        <button type="button" className="btn btn-secondary btn-lg" onClick={this.toRegister} >No</button>
                                    </p>
                                </div>
                            </div>
                            <ReduxDisplayComponent />
                        </div>
                    )
                }
            case 2: {
                return(
                    <div id='login' className="container h-100">
                            <div className="col-sm-12 my-auto">
                                <div className="jumbotron text-center">
                                    <h1 className="display-4">Log in with:</h1>
                                    <p className="lead"> </p>
                                    <p className="lead">
                                        <button type="button" className="btn btn-primary btn-lg" onClick={this.openOAuthWindow} value={'google'}>Google</button>
                                        <button type="button" className="btn btn-primary btn-lg" onClick={this.openOAuthWindow} value={'linkedIn'}>LinkedIn</button>
                                    </p>
                                </div>
                            </div>
                            <ReduxDisplayComponent />
                        </div>
                )
            }
            default: {
                return(<div>Something broke step: {this.state.step}</div>)
            }

        }

    }
}

export default connect(mapAuthStateToProps, {oAuthLoginAction})(Login)