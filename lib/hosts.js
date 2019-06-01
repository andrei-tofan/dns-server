
function parse(contents) {
    const lines = contents.split('\n');

    return lines.reduce((hosts, line) => {
        line = line.trim();
        
        if(line.startsWith('#')){
            return hosts;
        }

        const parts = line.split(/\s+/);
        if(parts.length < 2) {
            return hosts;
        }

        const ip = parts[0];
        const hostNames = parts.slice(1);

        return hostNames.reduce((hosts, hostName) => {
            return hosts.concat([{ ip, hostName }]);
        }, hosts);

    }, []);
}

module.exports = {
    parse
};