import React, {Component} from 'react';
import LoginForm from './login-form';
import SignupForm from './signup-form';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
// @material-ui/icons
import Check from "@material-ui/icons/Check";
import Warning from "@material-ui/icons/Warning";
// core components
import Clearfix from "components/Clearfix/Clearfix.jsx";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
// core components
import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';

import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";

import image from "assets/img/loginBg.jpg";


import CloseIcon from '@material-ui/icons/Close';


const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const styles1 = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

function MySnackbarContent(props) {
  const { classes, className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

MySnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2,
  },
});



class LoginPage extends Component {

  
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      registerSuccess: false,
      loginFailed: false
    };
    
     
      }
      componentDidMount() {
        // we add a hidden class to the card and after 700 ms we delete it and the transition appears

        setTimeout(
          function() {
            this.setState({ cardAnimaton: "" });
          }.bind(this),
          700
        );
      }

      handleClose = (event, reason) => {
        const { signupStore } = this.props;
        signupStore.success= false;
        this.setState({registerSuccess: false});
       
        if (reason === 'clickaway') {
          return;
        }
      }
      handleExist = (event, reason) => {
        const { signupStore } = this.props;
        signupStore.alreadyExist= false;
        this.setState({registerSuccess: false});

        if (reason === 'clickaway') {
          return;
        }
      }
      handleLogin = (event, reason) => {
        const { loginStore } = this.props;
        loginStore.loginFailed= false;
        this.setState({registerSuccess: false});
      
        if (reason === 'clickaway') {
          return;
        }
      }
      
      render() {
        
        const { classes,loginStore,signupStore,...rest } = this.props;
        const {isLogin , loginFailed} = loginStore;
        let {success,alreadyExist} = signupStore;
        
        
   
        return (
        <div>

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={success}
          autoHideDuration={3000}
          onClose={this.handleClose}
        >
          <MySnackbarContentWrapper
            onClose={this.handleClose}
            variant="success"
            message="You have registered succesfully!"
          />
        </Snackbar>


        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={alreadyExist}
          autoHideDuration={3000}
          onClose={this.handleExist}
        >
          <MySnackbarContentWrapper
            onClose={this.handleExist}
            variant="error"
            message="User alredy exist!"
          />
        </Snackbar>

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={loginFailed}
          autoHideDuration={3000}
          onClose={this.handleLogin}
        >
          <MySnackbarContentWrapper
            onClose={this.handleLogin}
            variant="error"
            message="Invalid Credentials!"
          />
        </Snackbar>






       {/* <Snackbar


          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={success}
     
          autoHideDuration={7000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">You have registered succesfully</span>}
          action={[
           
            <IconButton
              key="close"
              aria-label="Close"
              color="success"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
          */}
         
      

            <Header
            absolute
            color="transparent"
            brand="Dexter"
            rightLinks={<HeaderLinks />}
            {...rest}
            />
            


             <div
                className={classes.pageHeader}
                style={{
                    backgroundImage: "url(" + image + ")",
                    backgroundSize: "cover",
                    backgroundPosition: "top center"
                }}
                >

                


          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={4}>
                <Card className={classes[this.state.cardAnimaton]}>
                    
                     { isLogin
                            ?  <LoginForm {...this.props} /> 
                            :  <SignupForm {...this.props} />
                        }
       
                  
                </Card>
              </GridItem>
            </GridContainer>
          
          </div>

            <Footer whiteFont />
            </div>      

        </div>
              
        )
    }
}


export default withStyles(loginPageStyle,styles)(inject('loginStore','signupStore')(observer(LoginPage)));




// import React from "react";
// // @material-ui/core components
// import withStyles from "@material-ui/core/styles/withStyles";
// import InputAdornment from "@material-ui/core/InputAdornment";
// import Icon from "@material-ui/core/Icon";
// // @material-ui/icons
// import Email from "@material-ui/icons/Email";
// import People from "@material-ui/icons/People";
// // core components
// import Header from "components/Header/Header.jsx";
// import HeaderLinks from "components/Header/HeaderLinks.jsx";
// import Footer from "components/Footer/Footer.jsx";
// import GridContainer from "components/Grid/GridContainer.jsx";
// import GridItem from "components/Grid/GridItem.jsx";
// import Button from "components/CustomButtons/Button.jsx";
// import Card from "components/Card/Card.jsx";
// import CardBody from "components/Card/CardBody.jsx";
// import CardHeader from "components/Card/CardHeader.jsx";
// import CardFooter from "components/Card/CardFooter.jsx";
// import CustomInput from "components/CustomInput/CustomInput.jsx";

