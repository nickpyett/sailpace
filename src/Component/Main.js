import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import About from 'Component/About';
import RaceList from 'Component/RaceList';
import Race from 'Component/Race';

class Main extends Component {
    render() {
        return (
            <Routes>
                <Route path="/" element={<RaceList />} />
                <Route path="race" element={<RaceList />} />
                <Route path="about" element={<About />} />
                <Route path="race/:id" element={<Race />} />
            </Routes>
        );
    }
}

export default Main;
