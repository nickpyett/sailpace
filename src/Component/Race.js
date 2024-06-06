import React, { Component } from 'react';
import DisplayTimeEntity from 'Entity/DisplayTimeEntity';
import CompetitorEntity from 'Entity/CompetitorEntity';
import CompetitorLapEntity from 'Entity/CompetitorLapEntity';
import CompetitorSortEntity from 'Entity/CompetitorSortEntity';
import RaceEntity from 'Entity/RaceEntity';
import RaceLapEntity from 'Entity/RaceLapEntity';
import RaceTitle from 'Component/RaceTitle';
import RaceStart from 'Component/RaceStart';
import RaceTable from 'Component/RaceTable';
import RaceEnd from 'Component/RaceEnd';

class Race extends Component {
    constructor(props) {
        super(props);

        const pathArray = window.location.pathname.split('/');

        // This ID should be set via React Router, but it doesn't work with 
        // React Components, so this is a quick fix
        this.id = pathArray[2];

        const competitorSort = new CompetitorSortEntity();
        const race = new RaceEntity(competitorSort);
        const localState = this.getPersistedState();

        const state = Object.assign({}, race, localState);

        this.state = state;
        this.raceTime = 0;
        this.raceTimeUpdateInterval = null;
    }

    componentDidMount() {
        if (this.state.startDateTime && ! this.state.endDateTime) {
            this.setRaceTimeUpdateInterval();
        } else if (this.state.startDateTime && this.state.endDateTime) {
            this.setEndedRaceTime();
        }
    }

    componentWillUnmount() {
        if (this.raceTimeUpdateInterval) {
            clearInterval(this.raceTimeUpdateInterval);
        }
    }

    persistState() {
        const races = JSON.parse(localStorage.getItem('races')) || [];
        const raceId = this.id;
        let raceExists = false;

        const updatedRaces = races.map(race => {
            if (race.id === raceId) {
                raceExists = true;

                return this.state;
            }

            return race;
        });

        if (! raceExists) {
            this.id = this.state.id;
            
            updatedRaces.push(this.state);
        }

        localStorage.setItem('races', JSON.stringify(updatedRaces));
    }

    getPersistedState() {
        const races = JSON.parse(localStorage.getItem('races')) || [];

        const raceId = this.id;
        const race = races.find(race => race.id === raceId);

        return race || {};
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
        const competitorLaps = this.state.laps.map(lap => {
            return new CompetitorLapEntity(lap);
        });

        let ordinal = 1;

        this.state.competitors.forEach(competitor => {
            if (competitor.ordinal >= ordinal) {
                ordinal = competitor.ordinal + 1;
            }
        });

        const competitor = new CompetitorEntity(ordinal, competitorLaps);

        const competitors = this.state.competitors.concat(competitor);

        this.setAndPersistState({
            competitors: competitors
        });
    }

    onAddLapHandler() {
        const lapNumber = this.state.laps.length + 1;

        const newLap = new RaceLapEntity(lapNumber);

        const laps = [
            ...this.state.laps,
            newLap
        ];

        const competitors = this.state.competitors.map(competitorRow => {
            const competitorLaps = [
                ...competitorRow.laps,
                new CompetitorLapEntity(newLap)
            ];

            const competitor = {
                ...competitorRow,
                laps: competitorLaps
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

    setRaceTimeUpdateInterval() {
        this.raceTimeUpdateInterval = setInterval(this.raceTimeUpdate.bind(this), 100);
    }

    raceTimeUpdate() {
        const now = new Date();
        const startDateTime = new Date(this.state.startDateTime);

        const differenceInMilliseconds = now - startDateTime;

        const displayTimeEntity = DisplayTimeEntity.fromMilliseconds(differenceInMilliseconds);

        this.setState({
            raceTime: displayTimeEntity.getInTimeFormat(),
        });
    }

    setEndedRaceTime() {
        const startDateTime = new Date(this.state.startDateTime);
        const endDateTime = new Date(this.state.endDateTime);

        const differenceInMilliseconds = endDateTime - startDateTime;

        const displayTimeEntity = DisplayTimeEntity.fromMilliseconds(differenceInMilliseconds);

        this.setState({
            raceTime: displayTimeEntity.getInTimeFormat(),
        });
    }

    setStartDateTimeHandler() {
        const startDateTime = new Date().toUTCString();

        this.setAndPersistState({
            startDateTime: startDateTime
        }).then(() => {
            this.setRaceTimeUpdateInterval();
        });
    }

    setEndDateTimeHandler() {
        clearInterval(this.raceTimeUpdateInterval);

        const now = new Date().toUTCString();

        this.setAndPersistState({
            endDateTime: now,
        }).then(() => {
            this.setEndedRaceTime();
        });
    }

    onRemoveLapClickHandler(lap) {
        const lapIsLast = this.state.laps.every(lapRow => lapRow.number <= lap.number);

        if (! lapIsLast) {
            return;
        }

        if (! window.confirm('Are you sure you wish to delete this lap? This will delete all laps times for this lap. This cannot be undone.')) {
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
        if (! window.confirm('Are you sure you wish to delete this competitor? This will delete all laps times for this competitor. This cannot be undone.')) {
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
                <h1 class="page-header">Race</h1>

                <RaceTitle title={this.state.title} onRaceTitleChangeHandler={this.onRaceTitleChangeHandler.bind(this)} />

                <div class="my-2">
                    <span class="inline-block bg-purple-700 px-2 text-white text-sm font-bold rounded-l leading-6 align-middle">Timer</span>
                    <span class="inline-block bg-gray-200 px-2 rounded-r leading-6 align-middle min-w-24 text-center font-mono">{this.state.raceTime ? this.state.raceTime : '-'}</span>
                </div>

                <div class="my-2">
                    <button type="button" onClick={this.onAddCompetitorHandler.bind(this)} class="cta mr-2">Add Competitor</button>
                    <button type="button" onClick={this.onAddLapHandler.bind(this)}  class="cta">Add Lap</button>
                </div>

                <RaceTable
                    competitors={this.state.competitors}
                    startDateTime={this.state.startDateTime}
                    laps={this.state.laps}
                    competitorSort={this.state.competitorSort}
                    onCompetitorChangeHandler={this.onCompetitorChangeHandler.bind(this)}
                    onSortButtonClickHandler={this.onSortButtonClickHandler.bind(this)}
                    onCompetitorLapChange={this.onCompetitorLapChange.bind(this)}
                    onRemoveLapClickHandler={this.onRemoveLapClickHandler.bind(this)}
                    onRemoveCompetitorClickHandler={this.onRemoveCompetitorClickHandler.bind(this)}
                />

                <div class="my-2">
                    <RaceStart startDateTime={this.state.startDateTime} setStartDateTimeHandler={this.setStartDateTimeHandler.bind(this)} />
                    <RaceEnd startDateTime={this.state.startDateTime} endDateTime={this.state.endDateTime} setEndDateTimeHandler={this.setEndDateTimeHandler.bind(this)} />
                </div>
            </div>
        );
    }
}

export default Race;
