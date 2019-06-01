
const { Worker} = require('worker_threads');
const sources = require('./sources');
const fetch = require('./lib/fetch');
const hosts = require('./lib/hosts');
const list = require('./lib/list');
const data = require('./lib/data');


const BLACKLIST_PATH = './data/blacklist.json';
/**
 * Spin a update worker to pull hosts update
 */
function getUpdate() {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./worker.js', {workerData: null});

        let result = {blacklist: null};
        worker.on('message', (msg) => {
            if(msg) {
                result.blacklist = msg;
            }
        });

        worker.on('error', console.error);

        worker.on('exit', (code) => {
            if(code != 0) {
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
    return Promise.all(sources.map((source) => {
        return fetch(source.url).then(data => {
            if (source.type === 'list') {
                return list.parse(data);
            }

            if (source.type === 'hosts') {
                return hosts.parse(data).map(host => host.hostName);
            }

            throw new Error(`Unknown source type: ${source.type}`);
        });
    })).then((values) => {

        const map = {};
        values.forEach((value) => {
            value.forEach((hostName) => {
                map[hostName] = true;
            });
        });

        return data.writeJSON(BLACKLIST_PATH, map).then(() => {
            return map;
        });
    }).catch(err => {
        console.error(err);
    });
}

function getCachedHostsBlacklist(){
    return data.readJSON(BLACKLIST_PATH);
}

module.exports = {
    getUpdate,
    getHostsBlacklists,
    getCachedHostsBlacklist
};