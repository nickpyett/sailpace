import { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import About from 'Component/About';
import RaceList from 'Component/RaceList';
import Race from 'Component/Race';

class Main extends Component {
    render() {
        return (
            <>
                <div className="p-4">
                    <Routes>
                        <Route path="/" element={<RaceList />} />
                        <Route path="race" element={<RaceList />} />
                        <Route path="about" element={<About />} />
                        <Route path="race/:id" element={<Race />} />
                    </Routes>
                </div>
                <div className="m-4 py-4 border-t border-sky-600 text-sm">&copy; Nick Pyett 2024</div>
            </>
        );
    }
}

export default Main;
