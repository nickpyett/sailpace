import { Link } from 'react-router-dom';
import sail from 'sail.png';

export default function Header() {
    return (
        <div className="p-4 bg-gradient-to-b from-sky-300 to-30% to-sky-400 flex gap-6 leading-7">
            <div className="text-lg font-bold relative pr-[20px]">Sailpace <img src={sail} alt="" width="20px" className="absolute top-0 right-0" /></div>

            <nav>
                <ul>
                    <li className="inline mr-3"><Link to="/race-list">Race List</Link></li>
                    <li className="inline"><Link to="/about">About</Link></li>
                </ul>
            </nav>
        </div>
    );
}
