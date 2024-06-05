import React, { Component } from 'react';
import DisplayTimeEntity from 'Entity/DisplayTimeEntity';

class CompetitorLap extends Component {
    onCompetitorLapChange(e) {
        this.props.onCompetitorLapChange(this.props.competitor, this.props.lap, e.target.value);
    }

    onCompetitorLapSetClick(e) {
        const dateNow = new Date();
        const dateRaceStarted = new Date(this.props.startDateTime);

        const differenceInMilliseconds = dateNow - dateRaceStarted;

        const displayTime = DisplayTimeEntity.fromMilliseconds(differenceInMilliseconds);

        this.props.onCompetitorLapChange(this.props.competitor, this.props.lap, displayTime.getInDisplayFormat());
    }

    render() {
        const disabled = this.props.startDateTime === null || this.props.lap.time;

        return (
            <td class="py-2">
                <input type="text" value={this.props.lap.time} pattern="\d+:\d{2}:\d{2}\.\d{3}" onChange={this.onCompetitorLapChange.bind(this)} class="w-[120px]" />
                <button type="button" disabled={disabled} onClick={this.onCompetitorLapSetClick.bind(this)} class="cta py-0 px-1 text-sm">set</button>
            </td>
        );
    }
}

export default CompetitorLap;
