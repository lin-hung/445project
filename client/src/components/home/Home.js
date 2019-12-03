import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { mapAuthStateToProps } from '../../resources/utils';
import YeeteeList from '../yeetlist/YeeteeList';
import YeetList from '../yeetlist/YeetList';
import './homeStyle.scss';
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
            return <YeeteeList history={this.props.history} />
        }
        return null
    }

    render() {
        const prof = this.props.auth.profile

        if (!prof || prof === {}) {
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