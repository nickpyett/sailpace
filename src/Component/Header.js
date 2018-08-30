import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <ul>
                <li><Link to="/race">Race List</Link></li>
                <li><Link to="/about">About</Link></li>
            </ul>
        );
    }
}

export default Header;
