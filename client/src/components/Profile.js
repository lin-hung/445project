import React, { Component } from 'react'
import './profileStyle.css'

class Profile extends Component {
    state = {
        fname: '', //first name
        lname: '', //last name
        email: '',
        job: '', //current occupation
        age: '',
        about: '',
        exp: '', //experience
        skills: '',
        prevjob: '', //previous jobs
        hobbies: '',
        prefs: '', //preferences
        awards: '',
        projects: '',
        tags: ''
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
            <div id="parent" className="FormCenter orange-bg">
                <form onSubmit={this.handleSubmit} className="FormFields">
                    {/* begin section 1 */}
                    <div id="sec1" className="form-row">
                        {/* begin col 1 of sec 1 */}
                        <div id="s1c1" className="col">
                            <div className="FormField">
                                <label className="FormField__Label" htmlFor="fname">First Name</label>
                                <input type="fname" id="fname" className="FormField__Input form-control"
                                    placeholder="Enter your first name" name="fname" value={this.state.fname}
                                    onChange={this.handleChange} />
                            </div>

                            <div className="FormField">
                                <label className="FormField__Label" htmlFor="lname">Last Name</label>
                                <input type="lname" id="lname" className="FormField__Input form-control"
                                    placeholder="Enter your last name" name="lname" value={this.state.lname}
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
                                    placeholder="Enter your job" name="job" value={this.state.job}
                                    onChange={this.handleChange} />
                            </div>

                            <div className="FormField">
                                <label className="FormField__Label" htmlFor="age">Age</label>
                                <input type="age" id="age" className="FormField__Input form-control"
                                    placeholder="Enter your age" name="age" value={this.state.age}
                                    onChange={this.handleChange} />
                            </div>
                        </div>
                        {/* end col 1 of sec 1 */}
                        {/* col 2 sec 1 (profile picture) */}
                        <div id="s1c2" className="col">
                            <div className="form-group align-middle">
                                <label htmlFor="exampleFormControlFile1">Example file input</label>
                                <input type="file" className="form-control-file" id="exampleFormControlFile1" />
                            </div>
                        </div>
                        {/* end col 2 of sec 1 */}
                    </div>
                    {/* end section 1 */}
                    {/* begin section 2 */}
                    <div id="sec2" className="form-row" >
                        {/* begin col 1 of sec 2 */}
                        <div id="s2c1" className="col">
                            <div className="FormField">
                                <label className="FormField__Label" htmlFor="about">About me</label>
                                <textarea type="about" id="about" className="FormField__Input form-control"
                                    placeholder="Enter info about yourself" name="about" value={this.state.about}
                                    onChange={this.handleChange} />
                            </div>

                            <div className="FormField">
                                <label className="FormField__Label" htmlFor="exp">Experience</label>
                                <textarea type="exp" id="exp" className="FormField__Input form-control"
                                    placeholder="Enter your experience" name="exp" value={this.state.exp}
                                    onChange={this.handleChange} />
                            </div>

                            <div className="FormField">
                                <label className="FormField__Label" htmlFor="skills">Skills</label>
                                <textarea type="skills" id="skills" className="FormField__Input form-control"
                                    placeholder="List your skills" name="skills" value={this.state.skills}
                                    onChange={this.handleChange} />
                            </div>

                            <div className="FormField">
                                <label className="FormField__Label" htmlFor="prevjob">Previous occupations</label>
                                <textarea type="prevjob" id="prevjob" className="FormField__Input form-control"
                                    placeholder="List your previous occupations" name="prevjob" value={this.state.prevjob}
                                    onChange={this.handleChange} />
                            </div>

                            <div className="FormField">
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlSelect1">What type of position are you looking for?</label>
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
                        {/* begin col 2 of sec 2 */}
                        <div id="s2c2" className="col">
                            <div className="FormField">
                                <label className="FormField__Label" htmlFor="hobbies">Hobbies</label>
                                <textarea type="hobbies" id="hobbies" className="FormField__Input form-control"
                                    placeholder="Enter your hobbies" name="hobbies" value={this.state.hobbies}
                                    onChange={this.handleChange} />
                            </div>

                            <div className="FormField">
                                <label className="FormField__Label" htmlFor="prefs">Preferences</label>
                                <textarea type="prefs" id="prefs" className="FormField__Input form-control"
                                    placeholder="Enter your preferences" name="prefs" value={this.state.prefs}
                                    onChange={this.handleChange} />
                            </div>

                            <div className="FormField">
                                <label className="FormField__Label" htmlFor="awards">Awards</label>
                                <textarea type="awards" id="awards" className="FormField__Input form-control"
                                    placeholder="Enter your awards" name="awards" value={this.state.awards}
                                    onChange={this.handleChange} />
                            </div>

                            <div className="FormField">
                                <label className="FormField__Label" htmlFor="projects">Projects</label>
                                <textarea type="projects" id="projects" className="FormField__Input form-control"
                                    placeholder="Enter your projects" name="projects" value={this.state.projects}
                                    onChange={this.handleChange} />
                            </div>

                            <div className="form-group align-middle">
                                <label htmlFor="exampleFormControlFile1">Upload your resumé</label>
                                <input type="file" className="form-control-file" id="exampleFormControlFile2" />
                            </div>
                        </div>
                        {/* end col 2 of sec 2 */}
                    </div>
                    {/* end section 2 */}
                    {/* begin section 3 */}
                    <div id="sec3" className="row">
                        <div className="FormCenter col-12">
                            <label className="FormField__Label" htmlFor="tags">#Tags</label>
                            <textarea type="tags" id="tags" className="FormField__Input form-control"
                                placeholder="Tag yourself" name="tags" value={this.state.tags}
                                onChange={this.handleChange} />
                        </div>
                    </div>
                    {/* end section 3 */}
                    <div id="sec4" className="row">
                        <div className="FormCenter col-12">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default Profile;