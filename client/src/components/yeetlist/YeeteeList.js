import Axios from 'axios'
import React, { Component } from 'react'
import { Card, Carousel, Button } from 'react-bootstrap'
import CompanyProfile from './CompanyProfile'

class YeeteeList extends Component {
    state = {
        yeeteeList: null
    }
    componentDidMount() {
        Axios.get(`/api/profile/getYeetees`).then((res) => {
            this.setState({ yeeteeList: res.data })
        })
    }
    _handleMessageCB = (e) => {
        const target=this.state.yeeteeList[e.target.value]
        this.props.history.push(`/messages/${target._id}`)
    }
    _ProfileCarousel = () => {
        if (this.state.yeeteeList) {
            if (this.state.yeeteeList.length === 0) return <h4>You have not been YEETed yet! Add more tags to help recruiters find your profile!</h4>
            const carouselItems = this.state.yeeteeList.map((p, i) =>
                (
                    <Carousel.Item key={i}>
                        <CompanyProfile profile={p} />
                        <Card.Text className="text-center">
                            <Button variant="primary" onClick={this._handleMessageCB} value={i}>Message User</Button>
                        </Card.Text>
                    </Carousel.Item>)
            )
            return (
                <Carousel bsPrefix="carousel" indicators={false} keyboard={true} interval={null} touch={true}>
                    {carouselItems}
                </Carousel>)
        }
        return null
    }
    render() {
        return (
            <Card bg="light" border="primmary">
                <Card.Header>  <h1>Your YEETees</h1>
                    <div>These are some companies that have selected you. Keep an eye out for messages and or emails from these companies.</div></Card.Header>
                <Card.Body>
                    <this._ProfileCarousel />
                </Card.Body>
            </Card>
        )
    }
}
export default YeeteeList