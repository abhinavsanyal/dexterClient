import React from 'react';
import Question from './question';
import './style.css';
import UserNavigationBar from '../navbar/user-navigationbar';
import {inject, observer} from "mobx-react/index";
import Footer from '../footer';
import '../hoc/loadingHOC.css';

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

        const questions = this.state.questions.map(q =>
            (<li key={q.id}><Question title={q.title}
                                      description={q.description} id={q.id}
                                      subquestion={q.subquestion} {...this.props}
                                      basecodedir={q.basecodedir}/>
                <hr/>
            </li>));

        if (this.state.loading) {
            return <div className="loader"/>
        }

        return (
            <div>
                <UserNavigationBar/>
                <h3>Choose one of the challenges</h3>
                <div className="questions">
                    <ul>{questions}</ul>
                </div>
                <Footer/>
            </div>);
    }
}

export default inject("loginStore")(observer(Questions));