/**
 * Application logger
 */
const winston = require('winston');

winston.add(new winston.transports.Console());

module.exports = winston;
