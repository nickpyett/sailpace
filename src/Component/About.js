import { Link } from 'react-router-dom';

export default function About() {
    return (
        <div>
            <h1 className="page-header">About</h1>
            <p className="my-2 max-w-2xl">Sailpace is an app to record race times. Add new races on the Race List page. For each race you can add competitors and laps. Once you start the race, you can set the current lap easily with the set button next to each lap.</p>
            <p className="my-2 max-w-2xl">This app uses Local Storage to store races, so if you delete your history for this site (or all sites) you will lose all your race data. Please see the <Link to="/storage-policy" className="text-sky-800 hover:text-sky-700 underline">Storage Policy</Link>.</p>
        </div>
    );
}
