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

            // if(result.data.contents == null){
            //     if(result.data.profileType == 'candidate'){
                    
            //         //redirect to applicant form
            //         return(<Redirect to='/applicantForm' />)
            //     }
            //     if(result.data.profileType == 'recruiter'){
            //         //redirect to recruiter form
            //         return(<Redirect to='/companyForm' />)
            //     }
            // }
        })
    }
    RedirectToForm = () => {
        if(!this.state.profile.contents){
            console.log('###################')
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