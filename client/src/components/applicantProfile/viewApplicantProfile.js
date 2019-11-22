import React, { Component } from 'react'
import { Carousel } from 'react-bootstrap'
import Profile from './Profile.js'
import './homeStyle.scss'
import CarouselCaption from 'react-bootstrap/CarouselCaption'

//This class is basically their profile card, this is what recruiters will see  
class viewApplicantProfile extends Component {
	componentDidMount(){
		state={
			form:null
			tags: []
		}
        Axios.get('/api/profile/get').then((res)=>{
            if (res.data.contents === undefined) {
                console.log("Error: no user data retrieved")
            } else {
                console.log("Retrieved the following data: ", res.data.contents)
                this.setState({form:res.data.contents})
                console.log("tag info: ", [res.data.tags])
                this.setState([res.data.tags])
            }
        })
    }
	render() {
		const {form}=this.state.form

		<Card>
		<Card.Header>My profile</Card.Header>
		<Card.Body>
			<Card.Title></Card.Title>
			<Card.Text>
				<Profile 
						name = {form.fname}
						career = {form.lname}
						education = {p.education}
						work = {p.work}
						misc = {p.misc}>
					</Profile>
			With supporting text below as a natural lead-in to additional content.
			</Card.Text>
			<Button variant="primary">Go somewhere</Button>
		</Card.Body>
		</Card>
		const profiles = [
			{
				profilePicUrl: '',
				name: 'Billy Bob',
				career: 'Computer Science',
				education: 'CSULB BS in Computer Science(2016-2020): 4.0 GPA' +
							'\nCSULB Masters in Computer Science (2020-2024): 4.0 GPA',
				work: 'Boston Dynamics: Assisted in building the software for the T100' +
						'\nDARPA: Literally invented the internet',
				misc: 'General AI Project: Built Skynet using assembly' +
						'\nSkills: C++, Java, Python, OOP, ML'
			}]

		return (
			<div>
				<Carousel bsPrefix="carousel" indicators={false} keyboard={true} interval={null} touch={true}>
					{carouselItems}
				</Carousel>
			</div>
		)
	}
}
export default ProfileCarousel