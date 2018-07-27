import React, { Component } from 'react';
import UUID from 'uuid';

class AddRacer extends Component {
    render() {
        return (
            <button onClick={this.props.onAddRacer}>Add Sailor</button>
        )
    }
}

class RacerTable extends Component {
    render() {
        const racerRows = this.props.sailors.map(sailer => {
            return <RacerRow key={sailer.id} sailor={sailer} onChangeHandler={this.props.onChangeHandler} />;
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
                    {racerRows}
                </tbody>
            </table>
        );
    }
}

class RacerRow extends Component {
    onChangeHandler(e) {
        this.props.onChangeHandler(this.props.sailor, e.target.name, e.target.value);
    }

    render() {
        return (
            <tr>
                <td><input type="text" name="sailorName" value={this.props.sailor.sailorName} onChange={this.onChangeHandler.bind(this)} /></td>
                <td><input type="text" name="boatNumber" value={this.props.sailor.boatNumber} onChange={this.onChangeHandler.bind(this)} /></td>
            </tr>
        );
    }
}

class App extends Component {
    constructor(props) {
        super(props);

        const sailors = [{
            id: UUID.v4(),
            sailorName: 'Sailor One',
            boatNumber: '142'
        }, {
            id: UUID.v4(),
            sailorName: 'Sailor Two',
            boatNumber: '56'
        }];

        this.state = {
            sailors: sailors
        };
    }

    onChangeHandler(sailor, name, value) {
        const updatedSailors = this.state.sailors.map(sailorRow => {
            if (sailor.id === sailorRow.id) {
                sailorRow[name] = value;
            }

            return sailorRow;
        });

        this.setState({
            sailors: updatedSailors
        });
    }

    onAddRacer() {
        const updatedSailors = this.state.sailors.concat({
            id: UUID.v4(),
            sailorName: '',
            boatNumber: ''
        });

        this.setState({
            sailors: updatedSailors
        });
    }

    render() {
        return (
            <div className="app">
                <AddRacer onAddRacer={this.onAddRacer.bind(this)} />

                <RacerTable onChangeHandler={this.onChangeHandler.bind(this)} sailors={this.state.sailors} />
            </div>
        );
    }
}

export default App;
