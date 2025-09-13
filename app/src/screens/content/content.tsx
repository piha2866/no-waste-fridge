import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { useTypedNavigation } from '../../navigation/AppNavigator';
import colors from '../../styles/colors';
import { Note } from '../../types/note/note';

interface ContentProps {
  note: Note;
  index: number;
}

export function Content({ note, index }: ContentProps): React.JSX.Element {
  const navigation = useTypedNavigation();
  const handlePress = (): void => {
    navigation.navigate('Details', { note });
  };
  return (
    <TouchableOpacity
      style={styles.contentContainer}
      onPress={handlePress}
      id={`note-${index}`}
      testID={`note-${index}`}
    >
      <Image
        source={
          note.imageLocation
            ? { uri: `file://${note.imageLocation}` }
            : // eslint-disable-next-line @typescript-eslint/no-require-imports
              require('../../assets/images/default-food.png')
        }
        style={styles.image}
        resizeMode="contain"
        id="content_details_mini_image"
        testID="content_details_mini_image"
      />
      <Text style={styles.text} numberOfLines={1}>
        {note.title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    display: 'flex',
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 20,
    width: 100,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
  },
  text: {
    color: colors.text,
    paddingHorizontal: 10,
  },
});
