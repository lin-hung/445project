import React, { Component } from 'react'
import axios from 'axios'

class Test extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: "data not loaded"
        }
    }
    componentDidMount() {
        this.getData()
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

export default Test