import React from 'react';
import LeftMenu from './leftMenu';
import HelpMessage from '../modals/help';
import ProjectMenu from './projectMenu';
import TerminalToggle from './TerminalToggle';
import './styles.css';

export default () => (
    <div className="Header">
        <div className="left side">
            <LeftMenu className="name item"/>
        </div>
        <div className="right side">
            <ProjectMenu className="name item"/>
            <TerminalToggle name="default"/>
            <span className="name item"><HelpMessage/></span>
        </div>
    </div>
);
