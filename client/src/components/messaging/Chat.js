import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapAuthStateToProps } from '../../resources/utils'
import Axios from 'axios'

class Chat extends Component {
    state = {
        room: null,
        partner: null,
        messages: [],
        messageInput: ''
    }
    socket = this.props.socket
    componentDidMount() {
        const partnerId = this.props.location.pathname.split('/')[2]
        const uPId = this.props.auth.profile._id
        console.log(partnerId, uPId)
        Axios.get(`/api/messaging/getRoom/${partnerId}/${uPId}`)
            .then((res) => {
                this.setState({
                    room: res.data,
                    partner: res.data.members.filter((m, i) => {
                        return (m._id !== uPId)
                    })[0],
                    messages: (res.data.messages) ? res.data.messages : []
                })
                this.socket.emit('join', { room: res.data._id, prof: this.props.auth.profile._id })
            })

        this.socket.on('chatmsg', (msg) => {
            console.log('chatmsg', msg)
        })
    }
    Messages = () => {
        return (
            <div className="container" >
                {this.state.messages.map((msg, i) => {
                    const posterStyle = (msg.poster === this.state.partner._id) ? 'justify-content-start' : 'justify-content-end'
                    return (
                        <div className={`row ${posterStyle}`} key={'msg' + i}>
                            <div className="card col-9">
                                <div className="card-body">
                                    {msg.text}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
    _handleMessageChange = (e) => {
        this.setState({ messageInput: e.target.value })
    }
    _handleMessageKeyUp = (e) => {
        if (e.which === 13) {//enter
            e.preventDefault()
            this.socket.emit('chatmsg', {
                room: this.state.room._id,
                poster: this.props.auth.profile._id,
                msg: this.state.messageInput
            })
            this.setState({ messageInput: '' })
        }
    }
    render() {
        const chatId = this.props.location.pathname.split('/')[2]
        const { room, messages, partner } = this.state

        if (!room || !messages) {
            return 'Loading'
        }


        let partnerName
        if (!partner.contents) {
            partnerName = null
        }
        else {
            partnerName = (partner.profileType === 'candidate') ? partner.contents.fname + partner.contents.lname :
                partner.contents.cname
        }

        return (
            <div id='chat'>
                <h4 className='title'>{partnerName}</h4>
                <this.Messages />
                <input id="messageInput" placeholder="Message" autoComplete="off"
                    className='form-control'
                    onChange={this._handleMessageChange}
                    onKeyUp={this._handleMessageKeyUp}
                    value={this.state.messageInput}
                    required type="text" />
            </div>
        )
    }
}

export default connect(mapAuthStateToProps)(Chat)