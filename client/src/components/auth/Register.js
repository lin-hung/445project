import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapAuthStateToProps } from '../../resources/utils'
import { oAuthLoginAction } from '../../_actions/authActions'

class Register extends Component {
    render() {
        return (<div>Register</div>)
    }
}
export default connect(mapAuthStateToProps, { oAuthLoginAction })(Register)