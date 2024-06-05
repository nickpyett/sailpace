import React, { Component } from 'react';
import CompetitorLap from 'Component/CompetitorLap';

class CompetitorRow extends Component {
    onCompetitorChangeHandler(e) {
        this.props.onCompetitorChangeHandler(this.props.competitor, e.target.name, e.target.value);
    }

    onRemoveCompetitorClickHandler() {
        this.props.onRemoveCompetitorClickHandler(this.props.competitor);
    }

    render() {
        let raceCompleted = true;

        const competitorLaps = this.props.competitor.laps.map(lap => {
            if (lap.time === '') {
                raceCompleted = false;
            }

            return <CompetitorLap key={lap.id} lap={lap} competitor={this.props.competitor} startDateTime={this.props.startDateTime} onCompetitorLapChange={this.props.onCompetitorLapChange} />;
        });

        if (0 === this.props.competitor.laps.length) {
            raceCompleted = false;
        }

        const completed = raceCompleted ? String.fromCharCode('10004') : '-';

        return (
            <tr class="border-b border-gray-300">
                <td class="py-2">{this.props.competitor.ordinal} <button type="button" onClick={this.onRemoveCompetitorClickHandler.bind(this)}>x</button></td>
                <td class="py-2"><input type="text" name="name" value={this.props.competitor.name} onChange={this.onCompetitorChangeHandler.bind(this)} /></td>
                <td class="py-2"><input type="text" name="number" value={this.props.competitor.number} onChange={this.onCompetitorChangeHandler.bind(this)} /></td>
                <td class="py-2"><input type="text" name="class" value={this.props.competitor.class} onChange={this.onCompetitorChangeHandler.bind(this)} /></td>
                {competitorLaps}
                <td class="py-2">{this.props.competitor.timeTotal}</td>
                <td  class="py-2 text-center">{completed}</td>
            </tr>
        );
    }
}

export default CompetitorRow;
