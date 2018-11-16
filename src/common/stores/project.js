import {action, decorate, observable} from 'mobx';


class ProjectStore {

    constructor() {
        this.reset()
    }

    reset() {
        this.loading = false;
        this.name = '';
        this.path = '';
        this.content = {};

    }

    isLoading(state) {
        this.loading = Boolean(state);
    }

    load({name, path, files, folders}) {
        this.name = name;
        this.path = path;
        this.content = {files, folders};
    }

    unload() {
        this.name = '';
        this.path = '';
        this.content = {};
    }

}

decorate(ProjectStore, {
    loading: observable,
    name: observable,
    path: observable,
    content: observable,
    isLoading: action,
    load: action,
    unload: action,
    reset: action
})

export default new ProjectStore();