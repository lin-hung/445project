import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'

class Help extends Component {
    render(){
        return (
            <div>
                <Card bg="light" border="primmary">
                    <Card.Header> Need Help?  </Card.Header>
                    <Card.Body>
                        <ul id ="nobullet">
                            <li> Please note that we cannot guarantee any matches, nor can we control what employers put. 
                        Please be wary of scams and do not share any personal infomation with anyone. </li>
                            <li> Employeet representatives will never ask for your personal infomation.  </li>
                            <li >We're here to support all your needs. If you have any questions or concerns please 
                        contact us at <a href={"mailto:" + 'employeet445@gmail.com'}>employeet445@gmail.com</a>. </li>

                        </ul>

                    </Card.Body>
                    <Card.Footer>
                        FAQ:
                        <ul id ="nobullet">
                            <li><b>I'm not getting any matches :(</b> </li> {/* FAQ 1 */}
                                <ul> {/* Answer */} 
                                    <li>Make sure to add as many tags as you think
                                    is relevant! Employeers are matched based off of your tags. 
                                    </li>
                                    <li>Same with you employers! If you can't 
                                    find any potential applicants, it's a good idea to broaden your tags!
                                    </li>
                                </ul>
                            <li> <b>What do you mean by tags?</b></li> {/* FAQ 2 */}
                                <ul> {/* Answer */} 
                                    <li>Describe yourself with your tags! Don't go overboard though. Enter tags based on
                                        what you're looking for. For example, if you wanted an internship at a gaming company, 
                                        use the tags: #gaming #internship #summer 
                                    </li>
                                    <li>
                                        If you're an employer, make sure you're adding tags to secure that position you want filled. 
                                        For example, if you're looking to fill a part time office assistant, make sure to have the tags:
                                        #part time #office #assistant
                                    </li>
                                    <li>
                                        You want to be specific, but not so specific that you can't match with a canidate or employer.
                                    </li>
                                </ul>
                            <li><b>Can I edit my profile? </b></li> {/* FAQ 3 */}
                                <ul> {/* Answer */}
                                    <li> Yes of course! Head over to your profile page and hit the 
                                        'Edit Profile' button and change any information you would like, 
                                        then hit save at the bottom. This will update your infomation for others to see.
                                    </li>
                                </ul>
                            <li><b>Can I change my profile picture or add my resume? </b></li> {/* FAQ 4 */}
                                <ul> {/* Answer */}
                                    <li> Currently, no. :( BUT we are working hard to implement these. 
                                        Please stay tuned and we hope to get these features implemented asap. 
                                    </li>
                                </ul>
                        </ul>
                    </Card.Footer>

                </Card>
            </div>
        )
    }
}export default Help


