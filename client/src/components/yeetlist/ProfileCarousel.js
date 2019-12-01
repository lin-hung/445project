import Axios from 'axios'
import React, { Component } from 'react'
import { Button, Card, Carousel } from 'react-bootstrap'
import CarouselCaption from 'react-bootstrap/CarouselCaption'
import Profile from './Profile.js'
import './profileCarousel.scss'

class ProfileCarousel extends Component {
	render() {
		const { profiles, _handleYeetCB, disableYeetButton } = this.props
		if (!profiles) return null
		const carouselItems = profiles.map((p, i) => {
			return (
				<Carousel.Item key={p.form.fname + i}>
					<Profile profile={p} />
					<CarouselCaption />

					{(!disableYeetButton) ? <Card.Text className="text-center">
						<Button variant="primary" onClick={_handleYeetCB} value={i}>YEET User</Button>
					</Card.Text> : null}
				</Carousel.Item>)
		})
		return (

			<Carousel bsPrefix="carousel" indicators={false} keyboard={true} interval={null} touch={true}>
				{carouselItems}
			</Carousel>

		)
	}
}
export default ProfileCarousel