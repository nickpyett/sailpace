import React, { Component } from 'react';
import UUID from 'uuid';

class RaceTitle extends Component {
    onRaceTitleChangeHandler(e) {
        this.props.onRaceTitleChangeHandler(e.target.value);
    }

    render() {
        return (
            <div>
                <label htmlFor="race-title">Race:</label> <input type="text" id="race-title" value={this.props.title} onChange={this.onRaceTitleChangeHandler.bind(this)} />
            </div>
        );
    }
}

class RaceTableHeader extends Component {
    onRemoveLapClickHanlder() {
        this.props.onRemoveLapClickHanlder(this.props.lap);
    }

    onSortButtonClickHandler() {
        this.props.onSortButtonClickHandler('lap', this.props.lap);
    }

    render() {
        return (
            <th>
                Lap {this.props.lap.number}
                &nbsp;
                <button type="button" onClick={this.onSortButtonClickHandler.bind(this)}>&#x25B2;&#x25BC;</button>
                <button type="button" disabled={this.props.disabled} onClick={this.onRemoveLapClickHanlder.bind(this)}>x</button>
            </th>
        );
    }
}

class RaceTable extends Component {
    onSortButtonClickHandler(e) {
        this.props.onSortButtonClickHandler(e.target.name);
    }

    render() {
        const competitors = this.props.competitors;
        const orderBy = this.props.competitorSort.orderBy;
        const orderByLap = this.props.competitorSort.orderByLap;
        const direction = this.props.competitorSort.direction;

        if (['ordinal', 'name', 'class', 'number', 'lap'].includes(this.props.competitorSort.orderBy)) {
            let sortFunction = null;

            if (orderBy !== 'lap') {
                if (direction === 'asc') {
                    sortFunction = (a, b) => a[orderBy] > b[orderBy];
                } else {
                    sortFunction = (a, b) => a[orderBy] < b[orderBy];
                }
            } else {
                sortFunction = (a, b) => {
                    const aLap = a.laps.find(lapRow => lapRow.lapId === orderByLap.id);
                    const bLap = b.laps.find(lapRow => lapRow.lapId === orderByLap.id);

                    if (direction === 'asc') {
                        return aLap.time > bLap.time;
                    }

                    return aLap.time < bLap.time;
                };
            }

            competitors.sort(sortFunction);
        }

        const competitorRows = competitors.map(competitor => {
            return <CompetitorRow
                key={competitor.id}
                competitor={competitor}
                startDateTime={this.props.startDateTime}
                onCompetitorChangeHandler={this.props.onCompetitorChangeHandler}
                onCompetitorLapChange={this.props.onCompetitorLapChange}
                onRemoveCompetitorClickHandler={this.props.onRemoveCompetitorClickHandler}
            />;
        });

        const raceTableHeaders = this.props.laps.map(lap => {
            const disabled = this.props.laps.length > lap.number;

            return <RaceTableHeader
                key={lap.id}
                lap={lap}
                disabled={disabled}
                onRemoveLapClickHanlder={this.props.onRemoveLapClickHanlder}
                onSortButtonClickHandler={this.props.onSortButtonClickHandler}
            />
        });

        return (
            <form>
                <table>
                    <thead>
                        <tr>
                            <th># <button type="button" name="ordinal" onClick={this.onSortButtonClickHandler.bind(this)}>&#x25B2;&#x25BC;</button></th>
                            <th>Name <button type="button" name="name" onClick={this.onSortButtonClickHandler.bind(this)}>&#x25B2;&#x25BC;</button></th>
                            <th>Number <button type="button" name="number" onClick={this.onSortButtonClickHandler.bind(this)}>&#x25B2;&#x25BC;</button></th>
                            <th>Class <button type="button" name="class" onClick={this.onSortButtonClickHandler.bind(this)}>&#x25B2;&#x25BC;</button></th>
                            {raceTableHeaders}
                        </tr>
                    </thead>
                    <tbody>
                        {competitorRows}
                    </tbody>
                </table>
            </form>
        );
    }
}

class CompetitorRow extends Component {
    onCompetitorChangeHandler(e) {
        this.props.onCompetitorChangeHandler(this.props.competitor, e.target.name, e.target.value);
    }

    onRemoveCompetitorClickHandler() {
        this.props.onRemoveCompetitorClickHandler(this.props.competitor);
    }

