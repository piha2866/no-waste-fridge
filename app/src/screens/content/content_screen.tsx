import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import { selectNotes } from '../../backend/db/notes/select';
import { Note } from '../../backend/db/types';
import { useDatabase } from '../../context/db';
import container from '../../styles/container';
import text from '../../styles/text';
import ContentCreationButton from './content_creation_button';
import ContentGrid from './content_grid';

const ContentScreen = ({}) => {
  const { db } = useDatabase();
  const [notes, setNotes] = useState<Note[]>([]);

  const establishDBConnection = async (): Promise<void> => {
    if (!db) return;
    const data = await selectNotes(db);
    setNotes(data);
  };
  useEffect(() => {
    void establishDBConnection();
  }, []);
  const { width, height } = useWindowDimensions();
  return (
    <View style={{ ...container.main, paddingVertical: height * 0.05 }}>
      <View style={styles.contentGridContainer}>
        <Text
          style={{ ...styles.sectionTitle, paddingVertical: height * 0.05 }}
          id="content-title"
          testID="content-title"
        >
          Your fridges content
        </Text>
        <ContentGrid items={notes.map((note) => note.title)} />
      </View>
      <ContentCreationButton />
      {}
    </View>
  );
};

const styles = StyleSheet.create({
  contentGridContainer: {
    flexGrow: 1,
  },
  sectionTitle: {
    ...text.title,
    textAlign: 'center',
  },
});

export default ContentScreen;
