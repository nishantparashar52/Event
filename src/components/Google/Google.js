import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Google.scss';

function Maps() {

    return (
        <div className="display-flex justify-content-around mr-t20">
            <div className="flex-08">
                <h2 className="column-title">
                    <div className="header-title">Reach us</div> Connect with us </h2>
                <div className="ts-map-tabs">
                    <div className="tab-content direction-tabs">
                        <div className="direction-tabs-content">
                            <h3>Event Karde</h3>
                            <p className="mr-b30">H-13, 1st Floor, near Bengali Sweets, Block H, South Extension I, New Delhi, Delhi 110049 </p>
                            <div className="contact-info-box">
                                <p><span className="bold">Email:</span> eventkarde@gmail.com</p>
                                <p><span className="bold">Phone:</span> +91-8081028081</p>
                                <p><span className="bold">24*7 support:</span> - 9250550650</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <iframe className="map flex-1 mr-l10" width="924" height="308" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/?ie=UTF8&t=m&ll=18.575300,73.764000&spn=0.003381,0.017231&z=16&output=embed"></iframe>
        </div>
    );
}
export default Maps;