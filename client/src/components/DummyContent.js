import React, { Component } from 'react'
import {Link} from "react-router-dom"
import { Jumbotron, Container, Row, Col } from 'react-bootstrap'

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