import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { connect } from 'react-redux'

class RegisterModal extends Component {
    state = {
        modalShow: false,
        setModalShow: false,
        loginSuccess: null
    }

    componentDidMount() {
        const socket = this.props.socket
        // setTimeout(() => {
            socket.once('authtoken', (token) => {
                this.props.oAuthLoginAction(token)
            })
            socket.once('authfailure', (msg) => {
                this.setState({ step: 0, error: msg })
            })
            socket.once('isRegistered', (msg) => {
                console.log(`is registered: ${JSON.stringify(msg)}`)
                this.setState({ error: "Account exists already!", step: 5 })

            })
      //  }, 500)
    }

    _closeModal = () => {
        this.setState({ modalShow: false })
    }

    _openOAuthWindow = (e) => {
        const provider = e.target.value
        const socket = this.props.socket
        const width = 600, height = 600
        const left = (window.innerWidth / 2) - (width / 2)
        const top = (window.innerHeight / 2) - (height / 2)
        const url = `http://localhost:3001/api/auth/${provider}?socketId=${socket.id}&registerType=${this.state.userType}`
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
                                <Button bsPrefix="idFedBtn" onClick={this._openOAuthWindow} value='google'><img src="googBtn.png" value='google' /></Button>
                            </Col>
                            <Col>
                                <Button bsPrefix="idFedBtn" onClick={this._openOAuthWindow} value='linkedin'><img src="linkedBtn.png" value='linkedin' /></Button>
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
        return (
            <div>
                <Button className="btn btn-danger employeetBtn" onClick={() => this.setState({ modalShow: true })}>
                    Sign Up
                </Button>

                <this.MyVerticallyCenteredModal
                    show={this.state.modalShow}
                    onHide={() => this.setState({ setModalShow: false })}
                />
            </div>)
    }
}

export default (RegisterModal)