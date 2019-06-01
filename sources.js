/**
 * Black list sources
 */
module.exports =  [
    {
        url: 'https://raw.githubusercontent.com/StevenBlack/hosts/master/hosts',
        type: 'hosts',
        name: 'StevenBlack'
    },
    {
        url: 'https://mirror1.malwaredomains.com/files/justdomains',
        type: 'list',
        name: 'MalwareDom'
    },
    {
        url: 'http://sysctl.org/cameleon/hosts',
        type: 'hosts',
        name: 'Cameleon'
    },
    {
        url: 'https://zeustracker.abuse.ch/blocklist.php?download=domainblocklist',
        type: 'list',
        name: 'ZeusTracker'

    }, {
        url: 'https://s3.amazonaws.com/lists.disconnect.me/simple_tracking.txt',
        type: 'list',
        name: 'DisconTrack'
    },
    {
        url: 'https://s3.amazonaws.com/lists.disconnect.me/simple_ad.txt',
        type: 'list',
        name: 'DisconAd'
    },{
        url: 'https://hosts-file.net/ad_servers.txt',
        type: 'hosts',
        name: 'HostsFile'
    }
];