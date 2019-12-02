import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Button, Modal, Col, Row, Container } from "react-bootstrap";
import { connect } from "react-redux";
import { mapAuthStateToProps } from "../../resources/utils";
import { oAuthLoginAction, setProfileAction } from "../../_actions/authActions";
import "./style.scss";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      userType: null,
      provider: null,
      error: null
    };
  }
  componentDidMount() {
    const socket = this.props.socket;
    // setTimeout(() => {
    socket.once("authtoken", token => {
      console.log("authtoken recieved", token);
      this.props.oAuthLoginAction(token);
    });
    socket.once('profile', (profile) => {
      console.log(`profile recieved:`, profile)
      this.props.setProfileAction(profile)
    })
    socket.once("authfailure", msg => {
      console.log("authfailure", msg);
      this.setState({ step: 0, error: msg, modalShow: false });
      this.setState({ modalShow: false });
    });
    socket.once("isRegistered", msg => {
      console.log(`is registered: ${JSON.stringify(msg)}`);
      this.setState({
        error: "Account exists already!",
        step: 999,
        modalShow: false
      });
    });
    //  }, 500)
  }

  handleClick = e => {
    const step = this.state.step;

    switch (step) {
      case 1: {
        //stores the userType (either recruiter or candidate)
        console.log("case 1", e.target.value);
        this.setState({ userType: e.target.value, modalShow: true, step: 2 });
        break;
      }
      case 2: {
        //stores user's Auth Provider (either google or linkedin)
        this.setState({ provider: e.target.value, });
        break;
      }
      default: {
        this.setState({ step: 0, error: e });
        break;
      }
    }
    // this.setState({ step: this.state.step + 1 });
  };

  MyVerticallyCenteredModal = props => {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Register with:
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row className="show-grid">
              <Col>
                <Button
                  bsPrefix="idFedBtn"
                  onClick={this.openOAuthWindow}
                  value="google"
                >
                  <img src="googBtn.png" value="google" />
                </Button>
              </Col>
              <Col>
                <Button
                  bsPrefix="idFedBtn"
                  onClick={this.openOAuthWindow}
                  value="linkedin"
                >
                  <img src="linkedBtn.png" value="linkedin" />
                </Button>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-primary" onClick={this._closeModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  };
  openOAuthWindow = e => {
    console.log("Open auth window", e.target);
    const provider = e.target.getAttribute("value");
    const socket = this.props.socket;
    const width = 600,
      height = 600;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;
    const url = `http://localhost:3001/api/auth/${provider}?socketId=${socket.id}&registerType=${this.state.userType}`;
    return window.open(
      url,
      "",
      `toolbar=no, location=no, directories=no, status=no, menubar=no, 
            scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
            height=${height}, top=${top}, left=${left}`
    );
  };

  _openModal = e => {
    this.setState({ userType: e.target.value, modalShow: true });
  };
  _closeModal = () => {
    this.setState({ modalShow: false });
  };

  render() {
    if (this.props.auth.isAuthed) {
      return <Redirect to="/home" />;
    }
    switch (this.state.step) {
      case 1:
        return (
          <div id="login" className="container h-100">
            <div className="col-sm-12 my-auto">
              <div className="jumbotron text-center">
                <h1 className="display-4">Welcome to Employeet!</h1>
                <p className="lead">Are you a recruiter or candidate?</p>
                <p className="lead">
                  {/* <button type="button" className="btn btn-primary btn-lg" onClick={this.handleClick} value='recruiter'>Recruiter</button> */}
                  {/* <button type="button" className="btn btn-primary btn-lg" onClick={this.handleClick} value='candidate'>Candidate</button> */}
                  <Button
                    className="btn btn-primary employeetBtn"
                    value="recruiter"
                    onClick={this._openModal}
                  >
                    Recruiter
                  </Button>
                  <Button
                    className="btn btn-primary employeetBtn"
                    value="candidate"
                    onClick={this._openModal}
                  >
                    Candidate
                  </Button>

                  <this.MyVerticallyCenteredModal
                    show={this.state.modalShow}
                    onHide={() => this.setState({ setModalShow: false })}
                  />
                </p>
              </div>
            </div>
          </div>
        );
      // case 2: return (
      //     <div id='login' className="container h-100">
      //         <div className="col-sm-12 my-auto">
      //             <div className="jumbotron text-center">
      //                 LSDKFUOSKDFO:SDGKJksdjfaoaksjdf;laksdfj;lkadsfj
      //                 {/* <h1 className="display-4">Register with:</h1>
      //                 {/*
      //                 <Button className="btn btn-danger employeetBtn" onClick={() => this.setState({ modalShow: true })}>
      //                     Log In
      //                 </Button>

      //                 <this.MyVerticallyCenteredModal
      //                     show={this.state.modalShow}
      //                     onHide={() => this.setState({ setModalShow: false })}
      //                 />

      //                 <p className="lead"> </p>
      //                 <p className="lead">
      //                     <button type="button" className="btn btn-primary btn-lg" onClick={this.openOAuthWindow} value={'google'}>Google</button>
      //                     <button type="button" className="btn btn-primary btn-lg" onClick={this.openOAuthWindow} value={'linkedIn'}>LinkedIn</button>
      //                 </p>
      //                 */}
      //             </div>
      //         </div>
      //     </div>
      // )

      default: {
        return (
          <div id="login" className="container h-100">
            <div className="col-sm-12 my-auto">
              <div className="jumbotron text-center">
                <h1 className="display-4">Error</h1>
                <p className="lead">{this.state.error}</p>
              </div>
            </div>
          </div>
        );
      }
    }
  }
}
export default connect(mapAuthStateToProps, { oAuthLoginAction, setProfileAction })(Register);
