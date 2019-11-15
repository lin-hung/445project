import React, { Component } from 'react'
import { TAGS } from './tags';
import { render } from 'react-dom';
import './tagStyle.scss'
import './profileStyle.scss'
import Axios from 'axios'
import { WithContext as ReactTags } from 'react-tag-input';



const suggestions = TAGS.map((type) => {
    return {
        id: type,
        text: type
    }
})

const KeyCodes = {
    comma: 188,
    enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

class Profile extends Component {
    state = {
        form: {
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
        },
        tags: [{ id: 'computer science', text: 'computer science' }, { id: 'computer engineer', text: 'computer engineer' }],
        suggestions: suggestions,
    }

    handleDelete = (i) => {
        const { tags } = this.state;
        this.setState({
            tags: tags.filter((tag, index) => index !== i),
        });
    }
    handleAddition = (tag) => {
        this.setState(state => ({ tags: [...state.tags, tag] }));
    }
    handleDrag = (tag, currPos, newPos) => {
        const tags = [...this.state.tags];
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        this.setState({ tags: newTags });
    }
    handleTagClick = (index) => {
        console.log('The tag at index ' + index + ' was clicked');
    }
    handleChange = (e) => {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        this.setState({
<<<<<<< HEAD
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
=======
            form: { ...this.state.form, [name]: value }
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        Axios.post('/api/profile/submit', {
            form: this.state.form, 
            tags: this.state.tags.map(t => {
                return t.id
            })
        }).then((res) => {
            console.log(res)
        })
    }


    render() {
        const { tags, suggestions } = this.state;
        return (
            <div id="main" className="FormCenter">
                {/* <div id="landingHeader">Edit Your Profile</div> */}
                <form onSubmit={this.handleSubmit} className="FormFields">
                    {/* begin section 1 */}
                    <div id="formlayout" className="form">
                        <h1> Create your Applicant profile</h1>
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
                                        placeholder="Enter your current job" name="job" value={this.state.job}
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
                                        <label className="FormField__Label" htmlFor="exampleFormControlSelect1">What type of position are you looking for?</label>
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
                                    <label className="FormField__Label" htmlFor="exampleFormControlFile1">Upload your resumé</label>
                                    <input type="file" className="form-control-file" id="exampleFormControlFile2" />
                                </div>
                            </div>
                            {/* end col 2 of sec 2 */}
                        </div>
                        {/* end section 2 */}
                        {/* begin section 3 #TAGS */}
                        <div id="sec3" className="row">
                            <div className="FormCenter col-12">
                                <label className="FormField__Label" htmlFor="exampleFormControlFile1">Please enter some tags to describe yourself and how you want to be matched.
                                These tags will designate how employers find you. Please enter at least 5!</label>
                                <ReactTags
                                    tags={tags}
                                    suggestions={suggestions}
                                    delimiters={delimiters}
                                    handleDelete={this.handleDelete}
                                    handleAddition={this.handleAddition}
                                    handleDrag={this.handleDrag}
                                    handleTagClick={this.handleTagClick}
                                />

                                {/*  <label className="FormField__Label" htmlFor="tags">#Tags</label>
                                <textarea type="tags" id="tags" className="FormField__Input form-control"
                                    placeholder="Tag yourself" name="tags" value={this.state.tags}
                                    onChange={this.handleChange} /> */}
                            </div>
                        </div>
                        {/* end section 3 */}
                        <div id="buttonSpace" className="button">
                            <div id="sec4" className="row">
                                <div className="FormCenter col-12">
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </form>

>>>>>>> origin/master
            </div>
        );
    }
}
<<<<<<< HEAD

=======
render(<Profile />, document.getElementById('root'));
>>>>>>> origin/master
export default Profile;