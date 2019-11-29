import React, { Component } from 'react'
import Axios from 'axios'
import { LinkContainer } from 'react-router-bootstrap'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import './viewStyleApplicant.scss'

//This class is basically their profile card, this is what recruiters will see  
class viewApplicantProfile extends Component {
	state={
		form:null,
		tags: []
	}
	componentDidMount(){
		Axios.get('/api/profile/get').then((res) => {
            if (res.data.contents === undefined || res.data.tags === undefined) {
                console.log("Error: no user data retrieved")
            } else {
                console.log("Retrieved the following data: ", res.data.contents)
				console.log("Tags: ", res.data.tags)
				console.log("form", {form: res.data.contents} )
				this.setState({ form: res.data.contents })
                this.setState({
                    tags: res.data.tags.map((t) => {
                        return { id: t, text: t }
                    })
                })
            }
        })
    }
	render() {
		while(this.state.form === null ){
            return(
				<div className="col-sm-12 my-auto">
						<div className="jumbotron text-center">
							<h1 className="display-4">Loading...</h1>
							<p className="lead">{this.state.error}</p>
						</div>
				</div>
            )
		}
		const {form} = this.state.form
		const {tags} = this.state.tags
		return(
			<div>
			<Card bg="light" border="primmary">
				<Card.Header><h3>{this.state.form.fname}'s Profile</h3> 
				<div className = "inner">
					<ul id = "nobullet">
						<li> <b>Currently: </b> {this.state.form.job}</li>
						<li> <b> Email: </b> {this.state.form.email}</li>
					</ul>
				</div>
				
				<div id = "buttonRight" className="inner">
				<LinkContainer to='/applicantForm'><Button variant="primary">Edit profile</Button></LinkContainer>
				</div> 
			

				</Card.Header>
				<Card.Body>
					<div className="row">
						<div id = "wider" className="col-sm">
							<h3> About me: </h3>
							{this.state.form.about}
						</div>
						<div id = "wider" className="col-sm">
							<h3> Awards: </h3>
							{this.state.form.awards}
						</div>
						<div className="col-sm">
							<h2>Who we're hiring for: </h2>
							<ul>
								<li>{this.state.form.job}</li>
							</ul>
						</div>
						<div className="col-sm">
							<h2>Skills we're looking for: </h2>
							{this.state.form.skills}
							<h2>Experience we're looking for: </h2>
							{this.state.form.experience}
						</div>
					</div>
		
				</Card.Body>
			</Card>
		</div>
		)
		
	
		// const profiles = [
		// 	{
		// 		profilePicUrl: '',
		// 		name: 'Billy Bob',
		// 		career: 'Computer Science',
		// 		education: 'CSULB BS in Computer Science(2016-2020): 4.0 GPA' +
		// 					'\nCSULB Masters in Computer Science (2020-2024): 4.0 GPA',
		// 		work: 'Boston Dynamics: Assisted in building the software for the T100' +
		// 				'\nDARPA: Literally invented the internet',
		// 		misc: 'General AI Project: Built Skynet using assembly' +
		// 				'\nSkills: C++, Java, Python, OOP, ML'
		// 	}]

		// return (
		// 	<div>
		// 		<Carousel bsPrefix="carousel" indicators={false} keyboard={true} interval={null} touch={true}>
		// 			{carouselItems}
		// 		</Carousel>
		// 	</div>
		// )
	}
}
export default viewApplicantProfile