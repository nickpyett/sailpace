import React, { Component } from 'react';
import UUID from 'uuid';

class AddCompetitor extends Component {
    render() {
        return (
            <button onClick={this.props.onAddCompetitor}>Add Competitor</button>
        );
    }
}

class AddLap extends Component {
    render() {
        return (
            <button onClick={this.props.onAddLap}>Add Lap</button>
        );
    }
}

class RaceTitle extends Component {
    onTitleChangeHandler(e) {
        this.props.onTitleChangeHandler(e.target.value);
    }

    render() {
        return (
            <div>
                <label htmlFor="race-title">Race:</label> <input type="text" id="race-title" onChange={this.onTitleChangeHandler.bind(this)} value={this.props.title} />
            </div>
        );
    }
}

class RaceTableHeader extends Component {
    onClick(e) {
        console.log(e);
    }

    render() {
        return (
            <th>Lap {this.props.lapNumber} <button onClick={this.onClick.bind(this)} disabled={this.props.disabled}>x</button></th>
        );
    }
}

class RaceTable extends Component {
    onSortButtonClick(e) {
        this.props.onSortButtonClick(e.target.name);
    }

    render() {
        const competitors = this.props.competitors;

        if (['ordinal', 'name', 'class', 'number'].includes(this.props.competitorSort.orderBy)) {
            let sortFunction = null;

            if (this.props.competitorSort.direction === 'asc') {
                sortFunction = (a, b) => a[this.props.competitorSort.orderBy] > b[this.props.competitorSort.orderBy];
            } else {
                sortFunction = (a, b) => a[this.props.competitorSort.orderBy] < b[this.props.competitorSort.orderBy];
            }

            competitors.sort(sortFunction);
        }

        const racerRows = competitors.map(competitor => {
            return <CompetitorRow key={competitor.id} competitor={competitor} onChangeHandler={this.props.onChangeHandler} onCompetitorLapChange={this.props.onCompetitorLapChange} />;
        });

        const headers = this.props.laps.map(lap => {
            const disabled = this.props.laps.length > lap.number ? true : false;

            return <RaceTableHeader key={lap.id} lapNumber={lap.number} disabled={disabled} />
        });

        return (
            <table>
                <thead>
                    <tr>
                        <th># <button name="ordinal" onClick={this.onSortButtonClick.bind(this)}>&#x25B2;&#x25BC;</button></th>
                        <th>Name <button name="name" onClick={this.onSortButtonClick.bind(this)}>&#x25B2;&#x25BC;</button></th>
                        <th>Number <button name="number" onClick={this.onSortButtonClick.bind(this)}>&#x25B2;&#x25BC;</button></th>
                        <th>Class <button name="class" onClick={this.onSortButtonClick.bind(this)}>&#x25B2;&#x25BC;</button></th>
                        {headers}
                    </tr>
                </thead>
                <tbody>
                    {racerRows}
                </tbody>
            </table>
        );
    }
}

class CompetitorRow extends Component {
    onChangeHandler(e) {
        this.props.onChangeHandler(this.props.competitor, e.target.name, e.target.value);
    }

    render() {
        const laps = this.props.competitor.laps.map(lap => {
            return <CompetitorLap key={lap.id} lap={lap} competitor={this.props.competitor} onCompetitorLapChange={this.props.onCompetitorLapChange} />;
        });

        return (
            <tr>
                <td>{this.props.competitor.ordinal}</td>
                <td><input type="text" name="name" value={this.props.competitor.name} onChange={this.onChangeHandler.bind(this)} /></td>
                <td><input type="text" name="number" value={this.props.competitor.number} onChange={this.onChangeHandler.bind(this)} /></td>
                <td><input type="text" name="class" value={this.props.competitor.class} onChange={this.onChangeHandler.bind(this)} /></td>
                {laps}
            </tr>
        );
    }
}

class CompetitorLap extends Component {
    onCompetitorLapChange(e) {
        this.props.onCompetitorLapChange(this.props.competitor, this.props.lap, e.target.value);
    }

    onCompetitorLapSetClick(e) {

    }

