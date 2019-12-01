import React, { Component } from 'react'
import { Carousel, Card } from 'react-bootstrap'
import Profile from './Profile.js'
import './profileCarousel.scss'
import CarouselCaption from 'react-bootstrap/CarouselCaption'

class ProfileCarousel extends Component {
	render() {
		const profiles = [{
			form: {
				about: "f",
				age: "12",
				awards: "adfs",
				email: "test1@test.com",
				exp: "asdfafsd",
				fname: "SUPER DUPER REAL NAME",
				hobbies: "",
				job: "asdf",
				lname: "def",
				prefs: "fdas",
				prevjob: "adsfadsf",
				projects: "asd",
				skills: "asdf",
			},
			tags: [{ id: "computer science", text: "computer science" },
			{ id: "computer engineer", text: "computer engineer" }
			]
		}]
		const carouselItems = profiles.map((p, i) => {
			console.log('carousel', p)
			return (
				<Carousel.Item key={p.form.fname + i}>
					<Profile profile={p} />
					<CarouselCaption />
				</Carousel.Item>)
		})
		return (
			<Card bg="light" border="primmary">
				<Card.Body>
					<Carousel bsPrefix="carousel" indicators={false} keyboard={true} interval={null} touch={true}>
						{carouselItems}
					</Carousel>
				</Card.Body>
			</Card>
		)
	}
}
export default ProfileCarousel