import { Component } from 'react';

class RaceTableHeader extends Component {
    onRemoveLapClickHandler() {
        this.props.onRemoveLapClickHandler(this.props.lap);
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
                <button type="button" disabled={this.props.disabled} title={this.props.disabled ? 'Only the last lap may be deleted' : 'Delete this lap'} onClick={this.onRemoveLapClickHandler.bind(this)} className="ml-2 cta-small font-normal">x</button>
            </th>
        );
    }
}

export default RaceTableHeader;
