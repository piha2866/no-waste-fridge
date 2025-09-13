import { Alert, Linking } from 'react-native';

export const showCameraPermissionAlert = () => {
  Alert.alert(
    'Permissions Required',
    'Camera and storage access have been denied. Please enable them in app settings.',
    [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Open Settings',
        onPress: () => Linking.openSettings(),
      },
    ],
    { cancelable: true },
  );
};
