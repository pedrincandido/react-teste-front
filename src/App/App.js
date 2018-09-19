import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers/history';
import { RegisterPage } from '../components/signin/RegisterPage';
import { PrivateRoute } from '../_route/PrivateRoute';
import { LoginPage } from '../components/signin/LoginPage';

class App extends React.Component {
    constructor(props) {
        super(props);

        const {dispatch} = this.props;
        history.listen((location, action) => {
            // clear alert on location change
        });
    }

    render() {
        const { alert } = this.props;
        return (
            // <div className="jumbotron">
                // <div className="container">
                    // <div className="col-sm-8 col-sm-offset-2">
                        // {alert.message &&
                            // <div className={`alert ${alert.type}`}>{alert.message}</div>
                        // }
                        <Router history={history}>
                            <div className="app">
                                {/* <PrivateRoute exact path="/" component={LoginPage} /> */}
                                <Route path="/login" component={LoginPage} />
                                <Route path="/register" component={RegisterPage} />
                            </div>
                        </Router>
                    // </div>
                // </div>
            // </div>
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