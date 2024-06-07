import { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <div className="p-4 bg-sky-400 flex gap-6 leading-7">
                <div className="text-lg font-bold relative pr-[20px]">Sailpace <img src="/images/sail.svg" alt="" width="20px" className="absolute top-0 right-0" /></div> 

                <nav>
                    <ul>
                        <li className="inline mr-3"><Link to="/race">Race List</Link></li>
                        <li className="inline"><Link to="/about">About</Link></li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default Header;
