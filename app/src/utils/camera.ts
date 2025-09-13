import { ImagePickerResponse, launchCamera } from 'react-native-image-picker';

import { requestCameraPermissions } from './permissions';

export const openCamera = async () => {
  const hasPermission = await requestCameraPermissions();
  console.log('hasPermissions', hasPermission);

  if (!hasPermission) {
    console.warn('Camera permission denied');
    return;
  }

  const result: ImagePickerResponse = await launchCamera(
    {
      mediaType: 'photo',
      cameraType: 'back',
      saveToPhotos: false,
    },
    (response) => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorCode) {
        console.error('Camera error:', response.errorMessage);
      } else {
        const imageUri = response.assets?.[0]?.uri;
        console.log('Photo taken:', imageUri);
        // Use the URI as needed (save to DB, show in UI, etc.)
      }
    },
  );
  return result;
};
