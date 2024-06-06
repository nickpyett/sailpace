import { Component } from 'react';

class RaceTitle extends Component {
    onRaceTitleChangeHandler(e) {
        this.props.onRaceTitleChangeHandler(e.target.value);
    }

    render() {
        return (
            <div className="my-2">
                <label htmlFor="race-title">Name:</label> <input type="text" id="race-title" value={this.props.title} onChange={this.onRaceTitleChangeHandler.bind(this)} />
            </div>
        );
    }
}

export default RaceTitle;
