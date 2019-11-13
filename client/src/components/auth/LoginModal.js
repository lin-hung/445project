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
    _closeModal=()=>{
        this.setState({modalShow:false})
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
                        Modal heading
              </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Centered Modal</h4>
                    <p>
                        Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                        dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                        consectetur ac, vestibulum at eros.
              </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this._closeModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
    render() {
        return (<div>

            <Button variant="primary" onClick={() => this.setState({ modalShow: true })}>
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