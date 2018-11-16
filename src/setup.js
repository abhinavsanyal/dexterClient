import registerServiceWorker from './registerServiceWorker';
import * as Stores from 'common/stores';
import {registerKeyboardBindings} from 'common/utils';
import setAuthorizationToken from 'common/utils/setAuthToken';

window.addEventListener('resize', () => Stores.view.updateDimensions());
registerKeyboardBindings();
registerServiceWorker();
setAuthorizationToken(localStorage.jwtToken);