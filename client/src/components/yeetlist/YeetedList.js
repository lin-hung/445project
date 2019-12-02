import Axios from 'axios'
import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import { connect } from 'react-redux'
import { mapAuthStateToProps } from '../../resources/utils'
import ProfileCarousel from './ProfileCarousel'

class YeetedList extends Component {
    state = {
        yeetList: null
    }
    componentDidMount() {
        Axios.get(`/api/profile/getPopulatedYeetList/${this.props.auth.profile._id}`).then((res) => {
            console.log(res.data)
            // ({ _id: p._id, form: p.contents, tags: p.tags }))
            var yeeted = res.data.yeeted
            yeeted = res.data.yeeted.map(y => ({
                _id: y._id, form: y.contents, tags: y.tags
            }))
            this.setState({ yeetList: yeeted })
        })
    }
    _ProfileCarousel = () => {
        if (!this.state.yeetList) {
            return null
        }
        if (this.state.yeetList.length === 0) {
            return (
                <h4>You have not YEETed anybody!</h4>
            )
        }
        return <ProfileCarousel profiles={this.state.yeetList} disableYeetButton={true} />
    }
    render() {
        return (
            <Card bg="light" border="primmary">
                <Card.Body>
                    <h1>YEETed Profiles</h1> 
                    
                    <this._ProfileCarousel />
                </Card.Body>
            </Card>
        )
    }
}
export default connect(mapAuthStateToProps)(YeetedList)