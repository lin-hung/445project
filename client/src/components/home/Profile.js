import React, { Component } from 'react'
import { Button, Card } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import './profileStyle.css'

class Profile extends Component {
    render() {
        return (
               <div>
                   <Card bg="light" border = "primmary">
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
                                    <h1 align = "center">Qualifications</h1>
                                    <div class = "row">
                                        <div class="col-sm">
                                            <h2>Education</h2>
                                            <h>test test test test test test test test test</h>
                                        </div>
                                        <div class="col-sm">
                                            <h2>Work</h2>
                                            <h>test test test test test test test test test</h>
                                        </div>
                                        <div class="col-sm">
                                            <h2>Misc</h2>
                                            <h>test test test test test test test test test</h>
                                        </div>
                                    </div>
                                    
                                    
                                    
                                    
                                </div>
                            </div>
                        </Card.Body> 
                        <Card.Text className="text-center">
                            <div>
                                <p>
                                    <LinkContainer to='/messages'><Button variant ="primary">YEET User</Button></LinkContainer>
                                </p>
                            </div>
                        </Card.Text> 
                   </Card>
               </div>             
        )
    }
}
export default Profile