import React, { Component } from 'react'
import './homeStyle.css'
import ProfileCarousel from './ProfileCarousel.js'

class Home extends Component {
    render() {
        return (
            <div id="homePage">
                <h1 id = "header">Recommended YEETs</h1>
                <ProfileCarousel>

                </ProfileCarousel>
            </div>
        )
    }
}
export default Home