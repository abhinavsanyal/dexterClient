import React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import LoginPage from '../components/login/login-page';
import AdminLoginPage from '../components/login/login-admin-page';
import SignupPage from '../components/login/signup-page';
import {inject, observer} from 'mobx-react';
import Questions from '../components/questions';
import '../components/hoc/loadingHOC.css';
import App from '../App';

class Routes extends React.Component {
    render() {

        const {loggedIn, isAdmin} = this.props.loginStore;

        return (<BrowserRouter>
            <div>
                <Switch>
                    <Route exact strict path="/editor" render={(props) => (
                        !loggedIn ? (
                            <Redirect to="/"/>
                        ) : (
                            <App {...props}/>
                        )
                    )}
                    />

                    <Route exact strict path="/question" render={(props) => (
                        !loggedIn ? (
                            <Redirect to="/"/>
                        ) : (
                            <Questions {...props}/>
                        )
                    )}
                    />

                    <Route exact strict path="/signup" render={(props) => (
                        !isAdmin ? (
                            <Redirect to="/adm"/>
                        ) : (
                            <SignupPage {...props}/>
                        )
                    )}
                    />

                    <Route exact strict path="/adm" component={AdminLoginPage}/>
                    <Route exact strict path="/" component={LoginPage}/>
                    <Redirect to="/"/>
                </Switch>
            </div>
        </BrowserRouter>);
    }
}

export default inject('loginStore')(observer(Routes));
