const { parentPort } = require('worker_threads');
const blacklist = require('./blacklist');

blacklist.getHostsBlacklists().then((hosts) => {
    parentPort.postMessage(hosts);
}).catch((err) => {
    console.error(err);
})
