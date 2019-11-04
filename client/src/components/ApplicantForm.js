import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Button, Col, Container, Jumbotron } from 'react-bootstrap'
import './auth/style.css'
import ImageUploader from 'react-images-upload'
import Avatar from 'react-avatar-edit'


class ApplicantForm extends React.Component{
    constructor(props) {
        super(props)
        const src = './example/einshtein.jpg'
        this.state = {
          //preview: null,
          //src
        }
        this.onCrop = this.onCrop.bind(this)
        this.onClose = this.onClose.bind(this)
      }
      
      onClose() {
        this.setState({preview: null})
      }
      
      onCrop(preview) {
        this.setState({preview})
      }
    render(){
        return(
            <div className= "whitebackground" >
                 <Jumbotron fluid id="landingJumbotron">
    
                    <div id = "boxesLeft" className = "form-row">
                        <form className = "col">
                            <div>
                                <label for="exampleFormControlInput1">Email address</label>
                                <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/> 
                            </div>
                            <div className="form-group">
                                <label for="exampleFormControlSelect1">What type of position are you looking for?</label>
                                <select className="form-control" id="exampleFormControlSelect1">
                                    <option>Internship</option>
                                    <option>Part time Job</option>
                                    <option>Full time Job</option>
                                    <option>Recent Grad Job</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label for="exampleFormControlSelect2">Example multiple select</label>
                                <select multiple className="form-control" id="exampleFormControlSelect2">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label for="exampleFormControlTextarea1">Example textarea</label>
                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                            </div>
                        </form>
                        <div id="boxesRight" className = "col"> 
                            <Avatar
                            width={390}
                            height={295}
                            onCrop={this.onCrop}
                            onClose={this.onClose}
                            src={this.state.src}
                            />
                            
                            {/* <img src={this.state.preview} alt="Preview" /> */}
                        </div>
                    </div>
         
                </Jumbotron>
        </div> //close the background div
        
        
        )
    }
}
export default ApplicantForm;