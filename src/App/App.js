import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers/history';
import { RegisterPage } from '../components/signin/RegisterPage';
import { PrivateRoute } from '../_route/PrivateRoute';
import { LoginPage } from '../components/signin/LoginPage';
import { SitePage } from '../components/Site/SitePage';
;

class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
        });
    }

    render() {
        const { alert } = this.props;
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/login" component={LoginPage} />
                    <Route path="/register" component={RegisterPage} />
                    <PrivateRoute exact path="/" component={LoginPage} />
                    <Route path="/site" component={SitePage} />
                </Switch>
            </Router>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 