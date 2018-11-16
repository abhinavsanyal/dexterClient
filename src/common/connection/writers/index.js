import * as Control from './control';
import * as Files from './files';
import send from './send';

let ws = null;
const sendHandler = () => send(ws);

export const registerSocket = (wsocket) => ws = wsocket;

export const exit = () => {
    if (!ws) return console.error("Connection not opened.");
    Control.exit(sendHandler(), ...arguments);
};

export const keepAlive = () => {
    if (!ws) return console.error("Connection not opened.");
    Control.keepAlive(sendHandler());
};

export const readProjectFiles = (file) => {
    if (!ws) return console.error("Connection not opened.");
    Files.readProjectFiles(sendHandler(), file);
};

export const createFile = (file) => {
    if (!ws) return console.error("Connection not opened.");
    Files.createFile(sendHandler(), file);
};

export const readFile = (file) => {
    if (!ws) return console.error("Connection not opened.");
    Files.readFile(sendHandler(), file);
};

export const updateFile = (file) => {
    if (!ws) return console.error("Connection not opened.");
    Files.updateFile(sendHandler(), file);
};

export const deleteFile = (file) => {
    if (!ws) return console.error("Connection not opened.");
    Files.deleteFile(sendHandler(), file);
};

export const createDirectory = (directory) => {
    if (!ws) return console.error("Connection not opened.");
    Files.createDirectory(sendHandler(), directory);
};

export const deleteDirectory = (directory) => {
    if (!ws) return console.error("Connection not opened.");
    Files.deleteDirectory(sendHandler(), directory);
};