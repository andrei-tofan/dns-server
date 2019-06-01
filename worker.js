const { parentPort } = require('worker_threads'); // eslint-disable-line
const blacklist = require('./blacklist');
const logger = require('./logger');

blacklist.getHostsBlacklists().then((hosts) => {
  parentPort.postMessage(hosts);
}).catch((err) => {
  logger.error(err);
});
