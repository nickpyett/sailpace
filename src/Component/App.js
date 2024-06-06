import { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from 'Component/Header';
import Main from 'Component/Main';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Header />
                    <Main />
                </div>
            </Router>
        );
    }
}

export default App;
