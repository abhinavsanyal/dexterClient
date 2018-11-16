import {action, decorate, observable} from "mobx";
import axios from 'axios';

class ExamChallenge {
    id = null;
    title = null;
    question = null;
    basecodedir = null;
    conditions = [];

    submit() {
        return axios.post('/terminals/submit', {questionId: this.id, basecodedir: this.basecodedir});
    }
}

decorate(ExamChallenge, {
    id: observable,
    title: observable,
    question: observable,
    conditions: observable,
    basecodedir: observable,
    submit: action,
});

export default new ExamChallenge();