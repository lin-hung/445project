import React, { Component } from 'react'
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
            provider: null
        }
    }
    handleClick = (e) => {
        const step = this.state.step
        switch (step) {
            case 1: {
                this.setState({ userType: e.target.value })
            }
            case 2: {
                this.setState({ provider: e.target.value })
            }
        }
        this.setState({ step: this.state.step + 1 })
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
                                <button type="button" className="btn btn-primary btn-lg" onClick={this.handleClick} value={'google'}>Google</button>
                                <button type="button" className="btn btn-primary btn-lg" onClick={this.handleClick} value={'linkedIn'}>LinkedIn</button>
                            </p>
                        </div>
                    </div>
                </div>
            )
            default: {
                return (
                    <div id='login' className="container h-100">
                        <div className="col-sm-12 my-auto">
                            <div className="jumbotron text-center">
                                <h1 className="display-4">Error</h1>
                            </div>
                        </div>
                    </div>
                )
            }
        }
    }
}
export default connect(mapAuthStateToProps, { oAuthLoginAction })(Register)