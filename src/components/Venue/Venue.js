import React from 'react';
import { Link } from 'react-router-dom';
import './Venue.scss';
const Venue = props => {
    return (
        <div className="row venue">
            <div className="col-lg-8">
                <div className="banner-content-wrap">
                    <h1 className="banner-title wow fadeInUp" data-wow-duration="1.5s" data-wow-delay="700ms">EVENT RENTAL, ARTIST BOOKING, VENUE HIRE,  DELHI NCR &amp; BANGALORE </h1>
                    <div className="full-banner">
                        <Link to="/equipment/">
                            <i className="fa fa-building-o" aria-hidden="true"></i>Book Event Equipment</Link>

                        <Link to="/book-an-artist/">
                            <i className="fa fa-users" aria-hidden="true"></i>Book an Artist</Link>
                        <Link to="/event-venue"><i className="fa fa-building-o" aria-hidden="true"></i> Find Venue</Link>
                    </div>
                </div>
            </div>
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
        </div>
    );
};
export default Venue;