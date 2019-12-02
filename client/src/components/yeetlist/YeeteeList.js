import Axios from 'axios'
import React, { Component } from 'react'
import { Button, Card, Carousel } from 'react-bootstrap'
import CompanyProfile from './CompanyProfile'

class YeeteeList extends Component {
    state = {
        yeeteeList: null
    }
    componentDidMount() {
        Axios.get(`/api/profile//getYeetees`).then((res) => {
            this.setState({ yeeteeList: res.data })
        })
    }
    _ProfileCarousel = () => {
        if (this.state.yeeteeList) {
            if (this.state.yeeteeList.length === 0) return <h4>You have not been YEETed yet!</h4>
            const carouselItems = this.state.yeeteeList.map((p, i) =>
                (
                    <Carousel.Item key={i}>
                        <CompanyProfile profile={p} />
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
                <Card.Body>
                    <h1>Your YEETees</h1>
                    <this._ProfileCarousel />
                </Card.Body>
            </Card>
        )
    }
}
export default YeeteeList