import React from 'react';
import {findDOMNode} from "react-dom";
import {inject, observer} from 'mobx-react';
import 'xterm/dist/addons/fit/fit.js';
import './addons/attach.js';
import 'xterm/lib/xterm.css';
import './style.css';

class Terminal extends React.Component {

    constructor(props) {
        super(props);
    }

    handleResize = () => {
        const [height, width] = [this.props.view.height, this.props.view.width];
        this.props.terminalStore.handleResize(this.props.name, height, width);
    }

    toggle = () => {
        this.props.terminalStore.toggle(this.props.name);
    }

    componentDidMount = () => {
        const terminalContainer = findDOMNode(this);
        const {basecodedir} = this.props.examChallenge;
        setTimeout(() => this.props.terminalStore.createTerminal(this.props.name, terminalContainer, basecodedir), this.props.delay);
        window.addEventListener('resize', this.handleResize);
    }

    render() {
        const terminals = this.props.terminalStore.allTerminals;
        const {visible} = terminals[this.props.name];
        if (visible)
            this.handleResize();

        return (
            <div className={visible ? "terminal-container" : "terminal-container hide"}>
                <b onClick={this.toggle}>Terminal - {this.props.name}</b>
            </div>
        );
    }
}

export default inject('view', 'terminalStore', 'examChallenge')(observer(Terminal));
