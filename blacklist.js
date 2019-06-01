
const { Worker } = require('worker_threads'); // eslint-disable-line
const sources = require('./sources');
const fetch = require('./lib/fetch');
const hosts = require('./lib/hosts');
const list = require('./lib/list');
const data = require('./lib/data');
const logger = require('./logger');

const BLACKLIST_PATH = './data/blacklist.json';

/**
 * Spin a update worker to pull hosts update
 */
function getUpdate() {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./worker.js', { workerData: null });

    const result = { blacklist: null };
    worker.on('message', (msg) => {
      if (msg) {
        result.blacklist = msg;
      }
    });

    worker.on('error', logger.error);

    worker.on('exit', (code) => {
      if (code !== 0) {
        return reject(new Error(`Worker stopped with exit code ${code}`));
      }

      return resolve(result);
    });
  });
}

/**
 * Fetch hosts blacklist
 */
function getHostsBlacklists() {
  return Promise.all(sources.map(source => fetch(source.url).then((_data) => {
    if (source.type === 'list') {
      return list.parse(_data);
    }

    if (source.type === 'hosts') {
      return hosts.parse(_data).map(host => host.hostName);
    }

    throw new Error(`Unknown source type: ${source.type}`);
  }))).then((values) => {
    const map = {};
    values.forEach((value) => {
      value.forEach((hostName) => {
        map[hostName] = true;
      });
    });

    return data.writeJSON(BLACKLIST_PATH, map).then(() => map);
  }).catch((err) => {
    logger.error(err);
  });
}

/**
 * Fetch cached hosts blacklist
 */
function getCachedHostsBlacklist() {
  return data.readJSON(BLACKLIST_PATH);
}

module.exports = {
  getUpdate,
  getHostsBlacklists,
  getCachedHostsBlacklist,
};