// import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";

// import image from "assets/img/bg7.jpg";

// class LoginPage extends React.Component {
//   constructor(props) {
//     super(props);
//     // we use this to make the card to appear after the page has been rendered
//     this.state = {
//       cardAnimaton: "cardHidden"
//     };
//   }
//   componentDidMount() {
//     // we add a hidden class to the card and after 700 ms we delete it and the transition appears
//     setTimeout(
//       function() {
//         this.setState({ cardAnimaton: "" });
//       }.bind(this),
//       700
//     );
//   }
//   render() {
//     const { classes, ...rest } = this.props;
//     return (
//       <div>
//         <Header
//           absolute
//           color="transparent"
//           brand="Material Kit React"
//           rightLinks={<HeaderLinks />}
//           {...rest}
//         />
//         <div
//           className={classes.pageHeader}
//           style={{
//             backgroundImage: "url(" + image + ")",
//             backgroundSize: "cover",
//             backgroundPosition: "top center"
//           }}
//         >
//           <div className={classes.container}>
//             <GridContainer justify="center">
//               <GridItem xs={12} sm={12} md={4}>
//                 <Card className={classes[this.state.cardAnimaton]}>
//                   <form className={classes.form}>
//                     <CardHeader color="primary" className={classes.cardHeader}>
//                       <h4>Login</h4>
//                       <div className={classes.socialLine}>
//                         <Button
//                           justIcon
//                           href="#pablo"
//                           target="_blank"
//                           color="transparent"
//                           onClick={e => e.preventDefault()}
//                         >
//                           <i className={"fab fa-twitter"} />
//                         </Button>
//                         <Button
//                           justIcon
//                           href="#pablo"
//                           target="_blank"
//                           color="transparent"
//                           onClick={e => e.preventDefault()}
//                         >
//                           <i className={"fab fa-facebook"} />
//                         </Button>
//                         <Button
//                           justIcon
//                           href="#pablo"
//                           target="_blank"
//                           color="transparent"
//                           onClick={e => e.preventDefault()}
//                         >
//                           <i className={"fab fa-google-plus-g"} />
//                         </Button>
//                       </div>
//                     </CardHeader>
//                     <p className={classes.divider}>Or Be Classical</p>
//                     <CardBody>
//                       <CustomInput
//                         labelText="First Name..."
//                         id="first"
//                         formControlProps={{
//                           fullWidth: true
//                         }}
//                         inputProps={{
//                           type: "text",
//                           endAdornment: (
//                             <InputAdornment position="end">
//                               <People className={classes.inputIconsColor} />
//                             </InputAdornment>
//                           )
//                         }}
//                       />
//                       <CustomInput
//                         labelText="Email..."
//                         id="email"
//                         formControlProps={{
//                           fullWidth: true
//                         }}
//                         inputProps={{
//                           type: "email",
//                           endAdornment: (
//                             <InputAdornment position="end">
//                               <Email className={classes.inputIconsColor} />
//                             </InputAdornment>
//                           )
//                         }}
//                       />
//                       <CustomInput
//                         labelText="Password"
//                         id="pass"
//                         formControlProps={{
//                           fullWidth: true
//                         }}
//                         inputProps={{
//                           type: "password",
//                           endAdornment: (
//                             <InputAdornment position="end">
//                               <Icon className={classes.inputIconsColor}>
//                                 lock_outline
//                               </Icon>
//                             </InputAdornment>
//                           )
//                         }}
//                       />
//                     </CardBody>
//                     <CardFooter className={classes.cardFooter}>
//                       <Button simple color="primary" size="lg">
//                         Get started
//                       </Button>
//                     </CardFooter>
//                   </form>
//                 </Card>
//               </GridItem>
//             </GridContainer>
//           </div>
//           <Footer whiteFont />
//         </div>
//       </div>
//     );
//   }
// }

// export default withStyles(loginPageStyle)(LoginPage);
