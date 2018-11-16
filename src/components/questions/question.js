import React from 'react';
import {inject, observer} from 'mobx-react';
import './style.css';

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
        return (
            <div className="form">
                <h5>{this.props.title}</h5>
                <div className="description">{this.props.description}</div>
                <button type="submit" className="form__submit evalBtn" onClick={this.handleClick}>Solve</button>
            </div>);
    }
}

export default inject("examChallenge")(observer(Question));