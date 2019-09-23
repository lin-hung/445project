import React, { Component } from 'react'
import {Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import axios from 'axios'
import {testAction, oAuthLoginAction} from '../_actions/authActions'
import {mapAuthStateToProps} from '../resources/utils'
import ReduxDisplayComponent from './ReduxDisplayComponent'
class OAuthLogin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: "data not loaded",
            testAuth: 'not run'
        }
    }
    componentDidMount() {
        this.getTestData()
        const socket=this.props.socket
        socket.emit('test_message',"abcdefg")
        console.log(`socket id: ${socket.id}`)
        this.MsgRecieve()
    }
    openPopupGoogle=()=> {
        const socket=this.props.socket
        const width = 600, height = 600
        const left = (window.innerWidth / 2) - (width / 2)
        const top = (window.innerHeight / 2) - (height / 2)
        console.log(`socket.id ${socket.id}`);
        const url = `http://localhost:3001/api/auth/google?socketId=${socket.id}`;
        return window.open(url, '',
          `toolbar=no, location=no, directories=no, status=no, menubar=no, 
            scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
            height=${height}, top=${top}, left=${left}`
        )
      }
    MsgRecieve=()=>{
        const socket=this.props.socket
        socket.on('test_response',(msg)=>{
            console.log(`test response: ${msg}`)
        })
        socket.on('google',(msg)=>{
            console.log(`google response: ${msg}`)
            this.props.oAuthLoginAction(msg)
        })
    }

    getTestData = () => {
        axios.get(`/api/test`)
            .then(res => {
                return res.data
            })
            .then(data => {
                this.setState({ data: data.abc })
            })
    }

    testAuth = () =>{
        axios.get('/api/auth/testAuthed')
            .then(res=>{
                this.setState({testAuth:`auth tested: ${res.data.success}`})
                console.log(`oauthlogin.js testauth res: ${res.data.success}`)
            })
        this.setState({testAuth:`auth tested`})

    }

    render() {
        return (
            <div>
                <h1 className="display-3">Data: {this.state.data}
                    Test Auth: {this.state.testAuth}
                </h1>
                <ul>
                    <ReduxDisplayComponent />
                </ul>
                <Button onClick={this.openPopupGoogle}>google auth</Button>
                <Button onClick={this.props.testAction}>TestAction</Button>
                <Button onClick={this.testAuth}>test auth</Button>
            </div>
        )
    }
}

export default connect(mapAuthStateToProps,{testAction, oAuthLoginAction})(OAuthLogin)