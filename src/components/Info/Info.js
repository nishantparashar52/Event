import React from 'react';
// import { Link } from 'react-router-dom';
import './Info.scss';

function Info() {
    // Declare a new state variable, which we'll call "count"
    // const [count, setCount] = useState(0);

    return (
        <div className="row contact-section">
          <div className="col-md-4 mb-3 mb-md-0">
            <div className="card py-4 h-100">
              <div className="card-body text-center">
                <i className="fas fa-map-marked-alt text-primary mb-2"></i>
                <h4 className="text-uppercase m-0">Address</h4>
                <hr className="my-4" />
                <div className="small text-black-50">H-13, 1st Floor, near Bengali Sweets, Block H, South Extension I, New Delhi, Delhi 110049</div>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3 mb-md-0">
            <div className="card py-4 h-100">
              <div className="card-body text-center">
                <i className="fas fa-envelope text-primary mb-2"></i>
                <h4 className="text-uppercase m-0">Email</h4>
                <hr className="my-4" />
                <div className="small text-black-50">
                  <a href="mailto:eventkarde@gmail.com?Subject=Hello%20again" target="_top">eventkarde@gmail.com</a>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3 mb-md-0">
            <div className="card py-4 h-100">
              <div className="card-body text-center">
                <i className="fas fa-mobile-alt text-primary mb-2"></i>
                <h4 className="text-uppercase m-0">Phone</h4>
                <hr className="my-4" />
                <a className="small text-black-50" href="tel:+091-9250550650" value="+091-9250550650" accessible="true">+091-9250550650</a>
              </div>
            </div>
          </div>
        </div>
    );
}
export default Info;