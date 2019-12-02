import React, { Component } from 'react'
import './homeStyle.scss'
import YeetList from '../yeetlist/YeetList'
import Axios from 'axios'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { mapAuthStateToProps } from '../../resources/utils'
import YeeteeList from '../yeetlist/YeeteeList';
class Home extends Component {
    RedirectToFormIfNeeded = () => {
        const prof = this.props.auth.profile

        if (!prof.contents) {
            if (prof.profileType === 'candidate') {
                return (<Redirect to='/applicantForm' />)
            }
            if (prof.profileType === 'recruiter') {
                return (<Redirect to='/companyForm' />)
            }
        }
        return (null) //don't send them to form
    }
    Contents = () => {
        const prof = this.props.auth.profile

        if (prof.profileType === 'recruiter') {
            return <YeetList profileId={prof._id} />
        }
        else if (prof.profileType === 'candidate') {
            return <YeeteeList />
        }
        return null
    }

    render() {
        const prof = this.props.auth.profile

        if (!prof || prof == {}) {
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