import React from 'react';
import FormInput from './form-input';
import {inject, observer} from 'mobx-react';
import ListMessages from './listmessages';
// import './login-form.css';




import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";

import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";


class LoginForm extends React.Component {

    handleClick = (event) => {
        event.preventDefault();
        const {loginStore} = this.props;
        loginStore.onRegister()
    }
    submit = (event) => {
        event.preventDefault();
        const {loginStore} = this.props;
        loginStore.onSubmit(this.props.history);
       
    }
    render() {

        const {loginStore,classes} = this.props;
        const {form} = loginStore;
        const {fields, meta} = form;



        return (

            <div>
 <form className={classes.form} onSubmit={this.submit}>
            {/* <h5 className="login-form__title">Complete this form to start the challenge</h5>
            <div className="login-form__field">
                <FormInput type="email"
                           name="email"
                           value={fields.email.value}
                           error={fields.email.error}
                           onChange={this.props.loginStore.onFieldChange}
                           placeholder="Email"   {...this.props} />
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
        */}
               
                    <CardHeader  style={{background: 'linear-gradient(90deg, rgba(255,4,59,1) 0%, rgba(242,0,58,1) 85%, rgba(255,0,48,1) 100%)',color: "#ffffff"}} className={classes.cardHeader}>
                      <h4>Login</h4>
                      <div className={classes.socialLine}>
                        <Button
                          justIcon
                          href="#pablo"
                          target="_blank"
                          color="transparent"
                          onClick={e => e.preventDefault()}
                        >
                          <i className={"fab fa-twitter"} />
                        </Button>
                        <Button
                          justIcon
                          href="#pablo"
                          target="_blank"
                          color="transparent"
                          onClick={e => e.preventDefault()}
                        >
                          <i className={"fab fa-facebook"} />
                        </Button>
                        <Button
                          justIcon
                          href="#pablo"
                          target="_blank"
                          color="transparent"
                          onClick={e => e.preventDefault()}
                        >
                          <i className={"fab fa-google-plus-g"} />
                        </Button>
                      </div>
                    </CardHeader>
                    
                    <CardBody>
                    <FormInput type="email"
                                   name="email"
                                   labelText = "Email"
                                   id="email"
                                   icon ="email"
                                   value={fields.email.value}
                                   error={fields.email.error}
                                   onChange={this.props.loginStore.onFieldChange}
                                   placeholder="Email"/>

                    <FormInput type="password"
                           name="password"
                           labelText = "Password"
                           id="pass"
                           icon ="pass"
                           value={fields.password.value}
                           error={fields.password.error}
                           onChange={this.props.loginStore.onFieldChange}
                           placeholder="password"/>

                      {/* <CustomInput
                        labelText="Email..."
                        id="email"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "email",
                          endAdornment: (
                            <InputAdornment position="end">
                              <Email className={classes.inputIconsColor} />
                            </InputAdornment>
                          )
                        }}
                      />
                      <CustomInput
                        labelText="Password"
                        id="pass"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "password",
                          endAdornment: (
                            <InputAdornment position="end">
                              <Icon className={classes.inputIconsColor}>
                                lock_outline
                              </Icon>
                            </InputAdornment>
                          )
                        }}
                      /> */}
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                    {/* <input className="login-form__submit"
                   disabled={!meta.isValid}
                   value="Login"
                   type="submit"/> */}
                      <Button   type="submit" value="Login" disabled={!meta.isValid} default color="danger" size="lg"  >
                        Login
                      </Button>
                     
                      <Button   style={{ margin: "10px"}}  default color="rose" size="lg" onClick={(event) => this.handleClick(event)} >
                        Signup
                      </Button>
                    </CardFooter>
                  </form>


            </div>
           
           
        )
               

    }

 
}

export default withStyles(loginPageStyle)(inject('loginStore')(observer(LoginForm)));


 