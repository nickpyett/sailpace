import { Component } from 'react';

class RaceTitle extends Component {
    onRaceTitleChangeHandler(e) {
        this.props.onRaceTitleChangeHandler(e.target.value);
    }

    render() {
        return (
            <div className="my-4">
                <label htmlFor="race-title">Name:</label> <input type="text" id="race-title" value={this.props.title} onChange={this.onRaceTitleChangeHandler.bind(this)} className="border border-gray-300 px-1" />
            </div>
        );
    }
}

export default RaceTitle;
