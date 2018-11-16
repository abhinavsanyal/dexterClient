import React from 'react';
import FormInput from './form-input'
import {observer, inject} from 'mobx-react'
import ListMessages from './listmessages';
import './login-form.css'

class AdminLoginForm extends React.Component {

    render() {

        const {loginStore} = this.props;
        const {form} = loginStore;
        const {fields, meta} = form;

        return (
            <form className="login-form" onSubmit={this.submit}>
                <h3 className="login-form__title">Admin Login</h3>
                <div className="login-form__field">
                    <FormInput type="email"
                               name="email"
                               value={fields.email.value}
                               error={fields.email.error}
                               onChange={this.props.loginStore.onFieldChange}
                               placeholder="Email"/>
                </div>
                <div className="login-form__field">
                    <FormInput type="password"
                               name="password"
                               value={fields.password.value}
                               error={fields.password.error}
                               onChange={this.props.loginStore.onFieldChange}
                               placeholder="password"/>
                </div>

                {meta.error ? <div className="login-form__error">
                    <ListMessages errors={meta.error}/>
                </div> : null}

                <input className="login-form__submit"
                       disabled={!meta.isValid}
                       value="Continue"
                       type="submit"/>
            </form>
        )
    }

    submit = (event) => {
        event.preventDefault();
        const {loginStore} = this.props;
        loginStore.onSubmitAdmin(this.props.history)
    }
}

export default inject('loginStore')(observer(AdminLoginForm));
