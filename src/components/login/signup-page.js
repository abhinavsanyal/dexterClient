import React, {Component} from 'react';
import SignupForm from './signup-form';
import AdminNavigationBar from '../navbar/admin-navigationbar';
// import Footer from '../footer';

class SignupPage extends Component {

    render() {
        return (
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <AdminNavigationBar/>
                    <SignupForm {...this.props} />
                </div>
                
            </div>
        )
    }
}

export default SignupPage;