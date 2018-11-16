import React from 'react';
import {inject, observer} from 'mobx-react';
import * as Action from 'common/actions';
import FileTab from '../fileTab';
import TextEditor from '../textEditor';
import Terminal from '../xterminal';
import './styles.css';

class Editor extends React.Component {

    state = {body: {width: 0, height: 0}};

    componentDidMount() {
        window.addEventListener('resize', () => this.updateDimensions());
        this.updateDimensions();
    }

    onMouseWheel = (e) => {
        // preventScroll when in editor view
        e.preventDefault();
    }

    updateDimensions() {
        if (!this.refs.editor)
            return;
        const {clientHeight, clientWidth} = this.refs.editor;
        const width = clientWidth;
        const height = clientHeight - 44;
        this.setState({body: {width, height}});
    }

    onClickTab = (item) => {
        Action.viewCode(item.path);
    }

    renderOpenedFileTabs() {
        const {fileBuffer} = this.props;
        if (fileBuffer.fileStates.length === 0) return null;
        return (
            <div className="editorTabs">
                {fileBuffer.fileStates.map((file, key) => <FileTab key={key} {...file} onClick={this.onClickTab}/>)}
            </div>
        );
    }

    componentWillUnmount() {
        this.props.fileBuffer.reset();
    }

    render() {
        return (
            <div className="Editor" ref="editor">
                {this.renderOpenedFileTabs()}
                <div className="editorView" onWheel={this.onMouseWheel}>
                    <TextEditor ref={Action.setEditorHandler} {...this.state} />
                    <Terminal delay={0} name="default"/>
                    <Terminal delay={5000} name="gem"/>
                    <Terminal delay={5000} name="test"/>
                </div>
            </div>
        );
    }
}

export default inject('fileBuffer', 'loginStore')(observer(Editor))
