import {observable, decorate, action} from 'mobx'
import GenericFormStore from './generic-form'
import axios from 'axios';
import _ from 'lodash';
import loginStore from './login';




class SignUpStore extends GenericFormStore {
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
            passwordConfirmation: {
                value: '',
                error: null,
                rule: 'required'
            },
        },
        meta: {
            isValid: true,
            message: null,
            error: null,
        },
    }

    loggedIn = false;

    success = false;
    alreadyExist = false;

    reset = (msg) => {
        this.setError({});
        this.setMessage(msg);
        this.form.fields.email.value = '';
        this.form.fields.password.value = '';
        this.form.fields.passwordConfirmation.value = '';
    }

    onSubmit = (history) => {
        const {fields} = this.form;
        this.setMessage('');

        if (_.isEmpty(fields.email.value) || _.isEmpty(fields.password.value) || _.isEmpty(fields.passwordConfirmation.value)) {
            this.setError({user: "invalid details"})
            return Promise.resolve({user: "invalid details"});
        } else if (fields.password.value !== fields.passwordConfirmation.value) {
            this.setError({passwords: "entered do not match"});
            return Promise.resolve({passwords: "entered do not match"});;
        }

       return  axios.post("/users", fields)
            .then((res) => {
          
                this.success = true;
                this.reset(res.data.message)            
                
            })
            .catch(err => {
     
                this.alreadyExist = true;
                if (err.response.data.errors) {
                    this.setError(err.response.data.errors)
                } else {
                    this.setError('')
                }
            }).finally(()=>{
              
            });

    }
}

decorate(SignUpStore, {
    form: observable,
    loggedIn: observable,
    setMessage: action,
    setError: action,
    reset: action,
});

export default new SignUpStore();
