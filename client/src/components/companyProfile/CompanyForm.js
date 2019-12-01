import React, { Component } from 'react'
import Axios from 'axios'
import './coprofileStyle.scss'
import { TAGS } from '../applicantProfile/tags';
// import { render } from 'react-dom';
import '../tagStyle.scss'
import { WithContext as ReactTags } from 'react-tag-input';
import {connect} from 'react-redux'
import { mapAuthStateToProps } from '../../resources/utils'
import { setProfileAction } from '../../_actions/authActions'

const suggestions = TAGS.map((type) => {
    return {
        id: type,
        text: type
    }
})

const KeyCodes = {
    enter: 13,
    comma: 188,
};

const delimiters = [KeyCodes.enter, KeyCodes.comma];

class CompanyForm extends Component {
    constructor(props) {
        super(props);

        // this.state = {
        //     tags: [{ id: 'computer science', text: 'computer science' }, { id: 'computer engineer', text: 'computer engineer' }],
        //     suggestions: suggestions,
        // };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
        this.handleTagClick = this.handleTagClick.bind(this);
    }

    state = {
        form: {
            cname: '',  //company name
            email: '',  //company email
            about: '',  //about the company
            job: '',    //desired occupation
            exp: '',    //desired experience
            skills: '', //desired skills
        },
        tags: [{ id: 'computer science', text: 'computer science' }, { id: 'computer engineer', text: 'computer engineer' }],
        suggestions: suggestions,
    }

    componentDidMount() {
        Axios.get('/api/profile/get').then((res) => {
            if (res.data.contents === undefined || res.data.tags === undefined) {
                console.log("Error: no user data retrieved")
            } else {
                console.log("Retrieved the following data: ", res.data)
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

    handleDelete(i) {
        const { tags } = this.state;
        this.setState({
            tags: tags.filter((tag, index) => index !== i),
        });
    }

    handleAddition(tag) {
        this.setState(state => ({ tags: [...state.tags, tag] }));
    }

    handleDrag(tag, currPos, newPos) {
        const tags = [...this.state.tags];
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        this.setState({ tags: newTags });
    }

    handleTagClick(index) {
        console.log('The tag at index ' + index + ' was clicked');
    }

    handleChange = (e) => {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        this.setState({
            form: { ...this.state.form, [name]: value },
            tags: [...this.state.tags]
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        Axios.post('/api/profile/submit', {
            form: this.state.form,
            tags: this.state.tags.map(t => {
                return (t.id, t.text)
            })
        }).then((res) => {
            console.log("Form submitted")
            this.props.setProfileAction(res.data)
            // this.setState({ form: res.data.contents })
            // this.setState({ tags: res.data.tags })
            this.handleRedirect()
        })
    }

    handleRedirect = (e) => {
        this.props.history.push('/home')
    }

    render() {
        const { tags, suggestions } = this.state;
        return (
            <div id="main" className="FormCenter">
                {/* <div id="landingHeader">Edit Your Profile</div> */}
                <form onSubmit={this.handleSubmit} className="FormFields">
                    {/* begin section 1 */}
                    <div id="formlayout" className="form">
                        <h1> Create your Recruiter profile</h1>
                        <div id="sec1" className="form-row">
                            {/* begin col 1 of sec 1 */}
                            <div id="s1c1" className="col">
                                <div className="FormField">
                                    <label className="FormField__Label" htmlFor="fname">Your Company Name</label>
                                    <input type="cname" id="cname" className="FormField__Input form-control"
                                        placeholder="Enter the name of your company" name="cname" value={this.state.form.cname}
                                        onChange={this.handleChange} />
                                </div>

                                <div className="FormField">
                                    <label className="FormField__Label" htmlFor="email">E-Mail Address</label>
                                    <input type="email" id="email" className="FormField__Input form-control"
                                        placeholder="Enter your email" name="email" value={this.state.form.email}
                                        onChange={this.handleChange} />
                                </div>

                                <div className="FormField">
                                    <label className="FormField__Label" htmlFor="job">Occupation</label>
                                    <input type="job" id="job" className="FormField__Input form-control"
                                        placeholder="Enter your job listing" name="job" value={this.state.form.job}
                                        onChange={this.handleChange} />
                                </div>
                            </div>
                            {/* end col 1 of sec 1 */}
                            {/* col 2 sec 1 (profile picture) */}
                            <div id="s1c2" className="col">
                                {/* <div className="form-group align-middle">
                                    <label htmlFor="exampleFormControlFile1">Upload your company logo</label>
                                    <input type="file" className="form-control-file" id="exampleFormControlFile1" />
                                </div> */}
                            </div>
                            {/* end col 2 of sec 1 */}
                        </div>
                        {/* end section 1 */}
                        {/* begin section 2 */}
                        <div id="sec2" className="form-row" >
                            {/* begin col 1 of sec 2 */}
                            <div id="s2c1" className="col">
                                <div className="FormField">
                                    <label className="FormField__Label" htmlFor="about">About us</label>
                                    <textarea type="about" id="about" className="FormField__Input form-control"
                                        placeholder="Enter info about your company" name="about" value={this.state.form.about}
                                        onChange={this.handleChange} />
                                </div>

                                <div className="FormField">
                                    <label className="FormField__Label" htmlFor="exp">Experience</label>
                                    <textarea type="exp" id="exp" className="FormField__Input form-control"
                                        placeholder="Enter your desired experience" name="exp" value={this.state.form.exp}
                                        onChange={this.handleChange} />
                                </div>

                                <div className="FormField">
                                    <label className="FormField__Label" htmlFor="skills">Skills</label>
                                    <textarea type="skills" id="skills" className="FormField__Input form-control"
                                        placeholder="List your desired skills" name="skills" value={this.state.form.skills}
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
                            <label className="FormField__Label" htmlFor="exampleFormControlFile1">Please enter some tags to describe what type of applicants you are looking for.
                                These tags will designate how you will find applicants. Please enter at least 5!</label>
                            <ReactTags
                                tags={tags}
                                suggestions={suggestions}
                                delimiters={delimiters}
                                handleDelete={this.handleDelete}
                                handleAddition={this.handleAddition}
                                handleDrags={this.handleDrag}
                                handleTagClick={this.handleTagClick}
                            />
                        </div>
                        {/* end section 3 */}
                        {/* button area */}
                        <div id="buttonSpace" className="button">
                            <div id="sec4" className="row">
                                <div className="FormCenter col-12">
                                    <button type="submit" className="btn btn-primary">Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
export default connect(mapAuthStateToProps, { setProfileAction })(CompanyForm)