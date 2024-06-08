import { Component } from 'react';
import { HashRouter, Link } from 'react-router-dom';
import Header from 'Component/Header';
import Main from 'Component/Main';

class App extends Component {
    render() {
        return (
            <HashRouter>
                <Header />
                <Main />
                <div className="mx-4 py-4 border-t border-sky-600 text-sm">&copy; Nick Pyett 2024 | <Link to="/storage-policy" className="text-sky-800 hover:text-sky-700 underline">Storage Policy</Link></div>
            </HashRouter>
        );
    }
}

export default App;
