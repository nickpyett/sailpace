import React, { Component } from 'react';

class RacerTable extends Component {
    constructor(props) {
        super(props);

        const sailors = [{
            id: 1,
            sailorName: 'Sailor One',
            boatNumber: '142'
        }, {
            id: 2,
            sailorName: 'Sailor Two',
            boatNumber: '56'
        }];

        this.state = {
            sailors: sailors
        };
    }

    onChangeHandler(sailor, name, value) {
        let currentSailors = this.state.sailors;

        currentSailors.forEach(sailorRow => {
            if (sailor.id === sailorRow.id) {
                sailorRow[name] = value;
            }
        });

        this.setState({
            sailors: currentSailors
        });
    }

    render() {
        let trs = [];

        this.state.sailors.forEach(sailer => {
            trs.push(<RacerRow key={sailer.id} sailor={sailer} onChangeHandler={this.onChangeHandler.bind(this)} />);
        });

        return (
            <table>
                <thead>
                    <tr>
                        <th>Sailor name</th>
                        <th>Boat number</th>
                    </tr>
                </thead>
                <tbody>
                    {trs}
                </tbody>
            </table>
        );
    }
}

class RacerRow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sailor: props.sailor
        };
    }

    onChangeHandler(e) {
        this.props.onChangeHandler(this.state.sailor, e.target.name, e.target.value);
    }

    render() {
        return (
            <tr>
                <td><input type="text" name="sailorName" value={this.state.sailor.sailorName} onChange={this.onChangeHandler.bind(this)} /></td>
                <td><input type="text" name="boatNumber" value={this.state.sailor.boatNumber} onChange={this.onChangeHandler.bind(this)} /></td>
            </tr>
        );
    }
}

class App extends Component {
    render() {
        return (
            <div className="app">
                <RacerTable />
            </div>
        );
    }
}

export default App;
