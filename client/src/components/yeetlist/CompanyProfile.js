import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import './companyProfileStyle.scss'
import noProfilePic from './noPic.png'

class CompanyProfile extends Component {
    render() {
        const form = this.props.profile.contents
        //const tags = this.props.profile.tags
        return (
            <div className="row">
                <div id="leftCo" className="column">
                    <img id="profilePicture" src={noProfilePic} alt="profilePicture"></img>
                    <h3 className="text-center">
                        {form.cname} 
                    </h3>
                    <Card.Text className="text-center">
                        <b>Email: </b><a href={"mailto:" + form.email}>{form.email}</a>   
                    </Card.Text>
                </div>

                <div id="rightCo" className="column">
                    <div className="row">
                        <div className="col-sm">
                            <h4>About us:</h4> {form.about}
                            <h4>Who we're hiring for: </h4>
                            <ul>
                                <li>{form.job}</li>
                            </ul>
                        </div>
                        <div className="col-sm">
                            <h4>Skills we're looking for: </h4>
                            {form.skills}
                            <h4>Experience we're looking for: </h4>
                            {form.exp}
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default CompanyProfile