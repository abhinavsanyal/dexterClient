import {action, toJS, decorate} from 'mobx'
import Validator from 'validatorjs';

class FormStore {
    getFlattenedValues = (valueKey = 'value') => {
        let data = {};
        let form = toJS(this.form).fields;
        Object.keys(form).map(key => data[key] = form[key][valueKey]);
        return data
    };

    onFieldChange = (event) => {

        let field = event.target.name;
        let value = event.target.value
        this.form.fields[field].value = value;
        var validation = new Validator(
            this.getFlattenedValues('value'),
            this.getFlattenedValues('rule'));
        this.form.meta.isValid = validation.passes();
        this.form.fields[field].error = validation.errors.first(field)
    };

    setError = (errMsg) => {
        this.form.meta.error = errMsg
    }

    setMessage = (msg) => {
        this.form.meta.message = msg
    }
}

decorate(FormStore, {
    setError: action,
    onFieldChange: action,
    setMessage: action
});

export default FormStore

// field, value