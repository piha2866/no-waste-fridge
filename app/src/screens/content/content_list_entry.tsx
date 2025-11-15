import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { IconButton } from '../../components/buttons';
import { useTypedNavigation } from '../../navigation/AppNavigator';
import text from '../../styles/text';
import { ContentProps } from './content';

export function ContentListEntry({ note, index, handleDelete }: ContentProps): React.JSX.Element {
  const navigation = useTypedNavigation();
  const handlePress = (): void => {
    navigation.navigate('Details', { note });
  };

  return (
    <View style={styles.rowContainer}>
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
      <IconButton iconName="delete" onPress={() => handleDelete(note.id)} />
    </View>
  );
}

const styles = StyleSheet.create({
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  contentContainer: {
    flexDirection: 'row',
    flex: 1,
    marginVertical: '1%',
  },
  textContainer: {
    flexDirection: 'column',
    flex: 1,
    alignSelf: 'center',
  },
  image: {
    width: 50,
    height: 50,
  },
  title: {
    paddingHorizontal: 10,
    flex: 1,
    ...text.standard,
  },
  expDate: {
    paddingHorizontal: 10,
    ...text.standard,
    fontSize: 12,
  },
});
