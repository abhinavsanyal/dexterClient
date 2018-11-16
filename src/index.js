import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'mobx-react';
import * as stores from 'common/stores';
import Routes from './routes';
import './setup';

const Application = () => (
    <Provider {...stores}>
        <Routes/>
    </Provider>
);

window.store = stores;

ReactDOM.render(<Application/>, document.getElementById('root'));