    render() {
        return (
            <td>
                <input type="time" step="1" value={this.props.lap.time} onChange={this.onCompetitorLapChange.bind(this)} />
                <button onClick={this.onCompetitorLapSetClick.bind(this)}>Set</button>
            </td>
        );
    }
}

class App extends Component {
    constructor(props) {
        super(props);

        const competitors = [{
            ordinal: 1,
            id: UUID.v4(),
            name: 'Sailor One',
            number: '142',
            class: 'Aero RS',
            laps: []
        }, {
            ordinal: 2,
            id: UUID.v4(),
            name: 'Sailor Two',
            number: '56',
            class: 'Laser',
            laps: []
        }];

        const race = {
            id: UUID.v4(),
            title: 'Test Race'
        };

        this.state = {
            competitors: competitors,
            race: race,
            laps: [],
            competitorSort: {
                orderBy: 'added',
                direction: 'desc'
            }
        };
    }

    onChangeHandler(competitor, key, value) {
        const competitors = this.state.competitors.map(competitorRow => {
            if (competitor.id === competitorRow.id && ['name', 'number', 'class'].includes(key)) {
                competitorRow[key] = value;
            }

            return competitorRow;
        });

        this.setState({
            competitors: competitors
        });
    }

    onAddCompetitor() {
        const laps = this.state.laps.map(lap => {
            return {
                id: UUID.v4(),
                time: ''
            };
        });

        let ordinal = 1;

        this.state.competitors.forEach(competitor => {
            if (competitor.ordinal >= ordinal) {
                ordinal = competitor.ordinal + 1;
            }
        });

        const competitors = this.state.competitors.concat({
            ordinal: ordinal,
            id: UUID.v4(),
            name: '',
            number: '',
            class: '',
            laps: laps
        });

        this.setState({
            competitors: competitors
        });
    }

    onAddLap() {
        const newLap = {
            id: UUID.v4(),
            number: this.state.laps.length + 1
        };

        const laps = [
            ...this.state.laps,
            newLap
        ];

        const competitors = this.state.competitors.map(competitorRow => {
            const laps = [
                ...competitorRow.laps,
                {
                    id: UUID.v4(),
                    lapId: newLap.id,
                    time: ''
                }
            ];

            const competitor = {
                ...competitorRow,
                laps: laps
            };

            return competitor;
        });

        this.setState({
            competitors: competitors,
            laps: laps
        });
    }

    onTitleChangeHandler(title) {
        const race = {
            ...this.state.race,
            title: title
        };

        this.setState({
            race: race
        });
    }

    onSortButtonClick(orderBy) {
        const direction =
            orderBy === this.state.competitorSort.orderBy && 'asc' === this.state.competitorSort.direction
            ? 'desc'
            : 'asc';

        const competitorSort = {
            'orderBy': orderBy,
            'direction': direction
        };

        this.setState({
            competitorSort: competitorSort
        });
    }

    onCompetitorLapChange(competitor, lap, value) {
        const updatedLaps = competitor.laps.map(lapRow => {
            if (lapRow.id === lap.id) {
                return {
                    id: lapRow.id,
                    time: value
                };
            }

            return lapRow;
        });

        const updatedCompetitors = this.state.competitors.map(competitorRow => {
            if (competitorRow.id === competitor.id) {
                return {
                    ...competitorRow,
                    laps: updatedLaps
                };
            }

            return competitorRow;
        });

        this.setState({
            competitors: updatedCompetitors
        })
    }

    render() {
        return (
            <div className="app">
                <RaceTitle title={this.state.race.title} onTitleChangeHandler={this.onTitleChangeHandler.bind(this)} />
                <AddCompetitor onAddCompetitor={this.onAddCompetitor.bind(this)} />
                <AddLap onAddLap={this.onAddLap.bind(this)} />

                <RaceTable
                    onChangeHandler={this.onChangeHandler.bind(this)}
                    onSortButtonClick={this.onSortButtonClick.bind(this)}
                    onCompetitorLapChange={this.onCompetitorLapChange.bind(this)}
                    competitors={this.state.competitors}
                    race={this.state.race}
                    laps={this.state.laps}
                    competitorSort={this.state.competitorSort}
                />
            </div>
        );
    }
}

export default App;
