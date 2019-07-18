import DeviceInfo from 'react-native-device-info'

const version = DeviceInfo.getVersion();
const buildNumber = DeviceInfo.getBuildNumber();

export {
  version,
  buildNumber,
  DeviceInfo
}