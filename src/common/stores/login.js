import {action, decorate, observable} from 'mobx'
import GenericFormStore from './generic-form'
import axios from 'axios';
import _ from 'lodash';
import setAuthorizationToken from '../utils/setAuthToken';

class LoginStore extends GenericFormStore {
    form = {
        fields: {
            email: {
                value: '',
                error: null,
                rule: 'required|email'
            },
            password: {
                value: '',
                error: null,
                rule: 'required'
            },
        },
        meta: {
            isValid: true,
            error: null,
            message: null,
        },
    }

    loggedIn = false;

    isAdmin = false;

    ready = false;

    email = null;

    reset = (msg) => {
        this.setError({});
        this.setMessage(msg);
        this.form.fields.email.value = '';
        this.form.fields.password.value = '';
    }

    logout = () => {
        this.loggedIn = false;
        this.isAdmin = false;
        this.reset();
        setAuthorizationToken(undefined);
    }

    onSubmit = (history) => {
        const {fields} = this.form;

        if (_.isEmpty(fields.email.value) || _.isEmpty(fields.password.value)) {
            this.setError("invalid user email/password")
            return;
        }
        return axios.post("/auth", fields)
            .then(res => this.setLoggedIn(res))
            .then(() => history.push("/question"))
            .catch(err => {
                if (err.response.data.errors)
                    this.setError(err.response.data.errors)
                else
                    this.setError({});
            });
    }

    fetchQuestions = () => {
        return axios.get("/questions");
    }

    onSubmitAdmin = (history) => {
        const {fields} = this.form;

        if (_.isEmpty(fields.email.value) || _.isEmpty(fields.password.value)) {
            this.setError("invalid user email/password")
            return;
        }

        return axios.post("/admin", fields)
            .then(res => this.setAdmin(res))
            .then(() => history.push("/signup"))
            .catch(err => {
                if (err.response.data.errors)
                    this.setError(err.response.data.errors)
                else
                    this.setError('');
            });

    }

    setLoggedIn = (res) => {
        this.email = res.data.email;
        this.loggedIn = true;
        setAuthorizationToken(res.data.token);
    }

    setAdmin = (res) => {
        this.email = res.data.email;
        this.isAdmin = true;
        setAuthorizationToken(res.data.token);
    }

}


decorate(LoginStore, {
    email: observable,
    form: observable,
    loggedIn: observable,
    isAdmin: observable,
    ready: observable,
    setLoggedIn: action,
    setAdmin: action,
    setError: action,
    waitBeforeLoad: action,
    reset: action,
});

export default new LoginStore();
