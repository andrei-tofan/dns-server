/**
 * Parse host file
 * @param {string} contents
 */
function parse(contents) {
  const lines = contents.split('\n');

  return lines.reduce((hosts, _line) => {
    const line = _line.trim();

    if (line.startsWith('#')) {
      return hosts;
    }

    const parts = line.split(/\s+/);
    if (parts.length < 2) {
      return hosts;
    }

    const ip = parts[0];
    const hostNames = parts.slice(1);

    return hostNames.reduce((_hosts, hostName) => _hosts.concat([{ ip, hostName }]), hosts);
  }, []);
}

// export
module.exports = {
  parse,
};
