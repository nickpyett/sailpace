import React, { Component } from 'react';
import UUID from 'uuid';
import DisplayTimeEntity from 'Entity/DisplayTimeEntity';
import RaceTitle from 'Component/RaceTitle';
import RaceStart from 'Component/RaceStart';
import RaceTable from 'Component/RaceTable';

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
        const promise = new Promise((resolve, reject) => {
            this.setState(object, () => {
                this.persistState();

                resolve();
            });
        });

        return promise;
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
            laps: laps,
            timeTotal: '00:00:00.000'
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

        let updatedCompetitor = competitor;

        const updatedCompetitors = this.state.competitors.map(competitorRow => {
            if (competitorRow.id === competitor.id) {
                updatedCompetitor = {
                    ...competitorRow,
                    laps: updatedLaps
                };

                return updatedCompetitor;
            }

            return competitorRow;
        });

        const promise = this.setAndPersistState({
            competitors: updatedCompetitors
        });

        promise.then(() => {
            this.calculateCompetitorTimeTotal([updatedCompetitor]);
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

        const differenceInMilliseconds = now - startDateTime;

        const displayTimeEntity = DisplayTimeEntity.fromMilliseconds(differenceInMilliseconds);

        this.setState({
            timeSinceStart: displayTimeEntity.getInTimeFormat()
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

        const promise = this.setAndPersistState({
            laps: laps,
            competitors: competitors,
            competitorSort: competitorSort
        });

        promise.then(() => {
            this.calculateCompetitorTimeTotal(competitors);
        });
    }

    calculateCompetitorTimeTotal(competitorsToUpdate) {
        const competitorsTotalTimes = [];

        competitorsToUpdate.forEach((competitorToUpdate) => {
            const timeTotal = competitorToUpdate.laps.reduce((accumulatedTimeInSeconds, lap) => {
                if ('' !== lap.time) {
                    const lapTimeInSeconds = DisplayTimeEntity
                        .fromDisplayFormat(lap.time)
                        .getTimeInSeconds();

                    return accumulatedTimeInSeconds + lapTimeInSeconds;
                }

                return accumulatedTimeInSeconds;
            }, 0);

            competitorsTotalTimes[competitorToUpdate.id] = timeTotal;
        });

        const competitors = this.state.competitors.map(competitorRow => {
            if (Object.keys(competitorsTotalTimes).includes(competitorRow.id)) {
                const timeTotalInMilliseconds = competitorsTotalTimes[competitorRow.id] * 1000;

                return {
                    ...competitorRow,
                    timeTotal: DisplayTimeEntity.fromMilliseconds(timeTotalInMilliseconds).getInDisplayFormat()
                };
            }

            return competitorRow;
        });

        this.setAndPersistState({
            competitors: competitors
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
            <div className="race">
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

export default Race;
