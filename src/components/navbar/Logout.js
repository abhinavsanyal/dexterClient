import React from 'react';
import {inject, observer} from "mobx-react";


class Logout extends React.Component {
    render() {
        return (
            <span>
               <span>{this.props.loginStore.email}</span>
            </span>
        );
    }
}

export default inject('loginStore')(observer(Logout));