import React, { Component } from 'react'
import { Carousel } from 'react-bootstrap'
import Profile from './Profile.js'
import './homeStyle.scss'
import './profileCarousel.scss'
import CarouselCaption from 'react-bootstrap/CarouselCaption'

class ProfileCarousel extends Component {
	render() {
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
			},
			{
				profilePicUrl: '',
				name: 'Sally Smith',
				career: 'Business Mangement',
				education: 'CSULB BS in Business Mangement (2016-2020): 0.0 GPA',
				work: 'Software Engineering Manager: Forced engineers to make pointless diagrams',
				misc: 'No hobbies, work is life'
			},
			{
				profilePicUrl: '',
				name: 'John Wick',
				career: 'Hitman',
				education: 'High School Diplomma',
				work: 'Self Employed',
				misc: 'Like Dog'
			}]
		const carouselItems = profiles.map((p, i) => {
			return (
				<Carousel.Item key = {p.name + i}>
					<Profile 
						profilePicUrl = {p.profilePicUrl}
						name = {p.name}
						career = {p.career}
						education = {p.education}
						work = {p.work}
						misc = {p.misc}>
					</Profile>
					<CarouselCaption />
				</Carousel.Item>)
		})
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