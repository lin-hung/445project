import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapAuthStateToProps } from '../../resources/utils'
import Axios from 'axios'
import { LinkContainer } from 'react-router-bootstrap'
import {Button} from 'react-bootstrap'
class ChatList extends Component {
    state = { chats: null }
    componentDidMount() {
        const uPId = this.props.auth.profile._id
        Axios.get(`/api/messaging/getChats/${uPId}`)
            .then(res => {
                console.log(res.data)
                this.setState({ chats: res.data })
            })
    }
    Chats = () => {
        const uPId = this.props.auth.profile._id
        const cards = this.state.chats.map((m, i) => {
            const partner = m.members.filter((m, i) => {
                return (m._id !== uPId)
            })[0]
            const name=(partner.profileType==='candidate')?`${partner.contents.fname} ${partner.contents.lname}`:partner.contents.cname
            return (<div className='row' key={'msg' + i}>
                <div className="card col-9">
                <LinkContainer to={`/messages/${partner._id}`}><div className="card-body">
                        {name}
                    </div>
                    </LinkContainer>
                </div>
            </div>)
        })
        return cards
    }
    render() {
        if (!this.state.chats) return null
        return (
            <div id='chat'>
                <h4 className='title'>Chat List</h4>
                <this.Chats />
            </div>
        )
    }
}

export default connect(mapAuthStateToProps)(ChatList)