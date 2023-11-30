/**
 * Array of allowed origins for CORS (Cross-Origin Resource Sharing) requests.
 * @type {string[]}
 */
const allowedOrigins = require('./allowedOrigins');

/**
 * Configuration options for CORS (Cross-Origin Resource Sharing).
 * @type {object}
 * @property {function} origin - Function to determine if a specific origin is allowed.
 * @property {number} optionsSuccessStatus - The HTTP status code to send when options request succeeds.
 */
const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
};

module.exports = corsOptions;
