import React from 'react';
import './style.css';
import {inject, observer} from "mobx-react";

class EvaluationQuestion extends React.Component {

    constructor(props) {
        super(props);
        this.state = {submitted: false, output: ""}
    }

    submit = (e) => {
        e.preventDefault();
        const {examChallenge} = this.props;
        return examChallenge.submit()
            .then((res) => this.setState({submitted: true, output: res.data}));
    }

    backToQuestions = () => {
        setTimeout(this.props.history.push("/question"), 4000);
    }

    render = () => {
        const {examChallenge} = this.props;
        const subquestion = examChallenge.subquestion.map(s => <li key={s.id}>{s.conditions}</li>);
        return (
            <div className="evaluationQuestion">
                <div><h4>{examChallenge.title}</h4></div>
                <div><p>{examChallenge.description}</p></div>
                <ul>
                    {subquestion}
                </ul>
                {!this.state.submitted ?
                    <button type="submit" className={"form__submit evalBtn"}
                            onClick={this.submit}>Submit</button>
                    :
                    <button type="submit" className={"form__submit evalBtn"}
                            onClick={this.backToQuestions}>Back to Questions</button>
                }
            </div>);

    }
}

export default inject("examChallenge")(observer(EvaluationQuestion));
