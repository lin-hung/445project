import React, { Component } from 'react'
import {Button} from 'react-bootstrap'
import axios from 'axios'

class TestComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: "data not loaded",
            user: {}
        }
        //this.openPopupGoogle=this.openPopupGoogle
    }
    componentDidMount() {
        this.getTestData()
        const socket=this.props.socket
        socket.emit('test_message',"abcdefg")
        socket.on('googlecb',(data)=>{
            console.log(data)
        })
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
        this.props.socket.on('test_response',(msg)=>{
            console.log(`test response: ${msg}`)
        })
    }

    getTestData = () => {
        console.log("get test data")
        axios.get(`/test`)
            .then(res => {
                console.log("axios")
                return res.data
            })
            .then(data => {
                console.log(data)
                this.setState({ data: data.abc })
            })
    }

    render() {
        return (
            <div>
                <h1 className="display-3">Data: {this.state.data}
                </h1>
                <Button onClick={this.openPopupGoogle}/>
                <Button onClick={this.getTestData}/>
            </div>
        )
    }
}

export default TestComponent