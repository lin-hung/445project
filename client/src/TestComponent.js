import React, { Component } from 'react'
import axios from 'axios'

class TestComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: "data not loaded"
        }
    }
    componentDidMount() {
        this.getData()
        const socket=this.props.socket
        socket.emit('test_message',"abcdefg")
        this.testMsgRecieve()
    }
    
    testMsgRecieve=()=>{
        this.props.socket.on('test_response',(msg)=>{
            console.log(`test response: ${msg}`)
        })
    }

    getData = () => {
        axios.get(`/test`)
            .then(res => {
                return res.data
            })
            .then(data => {
                this.setState({ data: data.abc })
            })
    }

    render() {
        return (
            <div>
                <h1 className="display-3">Data: {this.state.data}
                </h1>
            </div>
        )
    }
}

export default TestComponent