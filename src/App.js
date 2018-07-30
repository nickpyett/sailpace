import React, { Component } from 'react';
import UUID from 'uuid';

class AddRacer extends Component {
    render() {
        return (
            <button onClick={this.props.onAddRacer}>Add Sailor</button>
        )
    }
}

class AddLap extends Component {
    render() {
        return (
            <button onClick={this.props.onAddLap}>Add Lap</button>
        )
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
        )
    }
}

class RacerTable extends Component {
    render() {
        const racerRows = this.props.sailors.map(sailer => {
            return <RacerRow key={sailer.id} sailor={sailer} onChangeHandler={this.props.onChangeHandler} />;
        });

        const headers = [...Array(this.props.race.lapCount).keys()].map(key => <th key={key}>Lap {key + 1}</th>);

        return (
            <table>
                <thead>
                    <tr>
                        <th>Sailor name</th>
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

class RacerRow extends Component {
    onChangeHandler(e) {
        this.props.onChangeHandler(this.props.sailor, e.target.name, e.target.value);
    }

    render() {
        const laps = this.props.sailor.laps.map(lap => {
            return <RacerLap key={lap.id} lap={lap} />;
        });

        return (
            <tr>
                <td><input type="text" name="sailorName" value={this.props.sailor.sailorName} onChange={this.onChangeHandler.bind(this)} /></td>
                <td><input type="text" name="boatNumber" value={this.props.sailor.boatNumber} onChange={this.onChangeHandler.bind(this)} /></td>
                {laps}
            </tr>
        );
    }
}

class RacerLap extends Component {
    onRacerLapChange(e) {

    }

    onRacerLapSetClick(e) {

    }

    render() {
        return (
            <td>
                <input type="text" value={this.props.lap.time} onChange={this.onRacerLapChange.bind(this)} />
                <button onClick={this.onRacerLapSetClick.bind(this)}>Set</button>
            </td>
        );
    }
}

class App extends Component {
    constructor(props) {
        super(props);

        const sailors = [{
            id: UUID.v4(),
            sailorName: 'Sailor One',
            boatNumber: '142',
            laps: []
        }, {
            id: UUID.v4(),
            sailorName: 'Sailor Two',
            boatNumber: '56',
            laps: []
        }];

        const race = {
            id: UUID.v4(),
            title: 'Test Race',
            lapCount: 0
        };

        const laps = [];

        this.state = {
            sailors: sailors,
            race: race,
            laps: laps
        };
    }

    onChangeHandler(sailor, name, value) {
        const sailors = this.state.sailors.map(sailorRow => {
            if (sailor.id === sailorRow.id) {
                sailorRow[name] = value;
            }

            return sailorRow;
        });

        this.setState({
            sailors: sailors
        });
    }

    onAddRacer() {
        const laps = [...Array(this.state.race.lapCount).keys()].map(key => {
            return {
                id: UUID.v4(),
                time: ''
            };
        });

        const sailors = this.state.sailors.concat({
            id: UUID.v4(),
            sailorName: '',
            boatNumber: '',
            laps: laps
        });

        this.setState({
            sailors: sailors
        });
    }

    onAddLap() {
        const lapCount = this.state.race.lapCount + 1;
        const race = Object.assign({}, this.state.race, {
            lapCount: lapCount
        });

        const sailors = this.state.sailors.map(sailorRow => {
            const laps = sailorRow.laps.concat({
                id: UUID.v4(),
                time: ''
            });

            const sailor = Object.assign({}, sailorRow, {
                laps: laps
            });

            return sailor;
        });

        this.setState({
            race: race,
            sailors: sailors
        });
    }

    onTitleChangeHandler(title) {
        const race = Object.assign({}, this.state.race, {
            title: title
        });

        this.setState({
            race: race
        });
    }

    render() {
        return (
            <div className="app">
                <RaceTitle title={this.state.race.title} onTitleChangeHandler={this.onTitleChangeHandler.bind(this)} />
                <AddRacer onAddRacer={this.onAddRacer.bind(this)} />
                <AddLap onAddLap={this.onAddLap.bind(this)} />

                <RacerTable onChangeHandler={this.onChangeHandler.bind(this)} sailors={this.state.sailors} race={this.state.race} />
            </div>
        );
    }
}

export default App;
