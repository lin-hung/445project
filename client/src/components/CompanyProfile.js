import React, { Component } from 'react'
import './coprofileStyle.css'

class CompanyProfile extends Component {
    state = {
        cname: '',  //company name
        email: '',  //company email
        about: '',  //about the company
        job: '',    //desired occupation
        exp: '',    //desired experience
        skills: '', //desired skills
        tags: ''    //help potentials find them
    }

    handleChange = (e) => {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        console.log('The form was submitted with the following data:');
        console.log(this.state);
    }

    render() {
        return (
            <div id="main" className="FormCenter bg-white container">
                <div id="landingHeader">Edit Your Profile</div>
                <form onSubmit={this.handleSubmit} className="FormFields">
                    {/* begin section 1 */}
                    <div id="sec1" className="form-row container">
                        {/* begin col 1 of sec 1 */}
                        <div id="left" className="col">
                            <div className="FormField">
                                <label className="FormField__Label" htmlFor="fname">Your Company Name</label>
                                <input type="cname" id="cname" className="FormField__Input form-control"
                                    placeholder="Enter the name of your company" name="cname" value={this.state.cname}
                                    onChange={this.handleChange} />
                            </div>

                            <div className="FormField">
                                <label className="FormField__Label" htmlFor="email">E-Mail Address</label>
                                <input type="email" id="email" className="FormField__Input form-control"
                                    placeholder="Enter your email" name="email" value={this.state.email}
                                    onChange={this.handleChange} />
                            </div>

                            <div className="FormField">
                                <label className="FormField__Label" htmlFor="job">Occupation</label>
                                <input type="job" id="job" className="FormField__Input form-control"
                                    placeholder="Enter your job listing" name="job" value={this.state.job}
                                    onChange={this.handleChange} />
                            </div>
                        </div>
                        {/* end col 1 of sec 1 */}
                        {/* col 2 sec 1 (profile picture) */}
                        <div id="right" className="col align-self-center">
                            <div className="form-group" align="center">
                                <label htmlFor="exampleFormControlFile1">Upload your company logo</label>
                                <input type="file" className="form-control-file" id="exampleFormControlFile1" />
                            </div>
                        </div>
                        {/* end col 2 of sec 1 */}
                    </div>
                    {/* end section 1 */}
                    {/* begin section 2 */}
                    <div id="sec2" className="form-row container" >
                        {/* begin col 1 of sec 2 */}
                        <div id="s2c1" className="col">
                            <div className="FormField">
                                <label className="FormField__Label" htmlFor="about">About us</label>
                                <textarea type="about" id="about" className="FormField__Input form-control"
                                    placeholder="Enter info about your company" name="about" value={this.state.about}
                                    onChange={this.handleChange} />
                            </div>

                            <div className="FormField">
                                <label className="FormField__Label" htmlFor="exp">Experience</label>
                                <textarea type="exp" id="exp" className="FormField__Input form-control"
                                    placeholder="Enter your desired experience" name="exp" value={this.state.exp}
                                    onChange={this.handleChange} />
                            </div>

                            <div className="FormField">
                                <label className="FormField__Label" htmlFor="skills">Skills</label>
                                <textarea type="skills" id="skills" className="FormField__Input form-control"
                                    placeholder="List your desired skills" name="skills" value={this.state.skills}
                                    onChange={this.handleChange} />
                            </div>

                            <div className="FormField">
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlSelect1">What type of position do you want filled?</label>
                                    <select className="form-control" id="exampleFormControlSelect1">
                                        <option>Internship</option>
                                        <option>Part time Job</option>
                                        <option>Full time Job</option>
                                        <option>Recent Grad Job</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        {/* end col 1 of sec 2 */}
                    </div>
                    {/* end section 2 */}
                    {/* begin section 3 */}
                    <div id="sec3" className="form-row container">
                        <div className="FormCenter col-12">
                            <label className="FormField__Label" htmlFor="tags">#Tags</label>
                            <textarea type="tags" id="tags" className="FormField__Input form-control"
                                placeholder="Tag yourself" name="tags" value={this.state.tags}
                                onChange={this.handleChange} />
                        </div>
                    </div>
                    {/* end section 3 */}
                    {/* button area */}
                    <div className="button">
                        <div className="FormCenter">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default CompanyProfile;