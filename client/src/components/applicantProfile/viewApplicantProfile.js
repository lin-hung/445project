import Axios from 'axios'
import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { LinkContainer } from 'react-router-bootstrap'
import Profile from '../yeetlist/Profile'
import './viewStyleApplicant.scss'

//This class is basically their profile card, this is what recruiters will see  
class viewApplicantProfile extends Component {
	state = {
		form: null,
		tags: []
	}
	componentDidMount() {
		Axios.get('/api/profile/get').then((res) => {
			if (res.data.contents === undefined || res.data.tags === undefined) {
				console.log("Error: no user data retrieved")
			} else {
				console.log("Retrieved the following data: ", res.data)

				this.setState({ form: res.data.contents, tags: res.data.tags })

			}
		})
	}
	render() {
		while (this.state.form === null) {
			return (
				<div className="col-sm-12 my-auto">
					<div className="jumbotron text-center">
						<h1 className="display-4">Loading...</h1>
						<p className="lead">{this.state.error}</p>
					</div>
				</div>
			)
		}
		return (
			<Card bg="light" border="primmary">
				<Card.Body>
					<Profile profile={this.state} />
					<div id="buttonRight" className="inner">
						<LinkContainer to='/applicantForm'><Button variant="primary">Edit profile</Button></LinkContainer>
					</div>
				</Card.Body>
			</Card>
		)
	}
}
export default viewApplicantProfile