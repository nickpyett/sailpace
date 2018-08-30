import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Race from 'Component/Race';
import RaceList from 'Component/RaceList';

class RaceOptions extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={RaceList} />
                <Route exact path="/race" component={RaceList} />
                <Route path="/race/:id" component={Race} />
            </Switch>
        );
    }
}

export default RaceOptions;
