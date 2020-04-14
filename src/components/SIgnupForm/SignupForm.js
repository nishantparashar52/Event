import React from 'react';
const SignUpForm = props => {
    return (
        <div className="col-lg-4">
            <div className="hero-form-content">
                <h2>FILL YOUR REQUIREMENT</h2>
                <p>Feel free to share your requirement with us!</p>
                <div id="error_Requirement"></div>
                <form id="Hire4event-Requirement" className="hero-form" novalidate="novalidate">
                    <div className="input-group">
                        <span className="input-group-addon"><i className="fa fa-user-o" aria-hidden="true"></i></span>
                        <input className="form-control form-control-name" placeholder="Name" name="name" type="text" />
                    </div>
                    <div className="input-group">
                        <span className="input-group-addon"><i className="fa fa-phone" aria-hidden="true"></i></span>
                        <input className="form-control form-control-phone" placeholder="Phone" name="phone" type="text" />
                    </div>
                    <div className="input-group">
                        <span className="input-group-addon"><i className="fa fa-envelope" aria-hidden="true"></i></span>
                        <input className="form-control form-control-email" placeholder="Email" name="email" type="text" />
                    </div>
                    <div className="input-group">
                        <span className="input-group-addon"><i className="fa fa-map-marker" aria-hidden="true"></i></span>
                        <input className="form-control form-control-email" placeholder="Locality" name="locality" type="text" />
                    </div>
                    <div className="input-group">
                        <span className="input-group-addon"><i className="fa fa-users" aria-hidden="true"></i></span>
                        <input className="form-control form-control-email" placeholder="Number of Guest" name="number_guest" type="text" />
                    </div>
                    <div className="input-group">
                        <span className="input-group-addon" style={{ width: '45px' }}><i className="fa fa-cubes" aria-hidden="true"></i></span>
                        <select name="occasion">
                            <option selected="" value="">Select The Occasion</option>
                            <option>Corporate Event</option>
                            <option>Exhibition &amp; Seminars</option>
                            <option>Music Concert</option>
                            <option>Sports Events</option>
                            <option>Annual Festival</option>
                            <option>Wedding and Social Events</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <button className="btn" type="submit" id="Hire4event_Requirement" name="Hire4event_Requirement"> Submit Now</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default SignUpForm;

