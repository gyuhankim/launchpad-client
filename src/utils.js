export default function convertPlatformId(platform) {

  const consoleFilter = {
    37: '3DS',
    137: '3DS',
    41: 'Wii U',
    130: 'Switch',
    9: 'PS3',
    48: 'PS4',
    165: 'PSVR',
    45: 'PSN',
    12: '360',
    49: 'XB1',
    36: 'XBLA',
    6: 'PC',
    14: 'Mac',
    163: 'SteamVR',
    39: 'iOS',
    34: 'Android',
    46: 'Vita',
    3: 'Linux'
  }

  if (!consoleFilter[platform]) {
    return null;
  } else {
    return consoleFilter[platform];
  }
}