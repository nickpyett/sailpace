import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import About from 'Component/About';
import RaceOptions from 'Component/RaceOptions';

class Main extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={RaceOptions} />
                <Route path="/race" component={RaceOptions} />
                <Route path="/about" component={About} />
            </Switch>
        );
    }
}

export default Main;
