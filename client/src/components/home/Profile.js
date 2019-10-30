import React, { Component } from 'react'
import { Button, Card } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import './profileStyle.css'

class Profile extends Component {
    render() {
        return (
               <div>
                   <Card bg="secondary" text="white">
                        <Card.Body>
                            <div class = "row">
                                <div id = "left" class = "column">
                                    <img id = "profilePicture" src = "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"></img>
                                    <Card.Text className="text-center">
                                        <h3>
                                            First Last                                    
                                        </h3>
                                        <p>
                                            Career
                                        </p>
                                    </Card.Text>
                                    
                                </div>
                                <div id = "right" class = "column">
                                    <h1>Qualifications</h1>
                                    <h2>Education</h2>
                                    <h>dsdfjdf</h>
                                    <h2>Work</h2>
                                    <h>dsdfjdf</h>
                                    <h2>Misc</h2>
                                    <h>dsdfjdf</h>
                                </div>
                            </div>
                        </Card.Body> 
                        <Card.Text className="text-center">
                            <div>
                                <p>
                                    <LinkContainer to='/messages'><Button variant ="dark">Match User</Button></LinkContainer>
                                </p>
                            </div>
                        </Card.Text> 
                   </Card>
               </div>             
        )
    }
}
export default Profile