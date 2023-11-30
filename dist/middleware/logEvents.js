const {
  format
} = require('date-fns');
const {
  v4: uuid
} = require('uuid');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

/**
 * Logs an event message to a log file.
 *
 * @param {string} message - The event message to log.
 * @param {string} logName - The name of the log file.
 * @returns {Promise<void>}
 */
const logEvents = async (message, logName) => {
  const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
  try {
    if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
      await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
    }
    await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logName), logItem);
  } catch (err) {
    console.log(err);
  }
};

/**
 * Middleware function to log request details.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function.
 */
const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
  console.log(`${req.method} ${req.path}`);
  next();
};

module.exports = {
  logger,
  logEvents
};
