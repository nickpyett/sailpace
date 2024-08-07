import { Route, Routes } from 'react-router-dom';
import About from 'Component/About';
import Race from 'Component/Race';
import RaceList from 'Component/RaceList';
import StoragePolicy from 'Component/StoragePolicy';

export default function Main() {
    return (
        <div className="p-4 flex-1">
            <Routes>
                <Route path="/" element={<RaceList />} />
                <Route path="race-list" element={<RaceList />} />
                <Route path="about" element={<About />} />
                <Route path="race/:raceId" element={<Race />} />
                <Route path="storage-policy" element={<StoragePolicy />} />
            </Routes>
        </div>
    );
}
