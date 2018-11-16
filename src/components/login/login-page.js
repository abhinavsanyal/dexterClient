import React, {Component} from 'react';
import LoginForm from './login-form';
import UserNavigationBar from '../navbar/user-navigationbar';
import Footer from '../footer';

class LoginPage extends Component {

    render() {
        return (
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <UserNavigationBar/>
                    <LoginForm {...this.props} />
                </div>
                <Footer/>
            </div>
        )
    }
}

export default LoginPage;