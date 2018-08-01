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
            <th>Lap {this.props.lapNumber} <button onClick={this.onClick.bind(this)}>x</button></th>
        );
    }
}

class RaceTable extends Component {
    render() {
        const racerRows = this.props.competitors.map(competitor => {
            return <CompetitorRow key={competitor.id} competitor={competitor} onChangeHandler={this.props.onChangeHandler} />;
        });

        const headers = this.props.laps.map(lap => <RaceTableHeader key={lap.id} lapNumber={lap.number} />);

        return (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Boat number</th>
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
            return <CompetitorLap key={lap.id} lap={lap} />;
        });

        return (
            <tr>
                <td><input type="text" name="competitorName" value={this.props.competitor.competitorName} onChange={this.onChangeHandler.bind(this)} /></td>
                <td><input type="text" name="boatNumber" value={this.props.competitor.boatNumber} onChange={this.onChangeHandler.bind(this)} /></td>
                {laps}
            </tr>
        );
    }
}

class CompetitorLap extends Component {
    onCompetitorLapChange(e) {

    }

    onCompetitorLapSetClick(e) {

    }

    render() {
        return (
            <td>
                <input type="text" value={this.props.lap.time} onChange={this.onCompetitorLapChange.bind(this)} />
                <button onClick={this.onCompetitorLapSetClick.bind(this)}>Set</button>
            </td>
        );
    }
}

class App extends Component {
    constructor(props) {
        super(props);

        const competitors = [{
            id: UUID.v4(),
            competitorName: 'Sailor One',
            boatNumber: '142',
            laps: []
        }, {
            id: UUID.v4(),
            competitorName: 'Sailor Two',
            boatNumber: '56',
            laps: []
        }];

        const race = {
            id: UUID.v4(),
            title: 'Test Race'
        };

        this.state = {
            competitors: competitors,
            race: race,
            laps: []
        };
    }

    onChangeHandler(competitor, name, value) {
        const competitors = this.state.competitors.map(competitorRow => {
            if (competitor.id === competitorRow.id) {
                competitorRow[name] = value;
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

        const competitors = this.state.competitors.concat({
            id: UUID.v4(),
            competitorName: '',
            boatNumber: '',
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

    render() {
        return (
            <div className="app">
                <RaceTitle title={this.state.race.title} onTitleChangeHandler={this.onTitleChangeHandler.bind(this)} />
                <AddCompetitor onAddCompetitor={this.onAddCompetitor.bind(this)} />
                <AddLap onAddLap={this.onAddLap.bind(this)} />

                <RaceTable onChangeHandler={this.onChangeHandler.bind(this)} competitors={this.state.competitors} race={this.state.race} laps={this.state.laps} />
            </div>
        );
    }
}

export default App;
