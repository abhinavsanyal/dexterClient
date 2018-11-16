import axios from 'axios';
import {closeConnection, openConnection} from 'common/connection';

export default function setAuthToken(token) {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        localStorage.setItem('jwtToken', token);
        openConnection(token);
    } else {
        localStorage.removeItem('jwtToken');
        delete axios.defaults.headers.common['Authorization'];
        closeConnection();
    }
}
