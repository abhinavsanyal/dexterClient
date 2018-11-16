import React from 'react';
import FormInput from './form-input'
import {inject, observer} from 'mobx-react'
import './login-form.css'
import ListMessages from './listmessages';

class SignupForm extends React.Component {

    render() {

        const {signupStore} = this.props;
        const {form} = signupStore;
        const {fields, meta} = form;

        return (
            <form className="login-form" onSubmit={this.submit}>
                <h3 className="login-form__title">Add New User</h3>
                <div className="login-form__field">
                    <FormInput type="email"
                               name="email"
                               value={fields.email.value}
                               error={fields.email.error}
                               onChange={this.props.signupStore.onFieldChange}
                               placeholder="Email"/>
                </div>
                <div className="login-form__field">
                    <FormInput type="password"
                               name="password"
                               value={fields.password.value}
                               error={fields.password.error}
                               onChange={this.props.signupStore.onFieldChange}
                               placeholder="password"/>
                </div>

                <div className="login-form__field">
                    <FormInput type="password"
                               name="passwordConfirmation"
                               value={fields.passwordConfirmation.value}
                               error={fields.passwordConfirmation.error}
                               onChange={this.props.signupStore.onFieldChange}
                               placeholder="retype password"/>
                </div>

                {meta.error ? <div>
                    <ListMessages errors={meta.error}/>
                </div> : null}

                {meta.message ? <div>
                    <ListMessages messages={meta.message}/>
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
        const {signupStore} = this.props;
        signupStore.onSubmit(this.props.history)
    }
}

export default inject('signupStore', 'loginStore')(observer(SignupForm));
