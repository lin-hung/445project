import React, { Component } from 'react'
import './homeStyle.scss'
import ProfileCarousel from './ProfileCarousel.js'
import Axios from 'axios'
import { Redirect } from 'react-router-dom';
import { isThisHour } from 'date-fns';

class Home extends Component {
    state = {
        profile: ''
    }

    componentDidMount(){
        Axios.get('/api/profile/get').then(result => {
            this.setState({profile: result.data})
        })
    }
    RedirectToForm = () => {
        if(!this.state.profile.contents){
            if(this.state.profile.profileType === 'candidate'){
                return(<Redirect to = '/applicantForm' />)
            }
            if(this.state.profile.profileType === 'recruiter'){
                return(<Redirect to = '/companyForm' />)
            }
        }
        return(null) //don't send them to form
    }

    render() {
        return (
            <div id="homePage">
                <this.RedirectToForm/>
                <h1 id = "header">Recommended YEETs</h1>
                <ProfileCarousel>

                </ProfileCarousel>
            </div>
        )
    }
}
export default Home