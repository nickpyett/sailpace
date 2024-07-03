import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <div className="mx-4 py-4 border-t border-sky-600 text-sm">
            &copy; Nick Pyett 2024 | <Link to="/storage-policy" className="text-sky-800 hover:text-sky-700 underline">Storage Policy</Link>
        </div>
    );
}