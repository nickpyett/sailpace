import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import CompetitorEntity from 'Entity/CompetitorEntity';
import CompetitorLapEntity from 'Entity/CompetitorLapEntity';
import CompetitorSortEntity from 'Entity/CompetitorSortEntity';
import DisplayTimeEntity from 'Entity/DisplayTimeEntity';
import RaceEnd from 'Component/RaceEnd';
import RaceEntity from 'Entity/RaceEntity';
import RaceLapEntity from 'Entity/RaceLapEntity';
import RaceStart from 'Component/RaceStart';
import RaceTable from 'Component/RaceTable';
import RaceTitle from 'Component/RaceTitle';

export default function Race() {
    let { raceId } = useParams();

    const [race, setRace] = useState(() => {
        const raceEntity = new RaceEntity(raceId, new CompetitorSortEntity());
        const localState = getPersistedRace();

        return Object.assign({}, raceEntity, localState);
    });

    const [raceTime, setRaceTime] = useState(0);
    const raceTimeUpdateInterval = useRef(null);

    useEffect(() => {
        if (race.startDateTime && ! race.endDateTime) {
            setRaceTimeUpdateInterval();
        } else if (race.startDateTime && race.endDateTime) {
            setEndedRaceTime();
        }

        return () => {
            if (raceTimeUpdateInterval) {
                clearInterval(raceTimeUpdateInterval);
            }
        }
    });

    useEffect(() => {
        persistRace();
    }, [race]);

    function persistRace() {
        const races = JSON.parse(localStorage.getItem('races')) || [];

        let raceExists = false;

        const updatedRaces = races.map(raceItem => {
            if (raceItem.id === raceId) {
                raceExists = true;

                return race;
            }

            return raceItem;
        });

        if (! raceExists) {
            raceId = race.id;
            
            updatedRaces.push(race);
        }

        localStorage.setItem('races', JSON.stringify(updatedRaces));
    }

    function getPersistedRace() {
        const races = JSON.parse(localStorage.getItem('races')) || [];

        const race = races.find(race => race.id === raceId);

        return race || {};
    }

    function mergeIntoRace(object) {
        const updatedRace = Object.assign({}, race, object);

        setRace(updatedRace);
    }

    function onCompetitorChangeHandler(competitor, key, value) {
        const competitors = race.competitors.map(competitorRow => {
            if (
                competitor.id === competitorRow.id
                && ['name', 'number', 'class'].includes(key)
            ) {
                competitorRow[key] = value;
            }

            return competitorRow;
        });

        mergeIntoRace({
            competitors: competitors,
        });
    }

    function onAddCompetitorHandler() {
        const competitorLaps = race.laps.map(lap => {
            return new CompetitorLapEntity(lap);
        });

        let ordinal = 1;

        race.competitors.forEach(competitor => {
            if (competitor.ordinal >= ordinal) {
                ordinal = competitor.ordinal + 1;
            }
        });

        const competitor = new CompetitorEntity(ordinal, competitorLaps);

        const competitors = race.competitors.concat(competitor);

        mergeIntoRace({
            competitors: competitors,
        });
    }

    function onAddLapHandler() {
        const lapNumber = race.laps.length + 1;

        const newLap = new RaceLapEntity(lapNumber);

        const laps = [
            ...race.laps,
            newLap,
        ];

        const competitors = race.competitors.map(competitorRow => {
            const competitorLaps = [
                ...competitorRow.laps,
                new CompetitorLapEntity(newLap),
            ];

            const competitor = {
                ...competitorRow,
                laps: competitorLaps,
            };

            return competitor;
        });

        mergeIntoRace({
            competitors: competitors,
            laps: laps,
        });
    }

    function onRaceTitleChangeHandler(title) {
        mergeIntoRace({
            title: title,
        });
    }

    function onSortButtonClickHandler(orderBy, lap) {
        const direction =
            orderBy === race.competitorSort.orderBy && 'asc' === race.competitorSort.direction
            ? 'desc'
            : 'asc';

        const competitorSort = {
            'orderBy': orderBy,
            'orderByLap': lap || null,
            'direction': direction,
        };

        mergeIntoRace({
            competitorSort: competitorSort,
        });
    }

    function onCompetitorLapChange(competitor, lap, value) {
        const updatedLaps = competitor.laps.map(lapRow => {
            if (lapRow.id === lap.id) {
                return {
                    ...lapRow,
                    time: value,
                };
            }

            return lapRow;
        });

        const updatedCompetitor = {
            ...competitor,
            laps: updatedLaps,
        };

        const [updatedCompetitorWithTimeTotal] = calculateCompetitorTimeTotal([updatedCompetitor]);

        const updatedCompetitors = race.competitors.map(competitorRow => {
            if (competitorRow.id === competitor.id) {
                return updatedCompetitorWithTimeTotal;
            }

            return competitorRow;
        });

        mergeIntoRace({
            competitors: updatedCompetitors,
        });
    }

    function onCompetitorLapSet(competitor, competitorLap) {
        const dateRaceStarted = new Date(race.startDateTime);
        const dateNow = new Date();

        const timeMs = competitor.timeTotal.split('.');
        const hhMmSs = timeMs[0].split(':');

        const previousLapTimesInMs = Number(hhMmSs[0]) * 3600000
            + Number(hhMmSs[1]) * 60000
            + Number(hhMmSs[2]) * 1000
            + Number(timeMs[1]);

        const differenceInMs = dateNow - dateRaceStarted - previousLapTimesInMs;

        const lapDateTimeString = DisplayTimeEntity.fromMilliseconds(differenceInMs);

        onCompetitorLapChange(competitor, competitorLap, lapDateTimeString.getInDisplayFormat());
    }

    function setRaceTimeUpdateInterval() {
        raceTimeUpdateInterval.current = setInterval(raceTimeUpdate, 100);
    }

    function raceTimeUpdate() {
        const now = new Date();
        const startDateTime = new Date(race.startDateTime);

        const differenceInMilliseconds = now - startDateTime;

        const displayTimeEntity = DisplayTimeEntity.fromMilliseconds(differenceInMilliseconds);

        setRaceTime(displayTimeEntity.getInTimeFormat());
    }

    function setEndedRaceTime() {
        const startDateTime = new Date(race.startDateTime);
        const endDateTime = new Date(race.endDateTime);

        const differenceInMilliseconds = endDateTime - startDateTime;

        const displayTimeEntity = DisplayTimeEntity.fromMilliseconds(differenceInMilliseconds);

        setRaceTime(displayTimeEntity.getInTimeFormat());
    }

    function setStartDateTimeHandler() {
        const startDateTime = new Date().toUTCString();

        mergeIntoRace({
            startDateTime: startDateTime,
        });

        setRaceTimeUpdateInterval();
    }

    function setEndDateTimeHandler() {
        const intervalId = raceTimeUpdateInterval.current;

        clearInterval(intervalId);

        const now = new Date().toUTCString();

        mergeIntoRace({
            endDateTime: now,
        });

        setEndedRaceTime();
    }

    function onRemoveLapClickHandler(lap) {
        const lapIsLast = race.laps.every(lapRow => lapRow.number <= lap.number);

        if (! lapIsLast) {
            return;
        }

        if (! window.confirm('Are you sure you wish to delete this lap? This will delete all laps times for this lap. This cannot be undone.')) {
            return;
        }

        const updatedLaps = race.laps.filter(lapRow => lapRow.id !== lap.id);

        const updatedCompetitors = race.competitors.map(competitor => {
            const competitorLaps = competitor.laps.filter(competitorLap => {
                return competitorLap.lapId !== lap.id
            });

            return {
                ...competitor,
                laps: competitorLaps,
            };
        });

        const competitorSort = race.competitorSort;

        if (competitorSort.orderBy === 'lap' && lap.id === competitorSort.orderByLap.id) {
            competitorSort.direction = 'asc';
            competitorSort.orderBy = 'ordinal';
            competitorSort.orderByLap = null;
        }

        const updatedCompetitorsWithTotals = calculateCompetitorTimeTotal(updatedCompetitors);

        mergeIntoRace({
            laps: updatedLaps,
            competitors: updatedCompetitorsWithTotals,
            competitorSort: competitorSort,
        });
    }

    function calculateCompetitorTimeTotal(competitorsToUpdate) {
        const updatedCompetitors = competitorsToUpdate.map(competitorRow => {
            const timeTotalInMilliseconds = competitorRow.laps.reduce((accumulatedTimeInMilliseconds, lap) => {
                if (lap.time !== '') {
                    const lapTimeInMilliseconds = DisplayTimeEntity
                        .fromDisplayFormat(lap.time)
                        .getTimeInMilliseconds();

                    return accumulatedTimeInMilliseconds + lapTimeInMilliseconds;
                }

                return accumulatedTimeInMilliseconds;
            }, 0);

            return {
                ...competitorRow,
                timeTotal: DisplayTimeEntity.fromMilliseconds(timeTotalInMilliseconds).getInDisplayFormat(),
            };
        });

        return updatedCompetitors;
    }

    function onRemoveCompetitorClickHandler(competitor) {
        if (! window.confirm('Are you sure you wish to delete this competitor? This will delete all laps times for this competitor. This cannot be undone.')) {
            return;
        }

        const competitors = race.competitors.filter(competitorRow => {
            return competitorRow.id !== competitor.id
        });

        mergeIntoRace({
            competitors: competitors,
        });
    }

    return (
        <div>
            <h1 className="page-header">Race</h1>

            <RaceTitle title={race.title} onRaceTitleChangeHandler={onRaceTitleChangeHandler} />

            <div className="my-4">
                <span className="inline-block bg-purple-700 px-2 text-white text-sm font-bold rounded-l leading-6 align-middle">Timer</span>
                <span className="inline-block bg-gray-200 px-2 rounded-r leading-6 align-middle min-w-24 text-center font-mono">{raceTime ? raceTime : '-'}</span>
                {race.endDateTime &&
                    <span className="ml-3 text-purple-700">{String.fromCharCode('9873')} Race Finished</span>
                }
            </div>

            <div className="my-4">
                <button type="button" onClick={onAddCompetitorHandler} className="cta mr-3">+ Add Competitor</button>
                <button type="button" onClick={onAddLapHandler}  className="cta">+ Add Lap</button>
            </div>

            <RaceTable
                competitors={race.competitors}
                startDateTime={race.startDateTime}
                laps={race.laps}
                competitorSort={race.competitorSort}
                onCompetitorChangeHandler={onCompetitorChangeHandler}
                onSortButtonClickHandler={onSortButtonClickHandler}
                onCompetitorLapChange={onCompetitorLapChange}
                onCompetitorLapSet={onCompetitorLapSet}
                onRemoveLapClickHandler={onRemoveLapClickHandler}
                onRemoveCompetitorClickHandler={onRemoveCompetitorClickHandler}
            />

            <div className="my-4">
                <RaceStart startDateTime={race.startDateTime} endDateTime={race.endDateTime} setStartDateTimeHandler={setStartDateTimeHandler} />
                <RaceEnd startDateTime={race.startDateTime} endDateTime={race.endDateTime} setEndDateTimeHandler={setEndDateTimeHandler} />
            </div>
        </div>
    );
}
