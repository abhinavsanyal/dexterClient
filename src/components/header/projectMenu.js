import React from 'react';
import {inject, observer} from 'mobx-react';

class ProjectMenu extends React.Component {

    state = {collapsed: {menu: true}};

    get menuCollapsed() {
        return Object.keys(this.state.collapsed).map(key => this.state.collapsed[key])
            .reduce((prev, next) => prev || next, false);
    }

    componentWillMount() {
        document.addEventListener('keydown', (e) => {
            const keyCode = e.keyCode || e.which;
            if (keyCode === 27) this.collapseAll();
        });
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', () => {
        });
    }

    collapseAll = () => {
        let {collapsed} = this.state;
        collapsed = Object.keys(collapsed).reduce((prev, next) => ({...prev, [next]: true}), {});
        this.setState({collapsed});
    }

    toggle = (key) => this.setState({collapsed: {[key]: !this.state.collapsed[key]}})

    callAndClose = (fn = () => {
    }) => () => {
        this.collapseAll();
        fn();
    };

    gemInstall = () => {
        const allTerminals = this.props.terminalStore.allTerminals;
        allTerminals.gem.socket.send("bundle install\n");
    }

    runSpec = () => {
        const allTerminals = this.props.terminalStore.allTerminals;
        allTerminals.test.socket.send("bundle exec rspec\n");
    }

    renderMenu = (collapsed) => (
        <div className="menuItem">
            <span className="title clickable" children="Project" onClick={() => this.toggle('menu')}/>
            {!collapsed && (
                <div className="submenu">
                    <div className="clickable item" children="Gem action"
                         onClick={this.callAndClose(() => this.props.terminalStore.toggle('gem'))}/>
                    <div className="separator"/>
                    <div className="clickable item" children="- Gem install"
                         onClick={this.callAndClose(this.gemInstall)}/>
                    <div className="separator"/>
                    <div className="clickable item" children="Test run"
                         onClick={this.callAndClose(() => this.props.terminalStore.toggle('test'))}/>
                    <div className="separator"/>
                    <div className="clickable item" children="- Test runspec"
                         onClick={this.callAndClose(this.runSpec)}/>
                </div>
            )}
        </div>
    );

    render() {
        const {className} = this.props;
        return (
            <div className={`Menu ${className || ''}`}>
                {this.renderMenu(this.state.collapsed.menu)}
                {!this.menuCollapsed && <div className="clickableOverlay" onClick={this.collapseAll}/>}
            </div>
        );
    }
}

export default inject("terminalStore")(observer(ProjectMenu))