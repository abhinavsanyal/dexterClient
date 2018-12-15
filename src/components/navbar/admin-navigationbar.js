import React from 'react';
import {Link} from 'react-router-dom';
import {inject, observer} from 'mobx-react';
import Logout from './Logout';
import './style.css';

class AdminNavigationBar extends React.Component {

    confirmLogout = () => {
        const logout = window.confirm("Are you sure you want to logout");

        if (logout)
            this.props.loginStore.logout();
    }

    render() {
        const {isAdmin} = this.props.loginStore;

        const adminLink = (
            <ul className="nav navbar-nav navbar-right">
                <li><a href="#" onClick={this.confirmLogout}><Logout/></a></li>
            </ul>
        );

        const userLinks = (
            <ul className="nav navbar-nav navbar-right">
                <Link to="/" className="navbar-brand">User Login</Link>
            </ul>
        );

        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <span className="navbar-brand">Rails Web Editor</span>
                    </div>
                    <div className="collapse navbar-collapse">
                        {isAdmin ? adminLink : userLinks}
                    </div>
                </div>
            </nav>
        );
    }
}

export default inject('loginStore')(observer(AdminNavigationBar));