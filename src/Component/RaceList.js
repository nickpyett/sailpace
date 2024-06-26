import { Link } from 'react-router-dom';
import RaceEntity from 'Entity/RaceEntity';

export default function RaceList() {
    const races = JSON.parse(localStorage.getItem('races')) || [];

    const racesSorted = races.sort((a, b) => {
        const aDate = new Date(a.dateTimeCreated);
        const bDate = new Date(b.dateTimeCreated);

        return aDate < bDate;
    });

    const links = racesSorted.map(race => {
        return <li key={race.id} className="my-2">
            <Link to={'/race/' + race.id}>
                {race.title ? <strong className="mr-3">{race.title}</strong> : ''}
                <span className="uppercase text-xs mr-3">{race.dateTimeCreated}</span>
                {race.endDateTime ? <span className="bg-sky-800 text-white text-xs inline p-1 px-2 rounded-full">finished</span> : ''}
            </Link>
        </li>;
    });

    const race = new RaceEntity(null, null);

    return (
        <div>
            <h1 className="page-header">Race List</h1>

            {links.length > 0 &&
                <ul className="my-4">
                    {links}
                </ul>
            }

            {links.length === 0 &&
                <div class="my-4">You have no races. Start racing with the button below!</div>
            }

            <div>
                <Link to={'/race/' + race.id} className="cta">+ New Race</Link>
            </div>
        </div>
    );
}
