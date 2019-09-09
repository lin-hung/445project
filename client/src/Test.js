import React, {Component} from 'react'
import axios from 'axios'

class Test extends Component{
    constructor(props){
        super(props)
        this.state={
            data:"data not loaded"
        }
    }
    componentDidMount(){
        this.getData()
    }

    getData=()=>{
        axios.get(`/test`)
            .then(res=>{
                return res.data
            })
            .then(data=>{
                this.setState({data:data.abc})
            })
    }
   
    render(){
        return(
            <div>
                Data: {this.state.data}
            </div>
        )
    }
}

export default Test