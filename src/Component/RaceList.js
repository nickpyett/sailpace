import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RaceEntity from 'Entity/RaceEntity';

class RaceList extends Component {
    render() {
        const races = JSON.parse(localStorage.getItem('races')) || [];

        const links = races.map(race => {
            const title = (race.title ? race.title : 'Race') + ' (' + race.dateTimeCreated + ')';

            return <li key={race.id}><Link to={'/race/' + race.id}>{title}</Link></li>;
        });

        const race = new RaceEntity(null);

        return (
            <div>
                <h1>Race List</h1>

                <ul>
                    {links}
                </ul>

                <div>
                    <Link to={'/race/' + race.id}>+ Add New</Link>
                </div>
            </div>
        );
    }
}

export default RaceList;
