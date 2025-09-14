import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useTypedNavigation } from '../../navigation/AppNavigator';
import text from '../../styles/text';
import { ContentProps } from './content';

export function ContentListEntry({ note, index }: ContentProps): React.JSX.Element {
  const navigation = useTypedNavigation();
  const handlePress = (): void => {
    navigation.navigate('Details', { note });
  };
  return (
    <TouchableOpacity style={styles.contentContainer} onPress={handlePress}>
      <Image
        source={
          note.imageLocation
            ? { uri: `file://${note.imageLocation}` }
            : // eslint-disable-next-line @typescript-eslint/no-require-imports
              require('../../assets/images/default-food.png')
        }
        style={styles.image}
        resizeMode="cover"
        id="content_details_mini_image"
        testID="content_details_mini_image"
      />
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {note.title}
        </Text>
        <Text style={styles.expDate}>{new Date(note.expirationDate).toLocaleDateString()}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: 'row',
    flex: 1,
    marginVertical: '1%',
  },

  image: {
    width: 50,
    height: 50,
  },
  textContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  title: {
    paddingHorizontal: 10,
    flex: 1,
    ...text,
  },
  expDate: {
    paddingHorizontal: 10,
    ...text,
  },
});
