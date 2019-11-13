import React, { Component } from 'react'
import { Button, Card } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import './profileStyle.css'
import noProfilePic from './noPic.png'


class Profile extends Component {
    render() {
        return (

            <div>
                <Card bg="light" border="primmary">
                    <Card.Body>
                        <div class="row">
                            <div id="left" class="column">
                                <img id="profilePicture" src={noProfilePic} alt="profilePicture"></img>
                                <Card.Text className="text-center">
                                    <h3>
                                        {this.props.name}
                                    </h3>
                                    <p>
                                        {this.props.career}
                                    </p>
                                </Card.Text>


                            </div>
                            <div id="right" class="column">
                                <h1 align="center">Qualifications</h1>
                                <div class="row">
                                    <div class="col-sm">
                                        {/* Need string.split("\n").map((i, key) => {return <div key={key}>{i}</div>;}) to convert /n to new divs in html*/}
                                        <h2>Education</h2>
                                        <h> {this.props.education.split("\n").map((i, key) => {
                                            return <div key={key}>{i}</div>;
                                        })} </h>
                                    </div>
                                    <div class="col-sm">
                                        <h2>Work</h2>
                                        <h>{this.props.work.split("\n").map((i, key) => {
                                            return <div key={key}>{i}</div>;
                                        })} </h>
                                    </div>
                                    <div class="col-sm">
                                        <h2>Misc</h2>
                                        <h>{this.props.misc.split("\n").map((i, key) => {
                                            return <div key={key}>{i}</div>;
                                        })} </h>
                                    </div>
                                </div>




                            </div>
                        </div>
                    </Card.Body>
                    <Card.Text className="text-center">
                        <div>
                            <p>
                                <LinkContainer to='/messages'><Button variant="primary">YEET User</Button></LinkContainer>
                            </p>
                        </div>
                    </Card.Text>
                </Card>
            </div>
        )
    }
}
export default Profile