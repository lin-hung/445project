import React, { Component } from 'react'
import { ButtonToolbar, Button, Modal, Col, Row, Container, Grid } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { mapAuthStateToProps } from '../../resources/utils'
import { oAuthLoginAction } from '../../_actions/authActions'
import './badPadding.scss'

class LoginModal extends Component {
    state = {
        modalShow: false,
        setModalShow: false,
        loginSuccess: null
    }

    componentDidMount() {
        const socket = this.props.socket
        socket.once('authtoken', (token) => {
            console.log(`authtoken recieved: ${token}`)
            this.setState({ loginSuccess: true })
            this.props.oAuthLoginAction(token)
        })
        socket.once('authfailure', (msg) => {
            console.log(`authfailure msg: ${msg}`)
            this.setState({ loginSuccess: false })
        })
    }

    _closeModal = () => {
        this.setState({ modalShow: false })
    }

    _openOAuthWindow = (e) => {
        console.log(e.target.getAttribute("value"))
        
        const provider = e.target.getAttribute("value")
        const socket = this.props.socket
        const width = 600, height = 600
        const left = (window.innerWidth / 2) - (width / 2)
        const top = (window.innerHeight / 2) - (height / 2)
        const url = `http://localhost:3001/api/auth/${provider}?socketId=${socket.id}`;
        return window.open(url, '',
            `toolbar=no, location=no, directories=no, status=no, menubar=no, 
            scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
            height=${height}, top=${top}, left=${left}`
        )
    }

    MyVerticallyCenteredModal = (props) => {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header> 
                    <Modal.Title id="contained-modal-title-vcenter">
                        Sign in with:
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>                      
                        <Row className="show-grid">
                            
    
                            
                           
                            <Col>
                                <Button bsPrefix="badButton" variant="outline-primary" onClick={this._openOAuthWindow} value='google'><img src="googBtn.png" value='google' /></Button>
                            </Col>
                            <Col>
                                <Button variant="outline-primary" bsPrefix="badButton" onClick={this._openOAuthWindow} value='linkedin'><img src="linkedBtn.png" value='linkedin' /></Button>
                            </Col>
                            
                        </Row>
                    </Container>  
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this._closeModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    render() {
        if (this.state.loginSuccess === true) {
            return (<Redirect to='/profile' />)
        }

        return (
            <div>
                <Button className="btn btn-danger employeetBtn" onClick={() => this.setState({ modalShow: true })}>
                    Log In
                </Button>

                <this.MyVerticallyCenteredModal
                    show={this.state.modalShow}
                    onHide={() => this.setState({ setModalShow: true })}
                />
            </div>)
    }
}

export default connect(mapAuthStateToProps, { oAuthLoginAction })(LoginModal)