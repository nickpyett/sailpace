import React, { Component } from 'react';

    }

class RacerTable extends Component {
    render() {
        let trs = [];

        this.props.sailors.forEach(sailer => {
            trs.push(<RacerRow key={sailer.id} sailor={sailer} onChangeHandler={this.props.onChangeHandler} />);
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
        // console.log(sailor);

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
        return (
            <div className="app">
                <RacerTable onChangeHandler={this.onChangeHandler.bind(this)} sailors={this.state.sailors} />
            </div>
        );
    }
}

export default App;
