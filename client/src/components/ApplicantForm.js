import React, { Component } from 'react'

class ApplicantForm extends React.Component{
    render(){
        return(
            <div> 
            <form>
                <div className="form-group">
                    <label for="exampleFormControlInput1">Email address</label>
                    <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"> </input>
                </div>
                <div className="form-group">
                    <label for="exampleFormControlSelect1">What type of position are you looking for?</label>
                    <select multiple className="form-control" id="exampleFormControlSelect1">
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
                <div className="row">
                <div className="col-md-4 order-md-2 mb-4">
                    <h4 className="d-flex justify-content-between align-items-center mb-3">
                            <span className="text-muted">Your cart</span>
                            <span className="badge badge-secondary badge-pill">3</span>
                    </h4>
                <ul className="list-group mb-3">
                    <li className="list-group-item d-flex justify-content-between lh-condensed">
                        <div>
                            <h6 className="my-0">Product name</h6>
                            <small className="text-muted">Brief description</small>
                        </div>
                        <span className="text-muted">$12</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between lh-condensed">
                        <div>
                            <h6 className="my-0">Second product</h6>
                            <small className="text-muted">Brief description</small>
                        </div>
                        <span className="text-muted">$8</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between lh-condensed">
                        <div>
                            <h6 className="my-0">Third item</h6>
                            <small className="text-muted">Brief description</small>
                        </div>
                        <span className="text-muted">$5</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between bg-light">
                        <div className="text-success">
                            <h6 className="my-0">Promo code</h6>
                            <small>EXAMPLECODE</small>
                        </div>
                        <span className="text-success">-$5</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span>Total (USD)</span>
                        <strong>$20</strong>
                    </li>
                </ul>

                <form className="card p-2">
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Promo code"> </input>
                            <div className="input-group-append">
                                <button type="submit" className="btn btn-secondary">Redeem</button>
                            </div>
                    </div>
                </form>
                </div>
            </div>
        </div>
        
        
        )
    }
}
export default ApplicantForm;