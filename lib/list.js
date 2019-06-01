function parse(contents) {
    const lines = contents.split('\n');
    return lines.reduce((hosts, line) => {
        line = line.trim();
        if(line.startsWith('#')){
            return hosts;
        }

        const hostName = line;
        if(!hostName.length) {
            return hosts;
        }

        return hosts.concat([hostName]);

    }, []);
}

module.exports = {
    parse
};