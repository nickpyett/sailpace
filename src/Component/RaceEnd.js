import { Component } from 'react';

class RaceEnd extends Component {
    onRaceEndClickHandler() {
        if (this.props.endDateTime !== null) {
            return;
        }

        if (! window.confirm('Are you sure you wish to end the race?')) {
            return;
        }

        this.props.setEndDateTimeHandler();
    }

    render() {
        const disabled = this.props.startDateTime === null || this.props.endDateTime !== null;

        return (
            <button disabled={disabled} onClick={this.onRaceEndClickHandler.bind(this)} className="cta-link">
                <span className="rounded bg-red-600 h-3 w-3 inline-block mr-1"></span>
                End Race
            </button>
        );
    }
}

export default RaceEnd;
