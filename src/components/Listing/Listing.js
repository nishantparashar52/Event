import React, { memo } from 'react';
// import { Link } from 'react-router-dom';
import './Listing.scss';

const Listing = memo(props => {
    const { data } = props;
    return (
        <div className="row mt-5">
            {data.map((item) => {
                return (
                    <div className="col-lg-3 col-md-6 mb-5 product-container">
                        <div className="ts-speaker">
                            <div className="speaker-img">
                                <img className="img-fluid" src={item.src}
                                    alt={item.alt} />
                                    <div data-id="456" data-name="L Acoustic Kara " onClick="GetProductEnquiry()"
                                    className="view-speaker"> <i className="icon icon-cart"></i> </div>
                            </div>
                            <div className="ts-speaker-info fsp16">{item.text}</div>
                        </div>
                    </div>
                );
            })
            }
        </div>
    );
});
export default Listing