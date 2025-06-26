import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { Note } from '../../backend/db/types';
import { useTypedNavigation } from '../../navigation/AppNavigator';
import colors from '../../styles/colors';

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
      testID={`note-${index}`}
    >
      <Image
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        source={require('../../assets/images/default-food.png')}
        style={styles.image}
        resizeMode="contain"
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
  image: { width: 80, height: 80 },
  text: {
    color: colors.text,
    paddingHorizontal: 10,
  },
});
