import React, { Component } from 'react'
import './homeStyle.scss'
import YeetList from '../yeetlist/YeetList'
import Axios from 'axios'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { mapAuthStateToProps } from '../../resources/utils'
import YeeteeList from '../yeetlist/YeeteeList';
class Home extends Component {
    state = {
        profile: ''
    }

    componentDidMount() {
        Axios.get('/api/profile/get').then(result => {
            this.setState({ profile: result.data })
        })
    }
    RedirectToFormIfNeeded = () => {
        if (!this.state.profile.contents) {
            if (this.state.profile.profileType === 'candidate') {
                return (<Redirect to='/applicantForm' />)
            }
            if (this.state.profile.profileType === 'recruiter') {
                return (<Redirect to='/companyForm' />)
            }
        }
        return (null) //don't send them to form
    }
    Contents = () => {
        if (this.state.profile.profileType === 'recruiter') {
            return <YeetList profileId={this.state.profile._id} />
        }
        else if(this.state.profile.profileType==='candidate'){
            return <YeeteeList />
        }
        return null
    }

    render() {
        if (this.state.profile === '') {
            return null
        }
        return (
            <div id="homePage">
                <this.RedirectToFormIfNeeded />
                <this.Contents />
            </div>
        )
    }
}
export default connect(mapAuthStateToProps)(Home)