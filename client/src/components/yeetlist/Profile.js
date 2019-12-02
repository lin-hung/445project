import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import noProfilePic from './noPic.png'
import './profileStyle.scss'



class Profile extends Component {
    render() {
        const { profile } = this.props
        return (
                        <div className="row">
                            <div id="leftCo" className="column">
                                <img id="profilePicture" src={noProfilePic} alt="profilePicture"></img>
                                <h3 className="text-center">
                                    {profile.form.fname} {profile.form.lname}
                                </h3>


                                <Card.Text className="text-center">
                                    <b>Currently:</b> {profile.form.job} 
                                </Card.Text>
                                <Card.Text className="text-center">
                                    <b>Email: </b><a href={"mailto:" + profile.form.email}>{profile.form.email}</a>   
                                </Card.Text>
                            </div>

                            <div id="rightCo" className="column">
                                <h1 align="center">Qualifications </h1>
                                <div className="row">
                                    <div className="col-sm">
                                        {/* Need string.split("\n").map((i, key) => {return <div key={key}>{i}</div>;}) to convert /n to new divs in html*/}
                                        <h4>Experience</h4> 
                                        <ul>
                                        {profile.form.exp}
                                        {profile.form.projects}
                                        </ul>
                                    </div>
                                    <div className="col-sm">
                                        <h4>Previous Jobs</h4>
                                        <ul>
                                            {profile.form.prevjob}
                                        </ul>
                                    </div>
                                    <div className="col-sm">
                                        <h4>Misc</h4>
                                        <ul>
                                            {profile.form.hobbies}
                                        </ul>
                                    </div>
                                  
                                </div>
                                <div className = "row tags">
                                    <div className="col-sm">
                                        <h4>Tags</h4>
                                        <ul>
                                            {profile.tags.map((t,i)=>{
                                                return( <li key={`tag${i}`}>{t}</li>)
                                            })}
                                        </ul>
                                    </div>
                                </div>

                            </div>
                          
                        </div>

            // <div>
            //     <Card bg="light" border="primmary">
            //         <Card.Body>
            //             <div className="row">
            //                 <div id="left" className="column">
            //                     <img id="profilePicture" src={noProfilePic} alt="profilePicture"></img>
            //                     <h3 className="text-center">
            //                         {this.props.name}
            //                     </h3>

            //                     <Card.Text className="text-center">
            //                         {this.props.career}
            //                     </Card.Text>


            //                 </div>
            //                 <div id="right" className="column">
            //                     <h1 align="center">Qualifications</h1>
            //                     <div className="row">
            //                         <div className="col-sm">
            //                             {/* Need string.split("\n").map((i, key) => {return <div key={key}>{i}</div>;}) to convert /n to new divs in html*/}
            //                             <h2>Education</h2>
            //                             <ul> {this.props.education.split("\n").map((i, key) => {
            //                                 return <li key={key}>{i}</li>;
            //                             })} </ul>
            //                         </div>
            //                         <div className="col-sm">
            //                             <h2>Work</h2>
            //                             <ul>{this.props.work.split("\n").map((i, key) => {
            //                                 return <li key={key}>{i}</li>;
            //                             })} </ul>
            //                         </div>
            //                         <div className="col-sm">
            //                             <h2>Misc</h2>
            //                             <ul>{this.props.misc.split("\n").map((i, key) => {
            //                                 return <li key={key}>{i}</li>;
            //                             })} </ul>
            //                         </div>
            //                     </div>

            //                 </div>
            //             </div>
            //             <Card.Text className="text-center">
            //                     <LinkContainer to='/messages'><Button variant="primary">YEET User</Button></LinkContainer>
            //             </Card.Text>
            //         </Card.Body>

            //     </Card>
            // </div>
        )
    }
}
export default Profile