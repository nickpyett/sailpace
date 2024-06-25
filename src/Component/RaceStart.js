import { Component } from 'react';

class RaceStart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            raceTime: this.props.raceTime,
        };
    }

    onRaceStartClickHandler() {
        if (this.props.startDateTime !== null) {
            return;
        }

        if (! window.confirm('Are you sure you wish to start the race?')) {
            return;
        }

        this.props.setStartDateTimeHandler();
    }

    render() {
        const disabled = this.props.startDateTime !== null;

        return (            
            <button disabled={disabled} onClick={this.onRaceStartClickHandler.bind(this)} className="cta-link mr-3">
                <span className="rounded bg-emerald-600 h-3 w-3 inline-block mr-1"></span> 
                Start Race
            </button>
        );
    }
}

export default RaceStart;
