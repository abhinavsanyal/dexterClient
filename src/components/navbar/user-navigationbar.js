import React from 'react';
import {Link} from 'react-router-dom';
import {inject, observer} from "mobx-react/index";
import Logout from './Logout';
import './style.css';

class UserNavigationBar extends React.Component {

    confirmLogout = () => {
        const logout = window.confirm("Are you sure you want to logout");
        if (logout)
            this.props.loginStore.logout();
    }

    render() {
        const {loggedIn} = this.props.loginStore;

        const logOut = (
            <ul className="nav navbar-nav navbar-right">
                <li><a href="#" className="navbar-brand" onClick={this.confirmLogout}><Logout/></a></li>
            </ul>
        )

        const userLinks = (
            <ul className="nav navbar-nav navbar-right">
                <Link to="/adm" className="navbar-brand">Admin</Link>
            </ul>
        )

        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <span className="navbar-brand">Rails Web Editor</span>
                    </div>
                    <div className="collapse navbar-collapse">
                        {loggedIn ? logOut : userLinks}
                    </div>
                </div>
            </nav>
        );
    }
}

export default inject('loginStore')(observer(UserNavigationBar));