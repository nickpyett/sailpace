import { Component } from 'react';

class RaceTableHeader extends Component {
    onRemoveLapClickHanlder() {
        this.props.onRemoveLapClickHanlder(this.props.lap);
    }

    onSortButtonClickHandler() {
        this.props.onSortButtonClickHandler('lap', this.props.lap);
    }

    render() {
        return (
            <th className="p-2 w-48">
                Lap {this.props.lap.number}
                &nbsp;
                <button type="button" onClick={this.onSortButtonClickHandler.bind(this)}>&#x25B2;&#x25BC;</button>
                <button type="button" disabled={this.props.disabled} onClick={this.onRemoveLapClickHanlder.bind(this)}>x</button>
            </th>
        );
    }
}

export default RaceTableHeader;
