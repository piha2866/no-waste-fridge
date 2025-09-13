import { Permission, PermissionsAndroid, Platform } from 'react-native';

import { showCameraPermissionAlert } from './alert';

export const requestCameraPermissions = async (): Promise<boolean> => {
  if (Platform.OS !== 'android') return true;

  const permissions: Permission[] = [PermissionsAndroid.PERMISSIONS.CAMERA];

  const androidVersion = parseInt(Platform.Version as unknown as string, 10);

  if (androidVersion >= 33) {
    permissions.push(PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES);
  } else {
    permissions.push(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
  }

  try {
    const results = await PermissionsAndroid.requestMultiple(permissions);
    console.log(results);
    if (
      results[permissions[0]] === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN ||
      results[permissions[1]] === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
    ) {
      showCameraPermissionAlert();
    }

    return permissions.every((perm) => results[perm] === PermissionsAndroid.RESULTS.GRANTED);
  } catch (error) {
    console.warn('Permission request failed', error);
    return false;
  }
};
