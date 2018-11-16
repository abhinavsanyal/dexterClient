import {Component} from 'react';
import Modal from 'react-modal';
import './style.css';

const appElement = document.getElementById('root');

Modal.setAppElement(appElement);

export default class Confirmation extends Component {
    constructor(props) {
        super(props);
        this.state = {modalIsOpen: false};
    }

    openModal = () => {
        this.setState({modalIsOpen: true});
    }

    closeModal = () => {
        this.setState({modalIsOpen: false});
    }

    handleModalCloseRequest = () => {
        this.setState({modalIsOpen: false});
    }
}