import React, { Component } from 'react';
import DisplayTimeEntity from 'Entity/DisplayTimeEntity';

class RaceStart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            timeSinceStart: this.props.timeSinceStart
        };

        this.timeSinceStartUpdateInterval = null;
    }

    componentDidMount() {
        if (null !== this.props.startDateTime) {
            this.setTimeSinceStartUpdateInterval();
        }
    }

    componentWillUnmount() {
        if (null !== this.timeSinceStartUpdateInterval) {
            clearInterval(this.timeSinceStartUpdateInterval);
        }
    }

    setTimeSinceStartUpdateInterval() {
        this.timeSinceStartUpdateInterval = setInterval(this.timeSinceStartUpdate.bind(this), 100);
    }

    timeSinceStartUpdate() {
        const now = new Date();
        const startDateTime = new Date(this.props.startDateTime);

        const differenceInMilliseconds = now - startDateTime;

        const displayTimeEntity = DisplayTimeEntity.fromMilliseconds(differenceInMilliseconds);

        this.setState({
            timeSinceStart: displayTimeEntity.getInTimeFormat()
        });
    }

    onRaceStartClickHandler() {
        if (this.props.startDateTime !== null) {
            return;
        }

        if (! window.confirm('Are you sure you wish to start the race?')) {
            return;
        }

        this.props.setStartDateTimeHandler();

        this.setTimeSinceStartUpdateInterval();
    }

    render() {
        const disabled = this.props.startDateTime !== null;

        return (
            <div>
                <button disabled={disabled} onClick={this.onRaceStartClickHandler.bind(this)}>Start Race</button>
                <div>{this.state.timeSinceStart}</div>
            </div>
        );
    }
}

export default RaceStart;
