import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, useWindowDimensions } from 'react-native';
import ContentGrid from './content_grid';
import ContentCreationButton from './content_creation_button';
import container from '../../styles/container';
import text from '../../styles/text';
import { initializeDB } from '../../backend/db/main';
import { selectNotes } from '../../backend/db/notes/select';
import { Note } from '../../backend/db/types';

const ContentScreen = ({ }) => {
  const [notes, setNotes] = useState<Note[]>([])

  const establishDBConnection = async () => {
    const db = await initializeDB();
    const data = await selectNotes(db);
    setNotes(data);
  }
  useEffect(() => {
    establishDBConnection();
  }, []);
    const { width, height } = useWindowDimensions();
    return (
        <View style={{...container.main, paddingVertical: height*0.05}}> 
            <View style={styles.contentGridContainer}>
                <Text style={{...styles.sectionTitle, paddingVertical: height*0.05}}>Your fridges content</Text>
                <ContentGrid items={notes.map(note => note.title)} />
            </View>
            <ContentCreationButton/>
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