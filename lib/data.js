/**
 * Data module
 */
const fs = require('fs');

/**
 * Read data from filePath
 * @param {string} filePath
 */
function read(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        return reject(err);
      }

      return resolve(data);
    });
  });
}

/**
 * Read JSON data from filePath
 * @param {string} filePath
 */
function readJSON(filePath) {
  return read(filePath).then(data => JSON.parse(data));
}

/**
 * Write data to file
 * @param {string} filePath
 * @param {string} data
 */
function write(filePath, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, data, (err, result) => {
      if (err) {
        return reject(err);
      }

      return resolve(result);
    });
  });
}

/**
 * Write json data to file
 * @param {string} filePath
 * @param {Object} object
 */
function writeJSON(filePath, object) {
  return write(filePath, JSON.stringify(object));
}

// export
module.exports = {
  read,
  readJSON,
  write,
  writeJSON,
};
