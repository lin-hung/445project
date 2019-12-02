import React, { Component } from 'react'
import { Card } from 'react-bootstrap'

class CompanyProfile extends Component {
    render() {
        const form = this.props.profile.contents
        //const tags = this.props.profile.tags
        return (<div className="row">
            <div id="left" className="column">

                <Card.Text className="column">
                    Our email: {form.email}

                </Card.Text>
                <div>
                    About us: {form.about}
                </div>


            </div>
            <div id="right" className="column">
                <h1 align="center">About us:</h1>
                <div className="row">
                    <div className="col-sm">
                        <h2>Who we're hiring for: </h2>
                        <ul>
                            <li>{form.job}</li>
                        </ul>
                    </div>
                    <div className="col-sm">
                        <h2>Skills we're looking for: </h2>
                        {form.skills}
                        <h2>Experience we're looking for: </h2>
                        {form.experience}
                    </div>
                </div>

            </div>
        </div>)
    }
}

export default CompanyProfile