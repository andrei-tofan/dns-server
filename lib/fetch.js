const http = require('http');
const https = require('https');

/**
 * Http fetch function
 */
module.exports = function fetch(url) {
  let driver = http;

  if (url.startsWith('https://')) {
    driver = https;
  }

  return new Promise((resolve, reject) => {
    driver.get(url, (resp) => {
      let data = '';
      resp.on('data', (chunk) => {
        data += chunk;
      });
      resp.on('end', () => resolve(data));
    }).on('error', err => reject(err));
  });
};
