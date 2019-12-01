import Axios from 'axios'
import React, { Component } from 'react'
import { Button, Card, Carousel } from 'react-bootstrap'
import CarouselCaption from 'react-bootstrap/CarouselCaption'
import Profile from './Profile.js'
import './profileCarousel.scss'

class ProfileCarousel extends Component {
	state = {
		profiles: []
	}
	componentDidMount() {
		Axios.get('/api/profile/getAllCandidates')
			.then((res) => {
				this.setState({
					profiles: res.data.map((p) =>
						({ form: p.contents, tags: p.tags }))
				})
			})
	}
	_handleYeet = (e) => {
		console.log(e.target.value)
	}
	render() {
		const { profiles } = this.state
		const carouselItems = profiles.map((p, i) => {
			console.log('carousel', p)
			return (
				<Carousel.Item key={p.form.fname + i}>
					<Profile profile={p} />
					<CarouselCaption />
					<Card.Text className="text-center">
						<Button variant="primary" onClick={this._handleYeet} value={i}>YEET User</Button>
					</Card.Text>
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