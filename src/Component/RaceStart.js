import React, { Component } from 'react';

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
            <div>
                <button disabled={disabled} onClick={this.onRaceStartClickHandler.bind(this)}>Start Race</button>
            </div>
        );
    }
}

export default RaceStart;
