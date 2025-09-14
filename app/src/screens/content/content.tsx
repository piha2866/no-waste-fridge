import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { useTypedNavigation } from '../../navigation/AppNavigator';
import colors from '../../styles/colors';
import { Note } from '../../types/note/note';

export interface ContentProps {
  note: Note;
  index: number;
}

export function ContentGridButton({ note, index }: ContentProps): React.JSX.Element {
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
        resizeMode="cover"
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
    height: 130,
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    maxHeight: 100,
    maxWidth: 100,
  },
  text: {
    flex: 1,
    color: colors.text,
    paddingHorizontal: '10%',
    textAlignVertical: 'center',
  },
});
