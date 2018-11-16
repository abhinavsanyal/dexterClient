import React from 'react';
import FormInput from './form-input';
import {inject, observer} from 'mobx-react';
import ListMessages from './listmessages';
import './login-form.css';
import UserInstructions from './candidateinstructions';

class LoginForm extends React.Component {

    render() {

        const {loginStore} = this.props;
        const {form} = loginStore;
        const {fields, meta} = form;

        return (
            <div className="login">
                <UserInstructions/>
                <form className="login-form" onSubmit={this.submit}>
                    <h5 className="login-form__title">Complete this form to start the challenge</h5>
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
                           value="Login"
                           type="submit"/>
                </form>
            </div>
        )
    }

    submit = (event) => {
        event.preventDefault();
        const {loginStore} = this.props;
        loginStore.onSubmit(this.props.history)
    }
}

export default inject('loginStore')(observer(LoginForm));
