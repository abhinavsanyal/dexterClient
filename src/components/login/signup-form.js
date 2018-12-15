import React from 'react';
import FormInput from './form-input'
import {inject, observer} from 'mobx-react'
// import './login-form.css'
import ListMessages from './listmessages';


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
import { withSnackbar } from 'notistack';

class SignupForm extends React.Component {

    render() {

        const {signupStore,classes } = this.props;
        const {form} = signupStore;
        const {fields, meta} = form;

      

        return (
         
            <form  className={classes.form} onSubmit={this.submit}>
                {/* <h3 className="login-form__title">Add New User</h3>
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
                       type="submit"/> */}


                        <CardHeader  style={{background: 'linear-gradient(90deg, rgba(255,4,59,1) 0%, rgba(242,0,58,1) 85%, rgba(255,0,48,1) 100%)',color: "#ffffff"}} className={classes.cardHeader}>
                      <h4>Signup</h4>
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
                                   onChange={this.props.signupStore.onFieldChange}
                                   placeholder="Email"/>

                    <FormInput type="password"
                           name="password"
                           labelText = "Password"
                           id="pass"
                           icon ="pass"
                           value={fields.password.value}
                           error={fields.password.error}
                           onChange={this.props.signupStore.onFieldChange}
                           placeholder="password"/>

                    <FormInput type="password"
                           name="passwordConfirmation"
                           labelText = "Confirm Password"
                           id="pass"
                           icon ="pass"
                           value={fields.passwordConfirmation.value}
                           error={fields.passwordConfirmation.error}
                           onChange={this.props.signupStore.onFieldChange}
                          
                           placeholder="retype password"/>

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
                <Button   type="submit" value="Login" disabled={!meta.isValid } style={{ margin: "10px"}}  default color="danger" size="lg"  >
                  Signup
                </Button>
                      <Button   default color="rose" size="lg" onClick={(event) => this.handleClick(event) }  >
                        Login
                      </Button>
                     
                    </CardFooter>
            </form>

          
        )
    }

    submit = (event) => {
        event.preventDefault();
        const {signupStore} = this.props;
        const {loginStore} = this.props;
      
        signupStore.onSubmit(this.props.history).then(() => { 

            loginStore.isLogin = true;
        })

    }

      handleClick = (event) => {
            event.preventDefault();
            const {loginStore} = this.props;
            loginStore.onRegister()
        }
}

export default withStyles(loginPageStyle)(inject('signupStore', 'loginStore')(withSnackbar(observer(SignupForm))));

// withStyles(loginPageStyle)(inject('loginStore')(observer(LoginForm)));
