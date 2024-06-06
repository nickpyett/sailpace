import { Component } from 'react';
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
            <td className="p-2 w-48 text-center">
                <input type="text" value={this.props.lap.time} pattern="\d+:\d{2}:\d{2}\.\d{3}" onChange={this.onCompetitorLapChange.bind(this)} className="w-32 font-mono" />
                <button type="button" disabled={disabled} onClick={this.onCompetitorLapSetClick.bind(this)} className="cta-small ml-2">set</button>
            </td>
        );
    }
}

export default CompetitorLap;
