import { ImagePickerResponse, launchCamera } from 'react-native-image-picker';

import { saveImage } from '../backend/files/save_image';
import { requestCameraPermissions } from './permissions';

const splitImageUriToPathAndName = (uri: string) => {
  const cleanUri = uri.replace('file://', '');
  const parts = cleanUri.split('/');
  const fileName = parts.pop() ?? '';
  const path = parts.join('/');

  return {
    path,
    fileName,
  };
};

export const openCamera = async (setImageLocation: (uri: string) => void) => {
  const hasPermission = await requestCameraPermissions();

  if (!hasPermission) {
    console.warn('Camera permission denied');
    return;
  }

  const result: ImagePickerResponse = await launchCamera(
    {
      mediaType: 'photo',
      cameraType: 'back',
      saveToPhotos: false,
      maxHeight: 300,
      maxWidth: 300,
      quality: 0.7,
    },
    async (response) => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorCode) {
        console.error('Camera error:', response.errorMessage);
      } else {
        try {
          const imageUri = response.assets?.[0]?.uri;
          if (imageUri) {
            const { fileName } = splitImageUriToPathAndName(imageUri);
            const newUri = await saveImage(imageUri, fileName);
            setImageLocation(newUri);
          }
        } catch (error) {
          console.log('Image storage failed');
          console.error(error);
        }
      }
    },
  );
  return result;
};