    render() {
        const competitorLaps = this.props.competitor.laps.map(lap => {
            return <CompetitorLap key={lap.id} lap={lap} competitor={this.props.competitor} startDateTime={this.props.startDateTime} onCompetitorLapChange={this.props.onCompetitorLapChange} />;
        });

        return (
            <tr>
                <td>{this.props.competitor.ordinal} <button type="button" onClick={this.onRemoveCompetitorClickHandler.bind(this)}>x</button></td>
                <td><input type="text" name="name" value={this.props.competitor.name} onChange={this.onCompetitorChangeHandler.bind(this)} /></td>
                <td><input type="text" name="number" value={this.props.competitor.number} onChange={this.onCompetitorChangeHandler.bind(this)} /></td>
                <td><input type="text" name="class" value={this.props.competitor.class} onChange={this.onCompetitorChangeHandler.bind(this)} /></td>
                {competitorLaps}
            </tr>
        );
    }
}

class CompetitorLap extends Component {
    onCompetitorLapChange(e) {
        this.props.onCompetitorLapChange(this.props.competitor, this.props.lap, e.target.value);
    }

    onCompetitorLapSetClick(e) {
        const dateNow = new Date();
        const dateRaceStarted = new Date(this.props.startDateTime);

        let differenceInMsec = dateNow - dateRaceStarted;

        const hh = Math.floor(differenceInMsec / 1000 / 60 / 60);
        differenceInMsec -= hh * 1000 * 60 * 60;
        const mm = Math.floor(differenceInMsec / 1000 / 60);
        differenceInMsec -= mm * 1000 * 60;
        const ss = Math.floor(differenceInMsec / 1000);
        differenceInMsec -= ss * 1000;

        const timeNow = '0'.concat(hh).slice(-2)
            + ':' + '0'.concat(mm).slice(-2)
            + ':' + '0'.concat(ss).slice(-2)
            + '.' + '00'.concat(differenceInMsec).slice(-3);

        this.props.onCompetitorLapChange(this.props.competitor, this.props.lap, timeNow);
    }

    render() {
        const disabled = this.props.startDateTime === null || this.props.lap.time;

        return (
            <td>
                <input type="text" step="1" value={this.props.lap.time} pattern="\d+:\d{2}:\d{2}\.\d{3}" onChange={this.onCompetitorLapChange.bind(this)} />
                <button type="button" disabled={disabled} onClick={this.onCompetitorLapSetClick.bind(this)}>Set</button>
            </td>
        );
    }
}

class RaceStart extends Component {
    onRaceStartClickHandler() {
        this.props.onRaceStartClickHandler();
    }

    render() {
        const disabled = this.props.startDateTime !== null;

        return (
            <div>
                <button disabled={disabled} onClick={this.onRaceStartClickHandler.bind(this)}>Start Race</button>
                <div>{this.props.timeSinceStart}</div>
            </div>
        );
    }
}

class Race extends Component {
    constructor(props) {
        super(props);

        const competitorSort = {
            orderBy: 'ordinal',
            orderByLap: null,
            direction: 'asc'
        };

        const timeSinceStart = '00:00:00';

        const localState = this.getPersistedState();

        const state = Object.assign({}, {
            id: UUID.v4(),
            title: '',
            startDateTime: null,
            competitors: [],
            laps: [],
            competitorSort: competitorSort,
            timeSinceStart: timeSinceStart
        }, localState);

        this.state = state;
    }

    componentDidMount() {
        if (null !== this.state.startDateTime) {
            this.setTimeSinceStartUpdateInterval();
        }
    }

    componentWillUnmount() {
        if (null !== this.timeSinceStartUpdateInterval) {
            clearInterval(this.timeSinceStartUpdateInterval);
        }
    }

    setAndPersistState(object) {
        this.setState(object, () => {
            this.persistState();
        });
    }

    persistState() {
        localStorage.setItem('state', JSON.stringify(this.state));
    }

    getPersistedState() {
        return JSON.parse(localStorage.getItem('state'));
    }

    onCompetitorChangeHandler(competitor, key, value) {
        const competitors = this.state.competitors.map(competitorRow => {
            if (
                competitor.id === competitorRow.id
                && ['name', 'number', 'class'].includes(key)
            ) {
                competitorRow[key] = value;
            }

            return competitorRow;
        });

        this.setAndPersistState({
            competitors: competitors
        });
    }

