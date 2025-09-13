import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useMemo, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';

import { cleanupUnusedImages } from '../../backend/db/cleanup_images';
import { selectNotes, sortModesMatcher } from '../../backend/db/notes/select';
import { IconButton } from '../../components/buttons';
import { useDatabase } from '../../context/db';
import { useTypedNavigation } from '../../navigation/AppNavigator';
import colors from '../../styles/colors';
import container from '../../styles/container';
import text from '../../styles/text';
import { Note } from '../../types/note/note';
import { SortMode } from '../../types/types';
import ContentGrid from './content_grid';
import { SearchField } from './content_search_field';
import { OptionSelection } from './option_selection';

const ContentScreen = ({}) => {
  const navigation = useTypedNavigation();
  const { db } = useDatabase();

  const [notes, setNotes] = useState<Note[]>([]);
  const [searchedNotes, setSearchedNotes] = useState<Note[]>([]);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [showSort, setShowSort] = useState<boolean>(false);
  const [sortMode, setSortMode] = useState<SortMode>('Expiration Date');
  const [searchValue, setSearchvalue] = useState<string>('');

  const fetchNotes = async (sortMode: SortMode): Promise<void> => {
    const data = await selectNotes(db, sortModesMatcher[sortMode]);
    setNotes(data);
  };

  const searchNotes = (searchValue: string) => {
    const lowerQuery = searchValue.toLowerCase().trim();

    return notes.filter(({ title, description }) => {
      return (
        title.toLowerCase().includes(lowerQuery) || description.toLowerCase().includes(lowerQuery)
      );
    });
  };

  const handleSearchPress = () => {
    if (showSort) {
      setShowSort(false);
      return;
    }
    if (showSearch) {
      setShowSearch(false);
      setSearchedNotes([]);
      setSearchvalue('');
    } else {
      setShowSearch(true);
    }
  };

  const handleSortModeChange = (value: SortMode) => {
    setSortMode(value);
    void fetchNotes(value);
  };

  const handelSearchValueChange = (newValue: string) => {
    setSearchvalue(newValue);
    const result = searchNotes(newValue);
    setSearchedNotes(result);
  };

  useFocusEffect(
    useCallback(() => {
      void fetchNotes(sortMode);
      void cleanupUnusedImages(db);
    }, [db]),
  );

  const { width, height } = useWindowDimensions();
  const dynamicStyles = useMemo(
    () => ({
      screenPadding: {
        ...container.main,
        paddingVertical: height * 0.05,
      },
      topContainer: {
        height: height * 0.1,
        minHeight: 70,
      },
    }),
    [height],
  );
  return (
    <View style={dynamicStyles.screenPadding}>
      <TouchableWithoutFeedback onPress={() => setShowSort(false)}>
        <View style={styles.contentGridContainer}>
          <View style={dynamicStyles.topContainer}>
            {!showSearch && (
              <Text style={styles.sectionTitle} id="content-title" testID="content-title">
                Your fridges content
              </Text>
            )}
            {showSearch && (
              <SearchField
                onCancel={() => setShowSearch(false)}
                searchValue={searchValue}
                onValueChange={handelSearchValueChange}
              />
            )}
          </View>
          <ContentGrid notes={showSearch ? searchedNotes : notes} sortMode={sortMode} />
        </View>
      </TouchableWithoutFeedback>

      <IconButton
        iconName="manage-search"
        onPress={handleSearchPress}
        size={32}
        style={styles.manageSearchButton}
        color={colors.background}
        onLongPress={() => (showSort ? setShowSort(false) : setShowSort(true))}
      />
      <IconButton
        iconName="add"
        onPress={() => navigation.navigate('Details', {})}
        size={32}
        style={styles.addButton}
        color={colors.background}
      />
      {showSort && (
        <OptionSelection
          style={styles.optionSelection}
          title="Sort by:"
          options={[
            { text: 'A-Z', onPress: () => {} },
            { text: 'Z-A', onPress: () => {} },
            { text: 'Expiration Date', onPress: () => {} },
            { text: 'Opening Date', onPress: () => {} },
          ]}
          sortMode={sortMode}
          setSortMode={handleSortModeChange}
        />
      )}
    </View>
  );
};

const baseOverlayButton: ViewStyle = {
  position: 'absolute',
  backgroundColor: colors.text,
  borderRadius: 20,
  padding: 20,
  zIndex: 1,
};

const styles = StyleSheet.create({
  contentGridContainer: {
    flexGrow: 1,
  },
  sectionTitle: {
    ...text.title,
    textAlign: 'center',
    textAlignVertical: 'center',
    height: '100%',
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
  optionSelection: {
    ...baseOverlayButton,
    bottom: 100,
    left: 20,
    zIndex: 2,
  },
});

export default ContentScreen;
