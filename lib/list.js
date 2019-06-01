/**
 * Parse list file
 * @param {string} contents
 */
function parse(contents) {
  const lines = contents.split('\n');
  return lines.reduce((hosts, _line) => {
    const line = _line.trim();
    if (line.startsWith('#')) {
      return hosts;
    }

    const hostName = line;
    if (!hostName.length) {
      return hosts;
    }

    return hosts.concat([hostName]);
  }, []);
}

// export
module.exports = {
  parse,
};
