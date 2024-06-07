import { Component } from 'react';

class CompetitorLap extends Component {
    onCompetitorLapChange(e) {
        this.props.onCompetitorLapChange(this.props.competitor, this.props.lap, e.target.value);
    }

    onCompetitorLapSetClick() {
        this.props.onCompetitorLapSet(this.props.competitor, this.props.lap);
    }

    render() {
        const disabled = this.props.startDateTime === null || this.props.lap.time || ! this.props.isCurrentLap;

        return (
            <td className="p-2 w-48 text-center">
                <input type="text" value={this.props.lap.time} pattern="\d+:\d{2}:\d{2}\.\d{3}" onChange={this.onCompetitorLapChange.bind(this)} className="w-32 font-mono border border-gray-300 px-1" />
                <button type="button" disabled={disabled} onClick={this.onCompetitorLapSetClick.bind(this)} className="cta-small ml-2" title={disabled ? 'Only the current lap can be set automatically' : 'Set this lap'}>set</button>
            </td>
        );
    }
}

export default CompetitorLap;
