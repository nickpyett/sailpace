import { Component } from 'react';
import { HashRouter } from 'react-router-dom';
import Header from 'Component/Header';
import Main from 'Component/Main';

class App extends Component {
    render() {
        return (
            <HashRouter>
                <Header />
                <Main />
                <div className="mx-4 py-4 border-t border-sky-600 text-sm">&copy; Nick Pyett 2024</div>
            </HashRouter>
        );
    }
}

export default App;
