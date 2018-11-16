import {action, computed, decorate, observable} from 'mobx';

let indexes = {};

const updateIndexes = (files) => indexes = files.reduce((prev, next, i) => {
    prev[next.path] = i;
    return prev;
}, {});

class FileBufferStore {

    constructor() {
        this.reset();
    }

    reset() {
        this.loading = false;
        this.openedFiles = [];
        this.activeFilePath = undefined;
        this.previousFilePaths = [];
        updateIndexes([]);
    }

    get activeFile() {
        const position = indexes[this.activeFilePath];
        return this.openedFiles[position];
    }

    get nextFile() {
        const position = (indexes[this.activeFilePath] + 1) % this.openedFiles.length;
        return this.openedFiles[position];
    }

    get previousFile() {
        const position = indexes[this.activeFilePath] - 1;
        return (position > -1) ? this.openedFiles[position] : this.openedFiles[this.openedFiles.length - 1];
    }

    get fileStates() {
        return this.openedFiles.map(({name, path}) => ({name, path, active: path === this.activeFilePath}));
    }

    isLoading(state) {
        this.loading = Boolean(state);
    }

    selectFile(filePath) {
        if (this.activeFilePath) this.previousFilePaths.push(this.activeFilePath);
        this.activeFilePath = filePath;
    }

    addToBuffer(file) {
        const position = this.openedFiles.length;
        this.openedFiles.push(file);
        indexes[file.path] = position;
    }

    close(filePath) {
        this.previousFilePaths = this.previousFilePaths.filter(item => item !== filePath);
        if (this.activeFilePath === filePath) this.activeFilePath = '';
        const position = indexes[filePath];
        this.openedFiles.splice(position, 1);
        delete indexes[filePath];
        updateIndexes(this.openedFiles);
    }

    exists(filePath) {
        return !isNaN(indexes[filePath]);
    }

    lastOpenedFile() {
        return this.previousFilePaths.pop();
    }

    updateCode(filePath, code) {
        const position = indexes[filePath];
        this.openedFiles[position].content = code;

    }

}

decorate(FileBufferStore, {
    loading: observable,
    openedFiles: observable,
    activeFilePath: observable,
    activeFile: computed,
    nextFile: computed,
    previousFile: computed,
    fileStates: computed,
    isLoading: action,
    selectFile: action,
    addToBuffer: action,
    close: action,
    reset: action
})

export default new FileBufferStore();