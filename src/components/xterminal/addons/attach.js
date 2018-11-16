(function (attach) {
    if (typeof exports === 'object' && typeof module === 'object') {
        module.exports = attach(require('xterm/dist/xterm.js'));
        // } else if (typeof define === 'function') {
        //    define(['xterm'], attach);
    } else {
        attach(window.Terminal);
    }
})(function (Xterm) {

    var exports = {};
    exports.attach = function (term, socket, bidirectional, buffered) {
        bidirectional = (typeof bidirectional === 'undefined') ? true : bidirectional;
        term.socket = socket;

        term._flushBuffer = function () {
            term.write(term._attachSocketBuffer);
            term._attachSocketBuffer = null;
            clearTimeout(term._attachSocketBufferTimer);
            term._attachSocketBufferTimer = null;
        };

        term._pushToBuffer = function (data) {
            if (term._attachSocketBuffer) {
                term._attachSocketBuffer += data;
            } else {
                term._attachSocketBuffer = data;
                setTimeout(term._flushBuffer, 10);
            }
        };

        term._getMessage = function (ev) {
            term.write(ev.data);
        };

        term._sendData = function (data) {
            socket.send(data);
        };

        socket.addEventListener('message', term._getMessage);

        if (bidirectional) {
            term.on('data', term._sendData);
        }

        socket.addEventListener('close', term.csphereDetach.bind(term, socket));
        socket.addEventListener('error', term.csphereDetach.bind(term, socket));
    };

    exports.csphereDetach = function (term, socket) {
        term.off('data', term._sendData);

        socket = (typeof socket === 'undefined') ? term.socket : socket;

        if (socket) {
            socket.removeEventListener('message', term._getMessage);
        }

        delete term.socket;
    };
    Xterm.prototype.attach = function (socket, bidirectional, buffered) {
        return exports.attach(this, socket, bidirectional, buffered);
    };

    Xterm.prototype.csphereDetach = function (socket) {
        return exports.csphereDetach(this, socket);
    };

    return exports;
});