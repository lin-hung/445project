import React, { Component } from 'react'
import { Button, Card, Carousel } from 'react-bootstrap'
import CarouselCaption from 'react-bootstrap/CarouselCaption'
import Profile from './Profile.js'
import './profileCarousel.scss'

class ProfileCarousel extends Component {
	render() {
		const { profiles, _handleYeetCB, disableYeetButton, messageButton, _handleMessageCB } = this.props
		if (!profiles) return null
		let carouselItems = []
		profiles.forEach((p, i) => {
			if (!p.form) return
			carouselItems.push(<Carousel.Item key={p.form.fname + i}>
				<Profile profile={p} />
				<CarouselCaption />
				{(disableYeetButton) ? null : <Card.Text className="text-center">
					<Button variant="primary" onClick={_handleYeetCB} value={i}>YEET User</Button>
				</Card.Text>}
				{(messageButton) ? <Card.Text className="text-center">
					<Button variant="primary" onClick={_handleMessageCB} value={i}>Message User</Button>
				</Card.Text> : null}
			</Carousel.Item>)
		})
		console.log(carouselItems)
		return (

			<Carousel bsPrefix="carousel" indicators={false} keyboard={true} interval={null} touch={true}>
				{carouselItems}
			</Carousel>

		)
	}
}
export default ProfileCarousel