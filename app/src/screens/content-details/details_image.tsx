/* eslint-disable @typescript-eslint/no-require-imports */
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
interface DetailsImageProps {
  imageLocation: string | undefined;
  onPress: () => void;
}

export const DetailsImage = ({ imageLocation, onPress }: DetailsImageProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Image
        source={
          imageLocation
            ? { uri: `file://${imageLocation}` }
            : require('../../assets/images/default-food.png')
        }
        style={styles.image}
        resizeMode="contain"
        id="content_details_image"
        testID="content_details_image"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    minHeight: 100,
    minWidth: 100,
  },
  button: { flex: 1, width: '100%' },
});
