import React from 'react';

const TOOL_EXPLORER = 'explorer';

export default class ActivityBar extends React.Component {

    state = {active: null};

    componentDidMount() {
        this.selectOption(TOOL_EXPLORER);
    }

    selectOption(id) {
        this.props.onToolSelect(id);
        this.setState({active: id});
    }

    isActive = (id) => (this.state.active === id) ? 'active' : '';

    render() {
        return (
            <div>
            </div>
        );
    }
}