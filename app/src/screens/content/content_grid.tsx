import React from 'react';
import { ScrollView, StyleSheet, useWindowDimensions } from 'react-native';

import { Note } from '../../types/note/note';
import { Content } from './content';

interface ContentGridProps {
  notes: Note[];
}

export default function ContentGrid({ notes }: ContentGridProps): React.JSX.Element {
  const { width, height } = useWindowDimensions();
  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={{ ...styles.contentWrapper, paddingBottom: height * 0.2 }}
    >
      {notes.map((note: Note, index: number) => (
        <Content key={index} note={note} index={index} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    display: 'flex',
  },

  contentWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignContent: 'flex-start',
  },
});
