import React from 'react';
import classNames from 'classnames'
import './form-input.css'



import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";

import CustomInput from "components/CustomInput/CustomInput.jsx";

import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";


let getFormInputClasses = ({error}) => {
    return classNames('form-input', {
        'form-input--error': !!error,
    })
};

let FormInput = (props) => {
    let {type,labelText,id,icon, error, name,onChange,classes, ...rest} = props;
    console.dir(onChange);
    return (
    //     <span className={getFormInputClasses(props)}>
    //   <input {...rest}
    //          className="form-input__field"
    //          type={type}
    //          onChange={(e) => onChange(e.target.name, e.target.value)}/>
    //         {error ? <div className="form-input__error">
    //             {error}
    //         </div> : null}
    // </span>

<CustomInput  {...rest}
labelText={labelText}
id={id}
type={type}
formControlProps={{
    fullWidth: true
}}
inputProps={{
    name : name,
    onChange: onChange,
    endAdornment: (
    <InputAdornment position="end">

     { icon === 'pass'
        ? <Icon className={classes.inputIconsColor}>lock_outline</Icon>
        :   <Email className={classes.inputIconsColor} />
      }
       
    </InputAdornment>
  )
}}
/>
    )
};

export default withStyles(loginPageStyle)(FormInput);

// withStyles(loginPageStyle)(LoginForm);