    onAddCompetitorHandler() {
        const laps = this.state.laps.map(lap => {
            return {
                id: UUID.v4(),
                lapId: lap.id,
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

        this.setAndPersistState({
            competitors: competitors
        });
    }

    onAddLapHandler() {
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

        this.setAndPersistState({
            competitors: competitors,
            laps: laps
        });
    }

    onRaceTitleChangeHandler(title) {
        this.setAndPersistState({
            title: title
        });
    }

    onSortButtonClickHandler(orderBy, lap) {
        const direction =
            orderBy === this.state.competitorSort.orderBy && 'asc' === this.state.competitorSort.direction
            ? 'desc'
            : 'asc';

        const competitorSort = {
            'orderBy': orderBy,
            'orderByLap': lap || null,
            'direction': direction
        };

        this.setAndPersistState({
            competitorSort: competitorSort
        });
    }

    onCompetitorLapChange(competitor, lap, value) {
        const updatedLaps = competitor.laps.map(lapRow => {
            if (lapRow.id === lap.id) {
                return {
                    ...lapRow,
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

        this.setAndPersistState({
            competitors: updatedCompetitors
        });
    }

    onRaceStartClickHandler() {
        if (this.state.startDateTime !== null) {
            return;
        }

        if (
            window
            && window.confirm
            && ! window.confirm('Are you sure you wish to start the race?')
        ) {
            return;
        }

        const startDateTime = new Date().toUTCString();

        this.setAndPersistState({
            startDateTime: startDateTime
        });

        this.setTimeSinceStartUpdateInterval();
    }

    setTimeSinceStartUpdateInterval() {
        this.timeSinceStartUpdateInterval = setInterval(this.timeSinceStartUpdate.bind(this), 100);
    }

    timeSinceStartUpdate() {
        const now = new Date();
        const startDateTime = new Date(this.state.startDateTime);

        let differenceInMsec = now - startDateTime;

        const hh = Math.floor(differenceInMsec / 1000 / 60 / 60);
        differenceInMsec -= hh * 1000 * 60 * 60;
        const mm = Math.floor(differenceInMsec / 1000 / 60);
        differenceInMsec -= mm * 1000 * 60;
        const ss = Math.floor(differenceInMsec / 1000);
        differenceInMsec -= ss * 1000;

        const timeSinceStart = '0'.concat(hh).slice(-2)
            + ':' + '0'.concat(mm).slice(-2)
            + ':' + '0'.concat(ss).slice(-2);

        this.setState({
            timeSinceStart: timeSinceStart
        });
    }

    onRemoveLapClickHanlder(lap) {
        const lapIsLast = this.state.laps.every(lapRow => lapRow.number <= lap.number);

        if (! lapIsLast) {
            return;
        }

        if (
            window
            && window.confirm
            && ! window.confirm('Are you sure you wish to delete this lap? This will delete all laps times for this lap. This cannot be undone.')
        ) {
            return;
        }

        const laps = this.state.laps.filter(lapRow => lapRow.id !== lap.id);

        const competitors = this.state.competitors.map(competitor => {
            const competitorLaps = competitor.laps.filter(competitorLap => {
                return competitorLap.lapId !== lap.id
            });

            return {
                ...competitor,
                laps: competitorLaps
            };
        });

        const competitorSort = this.state.competitorSort;

        if (competitorSort.orderBy === 'lap' && lap.id === competitorSort.orderByLap.id) {
            competitorSort.direction = 'asc';
            competitorSort.orderBy = 'ordinal';
            competitorSort.orderByLap = null;
        }

        this.setAndPersistState({
            laps: laps,
            competitors: competitors,
            competitorSort: competitorSort
        });
    }

    onRemoveCompetitorClickHandler(competitor) {
        if (
            window &&
            window.confirm
            && ! window.confirm('Are you sure you wish to delete this competitor? This will delete all laps times for this competitor. This cannot be undone.')
        ) {
            return;
        }

        const competitors = this.state.competitors.filter(competitorRow => {
            return competitorRow.id !== competitor.id
        });

        this.setAndPersistState({
            competitors: competitors
        });
    }

    render() {
        return (
            <div className="app">
                <RaceTitle title={this.state.title} onRaceTitleChangeHandler={this.onRaceTitleChangeHandler.bind(this)} />
                <RaceStart startDateTime={this.state.startDateTime} timeSinceStart={this.state.timeSinceStart} onRaceStartClickHandler={this.onRaceStartClickHandler.bind(this)} />

                <RaceTable
                    competitors={this.state.competitors}
                    startDateTime={this.state.startDateTime}
                    laps={this.state.laps}
                    competitorSort={this.state.competitorSort}
                    onCompetitorChangeHandler={this.onCompetitorChangeHandler.bind(this)}
                    onSortButtonClickHandler={this.onSortButtonClickHandler.bind(this)}
                    onCompetitorLapChange={this.onCompetitorLapChange.bind(this)}
                    onRemoveLapClickHanlder={this.onRemoveLapClickHanlder.bind(this)}
                    onRemoveCompetitorClickHandler={this.onRemoveCompetitorClickHandler.bind(this)}
                />

                <button type="button" onClick={this.onAddCompetitorHandler.bind(this)}>Add Competitor</button>
                <button type="button" onClick={this.onAddLapHandler.bind(this)}>Add Lap</button>
            </div>
        );
    }
}

class App extends Component {
    render() {
        return (
            <Race />
        );
    }
}

export default App;
