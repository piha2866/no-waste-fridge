import React from 'react';
import { ScrollView, StyleSheet, useWindowDimensions } from 'react-native';

import { Note } from '../../types/note/note';
import { SortMode } from '../../types/types';
import { ContentGridButton } from './content_grid_entry';
import { ContentListEntry } from './content_list_entry';

const styles = StyleSheet.create({
  scrollView: {
    display: 'flex',
  },

  gridContentWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignContent: 'flex-start',
  },
  listContentWrapper: {},
});

interface ContentGridProps {
  notes: Note[];
  sortMode: SortMode;
  style: 'Grid' | 'List';
  handleDelete: (id: number) => void;
}

const ContentButtonMapper = {
  Grid: ContentGridButton,
  List: ContentListEntry,
};

const ContentStyleMapper = {
  Grid: styles.gridContentWrapper,
  List: styles.listContentWrapper,
};

export default function Content({
  notes,
  style,
  sortMode,
  handleDelete,
}: ContentGridProps): React.JSX.Element {
  const { width, height } = useWindowDimensions();
  const ContentButton = ContentButtonMapper[style];
  const contentWrapperStyle = ContentStyleMapper[style];
  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={{ ...contentWrapperStyle, paddingBottom: height * 0.2 }}
    >
      {notes.map((note: Note, index: number) => (
        <ContentButton key={index} note={note} index={index} handleDelete={handleDelete} />
      ))}
    </ScrollView>
  );
}
