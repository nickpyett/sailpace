import React, { Component } from 'react';

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
        const disabled = this.props.endDateTime !== null;

        return (
            <div>
                <button disabled={disabled} onClick={this.onRaceEndClickHandler.bind(this)}>End Race</button>
            </div>
        );
    }
}

export default RaceEnd;
