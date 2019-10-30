import React, { Component } from 'react'
import { Button, Carousel, Card} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import './homeStyle.css'
import Profile from './Profile.js'

class ProfileCarousel extends Component {
    render() {
        return (
            <div>
                <Carousel>
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