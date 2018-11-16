import {action, computed, observable, decorate} from 'mobx';

/**
 * ViewStore is the Mobx global data storage for the view data.
 * @class ViewStore
 */
export class ViewStore {

    // {number} width - Screen width value
    width = -1;

    // {number} height - Screen height value
    height = -1;

    // {number} isDesktop - Tells wether the view size corresponds to Desktop or not.
    get isDesktop() {
        return (this.width > 768);
    }

    // {number} isTablet - Tells wether the view size corresponds to Tablet or not.
    get isTablet() {
        return (this.width > 544 && this.width <= 768);
    }

    // {number} isDesktop - Tells wether the view size corresponds to Mobile or not.
    get isMobile() {
        return (this.width <= 544);
    }

    constructor() {
        this.updateDimensions();
    }

    /**
     * Update the current screen size informations
     * @return {void}
     */
    updateDimensions() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
    }
}

decorate(ViewStore, {
    width: observable,
    height: observable,
    isDesktop: computed,
    isTablet: computed,
    isMobile: computed,
    updateDimensions: action
})

export default new ViewStore();
