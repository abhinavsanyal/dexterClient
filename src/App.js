import React from 'react';
import {inject, observer} from 'mobx-react';
import Editor from './components/editor';
import Header from './components/header';
import Sidebar from './components/sidebar';
import EvaluationQuestion from './components/questions/evaluationQuestion';
import UserNavigationBar from './components/navbar/user-navigationbar';
import Footer from './components/footer';
import './App.css';

class App extends React.Component {

    get style() {
        const {view: {width, height}} = this.props;
        return {width, height: height - 25};
    }

    render() {
        return (
            <div>
                <UserNavigationBar/>
                <EvaluationQuestion {...this.props} />
                <div className="App">
                    <Header/>
                    <div className="body" style={this.style}>
                        <Sidebar/>
                        <Editor/>
                    </div>
                </div>
                <Footer/>
            </div>

        );
    }
}

export default inject('view')(observer(App));