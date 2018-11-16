import React from 'react';
import {inject, observer} from 'mobx-react';
import FileTree from '../fileTree';
import './styles.css';
import * as Action from 'common/actions';
import '../hoc/loadingHOC.css';
import axios from 'axios';

class Explorer extends React.Component {

    componentWillMount() {
        const {basecodedir} = this.props.examChallenge;
        axios.post("/terminals/runtimeDir", {basecodedir: basecodedir})
            .then(res => Action.readProjectFiles(res.data));
    }

    onClickNode(node) {
        if (node.type) Action.loadFile(node);
    }

    renderFileTree() {
        const {project} = this.props;
        if (project.loading || !project.name) return <div className="loader"/>;
        return (
            <FileTree
                path={project.path}
                title={project.name}
                content={project.content}
                ref={Action.setFileTreeHandler}
                onClickNode={(node) => this.onClickNode(node)}
            />
        );

    }

    componentWillUnmount() {
        this.props.project.reset();
    }

    render() {
        return (
            <div className="Explorer">
                <div className="title">
                    <span>Explorer</span>
                </div>
                {this.renderFileTree()}
            </div>
        );
    }
}

export default inject('project', 'examChallenge')(observer(Explorer));