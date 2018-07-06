export default function convertPlatformId(platforms) {
  let gameConsole = [];

  // let platforms = {
  //   (convert to string) someInteger: 'console name'
  // }

  // platform[someInteger] will return 'console name'

  platforms.map(platform => {
    switch(platform) {
      case 37:
        return gameConsole = '3DS';

      case 137:
        return gameConsole = '3DS';

      case 41:
        return gameConsole = 'Wii U';

      case 130:
        return gameConsole = 'Switch';

      case 9:
        return gameConsole = 'PS3';

      case 48:
        return gameConsole = 'PS4';

      case 165:
        return gameConsole = 'PSVR';

      case 45:
        return gameConsole = 'PSN';

      case 12:
        return gameConsole = '360';

      case 49:
        return gameConsole = 'XB1';

      case 36:
        return gameConsole = 'XBLA';

      case 6:
        return gameConsole = 'PC';

      case 14:
        return gameConsole = 'Mac';

      case 163:
        return gameConsole = 'SteamVR';

      case 39:
        return gameConsole = 'iOS';

      case 34:
        return gameConsole = 'Android';

      default:
        return gameConsole = 'wooyea';
    }
  })

  return gameConsole;
}