import React, { Component } from 'react';
import CompetitorRow from 'Component/CompetitorRow';
import RaceTableHeader from 'Component/RaceTableHeader';

class RaceTable extends Component {
    onSortButtonClickHandler(e) {
        this.props.onSortButtonClickHandler(e.target.name);
    }

    render() {
        const competitors = this.props.competitors;
        const orderBy = this.props.competitorSort.orderBy;
        const orderByLap = this.props.competitorSort.orderByLap;
        const direction = this.props.competitorSort.direction;

        if (['ordinal', 'name', 'class', 'number', 'lap', 'timeTotal'].includes(this.props.competitorSort.orderBy)) {
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
                            <th>
                                Total
                                &nbsp;
                                <button type="button" name="timeTotal" onClick={this.onSortButtonClickHandler.bind(this)}>&#x25B2;&#x25BC;</button>
                            </th>
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

export default RaceTable;
