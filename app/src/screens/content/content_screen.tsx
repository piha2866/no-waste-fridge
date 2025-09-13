import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, useWindowDimensions, View, ViewStyle } from 'react-native';

import { cleanupUnusedImages } from '../../backend/db/cleanup_images';
import { selectNotes } from '../../backend/db/notes/select';
import { IconButton } from '../../components/buttons';
import { useDatabase } from '../../context/db';
import { useTypedNavigation } from '../../navigation/AppNavigator';
import colors from '../../styles/colors';
import container from '../../styles/container';
import text from '../../styles/text';
import { Note } from '../../types/note/note';
import ContentGrid from './content_grid';

const ContentScreen = ({}) => {
  const navigation = useTypedNavigation();
  const { db } = useDatabase();
  const [notes, setNotes] = useState<Note[]>([]);

  const fetchNotes = async (): Promise<void> => {
    const data = await selectNotes(db);
    setNotes(data);
  };

  useFocusEffect(
    useCallback(() => {
      void fetchNotes();
      void cleanupUnusedImages(db);
    }, [db]),
  );

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
        <ContentGrid notes={notes} />
      </View>
      <IconButton
        iconName="manage-search"
        onPress={() => {}}
        size={32}
        style={styles.manageSearchButton}
        color={colors.background}
      />
      <IconButton
        iconName="add"
        onPress={() => {
          navigation.navigate('Details', {});
        }}
        size={32}
        style={styles.addButton}
        color={colors.background}
      />
      {}
    </View>
  );
};

const baseOverlayButton: ViewStyle = {
  position: 'absolute',
  backgroundColor: colors.text,
  borderRadius: 20,
  padding: 20,
};

const styles = StyleSheet.create({
  contentGridContainer: {
    flexGrow: 1,
  },
  sectionTitle: {
    ...text.title,
    textAlign: 'center',
  },
  addButton: {
    ...baseOverlayButton,
    bottom: 20,
    right: 20,
  },
  manageSearchButton: {
    ...baseOverlayButton,
    bottom: 20,
    left: 20,
  },
});

export default ContentScreen;
