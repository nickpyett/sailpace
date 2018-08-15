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
                <td>{this.props.competitor.timeTotal}</td>
            </tr>
        );
    }
}

export default CompetitorRow;
