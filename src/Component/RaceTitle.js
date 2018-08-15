import React, { Component } from 'react';

class RaceTitle extends Component {
    onRaceTitleChangeHandler(e) {
        this.props.onRaceTitleChangeHandler(e.target.value);
    }

    render() {
        return (
            <div>
                <label htmlFor="race-title">Race:</label> <input type="text" id="race-title" value={this.props.title} onChange={this.onRaceTitleChangeHandler.bind(this)} />
            </div>
        );
    }
}

export default RaceTitle;
