import React, {Component} from 'react'
import {connect} from 'react-redux'
import {mapAuthStateToProps} from '../resources/utils'

//For test purposes. Displays contents of Redux stores
class ReduxDisplayComponent extends Component{
    render(){
        return(
            <div>
                <h1>REMOVE THIS COMPONENT</h1>
            <p>redux auth store: {JSON.stringify(this.props.auth)}</p>
            </div>
        )
    }
}

export default connect(mapAuthStateToProps)(ReduxDisplayComponent)