import React, { Component } from 'react'
import { Container } from 'react-bootstrap'

export class Footer extends Component {
    render() {
        return (
            <footer>
                <Container>
                    <p>© Company 2017-2019</p>
                </Container>
            </footer>
        )
    }
}

export class DummyContent2 extends Component{
    render(){
        return(
            <h1>
                DUMMY CONTENT 2
                </h1>
        )
    }
}