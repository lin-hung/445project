import React, { Component } from 'react'
import Axios from 'axios'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { LinkContainer } from 'react-router-bootstrap'
import { Redirect } from 'react-router-dom'
import './viewStyleCompany.scss'


//This class is basically their profile card, this is what applicants will see  
class viewCompanyProfile extends Component {
    state={
        form:null,
        tags: []
    }
	componentDidMount(){

		Axios.get('/api/profile/get').then((res) => {
            if (res.data.contents === undefined || res.data.tags === undefined) {
                console.log("Error: no user data retrieved")
            } else {
                console.log("Retrieved the following data: ", res.data.contents)
                console.log("Tags: ", res.data.tags)
                this.setState({ form: res.data.contents })
                
                this.setState({
                    tags: res.data.tags.map((t) => {
                        return { id: t, text: t }
                    })
                })
                
            }
        })
    }
	render() {
		const {form} = this.state.form
        const {tags} = this.state.tags
        while(this.state.form === null){
            return(
            <div className="col-sm-12 my-auto">
                    <div className="jumbotron text-center">
                        <h1 className="display-4">Loading...</h1>
                        <p className="lead">{this.state.error}</p>
                    </div>
            </div>
            )
        }
        return(
            <div>
                <Card bg="light" border="primmary">
                    <Card.Header> <h3> {form.cname}'s profile </h3> <div className = "buttonRight"> <LinkContainer to='/companyForm'><Button variant="primary">Edit profile</Button></LinkContainer> </div></Card.Header>
                    <Card.Body>
                        <div className="row">
                            <div id="left" className="column">

                                <Card.Text className="column">
                                    Our email: {form.email}
                                    
                                </Card.Text>
                                <div>
                                    About us: {form.about}
                                </div>


                            </div>
                            <div id="right" className="column">
                                <h1 align="center">About us:</h1>
                                <div className="row">
                                    <div className="col-sm">
                                        <h2>Who we're hiring for: </h2>
                                        <ul>
                                            <li>{form.job}</li>
                                        </ul>
                                    </div>
                                    <div className="col-sm">
                                        <h2>Skills we're looking for: </h2>
                                        {form.skills}
                                        <h2>Experience we're looking for: </h2>
                                        {form.experience}
                                    </div>
                                </div>

                            </div>
                        </div>
                        {/* <Card.Text className="text-center">
                                <LinkContainer to='/messages'><Button variant="primary">YEET User</Button></LinkContainer>
                        </Card.Text> */}
                    </Card.Body>

                </Card>
            </div>
        )
		// const profiles = [
		// 	{
		// 		profilePicUrl: '',
		// 		name: 'Billy Bob',
		// 		career: 'Computer Science',
		// 		education: 'CSULB BS in Computer Science(2016-2020): 4.0 GPA' +
		// 					'\nCSULB Masters in Computer Science (2020-2024): 4.0 GPA',
		// 		work: 'Boston Dynamics: Assisted in building the software for the T100' +
		// 				'\nDARPA: Literally invented the internet',
		// 		misc: 'General AI Project: Built Skynet using assembly' +
		// 				'\nSkills: C++, Java, Python, OOP, ML'
		// 	}]

		// return (
		// 	<div>
		// 		<Carousel bsPrefix="carousel" indicators={false} keyboard={true} interval={null} touch={true}>
		// 			{carouselItems}
		// 		</Carousel>
		// 	</div>
		// )
	}
}
export default viewCompanyProfile