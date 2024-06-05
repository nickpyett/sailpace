import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RaceEntity from 'Entity/RaceEntity';

class RaceList extends Component {
    render() {
        const races = JSON.parse(localStorage.getItem('races')) || [];

        const links = races.map(race => {
            return <li key={race.id} class="my-2">
                <Link to={'/race/' + race.id}>
                    {race.title ? <strong class="mr-3">{race.title}</strong> : ''}
                    <span class="uppercase text-xs mr-3">{race.dateTimeCreated}</span>
                    {race.endDateTime ? <span class="bg-sky-800 text-white text-xs inline p-1 px-2 rounded-full">finished</span> : ''}
                </Link>
            </li>;
        });

        const race = new RaceEntity(null);

        return (
            <div>
                <h1 class="page-header">Race List</h1>

                <ul class="my-4">
                    {links}
                </ul>

                <div>
                    <Link to={'/race/' + race.id} class="cta">+ New Race</Link>
                </div>
            </div>
        );
    }
}

export default RaceList;
