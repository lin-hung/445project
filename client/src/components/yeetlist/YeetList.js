import Axios from 'axios'
import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import ProfileCarousel from './ProfileCarousel'

class YeetList extends Component {
    state = {
        profiles: [],
        availableProfiles: [],
        yeetList: {}
    }
    _handleYeetCB = (e) => {
        e.preventDefault()
        const target = this.state.availableProfiles[e.target.value]
        Axios.post(`/api/profile/yeet/${this.props.profileId}/${target._id}`)
        this.setState({
            availableProfiles: this.state.availableProfiles.filter((p) => {
                return (p._id !== target._id)
            })
        })
    }
    componentDidMount() {
        Axios.get(`/api/profile/getYeetList/${this.props.profileId}`).then((res) => {
            this.setState({ yeetList: res.data })
            return Axios.get('/api/profile/getAllCandidates')
        }).then((res) => {
            const p = res.data.map((p) =>
                ({ _id: p._id, form: p.contents, tags: p.tags }))
            let filtered = p
            for (var y in this.state.yeetList.yeeted) {
                filtered = filtered.filter((p) => {
                    return (p._id !== this.state.yeetList.yeeted[y])
                })
            }
            this.setState({
                profiles: p,
                availableProfiles: filtered
            })
        })

    }
    _ProfileCarousel = () => {
        if (this.state.availableProfiles.length === 0) {
            return (
                <h4>There are no more profiles to yeet!</h4>
            )
        }
        return <ProfileCarousel profiles={this.state.availableProfiles} _handleYeetCB={this._handleYeetCB} />
    }
    render() {
        return (
            <Card bg="light" border="primmary">
                <Card.Body>
                    <h1>Recommended YEETs</h1>
                    <this._ProfileCarousel />
                </Card.Body>
            </Card>
        )
    }
}
export default YeetList