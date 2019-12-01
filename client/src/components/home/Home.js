import React, { Component } from 'react'
import './homeStyle.scss'
import ProfileCarousel from '../yeetlist/ProfileCarousel.js'
import Axios from 'axios'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { mapAuthStateToProps } from '../../resources/utils'
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
        console.log('home',this.props.auth)
        return (
            <div id="homePage">
                <this.RedirectToForm/>
                <h1 id = "header">Recommended YEETs</h1>
                <ProfileCarousel />
            </div>
        )
    }
}
export default connect(mapAuthStateToProps)(Home)