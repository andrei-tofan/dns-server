
module.exports = function fetch(url) {
    let driver = require('http');

    if(url.startsWith('https://')){
        driver = require('https');
    }

    return new Promise((resolve, reject) => {
        driver.get(url, (resp) => {
            let data = '';
            resp.on('data', (chunk) => {
                data += chunk;
            });
            resp.on('end', () => {
                return resolve(data);
            });
        }).on('error', (err) => {
            return reject(err);
        })
    });
}