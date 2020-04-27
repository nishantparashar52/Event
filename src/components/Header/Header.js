import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

function Header() {
    // Declare a new state variable, which we'll call "count
    // const [count, setCount] = useState(0);
    // console.log(count);

    return (
        <div>
            <div className="header">
                <a href="/" className="logo">Event Karde</a>
                <div className="menu">
                    <Link to=""><div className="menu-list"><span>Home</span></div></Link>
                    <Link to="/about-us/"><div className="menu-list"><span>About Us</span></div></Link>
                    <Link to="/services/"><div className="menu-list"><span>Services</span></div></Link>
                    <Link to="/corporate/"><div className="menu-list"><span>Corporate Events</span></div></Link>
                    <Link to="/enquiry/"><div className="menu-list"><span>Enquiry</span></div></Link>
                </div>
            </div>
        </div>
    );
}
export default Header;