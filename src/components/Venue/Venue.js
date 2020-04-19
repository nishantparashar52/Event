import React from 'react';
import { Link } from 'react-router-dom';
import './Venue.scss';
const Venue = props => {
    return (
        <div className="row venue">
            <div className="col-lg-12">
                <div className="banner-content-wrap">
                    <h1 className="banner-title wow fadeInUp" data-wow-duration="1.5s" data-wow-delay="700ms">EVENT RENTAL, ARTIST BOOKING, VENUE HIRE,  DELHI NCR &amp; BANGALORE </h1>
                    <div className="full-banner">
                        <Link to="/equipment/">
                            <i className="fa fa-building-o" aria-hidden="true"></i>Book Event Equipment</Link>
                        <Link to="/artist/">
                            <i className="fa fa-users" aria-hidden="true"></i>Book an Artist</Link>
                        <Link to="/venue"><i className="fa fa-building-o" aria-hidden="true"></i> Find Venue</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Venue;