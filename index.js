const logger = require('./logger');
const server = require('./server');
const blacklist = require('./blacklist');

/**
 * Blacklist lookup cache
 */
const lookup = {
  blacklist: {},
};


logger.info('Starting server ...');

const UPDATE_INTERVAL = 21600 * 1000; // 6 hours

/**
 * Update blacklist data
 */
const updateBlacklist = () => blacklist.getUpdate().then((result) => {
  if (result.blacklist) {
    lookup.blacklist = result.blacklist;
  }

  logger.info('The blacklist has been updated');
  setTimeout(updateBlacklist, UPDATE_INTERVAL);
});

// update cached hosts
blacklist.getCachedHostsBlacklist().then((data) => {
  logger.info('Updating blacklist with cached data ...');
  lookup.blacklist = data;

  const instance = new server.DNSServer(lookup);
  instance.start();

  return updateBlacklist();
});
