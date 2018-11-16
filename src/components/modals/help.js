import React from 'react';
import Modal from 'react-modal';
import Confirmation from './confirmation';

const appElement = document.getElementById('root');

Modal.setAppElement(appElement);

export default class HelpMessage extends Confirmation {

    render() {
        return (
            <div>
                <span onClick={this.openModal}> Help </span>
                <Modal
                    className="Modal__Bootstrap modal-dialog"
                    closeTimeoutMS={150}
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.handleModalCloseRequest}
                >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="text-center modal-title">Help</h4>
                            <button type="button" className="close" onClick={this.handleModalCloseRequest}>
                                <span aria-hidden="true">&times;</span>
                                <span className="sr-only">Close</span>
                            </button>
                        </div>
                        <div className="modal-body">
                <pre>
                    <p>Move right : Use the ALT+right keys to go next tab</p>
                    <p>Move left  : Use the ALT+left keys to go prev tab</p>
                    <p>Save tab   : Use the CTL+s keys to save current tab</p>
                    <p>Close tab  : Use the CTL+w keys to close current tab</p>
                </pre>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}