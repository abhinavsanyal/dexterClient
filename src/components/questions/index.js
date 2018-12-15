import React from 'react';
import Question from './question';
import './style.css';
import UserNavigationBar from '../navbar/user-navigationbar';
import {inject, observer} from "mobx-react/index";
// import Footer from '../footer';
// import '../hoc/loadingHOC.css';


import Header from "components/Header/Header.jsx";
import HeaderLinksNav from "components/Header/HeaderLinksNav.jsx";
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import Footer from "components/Footer/Footer.jsx";
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
const styles = theme => ({
    root: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
    },
    card: {
        minWidth: 275,
        height: '290px',
        position: 'relative'
      },
      bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
      },
      title: {
        fontSize: 14,
      },
      pos: {
        marginBottom: 12,
      },
});

class Questions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {questions: [], loading: true};
    }

    componentDidMount = () => {
        this.props.loginStore.fetchQuestions()
            .then((res) => this.setState({questions: res.data, loading: false}));
        }
        
    render = () => {
            
        const {classes} = this.props;
        const questions = this.state.questions.map(q =>
            (<GridItem xs={4} key={q.id} >
                <Card className={classes.card}>
              
                     <Question title={q.title}
                        description={q.description} id={q.id}
                        subquestion={q.subquestion} {...this.props}
                        basecodedir={q.basecodedir}/>
               
                  
                </Card>
              </GridItem>
            ));
            

        if (this.state.loading) {
            return <div className="loader"/>
        }


        return (
            <div>

                <Header
                absolute
                color="dark"
                brand="Dexter"
                rightLinks={<HeaderLinksNav />}
                {...this.props}
                />

            
            <div
                className={classes.pageHeader}
                style={{
                    backgroundImage: 'linear-gradient(90deg, rgba(233,233,229,1) 0%, rgba(255,251,243,1) 61%, rgba(238,238,236,1) 100%);',
                    backgroundSize: "cover",
                    backgroundPosition: "top center",
                    height: '100vh',
                    paddingTop: '90px',
                    paddingLeft: '100px',
                    paddingRight: '100px'
                }}

                
            >

                        <div className={classes.container}>
            <h1>Choose one of the challenges</h1>
                            <GridContainer alignItems="flex-start" spacing={0}>
                            
                            {questions}
                          
                            </GridContainer>
                        
                        </div>
                {/* <h3>Choose one of the challenges</h3> */}
                {/* <div className="questions"> */}
                    {/* <Paper className={classes.root} elevation={1}>
                        <Typography variant="h5" component="h3">
                        This is a sheet of paper.
                        </Typography>
                        <Typography component="p">
                        Paper can be used to build surface or other elements for your application.
                        </Typography>
                    </Paper> */}
                    {/* <ul>{questions}</ul>
                </div> */}

                
             <Footer   style={{
                    position: 'absolute',
                    bottom: "0"
                }
                   
                }/>
            </div>
         </div>);
    }
}

export default  withStyles(styles)(inject("loginStore")(observer(Questions)));
