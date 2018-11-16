import {action, computed, decorate, observable} from "mobx";
import axios from "axios";
import Xterm from 'xterm/dist/xterm.js';

class TerminalStore {

    protocol = (window.location.protocol === 'https:') ? 'wss://' : 'ws://';
    socketURL = this.protocol + window.location.hostname + ((window.location.port) ? (':' + window.location.port) : '') + '/terminals/';

    terminal = {
        default: {},
        test: {},
        gem: {}
    };

    handleResize = (name, height, width) => {
        const {pid} = this.terminal[name].term;
        return axios.post(`/terminals/${pid}/resize?rows=${height}&cols=${width}`)
            .then((res) => {
                const {term, container} = this.terminal[name];
                container.style.height = (height / 2) + "px";
                container.style.width = (width - 200) + "px";
                term.fit();
            });
    }

    createSocket = (socketURL, pid, container) => {
        const socket = new WebSocket(`${socketURL}${pid}`);
        const xterm = new Xterm({cursorBlink: true});
        xterm.open(container);
        xterm.focus(true);
        xterm.pid = pid;
        const term = {
            term: xterm,
            socket: socket,
            container: container
        };
        socket.onopen = () => {
            xterm.attach(socket);
            xterm.fit();
            socket.send("");
            const keepalive = setInterval(() => socket.send(""), 20000); // keepAlive for websocket AWS
            socket.onclose = () => clearInterval(keepalive);
        }

        return term;
    }

    createTerminal(name, container, basecodedir) {
        return axios.post('/terminals/', {basecodedir: basecodedir})
            .then((res) => this.createSocket(this.socketURL, res.data, container))
            .then((term) => this.saveTerminal(name, term));
    }

    saveTerminal(name, term) {
        this.terminal[name] = term;
        this.terminal[name].visible = false;
    }

    toggle(name) {
        ['default', 'gem', 'test'].forEach(t => {
            if (name !== t)
                this.terminal[t].visible = false; // hide others
        });
        this.terminal[name] ? this.terminal[name].visible = !this.terminal[name].visible : false;
    }

    close(name) {
        const {term, socket} = this.terminal[name];
        if (!term) return;
        term.destroy();
        socket.close()
    }

    get allTerminals() {
        return this.terminal;
    }
}

decorate(TerminalStore, {
    terminal: observable,
    visible: observable,
    createTerminal: action,
    createSocket: action,
    handleResize: action,
    saveTerminal: action,
    toggle: action,
    close: action,
    allTerminals: computed,
});

export default new TerminalStore();