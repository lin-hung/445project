import React, { Component } from 'react'
import { Button, Card } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import './profileStyle.scss'
import noProfilePic from './noPic.png'


class Profile extends Component {
    render() {
        return (

            <div>
                <Card bg="light" border="primmary">
                    <Card.Body>
                        <div className="row">
                            <div id="left" className="column">
                                <img id="profilePicture" src={noProfilePic} alt="profilePicture"></img>
                                <h3 className="text-center">
                                    {this.props.name}
                                </h3>

                                <Card.Text className="text-center">
                                    {this.props.career}
                                </Card.Text>


                            </div>
                            <div id="right" className="column">
                                <h1 align="center">Qualifications</h1>
                                <div className="row">
                                    <div className="col-sm">
                                        {/* Need string.split("\n").map((i, key) => {return <div key={key}>{i}</div>;}) to convert /n to new divs in html*/}
                                        <h2>Education</h2>
                                        <ul> {this.props.education.split("\n").map((i, key) => {
                                            return <li key={key}>{i}</li>;
                                        })} </ul>
                                    </div>
                                    <div className="col-sm">
                                        <h2>Work</h2>
                                        <ul>{this.props.work.split("\n").map((i, key) => {
                                            return <li key={key}>{i}</li>;
                                        })} </ul>
                                    </div>
                                    <div className="col-sm">
                                        <h2>Misc</h2>
                                        <ul>{this.props.misc.split("\n").map((i, key) => {
                                            return <li key={key}>{i}</li>;
                                        })} </ul>
                                    </div>
                                </div>




                            </div>
                        </div>
                        <Card.Text className="text-center">
                                <LinkContainer to='/messages'><Button variant="primary">YEET User</Button></LinkContainer>
                        </Card.Text>
                    </Card.Body>

                </Card>
            </div>
        )
    }
}
export default Profile