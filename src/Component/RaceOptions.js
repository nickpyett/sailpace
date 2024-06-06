import { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import Race from 'Component/Race';
import RaceList from 'Component/RaceList';

class RaceOptions extends Component {
    render() {
        return (
            <Routes>
                <Route exact path="/" element={<RaceList />} />
                <Route exact path="/race" element={<RaceList />} />
                <Route path="/race/*" element={<Race />} />
            </Routes>
        );
    }
}

export default RaceOptions;
