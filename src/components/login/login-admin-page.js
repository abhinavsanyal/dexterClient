import React, {Component} from 'react';
import AdminLoginForm from './login-admin-form';
import AdminNavigationBar from '../navbar/admin-navigationbar';
// import Footer from '../footer';

class AdminLoginPage extends Component {

    render() {
        return (
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <AdminNavigationBar/>
                    <AdminLoginForm {...this.props} />
                </div>
               
            </div>
        )
    }
}

export default AdminLoginPage;