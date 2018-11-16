import React from 'react';
import {inject, observer} from 'mobx-react';

class TerminalToggle extends React.Component {
    toggle = (name) => {
        this.props.terminalStore.toggle(name);
    }

    render = () => {
        return (<span className="name item" onClick={() => this.toggle(this.props.name)}>Terminal </span>);
    }
}

export default inject("terminalStore")(observer(TerminalToggle))