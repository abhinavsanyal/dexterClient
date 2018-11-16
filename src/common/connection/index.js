import handleMessage from './listeners';
import * as Writer from './writers';
import {General} from 'common/constants';

let websocket = null;

const openConnection = (token) => {
    websocket = new WebSocket(`${General.API_URL}/ws/${token}`);
    Writer.registerSocket(websocket);
    websocket.onopen = () => setInterval(Writer.keepAlive, 20000);
    websocket.onmessage = (event) => handleMessage(JSON.parse(event.data));
    websocket.onerror = console.error;
};

const closeConnection = () => {
    if (websocket) {
        websocket.close();
        websocket = null;
    }
}

export {openConnection, closeConnection, Writer};
