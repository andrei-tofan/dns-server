const fs = require('fs');

function read(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if(err){
                return reject(err);
            }

            return resolve(data);
        });
    })
}

function readJSON(filePath) {
    return read(filePath).then((data) => {
        return JSON.parse(data);
    });
}


function write(filePath, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, data, (err, result) => {
            if(err){
                return reject(err);
            }

            return resolve(result);
        });
    })
}

function writeJSON(filePath, object) {
    return write(filePath, JSON.stringify(object));
}


module.exports = {
    read,
    readJSON,
    write,
    writeJSON
};