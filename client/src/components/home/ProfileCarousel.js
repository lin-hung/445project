import React, { Component } from 'react'
import { Button, Carousel, Card} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Profile from './Profile.js'
import './homeStyle.css'
import './profileCarousel.css'

class ProfileCarousel extends Component {
    render() {
        return (
            <div>
                <Carousel bsPrefix = "carousel" indicators = {false} keyboard = {true} interval = {null} touch = {true}>
				<Carousel.Item>
                    <Profile>

                    </Profile>
                    
					<Carousel.Caption>
						
					</Carousel.Caption>
				</Carousel.Item>
				<Carousel.Item>
					<Profile>
                        
                    </Profile>

					<Carousel.Caption>

					</Carousel.Caption>
				</Carousel.Item>
				<Carousel.Item>
                        <Profile>
                        
                        </Profile>

					<Carousel.Caption>

					</Carousel.Caption>
				</Carousel.Item>
			</Carousel>
            </div>
        )
    }
}
export default ProfileCarousel