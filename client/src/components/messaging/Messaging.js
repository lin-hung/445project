import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapAuthStateToProps } from '../../resources/utils'
import { Switch } from 'react-router-dom'
import { PropsRoute } from '../../routes'
import ChatList from './ChatList'
import Chat from './Chat'
import {Card} from 'react-bootstrap'

class Messaging extends Component {
    render() {
        const socket = this.props.io('http://localhost:3002/messaging')
        const path = this.props.match.path
        console.log('messaging path:', path)
        return (
            <Card bg="light" border="primmary">
                <Card.Body>
                    <Switch>
                        <PropsRoute exact path={'/messages'} component={ChatList} />
                        <PropsRoute exact path={'/messages/:id'} component={Chat} socket={socket} />
                    </Switch>
                </Card.Body>
            </Card>
        )
    }
}

export default connect(mapAuthStateToProps)(Messaging)