const dns = require('native-dns');
const logger = require('./logger');
const DEFAULT_DNS_SERVER_IP = '8.8.8.8';
const DEFAULT_DNS_SERVER_PORT = 53;
const DEFAULT_DNS_SERVER_TYPE = 'udp';
const DEFAULT_TIMEOUT = 1000;

/**
 * Lookup dns record
 * @param {Object} question 
 */
function dnsLookup(question) {

    return new Promise((resolve, reject) => {
        const req = dns.Request({
            question: question,
            server: { 
                address: DEFAULT_DNS_SERVER_IP, 
                port: DEFAULT_DNS_SERVER_PORT, 
                type: DEFAULT_DNS_SERVER_TYPE
            },
            timeout: DEFAULT_TIMEOUT,
        });

        const messages = [];
        req.on('timeout', function () {
            return reject(new Error('DNS lookup timeout'));
        });

        req.on('message', function (err, message) {
            if (err) {
                return reject(err);
            }

            messages.push(message);
        });

        req.on('end', function () {
            return resolve(messages);
        });

        req.send();
    });
}

/**
 * DNS Server implementation
 */
class DNSServer {

    /**
     * Create a new server instance
     * @param {object} lookup 
     * @param {object} lookup.blacklist
     */
    constructor(lookup) {
        this.lookup = lookup;
        this.server = null;
    }

    /**
     * Start the dns server
     */
    start() {
        this.server = dns.createServer();
        this.server.on('request', this.handleRequest.bind(this));
        this.server.on('error', this.handleError.bind(this));
        this.server.serve(53);
    }

    /**
     * Handle dns request
     * @param {object} request 
     * @param {object} response 
     */
    handleRequest(request, response) {
        Promise.all(request.question.map((question) => {
            logger.info(`DNS Request: ${question.name}`);
            if (this.lookup.blacklist[question.name]) {
                return [{
                    answer: [
                        dns.A({
                            name: question.name,
                            address: '127.0.0.1',
                            ttl: 600,
                        })
                    ]
                }]
            }
            return dnsLookup(question)
        })).then((values) => {
            values.forEach((results) => {
                results.forEach((result) => {
                    result.answer.forEach((item) => {
                        response.answer.push(item);
                    })
                })
            });
            response.send();
        }).catch(err => {
            console.error(err);
        });
    }

    /**
     * Handle dns server error
     */
    handleError(err, buff, req, res) {
        console.log(err.stack);
    }
}

// export
module.exports = {
    DNSServer
}