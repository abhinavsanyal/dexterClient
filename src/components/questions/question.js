import React from 'react';
import {inject, observer} from 'mobx-react';
import './style.css';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from "components/CustomButtons/Button.jsx";
import { inherits } from 'util';

import Schedule from '@material-ui/icons/Schedule';



const styles = theme => ({
    root: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
     height: 'inherit',
      textAlign: 'center'
    },
    button:{
        position: 'absolute',
        bottom: '25px',
        left: '25px'
    },
    icon:{
        position: 'absolute',
        bottom: '25px',
        right: '57px',
        verticalAlign: 'center'
    },
    card: {
        minWidth: 275,
      },
      bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
      },
      title: {
        fontSize: 17,
        marginBottom: 12,
        padding: 4
      },
      pos: {
        marginBottom: '32px',
      },
  });


class Question extends React.Component {

    handleClick = () => {
        const {examChallenge} = this.props;
        examChallenge.id = this.props.id;
        examChallenge.title = this.props.title;
        examChallenge.description = this.props.description;
        examChallenge.subquestion = this.props.subquestion;
        examChallenge.basecodedir = this.props.basecodedir;
        this.props.history.push("/editor");
    }

    render = () => {

        const {classes} = this.props;
        return (

            <Paper className={classes.root} elevation={2} style={{padding: '25px'}} >
                        <Typography align='left' gutterBottom={true} variant="display2" component="h5" className={classes.pos} color="textPrimary">
                        {this.props.title}
                        </Typography>
                        <Typography align='left' className={classes.title} gutterBottom={true} align='justify' variant='headline' color="textSecondary">
                        {this.props.description}
                        </Typography>
                        <Button type="submit"  className={classes.button}  style={{ margin: "0 auto"}}  default color="rose" size="lg" onClick={this.handleClick} >
                        Solve
                        </Button>
                        <div className={classes.icon}>

                        <Schedule /> <span style={{ position: 'absolute',  top:'-2px', left:'33px', fontSize:'12px'}}>45 mins</span>
                        </div>
            </Paper>
            // <div className="form">
            //     <h5>{this.props.title}</h5>
            //     <div className="description">{this.props.description}</div>
            //     <button type="submit" className="form__submit evalBtn" onClick={this.handleClick}>Solve</button>
            // </div>);
        )
    }
}

export default withStyles(styles)(inject("examChallenge")(observer(Question)));