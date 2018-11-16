// {bool} DEBUG - Toggles debug mode on or off.
export const DEBUG = process.env.NODE_ENV === "development";

const protocol = (window.location.protocol.includes('https')) ? 'wss' : 'ws';
// {string} API_URL - Backend API HTTP address
const socketURL = window.location.hostname + ((window.location.port) ? (':' + window.location.port) : '');

export const API_URL = `${protocol}://${socketURL}/ws`;

export const CONTACT_EMAIL = "najam.s@gmail.com";

// {string} NO_DATE - Moment js string for no date value set
export const NO_DATE = '0001-01-01T00:00:00Z';