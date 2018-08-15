import React, { Component } from 'react';
import DisplayTimeEntity from 'Entity/DisplayTimeEntity';

class CompetitorLap extends Component {
    onCompetitorLapChange(e) {
        this.props.onCompetitorLapChange(this.props.competitor, this.props.lap, e.target.value);
    }

    onCompetitorLapSetClick(e) {
        const dateNow = new Date();
        const dateRaceStarted = new Date(this.props.startDateTime);

        const differenceInMsec = dateNow - dateRaceStarted;

        const displayTime = DisplayTimeEntity.fromMilliseconds(differenceInMsec);

        this.props.onCompetitorLapChange(this.props.competitor, this.props.lap, displayTime.getInDisplayFormat());
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

export default CompetitorLap;
