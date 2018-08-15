import React, { Component } from 'react';

class RaceStart extends Component {
    onRaceStartClickHandler() {
        this.props.onRaceStartClickHandler();
    }

    render() {
        const disabled = this.props.startDateTime !== null;

        return (
            <div>
                <button disabled={disabled} onClick={this.onRaceStartClickHandler.bind(this)}>Start Race</button>
                <div>{this.props.timeSinceStart}</div>
            </div>
        );
    }
}

export default RaceStart;
