import React, { Component } from 'react'
import { ButtonToolbar, Button, Modal } from 'react-bootstrap'
import { connect } from 'react-redux'
import { mapAuthStateToProps } from '../../resources/utils'
import { oAuthLoginAction } from '../../_actions/authActions'

class LoginModal extends Component {
    state = {
        modalShow: false,
        setModalShow: false
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
                    <Button onClick={this._openOAuthWindow} val='google'>Google</Button>
                    <Button onClick={this._openOAuthWindow} val='linkedin'>LinkedIn</Button>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this._closeModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
    render() {
        return (<div>

            <Button variant="primary" className="btn employeetButton" onClick={() => this.setState({ modalShow: true })}>
                Launch vertically centered modal
        </Button>

            <this.MyVerticallyCenteredModal
                show={this.state.modalShow}
                onHide={() => this.setState({ setModalShow: true })}
            />
        </div>)
    }
}

export default connect(mapAuthStateToProps, { oAuthLoginAction })(LoginModal)